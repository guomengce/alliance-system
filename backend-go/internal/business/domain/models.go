package domain

type Role string

const (
	RoleSuperAdmin  Role = "SUPER_ADMIN"
	RoleFinanceDir  Role = "FINANCE_DIR"
	RoleRiskOfficer Role = "RISK_OFFICER"
	RoleOperator    Role = "OPERATOR"
)

type User struct {
	Email                   string  `json:"email"`
	Password                string  `json:"password,omitempty"`
	Nickname                string  `json:"nickname"`
	PortalMode              string  `json:"portalMode"`
	Role                    *Role   `json:"role"`
	USDTBalance             float64 `json:"usdtBalance"`
	TROOBalance             float64 `json:"trooBalance"`
	LockedQueueAmount       float64 `json:"lockedQueueAmount"`
	OriginalLockedQueue     float64 `json:"originalLockedQueue"`
	ReleasedQueueAmount     float64 `json:"releasedQueueAmount"`
	CommissionPoolLimit     float64 `json:"commissionPoolLimit"`
	CommissionPoolRemaining float64 `json:"commissionPoolRemaining"`
	PendingBalance          float64 `json:"pendingBalance"`
	CumulativeCommissions   float64 `json:"cumulativeCommissions"`
	ArrivedCommissions      float64 `json:"arrivedCommissions"`
	FailedCommissions       float64 `json:"failedCommissions"`
	YesterdayRevenue        float64 `json:"yesterdayRevenue"`
	TotalCredit             float64 `json:"totalCredit"`
	RemainingCredit         float64 `json:"remainingCredit"`
	TwoFAEnabled            bool    `json:"twoFAEnabled"`
}

type BlockchainProof struct {
	TxID            string  `json:"txid"`
	BlockHeight     *int    `json:"blockHeight,omitempty"`
	Confirmations   *int    `json:"confirmations,omitempty"`
	Network         string  `json:"network,omitempty"`
	GasFee          float64 `json:"gasFee,omitempty"`
	FromAddress     string  `json:"fromAddress,omitempty"`
	ToAddress       string  `json:"toAddress,omitempty"`
	Timestamp       string  `json:"timestamp,omitempty"`
	ConsensusStatus string  `json:"consensusStatus,omitempty"`
}

type Transaction struct {
	ID              string           `json:"id"`
	Type            string           `json:"type"`
	TypeLabel       string           `json:"typeLabel"`
	Desc            string           `json:"desc"`
	Amount          float64          `json:"amount"`
	Currency        string           `json:"currency"`
	Time            string           `json:"time"`
	Status          string           `json:"status"`
	StatusLabel     string           `json:"statusLabel"`
	BlockchainProof *BlockchainProof `json:"blockchainProof,omitempty"`
	UserEmail       string           `json:"userEmail,omitempty"`
}

type Downline struct {
	UID              string  `json:"uid"`
	Level            string  `json:"level"`
	Tier             string  `json:"tier"`
	RegistrationDate string  `json:"registrationDate"`
	NodeSize         float64 `json:"nodeSize"`
	Volume           float64 `json:"volume"`
	AvatarLetter     string  `json:"avatarLetter"`
	Invested         float64 `json:"invested"`
	Nickname         string  `json:"nickname,omitempty"`
	Email            string  `json:"email,omitempty"`
	Phone            string  `json:"phone,omitempty"`
	Sponsor          string  `json:"sponsor,omitempty"`
	Password         string  `json:"password,omitempty"`
	Status           string  `json:"status,omitempty"`
	USDTBalance      float64 `json:"usdtBalance,omitempty"`
	TROOBalance      float64 `json:"trooBalance,omitempty"`
	PendingBalance   float64 `json:"pendingBalance,omitempty"`
	FrozenBalance    float64 `json:"frozenBalance,omitempty"`
	KYCL1            string  `json:"kycL1,omitempty"`
	KYCL2            string  `json:"kycL2,omitempty"`
	UserEmail        string  `json:"userEmail,omitempty"`
}

type Notification struct {
	ID            string `json:"id"`
	Category      string `json:"category"`
	CategoryLabel string `json:"categoryLabel"`
	Title         string `json:"title"`
	Desc          string `json:"desc"`
	Time          string `json:"time"`
	IsUnread      bool   `json:"isUnread"`
	UserEmail     string `json:"userEmail,omitempty"`
}

type ResetToken struct {
	Email      string `json:"email"`
	TokenHash  string `json:"tokenHash"`
	ExpiresAt  string `json:"expiresAt"`
	ConsumedAt string `json:"consumedAt,omitempty"`
	CreatedAt  string `json:"createdAt"`
}

type AuditLog struct {
	ID          string         `json:"id"`
	ActorEmail  string         `json:"actorEmail"`
	ActorRole   *Role          `json:"actorRole"`
	Action      string         `json:"action"`
	TargetEmail string         `json:"targetEmail,omitempty"`
	Metadata    map[string]any `json:"metadata,omitempty"`
	CreatedAt   string         `json:"createdAt"`
}

type Parameters struct {
	CommissionLevels map[string]float64 `json:"commissionLevels"`
	WithdrawalFee    float64            `json:"withdrawalFee"`
	L1UnlockRatio    float64            `json:"l1UnlockRatio"`
	APIPriceURL      string             `json:"apiPriceUrl"`
}

type Plan struct {
	ID              string  `json:"id"`
	Name            string  `json:"name"`
	Price           float64 `json:"price"`
	GiftRatio       float64 `json:"giftRatio"`
	BuyRatio        float64 `json:"buyRatio"`
	QueueRatio      float64 `json:"queueRatio"`
	CommissionLimit float64 `json:"commissionLimit"`
	Status          string  `json:"status"`
	Description     string  `json:"description"`
	IsPopular       bool    `json:"isPopular,omitempty"`
}

type Database struct {
	Users              []User         `json:"users"`
	Transactions       []Transaction  `json:"transactions"`
	Notifications      []Notification `json:"notifications"`
	Downlines          []Downline     `json:"downlines"`
	PendingWithdrawals []Transaction  `json:"pendingWithdrawals"`
	ResetTokens        []ResetToken   `json:"resetTokens,omitempty"`
	AuditLogs          []AuditLog     `json:"auditLogs,omitempty"`
	Parameters         *Parameters    `json:"parameters,omitempty"`
	Plans              []Plan         `json:"plans,omitempty"`
}
