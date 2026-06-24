package sqlite

import (
	"database/sql"
	"encoding/json"
	"os"
	"path/filepath"
	"sync"

	_ "modernc.org/sqlite"

	"alliance-system/backend-go/internal/business/domain"
)

type Store struct {
	path string
	mu   sync.Mutex
	db   *sql.DB
	data domain.Database
}

func New(path string) *Store {
	return &Store{path: path}
}

func (s *Store) Load() error {
	s.mu.Lock()
	defer s.mu.Unlock()

	if s.path != ":memory:" {
		if err := os.MkdirAll(filepath.Dir(s.path), 0755); err != nil {
			return err
		}
	}

	db, err := sql.Open("sqlite", s.path)
	if err != nil {
		return err
	}
	s.db = db

	if err := s.migrate(); err != nil {
		return err
	}
	data, err := s.readAllLocked()
	if err != nil {
		return err
	}
	s.data = data
	return nil
}

func (s *Store) Replace(data domain.Database) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	if err := s.writeAllLocked(data); err != nil {
		return err
	}
	s.data = data
	return nil
}

func (s *Store) View(fn func(domain.Database) error) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	return fn(s.data)
}

func (s *Store) Update(fn func(*domain.Database) error) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	next, err := cloneDatabase(s.data)
	if err != nil {
		return err
	}
	if err := fn(&next); err != nil {
		return err
	}
	if err := s.writeAllLocked(next); err != nil {
		return err
	}
	s.data = next
	return nil
}

func (s *Store) FindUser(email string) (domain.User, bool) {
	var found domain.User
	ok := false
	_ = s.View(func(db domain.Database) error {
		for _, user := range db.Users {
			if domain.SameEmail(user.Email, email) {
				found = user
				ok = true
				break
			}
		}
		return nil
	})
	return found, ok
}

