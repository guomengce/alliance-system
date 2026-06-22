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
