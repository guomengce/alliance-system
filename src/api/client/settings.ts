import { apiClient } from '../request';
import type { ApiEnvelope } from '../types';
import type { ActiveDevice } from '../../features/client/settings/types';

export interface ClientSettingsDto {
  nickname: string;
  email: string;
  twoFAEnabled: boolean;
  activeDevices: ActiveDevice[];
}

export interface ClientChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export const clientSettingsApi = {
  get: () => (
    apiClient.get<ApiEnvelope<ClientSettingsDto>>('/client/settings')
  ),
  update: (payload: Partial<ClientSettingsDto>) => (
    apiClient.patch<ApiEnvelope<ClientSettingsDto>, Partial<ClientSettingsDto>>('/client/settings', payload)
  ),
  changePassword: (payload: ClientChangePasswordPayload) => (
    apiClient.post<ApiEnvelope<null>, ClientChangePasswordPayload>('/client/settings/password', payload)
  )
};

export const getClientSettings = async (): Promise<ClientSettingsDto> => {
  const response = await clientSettingsApi.get();
  return {
    ...response.data,
    activeDevices: response.data.activeDevices.map((device) => ({ ...device }))
  };
};

export const updateClientSettings = async (
  payload: Partial<ClientSettingsDto>
): Promise<ClientSettingsDto> => {
  const response = await clientSettingsApi.update(payload);
  return {
    ...response.data,
    activeDevices: response.data.activeDevices.map((device) => ({ ...device }))
  };
};

export const changeClientPassword = async (payload: ClientChangePasswordPayload): Promise<void> => {
  await clientSettingsApi.changePassword(payload);
};
