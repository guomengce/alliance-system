import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';

export type ClientPlanDto = Record<string, unknown>;
export type ClientSubscribeOrderDto = Record<string, unknown>;

export const clientSubscribeApi = {
  listPlans: (query: PaginationQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<ClientPlanDto>>>('/client/subscribe/plans', { query })
  ),
  createOrder: (payload: Record<string, unknown>) => (
    apiClient.post<ApiEnvelope<ClientSubscribeOrderDto>, Record<string, unknown>>('/client/subscribe/orders', payload)
  )
};
