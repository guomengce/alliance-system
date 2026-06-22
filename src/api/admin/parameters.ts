import { apiClient } from '../request';
import type { ApiEnvelope } from '../types';
import type { CommissionLevels } from '../../features/admin/parameters/types';

export interface AdminParametersDto {
  commissionLevels: CommissionLevels;
  withdrawalFee: number;
  l1UnlockRatio: number;
  apiPriceUrl: string;
}

export const adminParametersApi = {
  get: () => (
    apiClient.get<ApiEnvelope<AdminParametersDto>>('/admin/parameters')
  ),
  update: (payload: Partial<AdminParametersDto>) => (
    apiClient.patch<ApiEnvelope<AdminParametersDto>, Partial<AdminParametersDto>>('/admin/parameters', payload)
  )
};
