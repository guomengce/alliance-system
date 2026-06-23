package wallet

import (
	"fmt"
	"math"

	"alliance-system/backend-go/internal/application/presenters"
	"alliance-system/backend-go/internal/application/support"
	"alliance-system/backend-go/internal/business/domain"
)

type DirectSimulationCommand struct {
	Email             string
	PurchaseAmt       float64
	CommissionPercent float64
	SubUID            string
	SubPlanName       string
}

type SimulationResult struct {
	UserAEarned    float64 `json:"userAEarned"`
	ActualUnlocked float64 `json:"actualUnlocked"`
	TROOFromUnlock float64 `json:"trooFromUnlock"`
}

type DirectSimulationResult struct {
	Calculation SimulationResult
	User        domain.User
}

func (s *Service) DirectSimulation(cmd DirectSimulationCommand) (DirectSimulationResult, error) {
	var updated domain.User
	result := CalculateDirectSimulation(cmd.PurchaseAmt, cmd.CommissionPercent, 0, 0)
	err := s.store.Update(func(db *domain.Database) error {
		user, err := domain.UpdateUser(db, cmd.Email, func(u *domain.User) {
			result = CalculateDirectSimulation(cmd.PurchaseAmt, cmd.CommissionPercent, u.LockedQueueAmount, u.CommissionPoolRemaining)
			if result.UserAEarned > 0 {
				u.USDTBalance = domain.Round2(u.USDTBalance + result.UserAEarned)
				u.CommissionPoolRemaining = domain.Round2(u.CommissionPoolRemaining - result.UserAEarned)
				u.PendingBalance = domain.Round2(u.PendingBalance + result.UserAEarned)
				u.CumulativeCommissions = domain.Round2(u.CumulativeCommissions + result.UserAEarned)
			}
			if result.ActualUnlocked > 0 {
				u.LockedQueueAmount = domain.Round2(math.Max(0, u.LockedQueueAmount-result.ActualUnlocked))
				u.ReleasedQueueAmount = domain.Round2(u.ReleasedQueueAmount + result.ActualUnlocked)
				u.TROOBalance = domain.Round2(u.TROOBalance + result.TROOFromUnlock)
			}
		})
		if err != nil {
			return ErrUserNotFound
		}
		updated = user
		db.Transactions = append([]domain.Transaction{{
			ID: "TXN-" + support.RandomDigits(10), Type: "commission", TypeLabel: "排队解锁及结转",
			Desc:   fmt.Sprintf("下级 %s 订阅 %s $%.0f USDT 促发收益", cmd.SubUID, cmd.SubPlanName, cmd.PurchaseAmt),
			Amount: result.UserAEarned, Currency: "USDT", Time: support.NowText(), Status: "success",
			StatusLabel: "结算完成", UserEmail: user.Email,
		}}, db.Transactions...)
		db.Notifications = append([]domain.Notification{{
			ID: "NOT-" + support.RandomDigits(3), Category: "commission", CategoryLabel: "收益分派",
			Title: "模拟排队订单交割收益通知",
			Desc:  fmt.Sprintf("下级同盟成员购买 %s 已全网交割！您获派佣金 $%.2f USDT，解套锁定资产并补发 $%.2f TROO。", cmd.SubPlanName, result.UserAEarned, result.TROOFromUnlock),
			Time:  "刚刚", IsUnread: true, UserEmail: user.Email,
		}}, db.Notifications...)
		return nil
	})
	if err != nil {
		return DirectSimulationResult{}, err
	}
	return DirectSimulationResult{Calculation: result, User: presenters.SanitizeUser(updated)}, nil
}

func CalculateDirectSimulation(purchaseAmt float64, commissionPercent float64, locked float64, remaining float64) SimulationResult {
	earned := math.Min(domain.Round2(purchaseAmt*commissionPercent/100), remaining)
	unlocked := math.Min(locked, domain.Round2(purchaseAmt*0.1))
	return SimulationResult{UserAEarned: earned, ActualUnlocked: unlocked, TROOFromUnlock: domain.Round2(unlocked * 2)}
}
