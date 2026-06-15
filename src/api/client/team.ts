import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';

export type ClientTeamSummaryDto = Record<string, unknown>;
export type ClientTeamMemberDto = Record<string, unknown>;

export const clientTeamApi = {
  getSummary: () => (
    apiClient.get<ApiEnvelope<ClientTeamSummaryDto>>('/client/team/summary')
  ),
  listMembers: (query: PaginationQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<ClientTeamMemberDto>>>('/client/team/members', { query })
  )
};
