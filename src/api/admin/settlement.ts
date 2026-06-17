import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';

export type AdminSettlementDto = Record<string, unknown>;

export const adminSettlementApi = {
  list: (query: PaginationQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<AdminSettlementDto>>>('/admin/settlements', { query })
  ),
  execute: (settlementId: string) => (
    apiClient.post<ApiEnvelope<AdminSettlementDto>>(`/admin/settlements/${settlementId}/execute`)
  )
};
