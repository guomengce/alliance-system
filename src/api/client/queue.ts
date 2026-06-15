import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';

export type ClientQueueSummaryDto = Record<string, unknown>;
export type ClientQueueOrderDto = Record<string, unknown>;
export type ClientReleaseLogDto = Record<string, unknown>;

export const clientQueueApi = {
  getSummary: () => (
    apiClient.get<ApiEnvelope<ClientQueueSummaryDto>>('/client/queue/summary')
  ),
  listOrders: (query: PaginationQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<ClientQueueOrderDto>>>('/client/queue/orders', { query })
  ),
  listReleaseLogs: (query: PaginationQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<ClientReleaseLogDto>>>('/client/queue/release-logs', { query })
  )
};
