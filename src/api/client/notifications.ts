import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';
import type { NotificationItem } from '../../types';

export interface ClientNotificationDto extends NotificationItem {}

export interface ClientNotificationsQuery extends PaginationQuery {
  category?: string;
}

export const clientNotificationsApi = {
  list: (query: ClientNotificationsQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<ClientNotificationDto>>>('/client/notifications', { query })
  ),
  markAllRead: () => (
    apiClient.post<ApiEnvelope<null>>('/client/notifications/mark-all-read')
  ),
  markRead: (notificationId: string) => (
    apiClient.patch<ApiEnvelope<ClientNotificationDto>>(`/client/notifications/${notificationId}/read`)
  )
};
