import type { SettlementItem, SettleLog } from './types';

export const createSettleLog = (): SettleLog => ({
  id: `STL-${Math.floor(1000 + Math.random() * 9000)}`,
  date: new Date().toISOString().split('T')[0],
  ordersCount: 4,
  totalCommissions: 8400.00,
  status: 'completed'
});

export const resolveSettlementException = (
  transactions: SettlementItem[],
  txId: string
) => transactions.map(tx => (
  tx.id === txId
    ? {
        ...tx,
        remainingPoolCapacity: 10000,
        actualSettledAmount: tx.expectedCommissions,
        spilloverClipped: 0,
        status: 'fully_settled' as const
      }
    : tx
));

export const markLowCapacityNotified = (
  transactions: SettlementItem[],
  txId: string
) => transactions.map(tx => (
  tx.id === txId
    ? { ...tx, status: 'low_capacity_notified' as const }
    : tx
));
