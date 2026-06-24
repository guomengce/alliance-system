package admin

import (
	"errors"
	"fmt"
	"math"
	"strings"

	"alliance-system/backend-go/internal/application/ports"
	"alliance-system/backend-go/internal/application/presenters"
	"alliance-system/backend-go/internal/application/support"
	"alliance-system/backend-go/internal/business/domain"
	"alliance-system/backend-go/internal/infrastructure/security"
)

var (
	ErrMissingID         = errors.New("missing id")
	ErrMissingEmail      = errors.New("missing email")
	ErrMissingDownlines  = errors.New("missing downlines")
	ErrMissingParameters = errors.New("missing parameters")
	ErrMissingPlans      = errors.New("missing plans")
	ErrMissingBroadcast  = errors.New("missing broadcast")
	ErrWithdrawalMissing = errors.New("withdrawal missing")
	ErrInvalidParameters = errors.New("invalid parameters")
	ErrInvalidPlans      = errors.New("invalid plans")
	ErrDuplicateUID      = errors.New("duplicate uid")
)

type Service struct {
	store ports.Store
}

func NewService(dataStore ports.Store) *Service {
	return &Service{store: dataStore}
}

func (s *Service) PendingWithdrawals() []domain.Transaction {
	var pending []domain.Transaction
	_ = s.store.View(func(db domain.Database) error {
		pending = append(pending, db.PendingWithdrawals...)
		return nil
	})
	return pending
}

type WithdrawalReviewResult struct {
	PendingWithdrawals []domain.Transaction
}

type ManualSettlementCommand struct {
	ActorEmail string
	ActorRole  *domain.Role
	Amount     float64
}

type ManualSettlementResult struct {
	User domain.User
}

func (s *Service) RunManualSettlement(cmd ManualSettlementCommand) (ManualSettlementResult, error) {
	if strings.TrimSpace(cmd.ActorEmail) == "" {
		return ManualSettlementResult{}, ErrMissingEmail
	}
	if cmd.Amount <= 0 {
		cmd.Amount = 1500
	}

	var updated domain.User
	err := s.store.Update(func(db *domain.Database) error {
		user, err := domain.UpdateUser(db, cmd.ActorEmail, func(u *domain.User) {
			u.USDTBalance = domain.Round2(u.USDTBalance + cmd.Amount)
		})
		if err != nil {
			return ErrMissingEmail
		}
		updated = presenters.SanitizeUser(user)
		db.AuditLogs = append([]domain.AuditLog{{
			ID:          "AUD-" + support.RandomDigits(10),
			ActorEmail:  cmd.ActorEmail,
			ActorRole:   cmd.ActorRole,
			Action:      "settlement.runManual",
			TargetEmail: cmd.ActorEmail,
			Metadata:    map[string]any{"amount": cmd.Amount},
			CreatedAt:   support.NowText(),
		}}, db.AuditLogs...)
		return nil
	})
	if err != nil {
		return ManualSettlementResult{}, err
	}
	return ManualSettlementResult{User: updated}, nil
}

func (s *Service) ApproveWithdrawal(id string) (WithdrawalReviewResult, error) {
	return s.updateWithdrawal(id, "success", "出账成功", "Success - Handled by Admin Approval", false)
}

func (s *Service) RejectWithdrawal(id string) (WithdrawalReviewResult, error) {
	return s.updateWithdrawal(id, "failed", "退回驳回", "Rejected - Refunded on System", true)
}

