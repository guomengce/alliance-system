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

export const getClientMemberProfile = async (): Promise<ClientMemberDto> => {
  const response = await clientMemberApi.getProfile();
  return {
    ...response.data,
    recentActivities: response.data.recentActivities.map((activity) => ({ ...activity }))
  };
};

export const updateClientMemberProfile = async (
  payload: Partial<ClientMemberDto>
): Promise<ClientMemberDto> => {
  const response = await clientMemberApi.updateProfile(payload);
  return {
    ...response.data,
    recentActivities: response.data.recentActivities.map((activity) => ({ ...activity }))
  };
};
