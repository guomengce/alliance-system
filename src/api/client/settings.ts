import { apiClient } from '../request';
import type { ApiEnvelope } from '../types';

export type ClientSettingsDto = Record<string, unknown>;

export const clientSettingsApi = {
  get: () => (
    apiClient.get<ApiEnvelope<ClientSettingsDto>>('/client/settings')
  ),
  update: (payload: Partial<ClientSettingsDto>) => (
    apiClient.patch<ApiEnvelope<ClientSettingsDto>, Partial<ClientSettingsDto>>('/client/settings', payload)
  ),
  changePassword: (payload: Record<string, unknown>) => (
    apiClient.post<ApiEnvelope<null>, Record<string, unknown>>('/client/settings/password', payload)
  )
};
