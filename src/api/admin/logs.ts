import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';
import type { AdminLog } from '../../features/admin/logs/types';

export interface AdminLogDto extends AdminLog {}

export interface AdminLogsQuery extends PaginationQuery {
  category?: string;
  severity?: string;
}

export const adminLogsApi = {
  list: (query: AdminLogsQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<AdminLogDto>>>('/admin/logs', { query })
  )
};
