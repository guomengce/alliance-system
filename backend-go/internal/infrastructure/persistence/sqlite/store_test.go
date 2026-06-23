package sqlite

import (
	"database/sql"
	"path/filepath"
	"testing"

	_ "modernc.org/sqlite"

	"alliance-system/backend-go/internal/business/domain"
)

func TestReplacePersistsRelationalTables(t *testing.T) {
	dbPath := filepath.Join(t.TempDir(), "alliance.sqlite")
	store := New(dbPath)
	if err := store.Load(); err != nil {
		t.Fatal(err)
	}

	adminRole := domain.RoleSuperAdmin
	height := 12345
	data := domain.Database{
		Users: []domain.User{{
			Email: "admin@example.com", Password: "secret", Nickname: "Admin",
			PortalMode: "admin", Role: &adminRole, USDTBalance: 100,
			TROOBalance: 200, TwoFAEnabled: true,
		}},
		Transactions: []domain.Transaction{{
			ID: "TXN-1", UserEmail: "admin@example.com", Type: "recharge",
			TypeLabel: "充值", Desc: "测试充值", Amount: 10, Currency: "USDT",
			Time: "2026-06-16 12:00:00", Status: "success", StatusLabel: "成功",
			BlockchainProof: &domain.BlockchainProof{TxID: "0xabc", BlockHeight: &height, Network: "ETH"},
		}},
		Notifications: []domain.Notification{{
			ID: "NOT-1", UserEmail: "admin@example.com", Category: "system",
			CategoryLabel: "系统", Title: "测试通知", Desc: "通知内容",
			Time: "刚刚", IsUnread: true,
		}},
		Downlines: []domain.Downline{{
			UID: "100001", UserEmail: "admin@example.com", Level: "L1", Tier: "标准账户",
			RegistrationDate: "2026-06-16 12:00", AvatarLetter: "AD",
			Nickname: "Downline", Email: "downline@example.com",
		}},
		PendingWithdrawals: []domain.Transaction{{
			ID: "TXN-2", UserEmail: "admin@example.com", Type: "withdraw",
			TypeLabel: "提现", Desc: "测试提现", Amount: -5, Currency: "USDT",
			Time: "2026-06-16 12:01:00", Status: "pending", StatusLabel: "待审核",
		}},
		ResetTokens: []domain.ResetToken{{
			Email: "admin@example.com", TokenHash: "hash-1",
			ExpiresAt: "2026-06-16T12:15:00Z", CreatedAt: "2026-06-16T12:00:00Z",
		}},
		AuditLogs: []domain.AuditLog{{
			ID: "AUD-1", ActorEmail: "admin@example.com", ActorRole: &adminRole,
			Action: "test.action", TargetEmail: "client@example.com",
			Metadata: map[string]any{"amount": float64(10)}, CreatedAt: "2026-06-16 12:00:00",
		}},
		Parameters: &domain.Parameters{
			CommissionLevels: map[string]float64{"L1": 10},
			WithdrawalFee:    1.5, L1UnlockRatio: 20, APIPriceURL: "https://price.example/api",
		},
		Plans: []domain.Plan{{
			ID: "starter", Name: "Starter", Price: 100,
			GiftRatio: 1, BuyRatio: 60, QueueRatio: 40,
			CommissionLimit: 1000, Status: "active", Description: "Plan", IsPopular: true,
		}},
	}

	if err := store.Replace(data); err != nil {
		t.Fatal(err)
	}

	db, err := sql.Open("sqlite", dbPath)
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	for _, table := range []string{
		"users",
		"transactions",
		"notifications",
		"downlines",
		"pending_withdrawals",
		"reset_tokens",
		"audit_logs",
		"system_parameters",
		"plans",
	} {
		var count int
		if err := db.QueryRow("SELECT COUNT(*) FROM " + table).Scan(&count); err != nil {
			t.Fatalf("count %s: %v", table, err)
		}
		if count != 1 {
			t.Fatalf("expected %s to have 1 row, got %d", table, count)
		}
	}

	var appStateCount int
	err = db.QueryRow("SELECT COUNT(*) FROM sqlite_master WHERE type = 'table' AND name = 'app_state'").Scan(&appStateCount)
	if err != nil {
		t.Fatal(err)
	}
	if appStateCount != 0 {
		t.Fatalf("expected app_state table to be absent, got %d", appStateCount)
	}
}

