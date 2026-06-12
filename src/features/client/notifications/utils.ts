import type { NotificationItem } from '../../../types';
import type { NotificationCategory } from './types';

export const NOTIFICATION_CATEGORIES: NotificationCategory[] = [
  { id: 'all', label: '全部消息' },
  { id: 'commission', label: '佣金分红' },
  { id: 'order', label: '订单执行' },
  { id: 'system', label: '系统公告' },
];

export function filterNotificationsByCategory(
  notifications: NotificationItem[],
  activeCategory: string
) {
  return notifications.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });
}

export function hasUnreadNotifications(
  notifications: NotificationItem[],
  categoryId: string
) {
  return notifications.filter(n => n.category === categoryId && n.isUnread).length > 0;
}

