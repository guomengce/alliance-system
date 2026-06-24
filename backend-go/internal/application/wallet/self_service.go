package wallet

import (
	"fmt"
	"strings"

	"alliance-system/backend-go/internal/application/presenters"
	"alliance-system/backend-go/internal/application/support"
	"alliance-system/backend-go/internal/business/domain"
)

type SubscribePlanCommand struct {
	Email      string
	Amount     float64
	PlanName   string
	PlanPrice  float64
	PoolLimit  float64
	TROORatio  float64
	QueueRatio float64
}

func (s *Service) SubscribePlan(cmd SubscribePlanCommand) (UserResult, error) {
	if strings.TrimSpace(cmd.Email) == "" {
		return UserResult{}, ErrMissingEmail
	}
	if cmd.Amount <= 0 || cmd.PlanPrice <= 0 {
		return UserResult{}, ErrInvalidAmount
	}
	if cmd.Amount < cmd.PlanPrice {
		return UserResult{}, ErrInvalidAmount
	}
	if cmd.TROORatio <= 0 {
		cmd.TROORatio = 7
	}
	if cmd.QueueRatio <= 0 {
		cmd.QueueRatio = 0.31
	}

	planName := strings.TrimSpace(cmd.PlanName)
	if planName == "" {
		planName = "Subscription Plan"
	}

	var updated domain.User
	err := s.store.Update(func(db *domain.Database) error {
		for i := range db.Users {
			if !domain.SameEmail(db.Users[i].Email, cmd.Email) {
				continue
			}
			if db.Users[i].USDTBalance < cmd.Amount {
				return ErrInsufficientBalance
			}

			locked := domain.Round2(cmd.Amount * cmd.QueueRatio)
			troo := domain.Round2(cmd.Amount * cmd.TROORatio)
			poolBoost := domain.Round2(cmd.PoolLimit * (cmd.Amount / cmd.PlanPrice))

			db.Users[i].USDTBalance = domain.Round2(db.Users[i].USDTBalance - cmd.Amount)
			db.Users[i].TROOBalance = domain.Round2(db.Users[i].TROOBalance + troo)
			db.Users[i].LockedQueueAmount = domain.Round2(db.Users[i].LockedQueueAmount + locked)
			db.Users[i].OriginalLockedQueue = domain.Round2(db.Users[i].OriginalLockedQueue + locked)
			db.Users[i].CommissionPoolLimit = domain.Round2(db.Users[i].CommissionPoolLimit + poolBoost)
			db.Users[i].CommissionPoolRemaining = domain.Round2(db.Users[i].CommissionPoolRemaining + poolBoost)
			updated = db.Users[i]

			db.Transactions = append([]domain.Transaction{{
				ID:          "TXN-" + support.RandomDigits(10),
				Type:        "subscribe",
				TypeLabel:   "套餐申购",
				Desc:        fmt.Sprintf("申购 %s，锁仓 %.2f USDT，佣金池额度 +%.2f", planName, locked, poolBoost),
				Amount:      -cmd.Amount,
				Currency:    "USDT",
				Time:        support.NowText(),
				Status:      "success",
				StatusLabel: "进行中",
				UserEmail:   db.Users[i].Email,
			}}, db.Transactions...)
			return nil
		}
		return ErrUserNotFound
	})
	if err != nil {
		return UserResult{}, err
	}
	return UserResult{User: presenters.SanitizeUser(updated)}, nil
}

type TransferCommand struct {
	Email     string
	Amount    float64
	TargetUID string
}

func (s *Service) Transfer(cmd TransferCommand) (UserResult, error) {
	if strings.TrimSpace(cmd.Email) == "" {
		return UserResult{}, ErrMissingEmail
	}
	if cmd.Amount <= 0 {
		return UserResult{}, ErrInvalidAmount
	}
	targetUID := strings.TrimSpace(cmd.TargetUID)
	if targetUID == "" {
		return UserResult{}, ErrTransferTargetNotFound
	}

	var updated domain.User
	err := s.store.Update(func(db *domain.Database) error {
		targetEmail := ""
		for _, downline := range db.Downlines {
			if strings.EqualFold(strings.TrimSpace(downline.UID), targetUID) && strings.TrimSpace(downline.Email) != "" {
				targetEmail = downline.Email
				break
			}
		}
		if targetEmail == "" {
			return ErrTransferTargetNotFound
		}
		if domain.SameEmail(targetEmail, cmd.Email) {
			return ErrInvalidTransferTarget
		}

		senderIndex := -1
		targetIndex := -1
		for i := range db.Users {
			if domain.SameEmail(db.Users[i].Email, cmd.Email) {
				senderIndex = i
			}
			if domain.SameEmail(db.Users[i].Email, targetEmail) {
				targetIndex = i
			}
		}
		if senderIndex == -1 {
			return ErrUserNotFound
		}
		if targetIndex == -1 {
			return ErrTransferTargetNotFound
		}
		if db.Users[senderIndex].USDTBalance < cmd.Amount {
			return ErrInsufficientBalance
		}

		db.Users[senderIndex].USDTBalance = domain.Round2(db.Users[senderIndex].USDTBalance - cmd.Amount)
		db.Users[targetIndex].USDTBalance = domain.Round2(db.Users[targetIndex].USDTBalance + cmd.Amount)
		updated = db.Users[senderIndex]

		now := support.NowText()
		senderTxn := domain.Transaction{
			ID:          "TXN-" + support.RandomDigits(10),
			Type:        "transfer",
			TypeLabel:   "站内转账",
			Desc:        fmt.Sprintf("站内转账至 UID %s", targetUID),
			Amount:      -cmd.Amount,
			Currency:    "USDT",
			Time:        now,
			Status:      "success",
			StatusLabel: "成功",
			UserEmail:   db.Users[senderIndex].Email,
		}
		recipientTxn := domain.Transaction{
			ID:          "TXN-" + support.RandomDigits(10),
			Type:        "transfer",
			TypeLabel:   "站内收款",
			Desc:        fmt.Sprintf("来自 %s 的站内转账", db.Users[senderIndex].Email),
			Amount:      cmd.Amount,
			Currency:    "USDT",
			Time:        now,
			Status:      "success",
			StatusLabel: "成功",
			UserEmail:   db.Users[targetIndex].Email,
		}
		db.Transactions = append([]domain.Transaction{recipientTxn, senderTxn}, db.Transactions...)
		return nil
	})
	if err != nil {
		return UserResult{}, err
	}
	return UserResult{User: presenters.SanitizeUser(updated)}, nil
}
