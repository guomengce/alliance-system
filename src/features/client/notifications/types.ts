import type { NotificationItem } from '../../../types';

export interface NotificationsViewProps {}

export interface HeaderActionsProps {
  hasNotifications: boolean;
  loading: boolean;
  updating: boolean;
  onMarkAllRead: () => void;
}

export interface CategoryTabsProps {
  categories: NotificationCategory[];
  notifications: NotificationItem[];
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export interface NotificationListProps {
  notifications: NotificationItem[];
  loading: boolean;
  updatingId: string | null;
  onDeleteNotification: (id: string) => void;
  onToggleRead: (id: string) => void;
}

export interface NotificationCardProps {
  key?: string;
  notification: NotificationItem;
  isUpdating: boolean;
  onDeleteNotification: (id: string) => void;
  onToggleRead: (id: string) => void;
}

export interface NotificationCategory {
  id: string;
  label: string;
}
