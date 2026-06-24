import { backendApiClient } from './request';

export interface BackendHealthResponse {
  status: 'ok';
  serverTime: string;
}

export const backendHealthApi = {
  check: () => backendApiClient.get<BackendHealthResponse>('/health')
};
