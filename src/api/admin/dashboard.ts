import { apiClient } from '../request';
import type { ApiEnvelope } from '../types';
import type { TrooMarketDataPoint, TrendDataPoint } from '../../features/admin/dashboard/types';

export interface AdminDashboardDto {
  usdtBalance: number;
  lockedQueueAmount: number;
  reserveBalance: number;
  trooMarketData: TrooMarketDataPoint[];
  trendData: TrendDataPoint[];
}

export const adminDashboardApi = {
  getOverview: () => (
    apiClient.get<ApiEnvelope<AdminDashboardDto>>('/admin/dashboard/overview')
  )
};