func (s *Service) updateWithdrawal(id string, status string, label string, proofStatus string, refund bool) (WithdrawalReviewResult, error) {
	if strings.TrimSpace(id) == "" {
		return WithdrawalReviewResult{}, ErrMissingID
	}

	var pending []domain.Transaction
	err := s.store.Update(func(db *domain.Database) error {
		index := -1
		var cashout domain.Transaction
		for i, item := range db.PendingWithdrawals {
			if item.ID == id {
				index = i
				cashout = item
				break
			}
		}
		if index == -1 {
			return ErrWithdrawalMissing
		}
		db.PendingWithdrawals = append(db.PendingWithdrawals[:index], db.PendingWithdrawals[index+1:]...)
		for i := range db.Transactions {
			if db.Transactions[i].ID == id {
				db.Transactions[i].Status = status
				db.Transactions[i].StatusLabel = label
				if db.Transactions[i].BlockchainProof != nil {
					db.Transactions[i].BlockchainProof.ConsensusStatus = proofStatus
				}
			}
		}
		if refund {
			_, _ = domain.UpdateUser(db, cashout.UserEmail, func(u *domain.User) {
				u.USDTBalance = domain.Round2(u.USDTBalance + math.Abs(cashout.Amount))
			})
		}
		db.Notifications = append([]domain.Notification{{
			ID: "NOT-" + support.RandomDigits(3), Category: "system", CategoryLabel: "钱包出账",
			Title: "提现审批核准交割通知", Desc: fmt.Sprintf("您的钱包出账提现单 %s 提现量 $%.2f USDT 状态已更新。", id, math.Abs(cashout.Amount)),
			Time: "刚刚", IsUnread: true, UserEmail: cashout.UserEmail,
		}}, db.Notifications...)
		pending = append(pending, db.PendingWithdrawals...)
		return nil
	})
	if err != nil {
		return WithdrawalReviewResult{}, err
	}
	return WithdrawalReviewResult{PendingWithdrawals: pending}, nil
}

type MarkNotificationsCommand struct {
	Email   string
	ID      string
	MarkAll bool
}

type NotificationsResult struct {
	Notifications []domain.Notification
}

func (s *Service) MarkNotificationsRead(cmd MarkNotificationsCommand) (NotificationsResult, error) {
	if strings.TrimSpace(cmd.Email) == "" {
		return NotificationsResult{}, ErrMissingEmail
	}

	var notifications []domain.Notification
	_ = s.store.Update(func(db *domain.Database) error {
		for i := range db.Notifications {
			if domain.SameEmail(db.Notifications[i].UserEmail, cmd.Email) && (cmd.MarkAll || db.Notifications[i].ID == cmd.ID) {
				db.Notifications[i].IsUnread = false
			}
			if domain.SameEmail(db.Notifications[i].UserEmail, cmd.Email) {
				notifications = append(notifications, db.Notifications[i])
			}
		}
		return nil
	})
	return NotificationsResult{Notifications: notifications}, nil
}

func (s *Service) ClearNotifications(email string) (NotificationsResult, error) {
	if strings.TrimSpace(email) == "" {
		return NotificationsResult{}, ErrMissingEmail
	}
	_ = s.store.Update(func(db *domain.Database) error {
		filtered := db.Notifications[:0]
		for _, item := range db.Notifications {
			if !domain.SameEmail(item.UserEmail, email) {
				filtered = append(filtered, item)
			}
		}
		db.Notifications = filtered
		return nil
	})
	return NotificationsResult{Notifications: []domain.Notification{}}, nil
}

func (s *Service) UpdateDownlines(downlines []domain.Downline) ([]domain.Downline, error) {
	if downlines == nil {
		return nil, ErrMissingDownlines
	}
	if err := validateUniqueUIDs(downlines); err != nil {
		return nil, err
	}
	if err := s.store.Update(func(db *domain.Database) error {
		storedDownlines := make([]domain.Downline, len(downlines))
		copy(storedDownlines, downlines)
		for i := range storedDownlines {
			storedDownlines[i].Password = ""
		}
		db.Downlines = storedDownlines
		for _, downline := range downlines {
			if downline.Email == "" {
				continue
			}
			passwordHash := ""
			if downline.Password != "" {
				hash, err := security.HashPassword(downline.Password)
				if err != nil {
					return err
				}
				passwordHash = hash
			}
			_, _ = domain.UpdateUser(db, downline.Email, func(u *domain.User) {
				if downline.Nickname != "" {
					u.Nickname = downline.Nickname
				}
				if passwordHash != "" {
					u.Password = passwordHash
				}
				u.USDTBalance = downline.USDTBalance
				u.TROOBalance = downline.TROOBalance
				u.PendingBalance = downline.PendingBalance
			})
		}
		return nil
	}); err != nil {
		return nil, err
	}
	return presenters.SanitizeDownlines(downlines), nil
}

