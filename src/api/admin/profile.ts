import { apiClient } from '../request';
import type { ApiEnvelope } from '../types';
import type { AdminRole } from '../../hooks/types';

export interface AdminProfileDto {
  uid: string;
  nickname: string;
  email: string;
  role: AdminRole;
  twoFAEnabled: boolean;
}

export interface AdminPasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export const adminProfileApi = {
  get: () => (
    apiClient.get<ApiEnvelope<AdminProfileDto>>('/admin/profile')
  ),
  update: (payload: Partial<AdminProfileDto>) => (
    apiClient.patch<ApiEnvelope<AdminProfileDto>, Partial<AdminProfileDto>>('/admin/profile', payload)
  ),
  changePassword: (payload: AdminPasswordPayload) => (
    apiClient.post<ApiEnvelope<null>, AdminPasswordPayload>('/admin/profile/password', payload)
  )
};

export const getAdminProfile = async (): Promise<AdminProfileDto> => {
  const response = await adminProfileApi.get();
  return { ...response.data };
};

export const updateAdminProfile = async (
  payload: Partial<AdminProfileDto>
): Promise<AdminProfileDto> => {
  const response = await adminProfileApi.update(payload);
  return { ...response.data };
};

export const changeAdminPassword = async (payload: AdminPasswordPayload): Promise<void> => {
  await adminProfileApi.changePassword(payload);
};
