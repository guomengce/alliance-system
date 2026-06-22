import { apiClient } from '../request';
import type { ApiEnvelope } from '../types';
import type { RecentActivity } from '../../features/client/member/types';

export interface ClientMemberDto {
  uid: string;
  nickname: string;
  joinDate: string;
  remainingCredit: number;
  totalCredit: number;
  recentActivities: RecentActivity[];
}

export const clientMemberApi = {
  getProfile: () => (
    apiClient.get<ApiEnvelope<ClientMemberDto>>('/client/member/profile')
  ),
  updateProfile: (payload: Partial<ClientMemberDto>) => (
    apiClient.patch<ApiEnvelope<ClientMemberDto>, Partial<ClientMemberDto>>('/client/member/profile', payload)
  )
};
