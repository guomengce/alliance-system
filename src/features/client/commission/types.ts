import type { Dispatch, SetStateAction } from 'react';
import type { Transaction } from '../../../types';

export interface CommissionViewProps {
  cumulativeCommissions: number;
  pendingBalance: number;
  arrivedCommissions: number;
  failedCommissions: number;
  commissionPoolLimit: number;
  commissionPoolRemaining: number;
  onWithdrawCommissions: () => void;
  onAddTransaction: (txn: Transaction) => void;
  onIncreaseLimit?: (amount: number) => void;
  setActiveTab?: (tab: string) => void;
}

export type HistoryFilter = 'all' | 'pending' | 'success';

export interface CommissionRatio {
  id: string;
  name: string;
  ratio: string;
  cycle: string;
  status: string;
}

export interface CommissionHistoryItem {
  id: string;
  user: string;
  userLetter: string;
  amount: number;
  level: string;
  reward: number;
  time: string;
  status: string;
  statusLabel: string;
}

export interface HeaderProps {
  onIncreaseLimit: () => void;
  onExport: () => void;
}

export interface StatsAndPoolProps {
  cumulativeCommissions: number;
  pendingBalance: number;
  arrivedCommissions: number;
  failedCommissions: number;
  commissionPoolLimit: number;
  commissionPoolRemaining: number;
}

export interface RatiosTableProps {
  ratios: CommissionRatio[];
}

export interface HistoryLedgerProps {
  filteredHistory: CommissionHistoryItem[];
  activeFilter: HistoryFilter;
  setActiveFilter: Dispatch<SetStateAction<HistoryFilter>>;
}
