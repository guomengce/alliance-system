import { apiClient } from '../request';
import type { ApiEnvelope } from '../types';

export type ClientMemberDto = Record<string, unknown>;

export const clientMemberApi = {
  getProfile: () => (
    apiClient.get<ApiEnvelope<ClientMemberDto>>('/client/member/profile')
  ),
  updateProfile: (payload: Partial<ClientMemberDto>) => (
    apiClient.patch<ApiEnvelope<ClientMemberDto>, Partial<ClientMemberDto>>('/client/member/profile', payload)
  )
};
