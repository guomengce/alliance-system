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

export const adminProfileApi = {
  get: () => (
    apiClient.get<ApiEnvelope<AdminProfileDto>>('/admin/profile')
  ),
  update: (payload: Partial<AdminProfileDto>) => (
    apiClient.patch<ApiEnvelope<AdminProfileDto>, Partial<AdminProfileDto>>('/admin/profile', payload)
  )
};
