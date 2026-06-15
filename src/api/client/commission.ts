import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';

export type ClientCommissionSummaryDto = Record<string, unknown>;
export type ClientCommissionRecordDto = Record<string, unknown>;

export const clientCommissionApi = {
  getSummary: () => (
    apiClient.get<ApiEnvelope<ClientCommissionSummaryDto>>('/client/commissions/summary')
  ),
  listRecords: (query: PaginationQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<ClientCommissionRecordDto>>>('/client/commissions/records', { query })
  ),
  withdraw: (payload: Record<string, unknown>) => (
    apiClient.post<ApiEnvelope<ClientCommissionRecordDto>, Record<string, unknown>>('/client/commissions/withdrawals', payload)
  )
};
