import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';

export type AdminBroadcastDto = Record<string, unknown>;

export const adminBroadcastApi = {
  list: (query: PaginationQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<AdminBroadcastDto>>>('/admin/broadcasts', { query })
  ),
  send: (payload: Partial<AdminBroadcastDto>) => (
    apiClient.post<ApiEnvelope<AdminBroadcastDto>, Partial<AdminBroadcastDto>>('/admin/broadcasts', payload)
  )
};
