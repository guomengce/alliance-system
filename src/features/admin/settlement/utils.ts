import type { SettleLog } from './types';

export const createSettleLog = (): SettleLog => ({
  id: `STL-${Math.floor(1000 + Math.random() * 9000)}`,
  date: new Date().toISOString().split('T')[0],
  ordersCount: 4,
  totalCommissions: 8400.00,
  status: 'completed'
});
