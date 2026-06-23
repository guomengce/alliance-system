package admin

import (
	"errors"
	"testing"

	"alliance-system/backend-go/internal/business/domain"
	"alliance-system/backend-go/internal/infrastructure/security"
)

func TestRejectWithdrawalRefundsUserAndUpdatesTransaction(t *testing.T) {
	store := newMemoryStore(domain.Database{
		Users: []domain.User{{Email: "client@example.com", USDTBalance: 25}},
		Transactions: []domain.Transaction{{
			ID: "TXN-1", UserEmail: "client@example.com", Amount: -40, Status: "pending",
			BlockchainProof: &domain.BlockchainProof{ConsensusStatus: "Pending Admin Verification"},
		}},
		PendingWithdrawals: []domain.Transaction{{
			ID: "TXN-1", UserEmail: "client@example.com", Amount: -40, Status: "pending",
		}},
	})
	service := NewService(store)

	result, err := service.RejectWithdrawal("TXN-1")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if len(result.PendingWithdrawals) != 0 {
		t.Fatalf("expected pending withdrawal to be removed, got %d", len(result.PendingWithdrawals))
	}
	if store.db.Users[0].USDTBalance != 65 {
		t.Fatalf("expected rejected amount to be refunded, got %.2f", store.db.Users[0].USDTBalance)
	}
	if store.db.Transactions[0].Status != "failed" {
		t.Fatalf("expected transaction status failed, got %q", store.db.Transactions[0].Status)
	}
	if store.db.Transactions[0].BlockchainProof.ConsensusStatus != "Rejected - Refunded on System" {
		t.Fatalf("unexpected proof status: %q", store.db.Transactions[0].BlockchainProof.ConsensusStatus)
	}
	if len(store.db.Notifications) != 1 {
		t.Fatalf("expected notification to be created, got %d", len(store.db.Notifications))
	}
}

func TestApproveWithdrawalRemovesPendingWithoutRefund(t *testing.T) {
	store := newMemoryStore(domain.Database{
		Users: []domain.User{{Email: "client@example.com", USDTBalance: 25}},
		Transactions: []domain.Transaction{{
			ID: "TXN-1", UserEmail: "client@example.com", Amount: -40, Status: "pending",
			BlockchainProof: &domain.BlockchainProof{ConsensusStatus: "Pending Admin Verification"},
		}},
		PendingWithdrawals: []domain.Transaction{{
			ID: "TXN-1", UserEmail: "client@example.com", Amount: -40, Status: "pending",
		}},
	})
	service := NewService(store)

	result, err := service.ApproveWithdrawal("TXN-1")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if len(result.PendingWithdrawals) != 0 {
		t.Fatalf("expected pending withdrawal to be removed, got %d", len(result.PendingWithdrawals))
	}
	if store.db.Users[0].USDTBalance != 25 {
		t.Fatalf("expected approval not to refund balance, got %.2f", store.db.Users[0].USDTBalance)
	}
	if store.db.Transactions[0].Status != "success" {
		t.Fatalf("expected transaction status success, got %q", store.db.Transactions[0].Status)
	}
}

func TestUpdateParametersRejectsInvalidCommissionLevel(t *testing.T) {
	service := NewService(newMemoryStore(domain.Database{}))

	err := service.UpdateParameters(domain.Parameters{
		CommissionLevels: map[string]float64{"L1": 150},
		WithdrawalFee:    1,
		L1UnlockRatio:    10,
		APIPriceURL:      "https://prices.example/api",
	})

	if !errors.Is(err, ErrInvalidParameters) {
		t.Fatalf("expected invalid parameters error, got %v", err)
	}
}

func TestBroadcastTargetsAllUsers(t *testing.T) {
	store := newMemoryStore(domain.Database{
		Users: []domain.User{{Email: "a@example.com"}, {Email: "b@example.com"}},
	})
	service := NewService(store)

	err := service.Broadcast(BroadcastCommand{Title: "公告", Desc: "系统维护", Target: "all"})
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if len(store.db.Notifications) != 2 {
		t.Fatalf("expected notifications for every user, got %d", len(store.db.Notifications))
	}
}

func TestUpdateDownlinesHashesUpdatedPassword(t *testing.T) {
	store := newMemoryStore(domain.Database{
		Users: []domain.User{{Email: "client@example.com", Password: "old-hash"}},
	})
	service := NewService(store)

	_, err := service.UpdateDownlines([]domain.Downline{{
		Email:    "client@example.com",
		Password: "new-secret",
	}})
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	got := store.db.Users[0].Password
	if got == "new-secret" {
		t.Fatal("expected password to be hashed, got plaintext")
	}
	if !security.VerifyPassword("new-secret", got) {
		t.Fatal("expected hashed password to verify")
	}
	if store.db.Downlines[0].Password != "" {
		t.Fatal("expected downline password to be omitted after update")
	}
}

func TestUpdateDownlinesRejectsDuplicateUID(t *testing.T) {
	service := NewService(newMemoryStore(domain.Database{}))

	_, err := service.UpdateDownlines([]domain.Downline{
		{UID: "889425", Email: "a@example.com"},
		{UID: "889425", Email: "b@example.com"},
	})

	if !errors.Is(err, ErrDuplicateUID) {
		t.Fatalf("expected duplicate uid error, got %v", err)
	}
}

func TestRunManualSettlementCreditsActorAndWritesAuditLog(t *testing.T) {
	role := domain.RoleSuperAdmin
	store := newMemoryStore(domain.Database{
		Users: []domain.User{{Email: "admin@example.com", USDTBalance: 100, Role: &role, PortalMode: "admin"}},
	})
	service := NewService(store)

	result, err := service.RunManualSettlement(ManualSettlementCommand{
		ActorEmail: "admin@example.com",
		ActorRole:  &role,
		Amount:     1500,
	})
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if result.User.USDTBalance != 1600 {
		t.Fatalf("expected settled balance 1600, got %.2f", result.User.USDTBalance)
	}
	if len(store.db.AuditLogs) != 1 {
		t.Fatalf("expected audit log, got %d", len(store.db.AuditLogs))
	}
	if store.db.AuditLogs[0].Action != "settlement.runManual" {
		t.Fatalf("unexpected audit action: %q", store.db.AuditLogs[0].Action)
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
