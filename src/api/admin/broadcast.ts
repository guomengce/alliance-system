import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';
import { INITIAL_ADMIN_BROADCAST_CONFIG_DTO } from '../../mock/admin/broadcast';

export interface AdminBroadcastDto {
  id?: string;
  title: string;
  body: string;
  target: string;
  createdAt?: string;
}

export interface AdminBroadcastConfigDto {
  notificationTemplate: string;
  broadcastTitle: string;
  broadcastBody: string;
  broadcastTarget: string;
}

export const adminBroadcastApi = {
  list: (query: PaginationQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<AdminBroadcastDto>>>('/admin/broadcasts', { query })
  ),
  getConfig: () => (
    apiClient.get<ApiEnvelope<AdminBroadcastConfigDto>>('/admin/broadcasts/config')
  ),
  send: (payload: Partial<AdminBroadcastDto>) => (
    apiClient.post<ApiEnvelope<AdminBroadcastDto>, Partial<AdminBroadcastDto>>('/admin/broadcasts', payload)
  )
};

export const mapAdminBroadcastConfigDto = (
  dto: AdminBroadcastConfigDto
): AdminBroadcastConfigDto => ({
  notificationTemplate: dto.notificationTemplate,
  broadcastTitle: dto.broadcastTitle,
  broadcastBody: dto.broadcastBody,
  broadcastTarget: dto.broadcastTarget
});

export const getInitialAdminBroadcastConfig = (): AdminBroadcastConfigDto => (
  mapAdminBroadcastConfigDto(INITIAL_ADMIN_BROADCAST_CONFIG_DTO)
);

export const getAdminBroadcastConfig = async (): Promise<AdminBroadcastConfigDto> => {
  const response = await adminBroadcastApi.getConfig();
  return mapAdminBroadcastConfigDto(response.data);
};

export const sendAdminBroadcast = async (
  payload: Partial<AdminBroadcastDto>
): Promise<AdminBroadcastDto> => {
  const response = await adminBroadcastApi.send(payload);
  return { ...response.data };
};
