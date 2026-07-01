import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';
import type { AdminLog } from '../../features/admin/logs/types';

export interface AdminLogDto extends AdminLog {}

export interface AdminLogsQuery extends PaginationQuery {
  category?: string;
  severity?: string;
}

export interface CreateAdminLogPayload {
  index?: number;
}

export const adminLogsApi = {
  list: (query: AdminLogsQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<AdminLogDto>>>('/admin/logs', { query })
  ),
  create: (payload: CreateAdminLogPayload = {}) => (
    apiClient.post<ApiEnvelope<AdminLogDto>, CreateAdminLogPayload>('/admin/logs', payload)
  )
};

export const getAdminLogs = async (query: AdminLogsQuery = {}): Promise<AdminLog[]> => {
  const response = await adminLogsApi.list(query);
  return response.data.items.map((log) => ({ ...log }));
};

export const createAdminLog = async (payload: CreateAdminLogPayload = {}): Promise<AdminLog> => {
  const response = await adminLogsApi.create(payload);
  return { ...response.data };
};
