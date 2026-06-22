import type { CommissionHistoryItem, HistoryFilter } from './types';

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
