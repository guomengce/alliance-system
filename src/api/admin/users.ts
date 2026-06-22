import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';
import type { DownlineMember } from '../../types';

export interface AdminUserDto extends DownlineMember {}

export interface AdminUsersQuery extends PaginationQuery {
  keyword?: string;
  status?: string;
  level?: string;
}

export const adminUsersApi = {
  list: (query: AdminUsersQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<AdminUserDto>>>('/admin/users', { query })
  ),
  detail: (userId: string) => (
    apiClient.get<ApiEnvelope<AdminUserDto>>(`/admin/users/${userId}`)
  ),
  update: (userId: string, payload: Partial<AdminUserDto>) => (
    apiClient.patch<ApiEnvelope<AdminUserDto>, Partial<AdminUserDto>>(`/admin/users/${userId}`, payload)
  )
};
