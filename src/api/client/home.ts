import { apiClient } from '../request';
import type { ApiEnvelope } from '../types';

export type ClientHomeDto = Record<string, unknown>;

export const clientHomeApi = {
  getOverview: () => (
    apiClient.get<ApiEnvelope<ClientHomeDto>>('/client/home/overview')
  )
};
