import request from '../../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';
import type { NotificationItem } from '../../types';

export interface ClientNotificationDto extends NotificationItem {}

export interface ClientNotificationsQuery extends PaginationQuery {
  category?: string;
  keyword?: string;
}

export const clientNotificationsApi = {
  list: (query: ClientNotificationsQuery = {}) => (
    request.get<ApiEnvelope<ApiListResponse<ClientNotificationDto>>>('/client/notifications', query)
  ),
  markAllRead: () => (
    request.post<ApiEnvelope<ClientNotificationDto[]>>('/client/notifications/mark-all-read')
  ),
  markRead: (notificationId: string) => (
    request.patch<ApiEnvelope<ClientNotificationDto[]>>(`/client/notifications/${notificationId}/read`)
  ),
  delete: (notificationId: string) => (
    request.delete<ApiEnvelope<ClientNotificationDto[]>>(`/client/notifications/${notificationId}`)
  )
};

export const mapClientNotificationDto = (dto: ClientNotificationDto): NotificationItem => ({ ...dto });

export const getNotifications = async (query: ClientNotificationsQuery = {}): Promise<NotificationItem[]> => {
  const response = await clientNotificationsApi.list(query);
  return response.data.items.map((item) => mapClientNotificationDto(item));
};

export const markNotificationRead = async (notificationId: string): Promise<NotificationItem[]> => {
  const response = await clientNotificationsApi.markRead(notificationId);
  return response.data.map((item) => mapClientNotificationDto(item));
};

export const markAllNotificationsRead = async (): Promise<NotificationItem[]> => {
  const response = await clientNotificationsApi.markAllRead();
  return response.data.map((item) => mapClientNotificationDto(item));
};

export const deleteNotification = async (notificationId: string): Promise<NotificationItem[]> => {
  const response = await clientNotificationsApi.delete(notificationId);
  return response.data.map((item) => mapClientNotificationDto(item));
};
