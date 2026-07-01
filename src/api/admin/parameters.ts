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

export const getAdminParameters = async (): Promise<AdminParametersDto> => {
  const response = await adminParametersApi.get();
  return {
    ...response.data,
    commissionLevels: { ...response.data.commissionLevels }
  };
};

export const updateAdminParameters = async (
  payload: Partial<AdminParametersDto>
): Promise<AdminParametersDto> => {
  const response = await adminParametersApi.update(payload);
  return {
    ...response.data,
    commissionLevels: { ...response.data.commissionLevels }
  };
};
