package wallet

import (
	"errors"
	"testing"

	"alliance-system/backend-go/internal/business/domain"
)

func TestCalculateDirectSimulationCapsEarningsAndUnlocksQueue(t *testing.T) {
	result := CalculateDirectSimulation(1000, 20, 80, 150)

	if result.UserAEarned != 150 {
		t.Fatalf("expected earned commission to be capped at remaining pool, got %.2f", result.UserAEarned)
	}
	if result.ActualUnlocked != 80 {
		t.Fatalf("expected unlocked amount to be capped at locked queue, got %.2f", result.ActualUnlocked)
	}
	if result.TROOFromUnlock != 160 {
		t.Fatalf("expected TROO from unlock to be double unlocked amount, got %.2f", result.TROOFromUnlock)
	}
}

func TestGetUserStateReturnsEmptyCollections(t *testing.T) {
	store := newMemoryStore(domain.Database{
		Users: []domain.User{{Email: "admin@example.com", PortalMode: "admin"}},
	})
	service := NewService(store)

	state, err := service.GetUserState("admin@example.com")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if state.Transactions == nil {
		t.Fatal("expected transactions to be an empty collection, got nil")
	}
	if state.Notifications == nil {
		t.Fatal("expected notifications to be an empty collection, got nil")
	}
	if state.Downlines == nil {
		t.Fatal("expected downlines to be an empty collection, got nil")
	}
	if state.PendingWithdrawals == nil {
		t.Fatal("expected pending withdrawals to be an empty collection, got nil")
	}
}

func TestSubmitWithdrawalRejectsUnsupportedNetwork(t *testing.T) {
	service := NewService(newMemoryStore(domain.Database{}))

	_, err := service.SubmitWithdrawal(SubmitWithdrawalCommand{
		Email:     "client@example.com",
		Amount:    10,
		Network:   "BTC",
		ToAddress: "bitcoin-address",
	})

	if !errors.Is(err, ErrInvalidWithdrawalDestination) {
		t.Fatalf("expected invalid destination error, got %v", err)
	}
}

func TestSubmitWithdrawalDebitsUserAndCreatesPendingTransaction(t *testing.T) {
	store := newMemoryStore(domain.Database{
		Users: []domain.User{{Email: "client@example.com", USDTBalance: 100}},
	})
	service := NewService(store)

	result, err := service.SubmitWithdrawal(SubmitWithdrawalCommand{
		Email:     "client@example.com",
		Amount:    40,
		Network:   "TRC-20",
		ToAddress: "TJDyZ8f1jUka8Jska271Kshq19Kshq9Kws",
	})
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if result.User.USDTBalance != 60 {
		t.Fatalf("expected balance to be debited to 60, got %.2f", result.User.USDTBalance)
	}
	if len(store.db.Transactions) != 1 {
		t.Fatalf("expected transaction to be created, got %d", len(store.db.Transactions))
	}
	if len(store.db.PendingWithdrawals) != 1 {
		t.Fatalf("expected pending withdrawal to be created, got %d", len(store.db.PendingWithdrawals))
	}
	if store.db.PendingWithdrawals[0].Status != "pending" {
		t.Fatalf("expected pending status, got %q", store.db.PendingWithdrawals[0].Status)
	}
}

func TestWithdrawCommissionsMovesPendingBalanceToAvailableBalance(t *testing.T) {
	store := newMemoryStore(domain.Database{
		Users: []domain.User{{Email: "client@example.com", USDTBalance: 10, PendingBalance: 25}},
	})
	service := NewService(store)

	result, err := service.WithdrawCommissions("client@example.com")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if result.User.PendingBalance != 0 {
		t.Fatalf("expected pending balance to be cleared, got %.2f", result.User.PendingBalance)
	}
	if result.User.USDTBalance != 35 {
		t.Fatalf("expected available balance to include withdrawn commissions, got %.2f", result.User.USDTBalance)
	}
	if result.User.ArrivedCommissions != 25 {
		t.Fatalf("expected arrived commissions to increase, got %.2f", result.User.ArrivedCommissions)
	}
}

