import { backendApiClient } from '../request';
import type { BackendMessageResponse, BackendParametersDto } from '../types';

export interface BackendAdminParametersResponse {
  parameters: BackendParametersDto | null;
}

export interface BackendUpdateParametersRequest {
  parameters: BackendParametersDto;
}

export interface BackendUpdateParametersResponse extends BackendMessageResponse {
  parameters: BackendParametersDto;
}

export const backendAdminParametersApi = {
  get: () => backendApiClient.get<BackendAdminParametersResponse>('/admin/parameters'),
  update: (parameters: BackendParametersDto) => (
    backendApiClient.post<BackendUpdateParametersResponse, BackendUpdateParametersRequest>(
      '/admin/parameters',
      { parameters }
    )
  )
};
