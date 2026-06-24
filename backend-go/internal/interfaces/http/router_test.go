package http

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"testing"

	"github.com/gin-gonic/gin"

	"alliance-system/backend-go/internal/business/domain"
	"alliance-system/backend-go/internal/infrastructure/config"
	"alliance-system/backend-go/internal/infrastructure/persistence/sqlite"
	"alliance-system/backend-go/internal/infrastructure/security"
)

func TestHealthRoute(t *testing.T) {
	cfg := config.Config{
		Mode:           "test",
		Port:           "3001",
		AuthSecret:     "test-secret",
		SQLitePath:     ":memory:",
		AllowedOrigins: []string{"https://trusted.example"},
	}
	store := sqlite.New(cfg.SQLitePath)
	if err := store.Load(); err != nil {
		t.Fatal(err)
	}

	router := NewRouter(cfg, store)
	req := httptest.NewRequest(http.MethodGet, "/api/health", nil)
	res := httptest.NewRecorder()

	router.ServeHTTP(res, req)

	if res.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", res.Code)
	}
}

func TestServesFrontendIndexWhenPublicDirExists(t *testing.T) {
	publicDir := t.TempDir()
	if err := os.WriteFile(filepath.Join(publicDir, "index.html"), []byte("<html><body>Alliance App</body></html>"), 0644); err != nil {
		t.Fatal(err)
	}

	cfg := config.Config{
		Mode:           "test",
		Port:           "3001",
		AuthSecret:     "test-secret",
		SQLitePath:     ":memory:",
		PublicDir:      publicDir,
		AllowedOrigins: []string{"https://trusted.example"},
	}
	store := sqlite.New(cfg.SQLitePath)
	if err := store.Load(); err != nil {
		t.Fatal(err)
	}

	router := NewRouter(cfg, store)
	req := httptest.NewRequest(http.MethodGet, "/", nil)
	res := httptest.NewRecorder()

	router.ServeHTTP(res, req)

	if res.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", res.Code)
	}
	if body := res.Body.String(); body != "<html><body>Alliance App</body></html>" {
		t.Fatalf("unexpected body: %q", body)
	}
}

func TestServesFrontendIndexForSpaDeepLinks(t *testing.T) {
	publicDir := t.TempDir()
	if err := os.WriteFile(filepath.Join(publicDir, "index.html"), []byte("<html><body>Alliance App</body></html>"), 0644); err != nil {
		t.Fatal(err)
	}

	cfg := config.Config{
		Mode:           "test",
		Port:           "3001",
		AuthSecret:     "test-secret",
		SQLitePath:     ":memory:",
		PublicDir:      publicDir,
		AllowedOrigins: []string{"https://trusted.example"},
	}
	store := sqlite.New(cfg.SQLitePath)
	if err := store.Load(); err != nil {
		t.Fatal(err)
	}

	router := NewRouter(cfg, store)
	req := httptest.NewRequest(http.MethodGet, "/admin/dashboard", nil)
	res := httptest.NewRecorder()

	router.ServeHTTP(res, req)

	if res.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", res.Code)
	}
	if body := res.Body.String(); body != "<html><body>Alliance App</body></html>" {
		t.Fatalf("unexpected body: %q", body)
	}
}