func TestSubscribePlanUpdatesBalancesAndCreatesTransaction(t *testing.T) {
	store := newMemoryStore(domain.Database{
		Users: []domain.User{{Email: "client@example.com", USDTBalance: 1000, CommissionPoolLimit: 100, CommissionPoolRemaining: 80}},
	})
	service := NewService(store)

	result, err := service.SubscribePlan(SubscribePlanCommand{
		Email:      "client@example.com",
		Amount:     200,
		PlanName:   "Starter",
		PlanPrice:  100,
		PoolLimit:  500,
		TROORatio:  7,
		QueueRatio: 0.31,
	})
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if result.User.USDTBalance != 800 {
		t.Fatalf("expected USDT balance 800, got %.2f", result.User.USDTBalance)
	}
	if result.User.TROOBalance != 1400 {
		t.Fatalf("expected TROO balance 1400, got %.2f", result.User.TROOBalance)
	}
	if result.User.LockedQueueAmount != 62 || result.User.OriginalLockedQueue != 62 {
		t.Fatalf("expected locked queue 62, got %.2f / %.2f", result.User.LockedQueueAmount, result.User.OriginalLockedQueue)
	}
	if result.User.CommissionPoolLimit != 1100 || result.User.CommissionPoolRemaining != 1080 {
		t.Fatalf("expected commission pool to increase, got %.2f / %.2f", result.User.CommissionPoolLimit, result.User.CommissionPoolRemaining)
	}
	if len(store.db.Transactions) != 1 || store.db.Transactions[0].Type != "subscribe" {
		t.Fatalf("expected subscribe transaction, got %+v", store.db.Transactions)
	}
}

func TestSubscribePlanRejectsInsufficientBalance(t *testing.T) {
	service := NewService(newMemoryStore(domain.Database{
		Users: []domain.User{{Email: "client@example.com", USDTBalance: 50}},
	}))

	_, err := service.SubscribePlan(SubscribePlanCommand{
		Email:     "client@example.com",
		Amount:    200,
		PlanName:  "Starter",
		PlanPrice: 100,
		PoolLimit: 500,
	})

	if !errors.Is(err, ErrInsufficientBalance) {
		t.Fatalf("expected insufficient balance, got %v", err)
	}
}

func TestTransferMovesBalanceToTargetUserByUID(t *testing.T) {
	store := newMemoryStore(domain.Database{
		Users: []domain.User{
			{Email: "client@example.com", USDTBalance: 100},
			{Email: "target@example.com", USDTBalance: 10},
		},
		Downlines: []domain.Downline{{UID: "889425", Email: "target@example.com"}},
	})
	service := NewService(store)

	result, err := service.Transfer(TransferCommand{
		Email:     "client@example.com",
		Amount:    25,
		TargetUID: "889425",
	})
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if result.User.USDTBalance != 75 {
		t.Fatalf("expected USDT balance 75, got %.2f", result.User.USDTBalance)
	}
	if store.db.Users[1].USDTBalance != 35 {
		t.Fatalf("expected recipient balance 35, got %.2f", store.db.Users[1].USDTBalance)
	}
	if len(store.db.Transactions) != 2 {
		t.Fatalf("expected sender and recipient transactions, got %d", len(store.db.Transactions))
	}
	if store.db.Transactions[0].UserEmail != "target@example.com" || store.db.Transactions[0].Amount != 25 {
		t.Fatalf("expected recipient credit transaction first, got %+v", store.db.Transactions[0])
	}
	if store.db.Transactions[1].UserEmail != "client@example.com" || store.db.Transactions[1].Amount != -25 {
		t.Fatalf("expected sender debit transaction second, got %+v", store.db.Transactions[1])
	}
}

func TestTransferRejectsUnknownTargetUID(t *testing.T) {
	service := NewService(newMemoryStore(domain.Database{
		Users:     []domain.User{{Email: "client@example.com", USDTBalance: 100}},
		Downlines: []domain.Downline{{UID: "111111", Email: "target@example.com"}},
	}))

	_, err := service.Transfer(TransferCommand{
		Email:     "client@example.com",
		Amount:    25,
		TargetUID: "889425",
	})

	if !errors.Is(err, ErrTransferTargetNotFound) {
		t.Fatalf("expected transfer target error, got %v", err)
	}
}

type memoryStore struct {
	db domain.Database
}

func newMemoryStore(db domain.Database) *memoryStore {
	return &memoryStore{db: db}
}

func (s *memoryStore) Load() error {
	return nil
}

func (s *memoryStore) View(fn func(domain.Database) error) error {
	return fn(s.db)
}

func (s *memoryStore) Update(fn func(*domain.Database) error) error {
	return fn(&s.db)
}

func (s *memoryStore) FindUser(email string) (domain.User, bool) {
	for _, user := range s.db.Users {
		if domain.SameEmail(user.Email, email) {
			return user, true
		}
	}
	return domain.User{}, false
}
