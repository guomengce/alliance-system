import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';
import type { CommissionHistoryItem, CommissionRatio } from '../../features/client/commission/types';
import { getInitialClientCommissionData } from '../../mock/client/commission';

export interface ClientCommissionSummaryDto {
  cumulativeCommissions: number;
  pendingBalance: number;
  arrivedCommissions: number;
  failedCommissions: number;
  commissionPoolLimit: number;
  commissionPoolRemaining: number;
}

export interface ClientCommissionRecordDto extends CommissionHistoryItem {}

export interface ClientCommissionWithdrawPayload {
  amount: number;
  address?: string;
}

export const clientCommissionApi = {
  getSummary: () => (
    apiClient.get<ApiEnvelope<ClientCommissionSummaryDto>>('/client/commissions/summary')
  ),
  listRatios: () => (
    apiClient.get<ApiEnvelope<CommissionRatio[]>>('/client/commissions/ratios')
  ),
  listRecords: (query: PaginationQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<ClientCommissionRecordDto>>>('/client/commissions/records', { query })
  ),
  withdraw: (payload: ClientCommissionWithdrawPayload) => (
    apiClient.post<ApiEnvelope<ClientCommissionRecordDto>, ClientCommissionWithdrawPayload>('/client/commissions/withdrawals', payload)
  )
};

export const getClientCommissionRatios = async (): Promise<CommissionRatio[]> => {
  const response = await clientCommissionApi.listRatios();
  return response.data.map((ratio) => ({ ...ratio }));
};

export const getClientCommissionHistory = async (): Promise<CommissionHistoryItem[]> => {
  const response = await clientCommissionApi.listRecords();
  return response.data.items.map((record) => ({ ...record }));
};

export const getFallbackClientCommissionData = getInitialClientCommissionData;