func TestServesFrontendAssets(t *testing.T) {
	projectDir := t.TempDir()
	backendDir := filepath.Join(projectDir, "backend-go")
	publicDir := filepath.Join(projectDir, "dist", "public")
	if err := os.MkdirAll(backendDir, 0755); err != nil {
		t.Fatal(err)
	}
	t.Chdir(backendDir)

	assetsDir := filepath.Join(publicDir, "assets")
	if err := os.MkdirAll(assetsDir, 0755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(publicDir, "index.html"), []byte("<html><body>Alliance App</body></html>"), 0644); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(assetsDir, "app.js"), []byte("console.log('alliance')"), 0644); err != nil {
		t.Fatal(err)
	}

	cfg := config.Config{
		Mode:           "test",
		Port:           "3001",
		AuthSecret:     "test-secret",
		SQLitePath:     ":memory:",
		PublicDir:      "../dist/public",
		AllowedOrigins: []string{"https://trusted.example"},
	}
	store := sqlite.New(cfg.SQLitePath)
	if err := store.Load(); err != nil {
		t.Fatal(err)
	}

	router := NewRouter(cfg, store)
	req := httptest.NewRequest(http.MethodGet, "/assets/app.js", nil)
	req.Header.Set("Origin", "chrome-extension://codex-browser")
	res := httptest.NewRecorder()

	router.ServeHTTP(res, req)

	if res.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d with body %s", res.Code, res.Body.String())
	}
	if body := res.Body.String(); body != "console.log('alliance')" {
		t.Fatalf("unexpected body: %q", body)
	}
}

func TestSameOriginAPIRequestsBypassCorsWhitelist(t *testing.T) {
	cfg := config.Config{
		Mode:           "test",
		Port:           "3001",
		AuthSecret:     "test-secret",
		SQLitePath:     ":memory:",
		AllowedOrigins: []string{"https://trusted.example"},
	}
	store := sqlite.New(cfg.SQLitePath)
	if err := store.Load(); err != nil {
		t.Fatal(err)
	}

	router := NewRouter(cfg, store)
	req := httptest.NewRequest(http.MethodGet, "/api/health", nil)
	req.Host = "127.0.0.1:3001"
	req.Header.Set("Origin", "http://127.0.0.1:3001")
	res := httptest.NewRecorder()

	router.ServeHTTP(res, req)

	if res.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d with body %s", res.Code, res.Body.String())
	}
}

func TestUpdateProfileRejectsWrongCurrentPassword(t *testing.T) {
	router := newProfileTestRouter(t)
	reqBody := map[string]string{
		"password":    "wrong-password",
		"newPassword": "new-secret",
	}
	res := postJSON(t, router, "/api/auth/update-profile", reqBody, profileTestToken(t))

	if res.Code != http.StatusBadRequest {
		t.Fatalf("expected status 400, got %d with body %s", res.Code, res.Body.String())
	}
}

func TestUpdateProfileChangesPasswordAfterCurrentPasswordVerification(t *testing.T) {
	router := newProfileTestRouter(t)
	res := postJSON(t, router, "/api/auth/update-profile", map[string]string{
		"password":    "old-secret",
		"newPassword": "new-secret",
	}, profileTestToken(t))
	if res.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d with body %s", res.Code, res.Body.String())
	}

	oldLogin := postJSON(t, router, "/api/auth/login", map[string]string{
		"email":    "profile@example.com",
		"password": "old-secret",
	}, "")
	if oldLogin.Code != http.StatusBadRequest {
		t.Fatalf("expected old password to fail with 400, got %d", oldLogin.Code)
	}

	newLogin := postJSON(t, router, "/api/auth/login", map[string]string{
		"email":    "profile@example.com",
		"password": "new-secret",
	}, "")
	if newLogin.Code != http.StatusOK {
		t.Fatalf("expected new password to login with 200, got %d with body %s", newLogin.Code, newLogin.Body.String())
	}
}

func TestAuthMeReturnsCurrentSanitizedUser(t *testing.T) {
	router := newProfileTestRouter(t)
	res := getJSON(t, router, "/api/auth/me", profileTestToken(t))
	if res.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d with body %s", res.Code, res.Body.String())
	}

	var body struct {
		User domain.User `json:"user"`
	}
	if err := json.Unmarshal(res.Body.Bytes(), &body); err != nil {
		t.Fatal(err)
	}
	if body.User.Email != "profile@example.com" {
		t.Fatalf("expected profile user, got %+v", body.User)
	}
	if body.User.Password != "" {
		t.Fatal("expected password to be omitted")
	}
}

