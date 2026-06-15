import { useState } from 'react';
import type { NotificationItem } from '../../../../types';
import { filterNotificationsByCategory } from '../utils';

interface UseNotificationsStateParams {
  notifications: NotificationItem[];
}

export const useNotificationsState = ({ notifications }: UseNotificationsStateParams) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const filteredNotifications = filterNotificationsByCategory(notifications, activeCategory);

  return {
    activeCategory,
    filteredNotifications,
    setActiveCategory
  };
};
