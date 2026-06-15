import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';

export type AdminPlanDto = Record<string, unknown>;

export const adminPlansApi = {
  list: (query: PaginationQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<AdminPlanDto>>>('/admin/plans', { query })
  ),
  create: (payload: Partial<AdminPlanDto>) => (
    apiClient.post<ApiEnvelope<AdminPlanDto>, Partial<AdminPlanDto>>('/admin/plans', payload)
  ),
  update: (planId: string, payload: Partial<AdminPlanDto>) => (
    apiClient.patch<ApiEnvelope<AdminPlanDto>, Partial<AdminPlanDto>>(`/admin/plans/${planId}`, payload)
  )
};