func (s *Store) migrate() error {
	_, err := s.db.Exec(`
		PRAGMA foreign_keys = ON;

		CREATE TABLE IF NOT EXISTS users (
			email TEXT PRIMARY KEY,
			password TEXT NOT NULL DEFAULT '',
			nickname TEXT NOT NULL DEFAULT '',
			portal_mode TEXT NOT NULL DEFAULT 'client',
			role TEXT,
			usdt_balance REAL NOT NULL DEFAULT 0,
			troo_balance REAL NOT NULL DEFAULT 0,
			locked_queue_amount REAL NOT NULL DEFAULT 0,
			original_locked_queue REAL NOT NULL DEFAULT 0,
			released_queue_amount REAL NOT NULL DEFAULT 0,
			commission_pool_limit REAL NOT NULL DEFAULT 0,
			commission_pool_remaining REAL NOT NULL DEFAULT 0,
			pending_balance REAL NOT NULL DEFAULT 0,
			cumulative_commissions REAL NOT NULL DEFAULT 0,
			arrived_commissions REAL NOT NULL DEFAULT 0,
			failed_commissions REAL NOT NULL DEFAULT 0,
			yesterday_revenue REAL NOT NULL DEFAULT 0,
			total_credit REAL NOT NULL DEFAULT 0,
			remaining_credit REAL NOT NULL DEFAULT 0,
			two_fa_enabled INTEGER NOT NULL DEFAULT 0
		);

		CREATE TABLE IF NOT EXISTS transactions (
			id TEXT PRIMARY KEY,
			user_email TEXT NOT NULL,
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

		CREATE TABLE IF NOT EXISTS pending_withdrawals (
			id TEXT PRIMARY KEY,
			user_email TEXT NOT NULL,
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

		CREATE TABLE IF NOT EXISTS notifications (
			row_id INTEGER PRIMARY KEY AUTOINCREMENT,
			id TEXT NOT NULL,
			user_email TEXT NOT NULL,
			category TEXT NOT NULL,
			category_label TEXT NOT NULL,
			title TEXT NOT NULL,
			description TEXT NOT NULL,
			time TEXT NOT NULL,
			is_unread INTEGER NOT NULL DEFAULT 0
		);

		CREATE TABLE IF NOT EXISTS downlines (
			row_id INTEGER PRIMARY KEY AUTOINCREMENT,
			uid TEXT NOT NULL,
			user_email TEXT NOT NULL,
			level TEXT NOT NULL,
			tier TEXT NOT NULL,
			registration_date TEXT NOT NULL,
			node_size REAL NOT NULL DEFAULT 0,
			volume REAL NOT NULL DEFAULT 0,
			avatar_letter TEXT NOT NULL DEFAULT '',
			invested REAL NOT NULL DEFAULT 0,
			nickname TEXT,
			email TEXT,
			phone TEXT,
			sponsor TEXT,
			password TEXT,
			status TEXT,
			usdt_balance REAL NOT NULL DEFAULT 0,
			troo_balance REAL NOT NULL DEFAULT 0,
			pending_balance REAL NOT NULL DEFAULT 0,
			frozen_balance REAL NOT NULL DEFAULT 0,
			kyc_l1 TEXT,
			kyc_l2 TEXT
		);

		CREATE TABLE IF NOT EXISTS reset_tokens (
			token_hash TEXT PRIMARY KEY,
			email TEXT NOT NULL,
			expires_at TEXT NOT NULL,
			consumed_at TEXT,
			created_at TEXT NOT NULL
		);

		CREATE TABLE IF NOT EXISTS audit_logs (
			id TEXT PRIMARY KEY,
			actor_email TEXT NOT NULL,
			actor_role TEXT,
			action TEXT NOT NULL,
			target_email TEXT,
			metadata_json TEXT,
			created_at TEXT NOT NULL
		);

		CREATE TABLE IF NOT EXISTS system_parameters (
			id INTEGER PRIMARY KEY CHECK (id = 1),
			commission_levels_json TEXT NOT NULL,
			withdrawal_fee REAL NOT NULL,
			l1_unlock_ratio REAL NOT NULL,
			api_price_url TEXT NOT NULL
		);

		CREATE TABLE IF NOT EXISTS plans (
			id TEXT PRIMARY KEY,
			name TEXT NOT NULL,
			price REAL NOT NULL,
			gift_ratio REAL NOT NULL,
			buy_ratio REAL NOT NULL,
			queue_ratio REAL NOT NULL,
			commission_limit REAL NOT NULL,
			status TEXT NOT NULL,
			description TEXT NOT NULL,
			is_popular INTEGER NOT NULL DEFAULT 0
		);

		DROP TABLE IF EXISTS app_state;
	`)
	return err
}

func (s *Store) readAllLocked() (domain.Database, error) {
	var data domain.Database
	var err error

	if data.Users, err = s.readUsers(); err != nil {
		return data, err
	}
	if data.Transactions, err = s.readTransactions("transactions"); err != nil {
		return data, err
	}
	if data.Notifications, err = s.readNotifications(); err != nil {
		return data, err
	}
	if data.Downlines, err = s.readDownlines(); err != nil {
		return data, err
	}
	if data.PendingWithdrawals, err = s.readTransactions("pending_withdrawals"); err != nil {
		return data, err
	}
	if data.ResetTokens, err = s.readResetTokens(); err != nil {
		return data, err
	}
	if data.AuditLogs, err = s.readAuditLogs(); err != nil {
		return data, err
	}
	if data.Parameters, err = s.readParameters(); err != nil {
		return data, err
	}
	if data.Plans, err = s.readPlans(); err != nil {
		return data, err
	}

	return data, nil
}

