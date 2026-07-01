import { apiClient } from '../request';
import type { ApiEnvelope } from '../types';
import type {
  AdminDashboardOverviewDto,
  TrooMarketDataPoint,
  TrendDataPoint
} from '../../features/admin/dashboard/types';

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

export const getAdminDashboardOverview = async (): Promise<AdminDashboardOverviewDto> => {
  const response = await adminDashboardApi.getOverview();
  return {
    metrics: {
      totalMembers: 5420,
      todaySubscriptionAmount: response.data.usdtBalance,
      todayCommissionAmount: 15240.22,
      lockedQueueAmount: response.data.lockedQueueAmount,
      reserveBalance: response.data.reserveBalance
    },
    trooMarket: response.data.trooMarketData.map((item) => ({ ...item })),
    trend: response.data.trendData.map((item) => ({
      date: item.date,
      subscriptionAmount: item.sub,
      commissionAmount: item.comm
    }))
  };
};
