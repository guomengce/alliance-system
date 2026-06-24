export type BackendPortalMode = 'client' | 'admin';
export type BackendAdminRole = 'SUPER_ADMIN' | 'FINANCE_DIR' | 'RISK_OFFICER' | 'OPERATOR' | null;

export interface BackendMessageResponse {
  message: string;
}

export interface BackendErrorPayload {
  error?: string;
  message?: string;
  code?: string;
  details?: unknown;
}

export interface BackendUserDto {
  email: string;
  nickname: string;
  portalMode: BackendPortalMode;
  role: BackendAdminRole;
  usdtBalance: number;
  trooBalance: number;
  lockedQueueAmount: number;
  originalLockedQueue: number;
  releasedQueueAmount: number;
  commissionPoolLimit: number;
  commissionPoolRemaining: number;
  pendingBalance: number;
  cumulativeCommissions: number;
  arrivedCommissions: number;
  failedCommissions: number;
  yesterdayRevenue: number;
  totalCredit: number;
  remainingCredit: number;
  twoFAEnabled: boolean;
}

export interface BackendBlockchainProofDto {
  txid: string;
  blockHeight?: number;
  confirmations?: number;
  network?: string;
  gasFee?: number;
  fromAddress?: string;
  toAddress?: string;
  timestamp?: string;
  consensusStatus?: string;
}

export interface BackendTransactionDto {
  id: string;
  type: string;
  typeLabel: string;
  desc: string;
  amount: number;
  currency: string;
  time: string;
  status: string;
  statusLabel: string;
  blockchainProof?: BackendBlockchainProofDto;
  userEmail?: string;
}

export interface BackendDownlineDto {
  uid: string;
  level: string;
  tier: string;
  registrationDate: string;
  nodeSize: number;
  volume: number;
  avatarLetter: string;
  invested: number;
  nickname?: string;
  email?: string;
  phone?: string;
  sponsor?: string;
  password?: string;
  status?: string;
  usdtBalance?: number;
  trooBalance?: number;
  pendingBalance?: number;
  frozenBalance?: number;
  kycL1?: string;
  kycL2?: string;
  userEmail?: string;
}

export interface BackendNotificationDto {
  id: string;
  category: string;
  categoryLabel: string;
  title: string;
  desc: string;
  time: string;
  isUnread: boolean;
  userEmail?: string;
}

export interface BackendParametersDto {
  commissionLevels: Record<string, number>;
  withdrawalFee: number;
  l1UnlockRatio: number;
  apiPriceUrl: string;
}

export interface BackendPlanDto {
  id: string;
  name: string;
  price: number;
  giftRatio: number;
  buyRatio: number;
  queueRatio: number;
  commissionLimit: number;
  status: string;
  description: string;
  isPopular?: boolean;
}

export interface BackendUserStateResponse {
  user: BackendUserDto;
  transactions: BackendTransactionDto[];
  notifications: BackendNotificationDto[];
  downlines: BackendDownlineDto[];
  pendingWithdrawals: BackendTransactionDto[];
}
