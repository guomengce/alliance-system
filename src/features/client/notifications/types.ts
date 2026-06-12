import type { NotificationItem } from '../../../types';

export interface NotificationsViewProps {
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onClearNotifications: () => void;
  onToggleRead: (id: string) => void;
}

export interface HeaderActionsProps {
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onClearNotifications: () => void;
}

export interface CategoryTabsProps {
  categories: NotificationCategory[];
  notifications: NotificationItem[];
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export interface NotificationListProps {
  notifications: NotificationItem[];
  onToggleRead: (id: string) => void;
}

export interface NotificationCardProps {
  key?: string;
  notification: NotificationItem;
  onToggleRead: (id: string) => void;
}

export interface NotificationCategory {
  id: string;
  label: string;
}
