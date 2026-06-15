import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';

export type AdminLogDto = Record<string, unknown>;

export interface AdminLogsQuery extends PaginationQuery {
  category?: string;
  severity?: string;
}

export const adminLogsApi = {
  list: (query: AdminLogsQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<AdminLogDto>>>('/admin/logs', { query })
  )
};