func (s *Store) writeAllLocked(data domain.Database) error {
	tx, err := s.db.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback()

	for _, table := range []string{
		"users",
		"transactions",
		"pending_withdrawals",
		"notifications",
		"downlines",
		"reset_tokens",
		"audit_logs",
		"system_parameters",
		"plans",
	} {
		if _, err := tx.Exec("DELETE FROM " + table); err != nil {
			return err
		}
	}

	if err := writeUsers(tx, data.Users); err != nil {
		return err
	}
	if err := writeTransactions(tx, "transactions", data.Transactions); err != nil {
		return err
	}
	if err := writeTransactions(tx, "pending_withdrawals", data.PendingWithdrawals); err != nil {
		return err
	}
	if err := writeNotifications(tx, data.Notifications); err != nil {
		return err
	}
	if err := writeDownlines(tx, data.Downlines); err != nil {
		return err
	}
	if err := writeResetTokens(tx, data.ResetTokens); err != nil {
		return err
	}
	if err := writeAuditLogs(tx, data.AuditLogs); err != nil {
		return err
	}
	if data.Parameters != nil {
		if err := writeParameters(tx, *data.Parameters); err != nil {
			return err
		}
	}
	if err := writePlans(tx, data.Plans); err != nil {
		return err
	}

	return tx.Commit()
}

