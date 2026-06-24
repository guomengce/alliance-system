package handlers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"

	"alliance-system/backend-go/internal/application/ports"
	walletapp "alliance-system/backend-go/internal/application/wallet"
	"alliance-system/backend-go/internal/business/domain"
	"alliance-system/backend-go/internal/interfaces/http/middleware"
)

type Wallet struct {
	service *walletapp.Service
}

func NewWallet(dataStore ports.Store) *Wallet {
	return &Wallet{service: walletapp.NewService(dataStore)}
}

func (h *Wallet) GetUserState(c *gin.Context) {
	state, err := h.service.GetUserState(targetEmail(c))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "未查找到此用户"})
		return
	}

	c.JSON(http.StatusOK, state)
}

func (h *Wallet) DirectSimulation(c *gin.Context) {
	var req struct {
		PurchaseAmt       float64 `json:"purchaseAmt"`
		CommissionPercent float64 `json:"commissionPercent"`
		SubUID            string  `json:"subUid"`
		SubPlanName       string  `json:"subPlanName"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "参数不完整"})
		return
	}

	result, err := h.service.DirectSimulation(walletapp.DirectSimulationCommand{
		Email:             targetEmail(c),
		PurchaseAmt:       req.PurchaseAmt,
		CommissionPercent: req.CommissionPercent,
		SubUID:            req.SubUID,
		SubPlanName:       req.SubPlanName,
	})
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "用户未找到"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "模拟运行成功", "calculation": result.Calculation, "user": result.User})
}

func (h *Wallet) WithdrawCommissions(c *gin.Context) {
	result, err := h.service.WithdrawCommissions(targetEmail(c))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": walletErrorMessage(err)})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "佣金划存成功！已解冻并计入可用余额。", "user": result.User})
}

func (h *Wallet) SubmitWithdrawal(c *gin.Context) {
	var req struct {
		Amount    float64 `json:"amount"`
		Network   string  `json:"network"`
		ToAddress string  `json:"toAddress"`
	}
	if err := c.ShouldBindJSON(&req); err != nil || req.Amount <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "提现金额必须为大于 0 的有效数字"})
		return
	}

	result, err := h.service.SubmitWithdrawal(walletapp.SubmitWithdrawalCommand{
		Email:     targetEmail(c),
		Amount:    req.Amount,
		Network:   req.Network,
		ToAddress: req.ToAddress,
	})
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": walletErrorMessage(err)})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "中心出款委托发起成功，等待联盟财务风控审核。", "user": result.User})
}

func (h *Wallet) SubscribePlan(c *gin.Context) {
	var req struct {
		Amount     float64 `json:"amount"`
		PlanName   string  `json:"planName"`
		PlanPrice  float64 `json:"planPrice"`
		PoolLimit  float64 `json:"poolLimit"`
		TROORatio  float64 `json:"trooRatio"`
		QueueRatio float64 `json:"queueRatio"`
	}
	if err := c.ShouldBindJSON(&req); err != nil || req.Amount <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "申购金额必须为大于 0 的有效数字"})
		return
	}

	result, err := h.service.SubscribePlan(walletapp.SubscribePlanCommand{
		Email:      targetEmail(c),
		Amount:     req.Amount,
		PlanName:   req.PlanName,
		PlanPrice:  req.PlanPrice,
		PoolLimit:  req.PoolLimit,
		TROORatio:  req.TROORatio,
		QueueRatio: req.QueueRatio,
	})
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": walletErrorMessage(err)})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "套餐申购已成功提交", "user": result.User})
}

func (h *Wallet) Transfer(c *gin.Context) {
	var req struct {
		Amount    float64 `json:"amount"`
		TargetUID string  `json:"targetUid"`
	}
	if err := c.ShouldBindJSON(&req); err != nil || req.Amount <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "转账金额必须为大于 0 的有效数字"})
		return
	}

	result, err := h.service.Transfer(walletapp.TransferCommand{
		Email:     targetEmail(c),
		Amount:    req.Amount,
		TargetUID: req.TargetUID,
	})
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": walletErrorMessage(err)})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "站内转账成功", "user": result.User})
}

func (h *Wallet) RaiseLimit(c *gin.Context) {
	if err := h.service.RaiseLimit(targetEmail(c)); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "用户未找到"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "已成功申请额外提升您的可用佣金结转额度 $10,000 USDT！"})
}

func (h *Wallet) UpdateBalances(c *gin.Context) {
	var req struct {
		Email       string              `json:"email"`
		USDTDiff    *float64            `json:"usdtDiff"`
		TROODiff    *float64            `json:"trooDiff"`
		LockedDiff  *float64            `json:"lockedDiff"`
		Transaction *domain.Transaction `json:"transaction"`
	}
	if err := c.ShouldBindJSON(&req); err != nil || req.Email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "请提供用户邮箱"})
		return
	}

	actor := middleware.CurrentUser(c)
	err := h.service.UpdateBalances(walletapp.UpdateBalancesCommand{
		Email:       req.Email,
		USDTDiff:    req.USDTDiff,
		TROODiff:    req.TROODiff,
		LockedDiff:  req.LockedDiff,
		Transaction: req.Transaction,
		ActorEmail:  actor.Email,
		ActorRole:   actor.Role,
	})
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": walletErrorMessage(err)})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "余额及账本更新成功"})
}

func (h *Wallet) MarkNotificationsRead(c *gin.Context) {
	var req struct {
		ID      string `json:"id"`
		MarkAll bool   `json:"markAll"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "参数不完整"})
		return
	}

	result, err := h.service.MarkNotificationsRead(walletapp.MarkNotificationsCommand{
		Email:   middleware.CurrentUser(c).Email,
		ID:      req.ID,
		MarkAll: req.MarkAll,
	})
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": walletErrorMessage(err)})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "通知状态更新成功", "notifications": result.Notifications})
}

func (h *Wallet) ClearNotifications(c *gin.Context) {
	result, err := h.service.ClearNotifications(middleware.CurrentUser(c).Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": walletErrorMessage(err)})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "通知清空成功", "notifications": result.Notifications})
}

func targetEmail(c *gin.Context) string {
	payload := middleware.CurrentUser(c)
	if payload.PortalMode == "admin" {
		if email := c.Query("email"); email != "" {
			return email
		}
	}
	return payload.Email
}

func walletErrorMessage(err error) string {
	switch {
	case errors.Is(err, walletapp.ErrNoPendingCommission):
		return "待核算佣金余额为0"
	case errors.Is(err, walletapp.ErrInsufficientBalance):
		return "账户可用流动性不足，提现发起失败"
	case errors.Is(err, walletapp.ErrInvalidWithdrawalDestination):
		return "提现网络或地址无效"
	case errors.Is(err, walletapp.ErrTransferTargetNotFound):
		return "未找到目标 UID 对应的收款账户"
	case errors.Is(err, walletapp.ErrInvalidTransferTarget):
		return "不能向当前登录账户发起站内转账"
	case errors.Is(err, walletapp.ErrNegativeBalance):
		return "余额不能被调整为负数"
	case errors.Is(err, walletapp.ErrMissingEmail):
		return "请提供用户邮箱"
	case errors.Is(err, walletapp.ErrUserNotFound):
		return "用户未找到"
	default:
		return err.Error()
	}
}
