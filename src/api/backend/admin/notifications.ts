import { backendApiClient } from '../request';
import type { BackendMessageResponse, BackendNotificationDto } from '../types';

export interface BackendAdminMarkNotificationsReadRequest {
  email: string;
  id?: string;
  markAll?: boolean;
}

export interface BackendAdminClearNotificationsRequest {
  email: string;
}

export interface BackendAdminNotificationsResponse extends BackendMessageResponse {
  notifications: BackendNotificationDto[];
}

export const backendAdminNotificationsApi = {
  markRead: (payload: BackendAdminMarkNotificationsReadRequest) => (
    backendApiClient.post<BackendAdminNotificationsResponse, BackendAdminMarkNotificationsReadRequest>(
      '/admin/notifications/mark-read',
      payload
    )
  ),
  clear: (payload: BackendAdminClearNotificationsRequest) => (
    backendApiClient.post<BackendAdminNotificationsResponse, BackendAdminClearNotificationsRequest>(
      '/admin/notifications/clear',
      payload
    )
  )
};
