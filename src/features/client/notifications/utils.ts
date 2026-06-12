import type { NotificationItem } from '../../../types';
import type { NotificationCategory } from './types';

export const NOTIFICATION_CATEGORIES: NotificationCategory[] = [
  { id: 'all', label: '鍏ㄩ儴娑堟伅' },
  { id: 'commission', label: '浣ｉ噾鍒嗙孩' },
  { id: 'order', label: '璁㈠崟鎵ц' },
  { id: 'system', label: '绯荤粺鍏憡' },
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
