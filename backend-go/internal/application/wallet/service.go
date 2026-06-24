package wallet

import (
	"errors"

	"alliance-system/backend-go/internal/application/ports"
	"alliance-system/backend-go/internal/application/presenters"
	"alliance-system/backend-go/internal/business/domain"
)

var (
	ErrUserNotFound                 = errors.New("user not found")
	ErrMissingEmail                 = errors.New("missing email")
	ErrInvalidAmount                = errors.New("invalid amount")
	ErrNoPendingCommission          = errors.New("no pending commission")
	ErrInsufficientBalance          = errors.New("insufficient balance")
	ErrNegativeBalance              = errors.New("negative balance")
	ErrInvalidWithdrawalDestination = errors.New("invalid withdrawal destination")
	ErrTransferTargetNotFound       = errors.New("transfer target not found")
	ErrInvalidTransferTarget        = errors.New("invalid transfer target")
)

type Service struct {
	store ports.Store
}

func NewService(dataStore ports.Store) *Service {
	return &Service{store: dataStore}
}

type UserState struct {
	User               domain.User           `json:"user"`
	Transactions       []domain.Transaction  `json:"transactions"`
	Notifications      []domain.Notification `json:"notifications"`
	Downlines          []domain.Downline     `json:"downlines"`
	PendingWithdrawals []domain.Transaction  `json:"pendingWithdrawals"`
}

func (s *Service) GetUserState(email string) (UserState, error) {
	user, ok := s.store.FindUser(email)
	if !ok {
		return UserState{}, ErrUserNotFound
	}

	state := UserState{
		User:               presenters.SanitizeUser(user),
		Transactions:       []domain.Transaction{},
		Notifications:      []domain.Notification{},
		Downlines:          []domain.Downline{},
		PendingWithdrawals: []domain.Transaction{},
	}
	_ = s.store.View(func(db domain.Database) error {
		for _, item := range db.Transactions {
			if domain.SameEmail(item.UserEmail, user.Email) {
				state.Transactions = append(state.Transactions, item)
			}
		}
		for _, item := range db.Notifications {
			if domain.SameEmail(item.UserEmail, user.Email) {
				state.Notifications = append(state.Notifications, item)
			}
		}
		if user.PortalMode == "admin" {
			state.Downlines = append(state.Downlines, db.Downlines...)
		} else {
			for _, item := range db.Downlines {
				if domain.SameEmail(item.UserEmail, user.Email) {
					state.Downlines = append(state.Downlines, item)
				}
			}
		}
		state.Downlines = presenters.SanitizeDownlines(state.Downlines)
		state.PendingWithdrawals = append(state.PendingWithdrawals, db.PendingWithdrawals...)
		return nil
	})

	return state, nil
}

type UserResult struct {
	User domain.User
}
