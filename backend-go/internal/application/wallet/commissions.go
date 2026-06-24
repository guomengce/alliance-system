package wallet

import (
	"alliance-system/backend-go/internal/application/presenters"
	"alliance-system/backend-go/internal/application/support"
	"alliance-system/backend-go/internal/business/domain"
)

func (s *Service) WithdrawCommissions(email string) (UserResult, error) {
	var updated domain.User
	var earned float64
	err := s.store.Update(func(db *domain.Database) error {
		for i := range db.Users {
			if !domain.SameEmail(db.Users[i].Email, email) {
				continue
			}
			if db.Users[i].PendingBalance <= 0 {
				return ErrNoPendingCommission
			}
			earned = db.Users[i].PendingBalance
			db.Users[i].PendingBalance = 0
			db.Users[i].ArrivedCommissions = domain.Round2(db.Users[i].ArrivedCommissions + earned)
			db.Users[i].USDTBalance = domain.Round2(db.Users[i].USDTBalance + earned)
			updated = db.Users[i]
			db.Transactions = append([]domain.Transaction{{ID: "TXN-" + support.RandomDigits(10), Type: "recharge", TypeLabel: "佣金提取", Desc: "核算完成待分派佣金自动结算提至主可用余额", Amount: earned, Currency: "USDT", Time: support.NowText(), Status: "success", StatusLabel: "提取成功", UserEmail: db.Users[i].Email}}, db.Transactions...)
			return nil
		}
		return ErrUserNotFound
	})
	if err != nil {
		return UserResult{}, err
	}
	return UserResult{User: presenters.SanitizeUser(updated)}, nil
}

func (s *Service) RaiseLimit(email string) error {
	err := s.store.Update(func(db *domain.Database) error {
		user, err := domain.UpdateUser(db, email, func(u *domain.User) {
			u.CommissionPoolLimit += 10000
			u.CommissionPoolRemaining += 10000
		})
		if err != nil {
			return ErrUserNotFound
		}
		db.Transactions = append([]domain.Transaction{{ID: "TXN-" + support.RandomDigits(10), Type: "recharge", TypeLabel: "信贷授信", Desc: "申请获配额外结转授信额度（信用增级）", Amount: 10000, Currency: "USDT", Time: support.NowText(), Status: "success", StatusLabel: "授信成功", UserEmail: user.Email}}, db.Transactions...)
		return nil
	})
	return err
}