func TestClientCanReadCatalogPlansAndParameters(t *testing.T) {
	router := newClientFeatureTestRouter(t)
	token := clientFeatureToken(t)

	paramsRes := getJSON(t, router, "/api/catalog/parameters", token)
	if paramsRes.Code != http.StatusOK {
		t.Fatalf("expected parameters status 200, got %d with body %s", paramsRes.Code, paramsRes.Body.String())
	}

	plansRes := getJSON(t, router, "/api/catalog/plans", token)
	if plansRes.Code != http.StatusOK {
		t.Fatalf("expected plans status 200, got %d with body %s", plansRes.Code, plansRes.Body.String())
	}
}

func TestClientCanUpdateOwnNotifications(t *testing.T) {
	router := newClientFeatureTestRouter(t)
	token := clientFeatureToken(t)

	markRes := postJSON(t, router, "/api/notifications/mark-read", map[string]any{"id": "NOT-1"}, token)
	if markRes.Code != http.StatusOK {
		t.Fatalf("expected mark-read status 200, got %d with body %s", markRes.Code, markRes.Body.String())
	}

	stateRes := getJSON(t, router, "/api/wallet/user-state", token)
	if stateRes.Code != http.StatusOK {
		t.Fatalf("expected user-state status 200, got %d with body %s", stateRes.Code, stateRes.Body.String())
	}
	var state struct {
		Notifications []domain.Notification `json:"notifications"`
	}
	if err := json.Unmarshal(stateRes.Body.Bytes(), &state); err != nil {
		t.Fatal(err)
	}
	if len(state.Notifications) != 1 || state.Notifications[0].IsUnread {
		t.Fatalf("expected own notification to be marked read, got %+v", state.Notifications)
	}

	clearRes := postJSON(t, router, "/api/notifications/clear", map[string]any{}, token)
	if clearRes.Code != http.StatusOK {
		t.Fatalf("expected clear status 200, got %d with body %s", clearRes.Code, clearRes.Body.String())
	}

	stateRes = getJSON(t, router, "/api/wallet/user-state", token)
	if stateRes.Code != http.StatusOK {
		t.Fatalf("expected user-state status 200, got %d with body %s", stateRes.Code, stateRes.Body.String())
	}
	state.Notifications = nil
	if err := json.Unmarshal(stateRes.Body.Bytes(), &state); err != nil {
		t.Fatal(err)
	}
	if len(state.Notifications) != 0 {
		t.Fatalf("expected own notifications to be cleared, got %+v", state.Notifications)
	}
}

func TestClientCanSubscribeAndTransferThroughWalletRoutes(t *testing.T) {
	router := newClientFeatureTestRouter(t)
	token := clientFeatureToken(t)

	subscribeRes := postJSON(t, router, "/api/wallet/subscribe", map[string]any{
		"amount":     100,
		"planName":   "Starter",
		"planPrice":  100,
		"poolLimit":  500,
		"trooRatio":  7,
		"queueRatio": 0.31,
	}, token)
	if subscribeRes.Code != http.StatusOK {
		t.Fatalf("expected subscribe status 200, got %d with body %s", subscribeRes.Code, subscribeRes.Body.String())
	}

	transferRes := postJSON(t, router, "/api/wallet/transfer", map[string]any{
		"amount":    25,
		"targetUid": "889425",
	}, token)
	if transferRes.Code != http.StatusOK {
		t.Fatalf("expected transfer status 200, got %d with body %s", transferRes.Code, transferRes.Body.String())
	}

	stateRes := getJSON(t, router, "/api/wallet/user-state", token)
	if stateRes.Code != http.StatusOK {
		t.Fatalf("expected user-state status 200, got %d with body %s", stateRes.Code, stateRes.Body.String())
	}
	var state struct {
		User         domain.User          `json:"user"`
		Transactions []domain.Transaction `json:"transactions"`
	}
	if err := json.Unmarshal(stateRes.Body.Bytes(), &state); err != nil {
		t.Fatal(err)
	}
	if state.User.USDTBalance != 875 {
		t.Fatalf("expected balance after subscribe and transfer to be 875, got %.2f", state.User.USDTBalance)
	}
	if len(state.Transactions) != 2 {
		t.Fatalf("expected two transactions, got %+v", state.Transactions)
	}
	if state.Transactions[0].Type != "transfer" || state.Transactions[1].Type != "subscribe" {
		t.Fatalf("expected latest transfer then subscribe, got %+v", state.Transactions)
	}

	recipientStateRes := getJSON(t, router, "/api/wallet/user-state", targetFeatureToken(t))
	if recipientStateRes.Code != http.StatusOK {
		t.Fatalf("expected recipient user-state status 200, got %d with body %s", recipientStateRes.Code, recipientStateRes.Body.String())
	}
	var recipientState struct {
		User         domain.User          `json:"user"`
		Transactions []domain.Transaction `json:"transactions"`
	}
	if err := json.Unmarshal(recipientStateRes.Body.Bytes(), &recipientState); err != nil {
		t.Fatal(err)
	}
	if recipientState.User.USDTBalance != 35 {
		t.Fatalf("expected recipient balance after transfer to be 35, got %.2f", recipientState.User.USDTBalance)
	}
	if len(recipientState.Transactions) != 1 || recipientState.Transactions[0].Amount != 25 {
		t.Fatalf("expected recipient transfer transaction, got %+v", recipientState.Transactions)
	}
}

