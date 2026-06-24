import { backendApiClient } from '../request';
import type { BackendMessageResponse, BackendNotificationDto } from '../types';

export interface BackendMarkNotificationsReadRequest {
  id?: string;
  markAll?: boolean;
}

export interface BackendNotificationsResponse extends BackendMessageResponse {
  notifications: BackendNotificationDto[];
}

export const backendNotificationsApi = {
  markRead: (payload: BackendMarkNotificationsReadRequest) => (
    backendApiClient.post<BackendNotificationsResponse, BackendMarkNotificationsReadRequest>('/notifications/mark-read', payload)
  ),
  markAllRead: () => (
    backendApiClient.post<BackendNotificationsResponse, BackendMarkNotificationsReadRequest>('/notifications/mark-read', { markAll: true })
  ),
  clear: () => (
    backendApiClient.post<BackendNotificationsResponse>('/notifications/clear')
  )
};
