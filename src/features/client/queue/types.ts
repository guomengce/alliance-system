import type { Dispatch, SetStateAction, UIEvent } from 'react';
import type { Transaction } from '../../../types';

export interface QueueViewProps {
  usdtBalance: number;
  lockedQueueAmount: number;
  originalLockedQueue: number;
  releasedQueueAmount: number;
  commissionPoolLimit: number;
  commissionPoolRemaining: number;
  onUpdateBalances: (usdtDiff: number, trooDiff: number, lockedDiff?: number) => void;
  onAddTransaction: (txn: Transaction) => void;
  onExecuteSimulation: (purchaseAmt: number, commissionPercent: number, subUid: string, subPlanName: string) => {
    totalRebate: number;
    userAEarned: number;
    overflowAmount: number;
    actualUnlocked: number;
    trooFromUnlock: number;
    unlockEntitled: number;
  };
}

export interface UnlockRecord {
  id: string;
  time: string;
  triggerSource: string;
  unlockedAmount: number;
  trooBought: number;
}

export interface QueueOrderItem {
  id: string;
  name: string;
  amount: number;
  originalLock: number;
  released: number;
  remainingLock: number;
  status: 'released' | 'partially_released' | 'queueing';
  statusLabel: string;
  unlockHistory?: UnlockRecord[];
}

export interface ReleaseLogItem {
  id: string;
  date: string;
  desc: string;
}

export type OrderStatusFilter = 'all' | 'queueing' | 'partially_released' | 'released';

export interface AlertSuccessState {
  show: boolean;
  unlockedSum: number;
  uid: string;
}

export interface InlineAlertsProps {
  infoMessage: string;
  alertSuccess: AlertSuccessState;
  onCloseInfo: () => void;
}

export interface ProgressCardProps {
  originalLocked: number;
  releasedAmount: number;
  remainingLocked: number;
  overallProgressPercent: number;
}

export interface OrdersPanelProps {
  filteredOrders: QueueOrderItem[];
  orderSearchQuery: string;
  orderStatusFilter: OrderStatusFilter;
  visibleOrdersCount: number;
  loadingMoreOrders: boolean;
  selectedDetailOrder: QueueOrderItem | null;
  onOrdersScroll: (e: UIEvent<HTMLDivElement>) => void;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onStatusFilterChange: (status: OrderStatusFilter) => void;
  onSelectDetailOrder: Dispatch<SetStateAction<QueueOrderItem | null>>;
  onCloseDetailOrder: () => void;
  onLoadMoreOrders: () => void;
}

export interface ReleaseLogPanelProps {
  releaseLogs: ReleaseLogItem[];
  visibleLogsCount: number;
  loadingMoreLogs: boolean;
  onLogsScroll: (e: UIEvent<HTMLDivElement>) => void;
  onLoadMoreLogs: () => void;
}

export interface DetailModalProps {
  selectedDetailOrder: QueueOrderItem | null;
  onClose: () => void;
}
