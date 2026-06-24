import { backendApiClient } from '../request';
import type { BackendMessageResponse } from '../types';

export interface BackendBroadcastRequest {
  title: string;
  desc: string;
  target: string;
}

export const backendAdminBroadcastApi = {
  send: (payload: BackendBroadcastRequest) => (
    backendApiClient.post<BackendMessageResponse, BackendBroadcastRequest>('/admin/broadcast', payload)
  )
};