func TestLoadRestoresRelationalData(t *testing.T) {
	dbPath := filepath.Join(t.TempDir(), "alliance.sqlite")
	first := New(dbPath)
	if err := first.Load(); err != nil {
		t.Fatal(err)
	}

	params := &domain.Parameters{
		CommissionLevels: map[string]float64{"L1": 8, "L2": 3},
		WithdrawalFee:    2, L1UnlockRatio: 15, APIPriceURL: "https://price.example/api",
	}
	if err := first.Replace(domain.Database{
		Users:         []domain.User{{Email: "client@example.com", Password: "secret", Nickname: "Client", PortalMode: "client"}},
		Transactions:  []domain.Transaction{{ID: "TXN-1", UserEmail: "client@example.com", Type: "commission", TypeLabel: "佣金", Desc: "收益", Amount: 7, Currency: "USDT", Time: "刚刚", Status: "success", StatusLabel: "成功"}},
		Notifications: []domain.Notification{{ID: "NOT-1", UserEmail: "client@example.com", Category: "system", CategoryLabel: "系统", Title: "标题", Desc: "内容", Time: "刚刚", IsUnread: true}},
		Parameters:    params,
		Plans:         []domain.Plan{{ID: "starter", Name: "Starter", Status: "active", Description: "Plan"}},
	}); err != nil {
		t.Fatal(err)
	}

	second := New(dbPath)
	if err := second.Load(); err != nil {
		t.Fatal(err)
	}

	if err := second.View(func(db domain.Database) error {
		if len(db.Users) != 1 || db.Users[0].Email != "client@example.com" {
			t.Fatalf("unexpected users: %#v", db.Users)
		}
		if len(db.Transactions) != 1 || db.Transactions[0].ID != "TXN-1" {
			t.Fatalf("unexpected transactions: %#v", db.Transactions)
		}
		if len(db.Notifications) != 1 || !db.Notifications[0].IsUnread {
			t.Fatalf("unexpected notifications: %#v", db.Notifications)
		}
		if db.Parameters == nil || db.Parameters.CommissionLevels["L1"] != 8 {
			t.Fatalf("unexpected parameters: %#v", db.Parameters)
		}
		if len(db.Plans) != 1 || db.Plans[0].ID != "starter" {
			t.Fatalf("unexpected plans: %#v", db.Plans)
		}
		return nil
	}); err != nil {
		t.Fatal(err)
	}
}

func TestLoadAllowsLegacyPendingWithdrawalsWithoutUserEmail(t *testing.T) {
	dbPath := filepath.Join(t.TempDir(), "alliance.sqlite")
	db, err := sql.Open("sqlite", dbPath)
	if err != nil {
		t.Fatal(err)
	}
	_, err = db.Exec(`
		CREATE TABLE pending_withdrawals (
			id TEXT PRIMARY KEY,
			user_email TEXT,
			type TEXT NOT NULL,
			type_label TEXT NOT NULL,
			description TEXT NOT NULL,
			amount REAL NOT NULL,
			currency TEXT NOT NULL,
			time TEXT NOT NULL,
			status TEXT NOT NULL,
			status_label TEXT NOT NULL,
			blockchain_proof_json TEXT
		);
		INSERT INTO pending_withdrawals (
			id, user_email, type, type_label, description, amount, currency, time, status, status_label
		) VALUES (
			'TXN-legacy', NULL, 'withdraw', '提现申请', 'legacy withdrawal', -12, 'USDT', '刚刚', 'pending', '待审核'
		);
	`)
	if err != nil {
		t.Fatal(err)
	}
	if err := db.Close(); err != nil {
		t.Fatal(err)
	}

	store := New(dbPath)
	if err := store.Load(); err != nil {
		t.Fatal(err)
	}

	if err := store.View(func(data domain.Database) error {
		if len(data.PendingWithdrawals) != 1 {
			t.Fatalf("expected 1 pending withdrawal, got %d", len(data.PendingWithdrawals))
		}
		if data.PendingWithdrawals[0].UserEmail != "" {
			t.Fatalf("expected empty legacy user email, got %q", data.PendingWithdrawals[0].UserEmail)
		}
		return nil
	}); err != nil {
		t.Fatal(err)
	}
}
