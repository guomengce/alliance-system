import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';
import type { DownlineMember } from '../../types';

export interface ClientTeamSummaryDto {
  totalMembers: number;
  activeMembers: number;
  totalVolume: number;
}

export interface ClientTeamMemberDto extends DownlineMember {}

export const clientTeamApi = {
  getSummary: () => (
    apiClient.get<ApiEnvelope<ClientTeamSummaryDto>>('/client/team/summary')
  ),
  listMembers: (query: PaginationQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<ClientTeamMemberDto>>>('/client/team/members', { query })
  )
};

export const getClientTeamSummary = async (): Promise<ClientTeamSummaryDto> => {
  const response = await clientTeamApi.getSummary();
  return { ...response.data };
};

export const getClientTeamMembers = async (
  query: PaginationQuery = {}
): Promise<DownlineMember[]> => {
  const response = await clientTeamApi.listMembers(query);
  return response.data.items.map((member) => ({ ...member }));
};
