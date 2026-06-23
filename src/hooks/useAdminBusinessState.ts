import { useState } from 'react';
import type { DownlineMember, Transaction } from '../types';
import { getInitialPendingWithdrawals } from '../mock/adminBusiness';
import { initialDownlines } from '../mock/data';
import type { AddTransactionRecord, GlobalAlertType, RefundUsdtBalance } from './types';

interface AdminBusinessStateDeps {
  addTransactionRecord: AddTransactionRecord;
  refundUsdtBalance: RefundUsdtBalance;
  triggerGlobalAlert: (message: string, type?: GlobalAlertType) => void;
}

export function useAdminBusinessState({
  addTransactionRecord,
  refundUsdtBalance,
  triggerGlobalAlert
}: AdminBusinessStateDeps) {
  const [downlines, setDownlines] = useState<DownlineMember[]>(initialDownlines);
  const [pendingWithdrawals, setPendingWithdrawals] = useState<Transaction[]>(() => getInitialPendingWithdrawals());

  const addPendingWithdrawal = (newTxn: Transaction) => {
    setPendingWithdrawals(prev => [newTxn, ...prev]);
  };

  const handleApproveWithdrawal = (id: string) => {
    const cashout = pendingWithdrawals.find(w => w.id === id);
    if (cashout) {
      const newRecord: Transaction = {
        ...cashout,
        status: 'success',
        statusLabel: '出账成功'
      };
      addTransactionRecord(newRecord);
      setPendingWithdrawals(prev => prev.filter(w => w.id !== id));
      triggerGlobalAlert(`出款委托流水 ${id} 已审核划付！USDT 已从储备准备金划出至目标公链网络。`, 'success');
    }
  };

  const handleRejectWithdrawal = (id: string) => {
    const cashout = pendingWithdrawals.find(w => w.id === id);
    if (cashout) {
      const refundAmt = Math.abs(cashout.amount);
      refundUsdtBalance(refundAmt);

      const newRecord: Transaction = {
        ...cashout,
        status: 'failed',
        statusLabel: '退回驳回'
      };
      addTransactionRecord(newRecord);
      setPendingWithdrawals(prev => prev.filter(w => w.id !== id));
      triggerGlobalAlert(`出账委托 ${id} 已执行拒绝驳回！提现资金 ${refundAmt} USDT 已全额解冻并退回至超级代理可用余额。`, 'warning');
    }
  };

  return {
    downlines,
    setDownlines,
    pendingWithdrawals,
    setPendingWithdrawals,
    addPendingWithdrawal,
    handleApproveWithdrawal,
    handleRejectWithdrawal
  };
}
