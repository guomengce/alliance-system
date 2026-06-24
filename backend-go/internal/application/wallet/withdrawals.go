package wallet

import (
	"errors"
	"fmt"
	"regexp"
	"strings"

	"alliance-system/backend-go/internal/application/presenters"
	"alliance-system/backend-go/internal/application/support"
	"alliance-system/backend-go/internal/business/domain"
)

type SubmitWithdrawalCommand struct {
	Email     string
	Amount    float64
	Network   string
	ToAddress string
}

func (s *Service) SubmitWithdrawal(cmd SubmitWithdrawalCommand) (UserResult, error) {
	if cmd.Amount <= 0 {
		return UserResult{}, ErrInvalidAmount
	}
	if err := validateWithdrawalDestination(cmd.Network, cmd.ToAddress); err != nil {
		return UserResult{}, fmt.Errorf("%w: %v", ErrInvalidWithdrawalDestination, err)
	}

	var updated domain.User
	var txn domain.Transaction
	err := s.store.Update(func(db *domain.Database) error {
		for i := range db.Users {
			if !domain.SameEmail(db.Users[i].Email, cmd.Email) {
				continue
			}
			if db.Users[i].USDTBalance < cmd.Amount {
				return ErrInsufficientBalance
			}
			db.Users[i].USDTBalance = domain.Round2(db.Users[i].USDTBalance - cmd.Amount)
			updated = db.Users[i]
			txn = domain.Transaction{
				ID: "TXN-" + support.RandomDigits(10), Type: "withdraw", TypeLabel: "提现申请",
				Desc:   fmt.Sprintf("提现至外部钱包 (%s: %s)", cmd.Network, cmd.ToAddress),
				Amount: -cmd.Amount, Currency: "USDT", Time: support.NowText(), Status: "pending", StatusLabel: "待审核出账",
				BlockchainProof: &domain.BlockchainProof{TxID: withdrawalTxID(cmd.Network), Network: cmd.Network, GasFee: gasFee(cmd.Network), FromAddress: "TJDyZ8f1jUka8Jska271Kshq19Kshq9Kws", ToAddress: cmd.ToAddress, Timestamp: support.NowText(), ConsensusStatus: "Pending Admin Verification"},
				UserEmail:       db.Users[i].Email,
			}
			db.Transactions = append([]domain.Transaction{txn}, db.Transactions...)
			db.PendingWithdrawals = append([]domain.Transaction{txn}, db.PendingWithdrawals...)
			return nil
		}
		return ErrUserNotFound
	})
	if err != nil {
		return UserResult{}, err
	}
	return UserResult{User: presenters.SanitizeUser(updated)}, nil
}

func validateWithdrawalDestination(network string, address string) error {
	if strings.TrimSpace(network) == "" || strings.TrimSpace(address) == "" {
		return errors.New("提现网络和地址不能为空")
	}
	upper := strings.ToUpper(network)
	if strings.Contains(upper, "TRC") || strings.Contains(upper, "TRON") {
		if !regexp.MustCompile(`^T[1-9A-HJ-NP-Za-km-z]{25,40}$`).MatchString(address) {
			return errors.New("TRON 提现地址格式无效")
		}
		return nil
	}
	if strings.Contains(upper, "ERC") || strings.Contains(upper, "ETH") {
		if !regexp.MustCompile(`^0x[a-fA-F0-9]{40}$`).MatchString(address) {
			return errors.New("Ethereum 提现地址格式无效")
		}
		return nil
	}
	return errors.New("提现网络暂仅支持 TRON/TRC-20 或 Ethereum/ERC-20")
}

func withdrawalTxID(network string) string {
	if strings.Contains(strings.ToUpper(network), "TRC") || strings.Contains(strings.ToUpper(network), "TRON") {
		return "TWe" + support.RandomDigits(29)
	}
	return "0x" + support.RandomDigits(32)
}

func gasFee(network string) float64 {
	if strings.Contains(strings.ToUpper(network), "TRC") {
		return 1.5
	}
	return 15
}
