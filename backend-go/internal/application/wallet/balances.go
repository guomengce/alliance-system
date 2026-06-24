package wallet

import (
	"math"
	"strings"

	"alliance-system/backend-go/internal/application/support"
	"alliance-system/backend-go/internal/business/domain"
)

type UpdateBalancesCommand struct {
	Email       string
	USDTDiff    *float64
	TROODiff    *float64
	LockedDiff  *float64
	Transaction *domain.Transaction
	ActorEmail  string
	ActorRole   *domain.Role
}

func (s *Service) UpdateBalances(cmd UpdateBalancesCommand) error {
	if strings.TrimSpace(cmd.Email) == "" {
		return ErrMissingEmail
	}
	return s.store.Update(func(db *domain.Database) error {
		for i := range db.Users {
			if !domain.SameEmail(db.Users[i].Email, cmd.Email) {
				continue
			}
			nextUSDT := db.Users[i].USDTBalance
			nextTROO := db.Users[i].TROOBalance
			if cmd.USDTDiff != nil {
				nextUSDT = domain.Round2(nextUSDT + *cmd.USDTDiff)
			}
			if cmd.TROODiff != nil {
				nextTROO = domain.Round2(nextTROO + *cmd.TROODiff)
			}
			if nextUSDT < 0 || nextTROO < 0 {
				return ErrNegativeBalance
			}
			db.Users[i].USDTBalance = nextUSDT
			db.Users[i].TROOBalance = nextTROO
			if cmd.LockedDiff != nil {
				if *cmd.LockedDiff > 0 {
					db.Users[i].LockedQueueAmount = domain.Round2(db.Users[i].LockedQueueAmount + *cmd.LockedDiff)
					db.Users[i].OriginalLockedQueue = domain.Round2(db.Users[i].OriginalLockedQueue + *cmd.LockedDiff)
				} else {
					db.Users[i].LockedQueueAmount = domain.Round2(math.Max(0, db.Users[i].LockedQueueAmount+*cmd.LockedDiff))
					db.Users[i].ReleasedQueueAmount = domain.Round2(db.Users[i].ReleasedQueueAmount - *cmd.LockedDiff)
				}
			}
			user := db.Users[i]
			if cmd.Transaction != nil {
				tx := *cmd.Transaction
				if tx.ID == "" {
					tx.ID = "TXN-" + support.RandomDigits(10)
				}
				if tx.Time == "" {
					tx.Time = support.NowText()
				}
				tx.UserEmail = user.Email
				db.Transactions = append([]domain.Transaction{tx}, db.Transactions...)
			}
			db.AuditLogs = append([]domain.AuditLog{{ID: "AUD-" + support.RandomDigits(10), ActorEmail: cmd.ActorEmail, ActorRole: cmd.ActorRole, Action: "wallet.updateBalances", TargetEmail: cmd.Email, CreatedAt: support.NowText()}}, db.AuditLogs...)
			return nil
		}
		return ErrUserNotFound
	})
}
