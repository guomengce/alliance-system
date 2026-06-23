package http

import (
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/gin-gonic/gin"

	"alliance-system/backend-go/internal/application/ports"
	"alliance-system/backend-go/internal/business/domain"
	"alliance-system/backend-go/internal/infrastructure/config"
	"alliance-system/backend-go/internal/interfaces/http/handlers"
	"alliance-system/backend-go/internal/interfaces/http/middleware"
)

func NewRouter(cfg config.Config, dataStore ports.Store) *gin.Engine {
	gin.SetMode(gin.ReleaseMode)
	router := gin.New()
	router.Use(gin.Logger(), gin.Recovery(), middleware.CORS(cfg), middleware.SecurityHeaders())

	authHandlers := handlers.NewAuth(cfg, dataStore)
	walletHandlers := handlers.NewWallet(dataStore)
	adminHandlers := handlers.NewAdmin(dataStore)
	catalogHandlers := handlers.NewCatalog(dataStore)

	router.GET("/api/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok", "serverTime": time.Now().UTC().Format(time.RFC3339)})
	})

	api := router.Group("/api")
	api.POST("/auth/login", authHandlers.Login)
	api.POST("/auth/register", authHandlers.Register)
	api.POST("/auth/request-reset", authHandlers.RequestReset)
	api.POST("/auth/reset-password", authHandlers.ResetPassword)
	api.GET("/auth/me", middleware.RequireAuth(cfg, dataStore), authHandlers.Me)
	api.POST("/auth/update-profile", middleware.RequireAuth(cfg, dataStore), authHandlers.UpdateProfile)

	wallet := api.Group("/wallet", middleware.RequireAuth(cfg, dataStore))
	wallet.GET("/user-state", walletHandlers.GetUserState)
	wallet.POST("/direct-simulation", walletHandlers.DirectSimulation)
	wallet.POST("/withdraw-commissions", walletHandlers.WithdrawCommissions)
	wallet.POST("/withdraw", walletHandlers.SubmitWithdrawal)
	wallet.POST("/subscribe", walletHandlers.SubscribePlan)
	wallet.POST("/transfer", walletHandlers.Transfer)
	wallet.POST("/raise-limit", walletHandlers.RaiseLimit)
	wallet.POST("/update-balances", middleware.RequireAdmin(), walletHandlers.UpdateBalances)

	notifications := api.Group("/notifications", middleware.RequireAuth(cfg, dataStore))
	notifications.POST("/mark-read", walletHandlers.MarkNotificationsRead)
	notifications.POST("/clear", walletHandlers.ClearNotifications)

	catalog := api.Group("/catalog", middleware.RequireAuth(cfg, dataStore))
	catalog.GET("/parameters", catalogHandlers.GetParameters)
	catalog.GET("/plans", catalogHandlers.GetPlans)

	admin := api.Group("/admin", middleware.RequireAuth(cfg, dataStore), middleware.RequireAdmin())
	admin.GET("/pending-withdrawals", adminHandlers.GetPendingWithdrawals)
	admin.POST("/approve-withdrawal", middleware.RequireAdmin(domain.RoleSuperAdmin, domain.RoleFinanceDir), adminHandlers.ApproveWithdrawal)
	admin.POST("/reject-withdrawal", middleware.RequireAdmin(domain.RoleSuperAdmin, domain.RoleFinanceDir), adminHandlers.RejectWithdrawal)
	admin.POST("/settlements/run", middleware.RequireAdmin(domain.RoleSuperAdmin, domain.RoleFinanceDir), adminHandlers.RunManualSettlement)
	admin.POST("/notifications/mark-read", adminHandlers.MarkNotificationsRead)
	admin.POST("/notifications/clear", adminHandlers.ClearNotifications)
	admin.POST("/update-downlines", middleware.RequireAdmin(domain.RoleSuperAdmin), adminHandlers.UpdateDownlines)
	admin.GET("/parameters", adminHandlers.GetParameters)
	admin.POST("/parameters", middleware.RequireAdmin(domain.RoleSuperAdmin), adminHandlers.UpdateParameters)
	admin.GET("/plans", adminHandlers.GetPlans)
	admin.POST("/plans", middleware.RequireAdmin(domain.RoleSuperAdmin), adminHandlers.UpdatePlans)
	admin.POST("/broadcast", middleware.RequireAdmin(domain.RoleSuperAdmin), adminHandlers.Broadcast)

	if publicDir, ok := frontendPublicDir(cfg.PublicDir); ok {
		assetsDir := filepath.Join(publicDir, "assets")
		router.GET("/assets/*filepath", serveFrontendAsset(assetsDir))
		router.NoRoute(func(c *gin.Context) {
			if c.Request.Method != http.MethodGet {
				c.Status(http.StatusNotFound)
				return
			}
			c.File(filepath.Join(publicDir, "index.html"))
		})
	}

	return router
}

func serveFrontendAsset(assetsDir string) gin.HandlerFunc {
	return func(c *gin.Context) {
		requestedPath := strings.TrimPrefix(c.Param("filepath"), "/")
		if requestedPath == "" {
			c.Status(http.StatusNotFound)
			return
		}

		cleanPath := filepath.Clean(requestedPath)
		if cleanPath == "." || strings.HasPrefix(cleanPath, "..") || filepath.IsAbs(cleanPath) {
			c.Status(http.StatusForbidden)
			return
		}

		targetPath := filepath.Join(assetsDir, cleanPath)
		relativePath, err := filepath.Rel(assetsDir, targetPath)
		if err != nil || relativePath == ".." || strings.HasPrefix(relativePath, ".."+string(os.PathSeparator)) {
			c.Status(http.StatusForbidden)
			return
		}

		info, err := os.Stat(targetPath)
		if err != nil || info.IsDir() {
			c.Status(http.StatusNotFound)
			return
		}

		c.File(targetPath)
	}
}

func frontendPublicDir(publicDir string) (string, bool) {
	if publicDir == "" {
		return "", false
	}
	absolutePublicDir, err := filepath.Abs(publicDir)
	if err != nil {
		return "", false
	}
	info, err := os.Stat(filepath.Join(absolutePublicDir, "index.html"))
	return absolutePublicDir, err == nil && !info.IsDir()
}
