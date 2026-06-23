package handlers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"

	authapp "alliance-system/backend-go/internal/application/auth"
	"alliance-system/backend-go/internal/application/ports"
	"alliance-system/backend-go/internal/infrastructure/config"
	"alliance-system/backend-go/internal/interfaces/http/middleware"
)

type Auth struct {
	cfg     config.Config
	service *authapp.Service
}

func NewAuth(cfg config.Config, dataStore ports.Store) *Auth {
	return &Auth{cfg: cfg, service: authapp.NewService(cfg, dataStore)}
}

func (h *Auth) Login(c *gin.Context) {
	var req struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "邮箱和密码不能为空"})
		return
	}

	result, err := h.service.Login(authapp.LoginCommand{Email: req.Email, Password: req.Password})
	if err != nil {
		switch {
		case errors.Is(err, authapp.ErrMissingCredentials):
			c.JSON(http.StatusBadRequest, gin.H{"error": "邮箱和密码不能为空"})
		case errors.Is(err, authapp.ErrUserNotFound):
			c.JSON(http.StatusBadRequest, gin.H{"error": "登录账号未在系统注册，请先注册新账户"})
		case errors.Is(err, authapp.ErrBadPassword):
			c.JSON(http.StatusBadRequest, gin.H{"error": "您输入的登录密钥／密码不正确"})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": "登录令牌生成失败"})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "登录成功", "user": result.User, "token": result.Token})
}

func (h *Auth) Me(c *gin.Context) {
	payload := middleware.CurrentUser(c)
	user, err := h.service.CurrentUser(payload.Email)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "登录状态无效或已过期"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"user": user})
}

func (h *Auth) Register(c *gin.Context) {
	var req struct {
		Email    string `json:"email"`
		Nickname string `json:"nickname"`
		Password string `json:"password"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "参数不完整"})
		return
	}

	result, err := h.service.Register(authapp.RegisterCommand{Email: req.Email, Nickname: req.Nickname, Password: req.Password})
	if err != nil {
		switch {
		case errors.Is(err, authapp.ErrIncompleteRequest):
			c.JSON(http.StatusBadRequest, gin.H{"error": "参数不完整"})
		case errors.Is(err, authapp.ErrDuplicateEmail):
			c.JSON(http.StatusBadRequest, gin.H{"error": "此邮箱已注册，请直接登录"})
		case errors.Is(err, authapp.ErrPasswordHash):
			c.JSON(http.StatusInternalServerError, gin.H{"error": "密码加密失败"})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": "注册失败"})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "注册成功", "user": result.User, "token": result.Token})
}

func (h *Auth) RequestReset(c *gin.Context) {
	var req struct {
		Email string `json:"email"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "邮箱不能为空"})
		return
	}

	token, err := h.service.RequestReset(req.Email)
	if err != nil {
		switch {
		case errors.Is(err, authapp.ErrIncompleteRequest):
			c.JSON(http.StatusBadRequest, gin.H{"error": "邮箱不能为空"})
		case errors.Is(err, authapp.ErrUserNotFound):
			c.JSON(http.StatusNotFound, gin.H{"error": "未查找到此邮箱注册信息"})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": "找回验证码发起失败"})
		}
		return
	}

	resp := gin.H{"message": "如果账户存在，重置验证码将被分发"}
	if h.cfg.Mode != "production" {
		resp["resetToken"] = token
	}
	c.JSON(http.StatusOK, resp)
}

func (h *Auth) ResetPassword(c *gin.Context) {
	var req struct {
		Email       string `json:"email"`
		Code        string `json:"code"`
		NewPassword string `json:"newPassword"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "参数不完整"})
		return
	}

	if err := h.service.ResetPassword(authapp.ResetPasswordCommand{Email: req.Email, Code: req.Code, NewPassword: req.NewPassword}); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "核验码不正确"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "密码重设成功"})
}

func (h *Auth) UpdateProfile(c *gin.Context) {
	var req struct {
		Nickname     *string `json:"nickname"`
		TwoFAEnabled *bool   `json:"twoFAEnabled"`
		Password     string  `json:"password"`
		NewPassword  string  `json:"newPassword"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "参数不完整"})
		return
	}

	payload := middleware.CurrentUser(c)
	updated, err := h.service.UpdateProfile(authapp.UpdateProfileCommand{
		Email:        payload.Email,
		Nickname:     req.Nickname,
		TwoFAEnabled: req.TwoFAEnabled,
		Password:     req.Password,
		NewPassword:  req.NewPassword,
	})
	if err != nil {
		if errors.Is(err, authapp.ErrBadCurrentPassword) {
			c.JSON(http.StatusBadRequest, gin.H{"error": "当前旧密码验证失败，密码不正确"})
			return
		}
		c.JSON(http.StatusNotFound, gin.H{"error": "用户未找到"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "个人中心更新成功", "user": updated})
}