func TestAdminCanRunManualSettlement(t *testing.T) {
	router := newAdminFeatureTestRouter(t)
	token := adminFeatureToken(t)

	res := postJSON(t, router, "/api/admin/settlements/run", map[string]any{"amount": 1500}, token)
	if res.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d with body %s", res.Code, res.Body.String())
	}

	stateRes := getJSON(t, router, "/api/wallet/user-state", token)
	if stateRes.Code != http.StatusOK {
		t.Fatalf("expected user-state status 200, got %d with body %s", stateRes.Code, stateRes.Body.String())
	}
	var state struct {
		User domain.User `json:"user"`
	}
	if err := json.Unmarshal(stateRes.Body.Bytes(), &state); err != nil {
		t.Fatal(err)
	}
	if state.User.USDTBalance != 1600 {
		t.Fatalf("expected admin balance 1600, got %.2f", state.User.USDTBalance)
	}
}

func newProfileTestRouter(t *testing.T) *gin.Engine {
	t.Helper()
	cfg := config.Config{
		Mode:           "test",
		Port:           "3001",
		AuthSecret:     "test-secret",
		SQLitePath:     ":memory:",
		AllowedOrigins: []string{"https://trusted.example"},
	}
	dataStore := sqlite.New(cfg.SQLitePath)
	if err := dataStore.Load(); err != nil {
		t.Fatal(err)
	}
	passwordHash, err := security.HashPassword("old-secret")
	if err != nil {
		t.Fatal(err)
	}
	if err := dataStore.Update(func(db *domain.Database) error {
		db.Users = append(db.Users, domain.User{
			Email:      "profile@example.com",
			Password:   passwordHash,
			Nickname:   "Profile User",
			PortalMode: "client",
		})
		return nil
	}); err != nil {
		t.Fatal(err)
	}
	return NewRouter(cfg, dataStore)
}

func newAdminFeatureTestRouter(t *testing.T) *gin.Engine {
	t.Helper()
	cfg := config.Config{
		Mode:           "test",
		Port:           "3001",
		AuthSecret:     "test-secret",
		SQLitePath:     ":memory:",
		AllowedOrigins: []string{"https://trusted.example"},
	}
	dataStore := sqlite.New(cfg.SQLitePath)
	if err := dataStore.Load(); err != nil {
		t.Fatal(err)
	}
	role := domain.RoleSuperAdmin
	if err := dataStore.Update(func(db *domain.Database) error {
		db.Users = append(db.Users, domain.User{
			Email:       "admin@example.com",
			Password:    "secret",
			Nickname:    "Admin User",
			PortalMode:  "admin",
			Role:        &role,
			USDTBalance: 100,
		})
		return nil
	}); err != nil {
		t.Fatal(err)
	}
	return NewRouter(cfg, dataStore)
}

