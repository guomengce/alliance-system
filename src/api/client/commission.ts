import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';
import type { CommissionHistoryItem } from '../../features/client/commission/types';

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
  listRecords: (query: PaginationQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<ClientCommissionRecordDto>>>('/client/commissions/records', { query })
  ),
  withdraw: (payload: ClientCommissionWithdrawPayload) => (
    apiClient.post<ApiEnvelope<ClientCommissionRecordDto>, ClientCommissionWithdrawPayload>('/client/commissions/withdrawals', payload)
  )
};
