import type { Dispatch, SetStateAction } from 'react';

export interface SettlementItem {
  id: string;
  memberUid: string;
  nickname: string;
  date: string;
  expectedCommissions: number;      // 预核算应派发佣金
  remainingPoolCapacity: number;     // 归属会员仍有佣金额度额
  actualSettledAmount: number;       // 实际抵扣并发放出的数额
  spilloverClipped: number;          // 自动溢出截流拦截数 (扣入Reserve大总仓)
  status: 'fully_settled' | 'clipped' | 'stalled_exception' | 'low_capacity_notified';
  contactEmail: string;
}

export interface SettleLog {
  id: string;
  date: string;
  ordersCount: number;
  totalCommissions: number;
  status: 'completed' | 'pending' | 'failed';
}

export interface AdminSettlementViewProps {
  onUpdateBalances: (usdtDiff: number, trooDiff: number) => void;
}

export interface WorkspaceProps {
  settlementTransactions: SettlementItem[];
  manualSettleLoading: boolean;
  selectedTx: SettlementItem | null;
  setSelectedTx: Dispatch<SetStateAction<SettlementItem | null>>;
  handleResolveException: (txId: string) => void;
  handleNotifyInsufficientCapacity: (tx: SettlementItem) => void;
  triggerManualSettlement: () => void;
}
