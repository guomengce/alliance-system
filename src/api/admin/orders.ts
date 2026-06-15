import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';

export type AdminOrderDto = Record<string, unknown>;

export interface AdminOrdersQuery extends PaginationQuery {
  keyword?: string;
  status?: string;
  type?: string;
}

export const adminOrdersApi = {
  list: (query: AdminOrdersQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<AdminOrderDto>>>('/admin/orders', { query })
  ),
  detail: (orderId: string) => (
    apiClient.get<ApiEnvelope<AdminOrderDto>>(`/admin/orders/${orderId}`)
  )
};
