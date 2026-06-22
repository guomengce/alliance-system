import type { TrendDataPoint } from '../../features/admin/dashboard/types';

const ADMIN_TREND_DATA: TrendDataPoint[] = [
  { date: '05-23', sub: 45000, comm: 18000, val: 45 },
  { date: '05-24', sub: 60000, comm: 24000, val: 60 },
  { date: '05-25', sub: 48000, comm: 19200, val: 48 },
  { date: '05-26', sub: 70000, comm: 28000, val: 70 },
  { date: '05-27', sub: 92000, comm: 36800, val: 92 },
  { date: '05-28', sub: 110000, comm: 44000, val: 110 },
  { date: '05-29', sub: 85000, comm: 34000, val: 85 }
];

export const getInitialAdminTrendData = (): TrendDataPoint[] => (
  ADMIN_TREND_DATA.map((day) => ({ ...day }))
);
