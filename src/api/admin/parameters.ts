import { apiClient } from '../request';
import type { ApiEnvelope } from '../types';

export type AdminParametersDto = Record<string, unknown>;

export const adminParametersApi = {
  get: () => (
    apiClient.get<ApiEnvelope<AdminParametersDto>>('/admin/parameters')
  ),
  update: (payload: Partial<AdminParametersDto>) => (
    apiClient.patch<ApiEnvelope<AdminParametersDto>, Partial<AdminParametersDto>>('/admin/parameters', payload)
  )
};