func (s *Store) readUsers() ([]domain.User, error) {
	rows, err := s.db.Query(`
		SELECT email, password, nickname, portal_mode, role, usdt_balance, troo_balance,
			locked_queue_amount, original_locked_queue, released_queue_amount,
			commission_pool_limit, commission_pool_remaining, pending_balance,
			cumulative_commissions, arrived_commissions, failed_commissions,
			yesterday_revenue, total_credit, remaining_credit, two_fa_enabled
		FROM users
		ORDER BY rowid ASC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []domain.User
	for rows.Next() {
		var user domain.User
		var role sql.NullString
		var twoFA int
		if err := rows.Scan(
			&user.Email,
			&user.Password,
			&user.Nickname,
			&user.PortalMode,
			&role,
			&user.USDTBalance,
			&user.TROOBalance,
			&user.LockedQueueAmount,
			&user.OriginalLockedQueue,
			&user.ReleasedQueueAmount,
			&user.CommissionPoolLimit,
			&user.CommissionPoolRemaining,
			&user.PendingBalance,
			&user.CumulativeCommissions,
			&user.ArrivedCommissions,
			&user.FailedCommissions,
			&user.YesterdayRevenue,
			&user.TotalCredit,
			&user.RemainingCredit,
			&twoFA,
		); err != nil {
			return nil, err
		}
		if role.Valid {
			value := domain.Role(role.String)
			user.Role = &value
		}
		user.TwoFAEnabled = twoFA == 1
		users = append(users, user)
	}
	return users, rows.Err()
}

func writeUsers(tx *sql.Tx, users []domain.User) error {
	stmt, err := tx.Prepare(`
		INSERT INTO users (
			email, password, nickname, portal_mode, role, usdt_balance, troo_balance,
			locked_queue_amount, original_locked_queue, released_queue_amount,
			commission_pool_limit, commission_pool_remaining, pending_balance,
			cumulative_commissions, arrived_commissions, failed_commissions,
			yesterday_revenue, total_credit, remaining_credit, two_fa_enabled
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`)
	if err != nil {
		return err
	}
	defer stmt.Close()

	for _, user := range users {
		var role any
		if user.Role != nil {
			role = string(*user.Role)
		}
		if _, err := stmt.Exec(
			user.Email,
			user.Password,
			user.Nickname,
			user.PortalMode,
			role,
			user.USDTBalance,
			user.TROOBalance,
			user.LockedQueueAmount,
			user.OriginalLockedQueue,
			user.ReleasedQueueAmount,
			user.CommissionPoolLimit,
			user.CommissionPoolRemaining,
			user.PendingBalance,
			user.CumulativeCommissions,
			user.ArrivedCommissions,
			user.FailedCommissions,
			user.YesterdayRevenue,
			user.TotalCredit,
			user.RemainingCredit,
			boolInt(user.TwoFAEnabled),
		); err != nil {
			return err
		}
	}
	return nil
}

func (s *Store) readTransactions(table string) ([]domain.Transaction, error) {
	rows, err := s.db.Query(`
		SELECT id, user_email, type, type_label, description, amount, currency, time,
			status, status_label, blockchain_proof_json
		FROM ` + table + `
		ORDER BY rowid ASC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var transactions []domain.Transaction
	for rows.Next() {
		var transaction domain.Transaction
		var userEmail sql.NullString
		var proof sql.NullString
		if err := rows.Scan(
			&transaction.ID,
			&userEmail,
			&transaction.Type,
			&transaction.TypeLabel,
			&transaction.Desc,
			&transaction.Amount,
			&transaction.Currency,
			&transaction.Time,
			&transaction.Status,
			&transaction.StatusLabel,
			&proof,
		); err != nil {
			return nil, err
		}
		transaction.UserEmail = nullString(userEmail)
		if proof.Valid && proof.String != "" {
			var parsed domain.BlockchainProof
			if err := json.Unmarshal([]byte(proof.String), &parsed); err != nil {
				return nil, err
			}
			transaction.BlockchainProof = &parsed
		}
		transactions = append(transactions, transaction)
	}
	return transactions, rows.Err()
}

func writeTransactions(tx *sql.Tx, table string, transactions []domain.Transaction) error {
	stmt, err := tx.Prepare(`
		INSERT INTO ` + table + ` (
			id, user_email, type, type_label, description, amount, currency, time,
			status, status_label, blockchain_proof_json
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`)
	if err != nil {
		return err
	}
	defer stmt.Close()

	for _, transaction := range transactions {
		proof, err := jsonString(transaction.BlockchainProof)
		if err != nil {
			return err
		}
		if _, err := stmt.Exec(
			transaction.ID,
			transaction.UserEmail,
			transaction.Type,
			transaction.TypeLabel,
			transaction.Desc,
			transaction.Amount,
			transaction.Currency,
			transaction.Time,
			transaction.Status,
			transaction.StatusLabel,
			proof,
		); err != nil {
			return err
		}
	}
	return nil
}

func (s *Store) readNotifications() ([]domain.Notification, error) {
	rows, err := s.db.Query(`
		SELECT id, user_email, category, category_label, title, description, time, is_unread
		FROM notifications
		ORDER BY rowid ASC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var notifications []domain.Notification
	for rows.Next() {
		var item domain.Notification
		var unread int
		if err := rows.Scan(
			&item.ID,
			&item.UserEmail,
			&item.Category,
			&item.CategoryLabel,
			&item.Title,
			&item.Desc,
			&item.Time,
			&unread,
		); err != nil {
			return nil, err
		}
		item.IsUnread = unread == 1
		notifications = append(notifications, item)
	}
	return notifications, rows.Err()
}

func writeNotifications(tx *sql.Tx, notifications []domain.Notification) error {
	stmt, err := tx.Prepare(`
		INSERT INTO notifications (
			id, user_email, category, category_label, title, description, time, is_unread
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
	`)
	if err != nil {
		return err
	}
	defer stmt.Close()

	for _, item := range notifications {
		if _, err := stmt.Exec(
			item.ID,
			item.UserEmail,
			item.Category,
			item.CategoryLabel,
			item.Title,
			item.Desc,
			item.Time,
			boolInt(item.IsUnread),
		); err != nil {
			return err
		}
	}
	return nil
}

func (s *Store) readDownlines() ([]domain.Downline, error) {
	rows, err := s.db.Query(`
		SELECT uid, user_email, level, tier, registration_date, node_size, volume,
			avatar_letter, invested, nickname, email, phone, sponsor, password, status,
			usdt_balance, troo_balance, pending_balance, frozen_balance, kyc_l1, kyc_l2
		FROM downlines
		ORDER BY rowid ASC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var downlines []domain.Downline
	for rows.Next() {
		var item domain.Downline
		var nickname, email, phone, sponsor, password, status, kycL1, kycL2 sql.NullString
		if err := rows.Scan(
			&item.UID,
			&item.UserEmail,
			&item.Level,
			&item.Tier,
			&item.RegistrationDate,
			&item.NodeSize,
			&item.Volume,
			&item.AvatarLetter,
			&item.Invested,
			&nickname,
			&email,
			&phone,
			&sponsor,
			&password,
			&status,
			&item.USDTBalance,
			&item.TROOBalance,
			&item.PendingBalance,
			&item.FrozenBalance,
			&kycL1,
			&kycL2,
		); err != nil {
			return nil, err
		}
		item.Nickname = nullString(nickname)
		item.Email = nullString(email)
		item.Phone = nullString(phone)
		item.Sponsor = nullString(sponsor)
		item.Password = nullString(password)
		item.Status = nullString(status)
		item.KYCL1 = nullString(kycL1)
		item.KYCL2 = nullString(kycL2)
		downlines = append(downlines, item)
	}
	return downlines, rows.Err()
}

func writeDownlines(tx *sql.Tx, downlines []domain.Downline) error {
	stmt, err := tx.Prepare(`
		INSERT INTO downlines (
			uid, user_email, level, tier, registration_date, node_size, volume,
			avatar_letter, invested, nickname, email, phone, sponsor, password, status,
			usdt_balance, troo_balance, pending_balance, frozen_balance, kyc_l1, kyc_l2
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`)
	if err != nil {
		return err
	}
	defer stmt.Close()

	for _, item := range downlines {
		if _, err := stmt.Exec(
			item.UID,
			item.UserEmail,
			item.Level,
			item.Tier,
			item.RegistrationDate,
			item.NodeSize,
			item.Volume,
			item.AvatarLetter,
			item.Invested,
			emptyNull(item.Nickname),
			emptyNull(item.Email),
			emptyNull(item.Phone),
			emptyNull(item.Sponsor),
			emptyNull(item.Password),
			emptyNull(item.Status),
			item.USDTBalance,
			item.TROOBalance,
			item.PendingBalance,
			item.FrozenBalance,
			emptyNull(item.KYCL1),
			emptyNull(item.KYCL2),
		); err != nil {
			return err
		}
	}
	return nil
}

func (s *Store) readResetTokens() ([]domain.ResetToken, error) {
	rows, err := s.db.Query(`
		SELECT email, token_hash, expires_at, consumed_at, created_at
		FROM reset_tokens
		ORDER BY rowid ASC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var tokens []domain.ResetToken
	for rows.Next() {
		var item domain.ResetToken
		var consumedAt sql.NullString
		if err := rows.Scan(&item.Email, &item.TokenHash, &item.ExpiresAt, &consumedAt, &item.CreatedAt); err != nil {
			return nil, err
		}
		item.ConsumedAt = nullString(consumedAt)
		tokens = append(tokens, item)
	}
	return tokens, rows.Err()
}

func writeResetTokens(tx *sql.Tx, tokens []domain.ResetToken) error {
	stmt, err := tx.Prepare(`
		INSERT INTO reset_tokens (email, token_hash, expires_at, consumed_at, created_at)
		VALUES (?, ?, ?, ?, ?)
	`)
	if err != nil {
		return err
	}
	defer stmt.Close()

	for _, item := range tokens {
		if _, err := stmt.Exec(item.Email, item.TokenHash, item.ExpiresAt, emptyNull(item.ConsumedAt), item.CreatedAt); err != nil {
			return err
		}
	}
	return nil
}

func (s *Store) readAuditLogs() ([]domain.AuditLog, error) {
	rows, err := s.db.Query(`
		SELECT id, actor_email, actor_role, action, target_email, metadata_json, created_at
		FROM audit_logs
		ORDER BY rowid ASC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var logs []domain.AuditLog
	for rows.Next() {
		var item domain.AuditLog
		var actorRole, targetEmail, metadata sql.NullString
		if err := rows.Scan(
			&item.ID,
			&item.ActorEmail,
			&actorRole,
			&item.Action,
			&targetEmail,
			&metadata,
			&item.CreatedAt,
		); err != nil {
			return nil, err
		}
		if actorRole.Valid {
			value := domain.Role(actorRole.String)
			item.ActorRole = &value
		}
		item.TargetEmail = nullString(targetEmail)
		if metadata.Valid && metadata.String != "" {
			if err := json.Unmarshal([]byte(metadata.String), &item.Metadata); err != nil {
				return nil, err
			}
		}
		logs = append(logs, item)
	}
	return logs, rows.Err()
}

func writeAuditLogs(tx *sql.Tx, logs []domain.AuditLog) error {
	stmt, err := tx.Prepare(`
		INSERT INTO audit_logs (id, actor_email, actor_role, action, target_email, metadata_json, created_at)
		VALUES (?, ?, ?, ?, ?, ?, ?)
	`)
	if err != nil {
		return err
	}
	defer stmt.Close()

	for _, item := range logs {
		var actorRole any
		if item.ActorRole != nil {
			actorRole = string(*item.ActorRole)
		}
		metadata, err := jsonString(item.Metadata)
		if err != nil {
			return err
		}
		if _, err := stmt.Exec(item.ID, item.ActorEmail, actorRole, item.Action, emptyNull(item.TargetEmail), metadata, item.CreatedAt); err != nil {
			return err
		}
	}
	return nil
}

func (s *Store) readParameters() (*domain.Parameters, error) {
	var params domain.Parameters
	var levels string
	err := s.db.QueryRow(`
		SELECT commission_levels_json, withdrawal_fee, l1_unlock_ratio, api_price_url
		FROM system_parameters
		WHERE id = 1
	`).Scan(&levels, &params.WithdrawalFee, &params.L1UnlockRatio, &params.APIPriceURL)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	if err := json.Unmarshal([]byte(levels), &params.CommissionLevels); err != nil {
		return nil, err
	}
	return &params, nil
}

func writeParameters(tx *sql.Tx, params domain.Parameters) error {
	levels, err := json.Marshal(params.CommissionLevels)
	if err != nil {
		return err
	}
	_, err = tx.Exec(`
		INSERT INTO system_parameters (id, commission_levels_json, withdrawal_fee, l1_unlock_ratio, api_price_url)
		VALUES (1, ?, ?, ?, ?)
	`, string(levels), params.WithdrawalFee, params.L1UnlockRatio, params.APIPriceURL)
	return err
}

func (s *Store) readPlans() ([]domain.Plan, error) {
	rows, err := s.db.Query(`
		SELECT id, name, price, gift_ratio, buy_ratio, queue_ratio, commission_limit,
			status, description, is_popular
		FROM plans
		ORDER BY rowid ASC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var plans []domain.Plan
	for rows.Next() {
		var plan domain.Plan
		var popular int
		if err := rows.Scan(
			&plan.ID,
			&plan.Name,
			&plan.Price,
			&plan.GiftRatio,
			&plan.BuyRatio,
			&plan.QueueRatio,
			&plan.CommissionLimit,
			&plan.Status,
			&plan.Description,
			&popular,
		); err != nil {
			return nil, err
		}
		plan.IsPopular = popular == 1
		plans = append(plans, plan)
	}
	return plans, rows.Err()
}

func writePlans(tx *sql.Tx, plans []domain.Plan) error {
	stmt, err := tx.Prepare(`
		INSERT INTO plans (
			id, name, price, gift_ratio, buy_ratio, queue_ratio, commission_limit,
			status, description, is_popular
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`)
	if err != nil {
		return err
	}
	defer stmt.Close()

	for _, plan := range plans {
		if _, err := stmt.Exec(
			plan.ID,
			plan.Name,
			plan.Price,
			plan.GiftRatio,
			plan.BuyRatio,
			plan.QueueRatio,
			plan.CommissionLimit,
			plan.Status,
			plan.Description,
			boolInt(plan.IsPopular),
		); err != nil {
			return err
		}
	}
	return nil
}

func jsonString(value any) (any, error) {
	if value == nil {
		return nil, nil
	}
	payload, err := json.Marshal(value)
	if err != nil {
		return nil, err
	}
	return string(payload), nil
}

func cloneDatabase(data domain.Database) (domain.Database, error) {
	payload, err := json.Marshal(data)
	if err != nil {
		return domain.Database{}, err
	}
	var cloned domain.Database
	if err := json.Unmarshal(payload, &cloned); err != nil {
		return domain.Database{}, err
	}
	return cloned, nil
}

func boolInt(value bool) int {
	if value {
		return 1
	}
	return 0
}

func emptyNull(value string) any {
	if value == "" {
		return nil
	}
	return value
}

func nullString(value sql.NullString) string {
	if !value.Valid {
		return ""
	}
	return value.String
}
