import type { Key } from 'react';

export interface CommissionPayout {
  id: string;
  orderId: string;
  uid: string;
  level: string;
  amount: number;
  status: 'credited' | 'pending' | 'failed' | 'pool_insufficient' | 'intercepted';
  time: string;
  recipientNickname: string;
  errorMessage?: string;
  triggerMemberUid?: string;
  triggerMemberLevel?: string;
  triggerRechargeAmount?: number;
}

export interface OverflowLog {
  id: string;
  memberUid: string;
  orderId: string;
  tierLevel: string;
  missingAmount: number;
  time: string;
}

export type ActiveTab = 'all' | 'credited' | 'blocked' | 'intercepted';

export interface SummaryCardsProps {
  totalCreditedAmount: number;
  abnormalAuditCount: number;
  totalOverflowAmount: number;
}

export interface ListProps {
  filteredCommissions: CommissionPayout[];
  commissionSearch: string;
  onCommissionSearchChange: (value: string) => void;
  onClearSearch: () => void;
  activeTab: ActiveTab;
  onActiveTabChange: (tab: ActiveTab) => void;
  onSelectCommission: (commission: CommissionPayout) => void;
}

export interface MobileCardProps {
  key?: Key;
  payout: CommissionPayout;
  onSelectCommission: (commission: CommissionPayout) => void;
}

export interface DesktopTableProps {
  commissions: CommissionPayout[];
  onSelectCommission: (commission: CommissionPayout) => void;
}

export interface StatusBadgeProps {
  status: CommissionPayout['status'];
  variant: 'mobile' | 'desktop';
}

export interface DetailsPanelProps {
  selectedCommission: CommissionPayout;
  onClose: () => void;
  onForcePayout: (payoutId: string) => void;
  onSubmitCommissionAdjustment: (payoutId: string, rawAmount: string) => void;
}