func validateUniqueUIDs(downlines []domain.Downline) error {
	seen := map[string]bool{}
	for _, downline := range downlines {
		uid := strings.TrimSpace(downline.UID)
		if uid == "" {
			continue
		}
		if seen[uid] {
			return ErrDuplicateUID
		}
		seen[uid] = true
	}
	return nil
}

func (s *Service) Parameters() *domain.Parameters {
	var params *domain.Parameters
	_ = s.store.View(func(db domain.Database) error {
		params = db.Parameters
		return nil
	})
	return params
}

func (s *Service) UpdateParameters(params domain.Parameters) error {
	if err := validateParameters(params); err != nil {
		return fmt.Errorf("%w: %v", ErrInvalidParameters, err)
	}
	_ = s.store.Update(func(db *domain.Database) error {
		db.Parameters = &params
		return nil
	})
	return nil
}

func (s *Service) Plans() []domain.Plan {
	var plans []domain.Plan
	_ = s.store.View(func(db domain.Database) error {
		plans = append(plans, db.Plans...)
		return nil
	})
	return plans
}

func (s *Service) UpdatePlans(plans []domain.Plan) error {
	if len(plans) == 0 {
		return ErrMissingPlans
	}
	if err := validatePlans(plans); err != nil {
		return fmt.Errorf("%w: %v", ErrInvalidPlans, err)
	}
	_ = s.store.Update(func(db *domain.Database) error {
		db.Plans = plans
		return nil
	})
	return nil
}

type BroadcastCommand struct {
	Title  string
	Desc   string
	Target string
}

func (s *Service) Broadcast(cmd BroadcastCommand) error {
	if strings.TrimSpace(cmd.Title) == "" || strings.TrimSpace(cmd.Desc) == "" {
		return ErrMissingBroadcast
	}
	_ = s.store.Update(func(db *domain.Database) error {
		if cmd.Target == "all" {
			for _, user := range db.Users {
				db.Notifications = append([]domain.Notification{notificationFor(user.Email, cmd.Title, cmd.Desc)}, db.Notifications...)
			}
			return nil
		}
		targetEmail := "ppyybb888@gmail.com"
		for _, user := range db.Users {
			if domain.SameEmail(user.Email, cmd.Target) || strings.Contains(user.Email, cmd.Target) {
				targetEmail = user.Email
				break
			}
		}
		db.Notifications = append([]domain.Notification{notificationFor(targetEmail, cmd.Title, cmd.Desc)}, db.Notifications...)
		return nil
	})
	return nil
}

func notificationFor(email string, title string, desc string) domain.Notification {
	return domain.Notification{ID: "NOT-" + support.RandomDigits(3), Category: "system", CategoryLabel: "官方公告", Title: title, Desc: desc, Time: "刚刚", IsUnread: true, UserEmail: email}
}

func validateParameters(params domain.Parameters) error {
	if len(params.CommissionLevels) == 0 {
		return errors.New("佣金层级配置不能为空")
	}
	for level, value := range params.CommissionLevels {
		if value < 0 || value > 100 {
			return fmt.Errorf("佣金层级 %s必须为 0 到 100 之间的有效数字", level)
		}
	}
	if params.WithdrawalFee < 0 || params.L1UnlockRatio < 0 || params.L1UnlockRatio > 100 {
		return errors.New("系统参数必须为有效数字")
	}
	if !strings.HasPrefix(params.APIPriceURL, "http://") && !strings.HasPrefix(params.APIPriceURL, "https://") {
		return errors.New("价格接口地址必须为有效 URL")
	}
	return nil
}

func validatePlans(plans []domain.Plan) error {
	for _, plan := range plans {
		if strings.TrimSpace(plan.ID) == "" || strings.TrimSpace(plan.Name) == "" {
			return errors.New("理财计划 ID 和名称不能为空")
		}
		if plan.Price < 0 || plan.CommissionLimit < 0 || plan.BuyRatio < 0 || plan.BuyRatio > 100 || plan.QueueRatio < 0 || plan.QueueRatio > 100 || plan.GiftRatio < 0 {
			return errors.New("理财计划数值配置无效")
		}
	}
	return nil
}
