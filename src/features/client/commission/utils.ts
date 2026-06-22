import type { CommissionHistoryItem, HistoryFilter } from './types';
import type { Transaction } from '../../../types';

export function filterCommissionHistory(
  historyList: CommissionHistoryItem[],
  activeFilter: HistoryFilter
) {
  return historyList.filter(item => {
    if (activeFilter === 'pending' && item.status !== 'pending') return false;
    if (activeFilter === 'success' && item.status !== 'success') return false;
    return true;
  });
}

export function getCommissionPoolMetrics(
  commissionPoolLimit: number,
  commissionPoolRemaining: number
) {
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const usedPercent = commissionPoolLimit > 0 
    ? ((commissionPoolLimit - commissionPoolRemaining) / commissionPoolLimit) * 100
    : 0;
  const percent = 100 - usedPercent;
  const strokeDashoffset = circumference - (usedPercent / 100) * circumference;
  const consumedAmount = commissionPoolLimit - commissionPoolRemaining;

  return {
    radius,
    circumference,
    usedPercent,
    percent,
    strokeDashoffset,
    consumedAmount
  };
}

interface BuildCommissionTransactionOptions {
  now?: () => Date;
}

export function buildCommissionWithdrawalTransaction(
  amount: number,
  { now = () => new Date() }: BuildCommissionTransactionOptions = {}
): Transaction {
  return {
    id: `TXN-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    type: 'commission',
    typeLabel: '佣金到账',
    desc: 'D+1系统自动汇总代收佣金划转 (模拟测试日结完成)',
    amount,
    currency: 'USDT',
    time: now().toISOString().replace('T', ' ').slice(0, 19),
    status: 'success',
    statusLabel: '成功'
  };
}
