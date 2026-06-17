export interface Transaction {
  id: string;
  type: 'recharge' | 'withdraw' | 'exchange' | 'transfer' | 'commission' | 'subscribe' | 'lock';
  typeLabel: string;
  desc: string;
  amount: number;
  currency: string;
  time: string;
  status: 'success' | 'pending' | 'failed' | 'locked';
  statusLabel: string;
  blockchainProof?: {
    txid: string;
    blockHeight?: number;
    confirmations?: number;
    network?: string;
    gasFee?: number;
    fromAddress?: string;
    toAddress?: string;
    timestamp?: string;
    consensusStatus?: string;
  };
}

export interface DownlineMember {
  uid: string;
  level: 'L1' | 'L2' | 'L3' | 'L4' | 'L5';
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
  status?: 'normal' | 'frozen' | 'disabled';
  usdtBalance?: number;
  trooBalance?: number;
  pendingBalance?: number;
  frozenBalance?: number;
  kycL1?: 'verified' | 'unverified';
  kycL2?: 'verified' | 'pending' | 'unverified';
}

export interface NotificationItem {
  id: string;
  category: 'all' | 'order' | 'commission' | 'system';
  categoryLabel: string;
  title: string;
  desc: string;
  time: string;
  isUnread: boolean;
}

export interface TeamNode {
  id: string;
  level: string; // 'L1', 'L2', 'L3' etc.
  referrals: number;
  volume: number;
  status: string;
}

export interface AppState {
  // Accounts Balance
  usdtBalance: number;
  trooBalance: number;
  pendingBalance: number;
  cumulativeCommissions: number;
  arrivedCommissions: number;
  failedCommissions: number;
  lockedQueueAmount: number;

  // KYC
  nickname: string;
  uid: string;
  joinDate: string;
  kycL1: 'verified' | 'unverified';
  kycL2: 'in_progress' | 'verified' | 'unverified';
  twoFAEnabled: boolean;

  // Collections state
  transactions: Transaction[];
  notifications: NotificationItem[];
  downlines: DownlineMember[];
}
