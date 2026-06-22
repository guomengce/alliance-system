import { apiClient } from '../request';
import type { ApiEnvelope } from '../types';
import type { HomeOrder, TrooMarketPoint } from '../../features/client/home/types';
import type { Transaction } from '../../types';

export interface ClientHomeDto {
  usdtBalance: number;
  trooBalance: number;
  lockedQueueAmount: number;
  cumulativeCommissions: number;
  arrivedCommissions: number;
  failedCommissions: number;
  yesterdayRevenue: number;
  remainingCredit: number;
  totalCredit: number;
  transactions: Transaction[];
  marketData: TrooMarketPoint[];
  recentOrders: HomeOrder[];
}

export const clientHomeApi = {
  getOverview: () => (
    apiClient.get<ApiEnvelope<ClientHomeDto>>('/client/home/overview')
  )
};
