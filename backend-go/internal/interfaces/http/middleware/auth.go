package middleware

import (
	"net/http"
	"net/url"
	"strings"

	"github.com/gin-gonic/gin"

	"alliance-system/backend-go/internal/application/ports"
	"alliance-system/backend-go/internal/business/domain"
	"alliance-system/backend-go/internal/infrastructure/config"
	"alliance-system/backend-go/internal/infrastructure/security"
)

const AuthPayloadKey = "authPayload"

func CORS(cfg config.Config) gin.HandlerFunc {
	allowed := map[string]bool{}
	for _, origin := range cfg.AllowedOrigins {
		allowed[origin] = true
	}

	return func(c *gin.Context) {
		if !strings.HasPrefix(c.Request.URL.Path, "/api/") {
			c.Next()
			return
		}

		origin := c.GetHeader("Origin")
		if origin == "" {
			c.Next()
			return
		}
		if !allowed[origin] && !isSameRequestOrigin(c.Request, origin) {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "请求来源不在允许列表中"})
			return
		}
		c.Header("Access-Control-Allow-Origin", origin)
		c.Header("Vary", "Origin")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
		c.Header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		if c.Request.Method == http.MethodOptions {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Next()
	}
}

func isSameRequestOrigin(request *http.Request, origin string) bool {
	parsed, err := url.Parse(origin)
	if err != nil || parsed.Scheme == "" || parsed.Host == "" {
		return false
	}
	if parsed.Host != request.Host {
		return false
	}
	return parsed.Scheme == "http" || parsed.Scheme == "https"
}

func SecurityHeaders() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("X-Content-Type-Options", "nosniff")
		c.Header("X-Frame-Options", "DENY")
		c.Header("Referrer-Policy", "no-referrer")
		c.Header("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
		c.Next()
	}
}

func RequireAuth(cfg config.Config, dataStore ports.Store) gin.HandlerFunc {
	return func(c *gin.Context) {
		header := c.GetHeader("Authorization")
		if !strings.HasPrefix(header, "Bearer ") {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "请先登录后再访问此接口"})
			return
		}
		payload, err := security.VerifyToken(strings.TrimPrefix(header, "Bearer "), cfg.AuthSecret)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "登录状态无效或已过期"})
			return
		}
		user, ok := dataStore.FindUser(payload.Email)
		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "登录状态无效或已过期"})
			return
		}
		payload.PortalMode = user.PortalMode
		payload.Role = user.Role
		c.Set(AuthPayloadKey, payload)
		c.Next()
	}
}

func RequireAdmin(roles ...domain.Role) gin.HandlerFunc {
	allowed := map[domain.Role]bool{}
	for _, role := range roles {
		allowed[role] = true
	}

	return func(c *gin.Context) {
		raw, exists := c.Get(AuthPayloadKey)
		if !exists {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "请先登录后再访问此接口"})
			return
		}
		payload := raw.(security.Payload)
		if payload.PortalMode != "admin" {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "当前账户无权访问管理接口"})
			return
		}
		if len(allowed) > 0 {
			if payload.Role == nil || !allowed[*payload.Role] {
				c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "当前后台角色权限不足"})
				return
			}
		}
		c.Next()
	}
}

func CurrentUser(c *gin.Context) security.Payload {
	raw, _ := c.Get(AuthPayloadKey)
	return raw.(security.Payload)
}
