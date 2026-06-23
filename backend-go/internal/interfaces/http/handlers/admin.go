package handlers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"

	adminapp "alliance-system/backend-go/internal/application/admin"
	"alliance-system/backend-go/internal/application/ports"
	"alliance-system/backend-go/internal/business/domain"
	"alliance-system/backend-go/internal/interfaces/http/middleware"
)

type Admin struct {
	service *adminapp.Service
}

func NewAdmin(dataStore ports.Store) *Admin {
	return &Admin{service: adminapp.NewService(dataStore)}
}

func (h *Admin) GetPendingWithdrawals(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"pendingWithdrawals": h.service.PendingWithdrawals()})
}

func (h *Admin) ApproveWithdrawal(c *gin.Context) {
	var req struct {
		ID string `json:"id"`
	}
	if err := c.ShouldBindJSON(&req); err != nil || req.ID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "提现流水 ID 不能为空"})
		return
	}
	result, err := h.service.ApproveWithdrawal(req.ID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": adminErrorMessage(err)})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "出款委托已批准划付", "pendingWithdrawals": result.PendingWithdrawals})
}

func (h *Admin) RejectWithdrawal(c *gin.Context) {
	var req struct {
		ID string `json:"id"`
	}
	if err := c.ShouldBindJSON(&req); err != nil || req.ID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "提现流水 ID 不能为空"})
		return
	}
	result, err := h.service.RejectWithdrawal(req.ID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": adminErrorMessage(err)})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "提现出账委托已拒绝，资金已安全返存至用户可用余额", "pendingWithdrawals": result.PendingWithdrawals})
}

func (h *Admin) RunManualSettlement(c *gin.Context) {
	var req struct {
		Amount float64 `json:"amount"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "结算参数不完整"})
		return
	}

	actor := middleware.CurrentUser(c)
	result, err := h.service.RunManualSettlement(adminapp.ManualSettlementCommand{
		ActorEmail: actor.Email,
		ActorRole:  actor.Role,
		Amount:     req.Amount,
	})
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": adminErrorMessage(err)})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "手动 D+1 结算已执行", "user": result.User})
}

func (h *Admin) MarkNotificationsRead(c *gin.Context) {
	var req struct {
		Email   string `json:"email"`
		ID      string `json:"id"`
		MarkAll bool   `json:"markAll"`
	}
	if err := c.ShouldBindJSON(&req); err != nil || req.Email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "缺少邮箱"})
		return
	}
	result, err := h.service.MarkNotificationsRead(adminapp.MarkNotificationsCommand{
		Email:   req.Email,
		ID:      req.ID,
		MarkAll: req.MarkAll,
	})
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": adminErrorMessage(err)})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "通知状态更新成功", "notifications": result.Notifications})
}

func (h *Admin) ClearNotifications(c *gin.Context) {
	var req struct {
		Email string `json:"email"`
	}
	if err := c.ShouldBindJSON(&req); err != nil || req.Email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "缺少邮箱"})
		return
	}
	result, err := h.service.ClearNotifications(req.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": adminErrorMessage(err)})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "通知清空成功", "notifications": result.Notifications})
}

func (h *Admin) UpdateDownlines(c *gin.Context) {
	var req struct {
		Downlines []domain.Downline `json:"downlines"`
	}
	if err := c.ShouldBindJSON(&req); err != nil || req.Downlines == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "请提供代表名册列表数据"})
		return
	}
	downlines, err := h.service.UpdateDownlines(req.Downlines)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": adminErrorMessage(err)})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "代表名册数据已同步并持久化存储在云数据源中", "downlines": downlines})
}

func (h *Admin) GetParameters(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"parameters": h.service.Parameters()})
}

func (h *Admin) UpdateParameters(c *gin.Context) {
	var req struct {
		Parameters domain.Parameters `json:"parameters"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "参数配置信息不能为空"})
		return
	}
	if err := h.service.UpdateParameters(req.Parameters); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": adminErrorMessage(err)})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "运营比例及清盘参数已成功持久化更新！", "parameters": req.Parameters})
}

func (h *Admin) GetPlans(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"plans": h.service.Plans()})
}

func (h *Admin) UpdatePlans(c *gin.Context) {
	var req struct {
		Plans []domain.Plan `json:"plans"`
	}
	if err := c.ShouldBindJSON(&req); err != nil || len(req.Plans) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "理财计划列表不能为空"})
		return
	}
	if err := h.service.UpdatePlans(req.Plans); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": adminErrorMessage(err)})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "理财方案与分成系数契合配置存储成功！", "plans": req.Plans})
}

func (h *Admin) Broadcast(c *gin.Context) {
	var req struct {
		Title  string `json:"title"`
		Desc   string `json:"desc"`
		Target string `json:"target"`
	}
	if err := c.ShouldBindJSON(&req); err != nil || req.Title == "" || req.Desc == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "推送的标题和消息详情主内容不能为空"})
		return
	}
	if err := h.service.Broadcast(adminapp.BroadcastCommand{Title: req.Title, Desc: req.Desc, Target: req.Target}); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": adminErrorMessage(err)})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "系统级公告已成功发布并播送锁入用户独立收发池！"})
}

func adminErrorMessage(err error) string {
	switch {
	case errors.Is(err, adminapp.ErrWithdrawalMissing):
		return "提现流水在审核队列未找到"
	case errors.Is(err, adminapp.ErrInvalidParameters):
		return trimWrappedError(err, "invalid parameters: ")
	case errors.Is(err, adminapp.ErrInvalidPlans):
		return trimWrappedError(err, "invalid plans: ")
	case errors.Is(err, adminapp.ErrMissingEmail):
		return "缺少邮箱"
	case errors.Is(err, adminapp.ErrMissingDownlines):
		return "请提供代表名册列表数据"
	case errors.Is(err, adminapp.ErrDuplicateUID):
		return "代表 UID 不能重复"
	case errors.Is(err, adminapp.ErrMissingPlans):
		return "理财计划列表不能为空"
	case errors.Is(err, adminapp.ErrMissingBroadcast):
		return "推送的标题和消息详情主内容不能为空"
	default:
		return err.Error()
	}
}
