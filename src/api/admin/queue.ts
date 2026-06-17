import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';

export type AdminQueueOrderDto = Record<string, unknown>;

export interface AdminQueueQuery extends PaginationQuery {
  keyword?: string;
  status?: string;
}

export const adminQueueApi = {
  list: (query: AdminQueueQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<AdminQueueOrderDto>>>('/admin/queue/orders', { query })
  ),
  detail: (orderId: string) => (
    apiClient.get<ApiEnvelope<AdminQueueOrderDto>>(`/admin/queue/orders/${orderId}`)
  )
};
