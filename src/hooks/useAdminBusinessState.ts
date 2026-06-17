import { useState } from 'react';
import type { DownlineMember, Transaction } from '../types';
import { initialDownlines } from '../data';
import type { AddTransactionRecord, RefundUsdtBalance } from './types';

interface AdminBusinessStateDeps {
  addTransactionRecord: AddTransactionRecord;
  refundUsdtBalance: RefundUsdtBalance;
}

const INITIAL_PENDING_WITHDRAWALS: Transaction[] = [
    {
      id: 'TXN-8812903120',
      type: 'withdraw',
      typeLabel: '提现申请',
      desc: '提现至外部钱包 (TRC-20: TXX938aLskj9238fjKdk)',
      amount: -12000.00,
      currency: 'USDT',
      time: '2026-05-29 07:15:11',
      status: 'pending',
      statusLabel: '待审核出账',
      blockchainProof: {
        txid: 'TWe8a9b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b001',
        network: 'TRON Network (TRC-20)',
        gasFee: 1.5,
        fromAddress: 'TJDyZ8f1jUka8Jska271Kshq19Kshq9Kws',
        toAddress: 'TXX938aLskj9238fjKdk',
        timestamp: '2026-05-29 07:15:11',
        consensusStatus: 'Pending Admin Verification'
      }
    },
    {
      id: 'TXN-8812903125',
      type: 'withdraw',
      typeLabel: '提现申请',
      desc: '提现至外部钱包 (ERC-20: 0x923Fjk0293asdf92398)',
      amount: -45000.00,
      currency: 'USDT',
      time: '2026-05-29 08:34:02',
      status: 'pending',
      statusLabel: '待审核出账',
      blockchainProof: {
        txid: '0x923fe8a9b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6789a',
        network: 'Ethereum Mainnet (ERC-20)',
        gasFee: 15.0,
        fromAddress: '0x999001f3014B298CD2abD2110cE45c9288e2231A',
        toAddress: '0x923Fjk0293asdf92398',
        timestamp: '2026-05-29 08:34:02',
        consensusStatus: 'Pending Admin Verification'
      }
    }
  ];

export function useAdminBusinessState({ addTransactionRecord, refundUsdtBalance }: AdminBusinessStateDeps) {
  const [downlines, setDownlines] = useState<DownlineMember[]>(initialDownlines);
  const [pendingWithdrawals, setPendingWithdrawals] = useState<Transaction[]>(INITIAL_PENDING_WITHDRAWALS);

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
      alert(`出款委托流水 ${id} 已审核划付！USDT 已从储备准备金划出至目标公链网络。`);
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
      alert(`出账委托 ${id} 已执行拒绝驳回！提现资金 ${refundAmt} USDT 已全额解冻并退回至超级代理可用余额。`);
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
