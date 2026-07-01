import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';
import type { DownlineMember } from '../../types';
import type {
  AdminTeamMemberApiDto,
  AdminUserApiDto,
  AdminUsersApiResponse
} from '../../features/admin/users/types';

export interface AdminUserDto extends DownlineMember {}

export interface AdminUsersQuery extends PaginationQuery {
  keyword?: string;
  status?: string;
  level?: string;
}

export const adminUsersApi = {
  list: (query: AdminUsersQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<AdminUserDto>>>('/admin/users', { query })
  ),
  detail: (userId: string) => (
    apiClient.get<ApiEnvelope<AdminUserDto>>(`/admin/users/${userId}`)
  ),
  update: (userId: string, payload: Partial<AdminUserDto>) => (
    apiClient.patch<ApiEnvelope<AdminUserDto>, Partial<AdminUserDto>>(`/admin/users/${userId}`, payload)
  )
};

const mapDownlineToAdminUserDto = (member: DownlineMember): AdminUserApiDto => ({
  uid: member.uid,
  level: member.level,
  tierName: member.tier,
  registeredAt: member.registrationDate,
  avatarLetter: member.avatarLetter,
  investedAmount: member.invested,
  profile: {
    nickname: member.nickname ?? '',
    email: member.email ?? '',
    phone: member.phone ?? '',
    sponsor: member.sponsor ?? '',
    status: member.status ?? 'normal'
  },
  wallet: {
    usdtBalance: member.usdtBalance ?? 0,
    frozenBalance: member.frozenBalance ?? 0,
    trooBalance: member.trooBalance ?? 0,
    pendingBalance: member.pendingBalance ?? 0
  },
  team: {
    nodeSize: member.nodeSize,
    volume: member.volume
  },
  kyc: {
    l1: member.kycL1 ?? 'verified',
    l2: member.kycL2 ?? 'unverified'
  }
});

const mapDownlineToTeamMemberDto = (member: DownlineMember): AdminTeamMemberApiDto => ({
  uid: member.uid,
  name: member.nickname ?? member.uid,
  level: member.level,
  nodes: member.nodeSize,
  volume: member.volume
});

export const getAdminUsersResponse = async (
  query: AdminUsersQuery = {}
): Promise<AdminUsersApiResponse> => {
  const response = await adminUsersApi.list(query);
  const members = response.data.items;
  return {
    users: members.map((member) => mapDownlineToAdminUserDto(member)),
    teamMembers: members.map((member) => mapDownlineToTeamMemberDto(member))
  };
};

export const updateAdminUser = async (
  userId: string,
  payload: Partial<AdminUserDto>
): Promise<AdminUserDto> => {
  const response = await adminUsersApi.update(userId, payload);
  return { ...response.data };
};
