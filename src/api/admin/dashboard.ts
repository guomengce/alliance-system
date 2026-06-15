import { apiClient } from '../request';
import type { ApiEnvelope } from '../types';

export type AdminDashboardDto = Record<string, unknown>;

export const adminDashboardApi = {
  getOverview: () => (
    apiClient.get<ApiEnvelope<AdminDashboardDto>>('/admin/dashboard/overview')
  )
};
