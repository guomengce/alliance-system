import { apiClient } from '../request';
import type { ApiEnvelope } from '../types';

export type AdminProfileDto = Record<string, unknown>;

export const adminProfileApi = {
  get: () => (
    apiClient.get<ApiEnvelope<AdminProfileDto>>('/admin/profile')
  ),
  update: (payload: Partial<AdminProfileDto>) => (
    apiClient.patch<ApiEnvelope<AdminProfileDto>, Partial<AdminProfileDto>>('/admin/profile', payload)
  )
};
