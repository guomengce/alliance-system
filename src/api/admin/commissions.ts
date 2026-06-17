import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';

export type AdminCommissionDto = Record<string, unknown>;

export interface AdminCommissionsQuery extends PaginationQuery {
  keyword?: string;
  status?: string;
}

export const adminCommissionsApi = {
  list: (query: AdminCommissionsQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<AdminCommissionDto>>>('/admin/commissions', { query })
  )
};