func newClientFeatureTestRouter(t *testing.T) *gin.Engine {
	t.Helper()
	cfg := config.Config{
		Mode:           "test",
		Port:           "3001",
		AuthSecret:     "test-secret",
		SQLitePath:     ":memory:",
		AllowedOrigins: []string{"https://trusted.example"},
	}
	dataStore := sqlite.New(cfg.SQLitePath)
	if err := dataStore.Load(); err != nil {
		t.Fatal(err)
	}
	if err := dataStore.Update(func(db *domain.Database) error {
		db.Users = append(db.Users,
			domain.User{
				Email:       "client@example.com",
				Password:    "secret",
				Nickname:    "Client User",
				PortalMode:  "client",
				USDTBalance: 1000,
			},
			domain.User{
				Email:       "target@example.com",
				Password:    "secret",
				Nickname:    "Target User",
				PortalMode:  "client",
				USDTBalance: 10,
			},
		)
		db.Downlines = []domain.Downline{{UID: "889425", Email: "target@example.com", Nickname: "Target User"}}
		db.Parameters = &domain.Parameters{
			CommissionLevels: map[string]float64{"L1": 5},
			WithdrawalFee:    1,
			L1UnlockRatio:    10,
			APIPriceURL:      "https://prices.example/api",
		}
		db.Plans = []domain.Plan{{ID: "starter", Name: "Starter", Price: 100, Status: "active"}}
		db.Notifications = []domain.Notification{
			{ID: "NOT-1", Title: "Mine", IsUnread: true, UserEmail: "client@example.com"},
			{ID: "NOT-2", Title: "Other", IsUnread: true, UserEmail: "other@example.com"},
		}
		return nil
	}); err != nil {
		t.Fatal(err)
	}
	return NewRouter(cfg, dataStore)
}

func profileTestToken(t *testing.T) string {
	t.Helper()
	token, err := security.CreateToken(domain.User{
		Email:      "profile@example.com",
		PortalMode: "client",
	}, "test-secret")
	if err != nil {
		t.Fatal(err)
	}
	return token
}

func clientFeatureToken(t *testing.T) string {
	t.Helper()
	token, err := security.CreateToken(domain.User{
		Email:      "client@example.com",
		PortalMode: "client",
	}, "test-secret")
	if err != nil {
		t.Fatal(err)
	}
	return token
}

func targetFeatureToken(t *testing.T) string {
	t.Helper()
	token, err := security.CreateToken(domain.User{
		Email:      "target@example.com",
		PortalMode: "client",
	}, "test-secret")
	if err != nil {
		t.Fatal(err)
	}
	return token
}

func adminFeatureToken(t *testing.T) string {
	t.Helper()
	role := domain.RoleSuperAdmin
	token, err := security.CreateToken(domain.User{
		Email:      "admin@example.com",
		PortalMode: "admin",
		Role:       &role,
	}, "test-secret")
	if err != nil {
		t.Fatal(err)
	}
	return token
}

func getJSON(t *testing.T, router *gin.Engine, path string, token string) *httptest.ResponseRecorder {
	t.Helper()
	req := httptest.NewRequest(http.MethodGet, path, nil)
	if token != "" {
		req.Header.Set("Authorization", "Bearer "+token)
	}
	res := httptest.NewRecorder()
	router.ServeHTTP(res, req)
	return res
}

func postJSON(t *testing.T, router *gin.Engine, path string, body any, token string) *httptest.ResponseRecorder {
	t.Helper()
	payload, err := json.Marshal(body)
	if err != nil {
		t.Fatal(err)
	}
	req := httptest.NewRequest(http.MethodPost, path, bytes.NewReader(payload))
	req.Header.Set("Content-Type", "application/json")
	if token != "" {
		req.Header.Set("Authorization", "Bearer "+token)
	}
	res := httptest.NewRecorder()
	router.ServeHTTP(res, req)
	return res
}
