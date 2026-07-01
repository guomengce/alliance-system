import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  deleteNotification,
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  type ClientNotificationsQuery
} from '../../../../api/client/notifications';
import type { NotificationItem } from '../../../../types';

const initialQuery: ClientNotificationsQuery = {
  keyword: '',
  category: 'all'
};

const applyQuery = (items: NotificationItem[], query: ClientNotificationsQuery) => {
  const keyword = query.keyword?.trim().toLowerCase();

  return items.filter((item) => {
    const matchesCategory = !query.category || query.category === 'all' || item.category === query.category;
    const matchesKeyword = !keyword || [item.title, item.desc, item.categoryLabel].some((value) => (
      value.toLowerCase().includes(keyword)
    ));
    return matchesCategory && matchesKeyword;
  });
};

export const useNotificationsState = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [query, setQuery] = useState<ClientNotificationsQuery>(initialQuery);
  const [loading, setLoading] = useState<boolean>(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [updating, setUpdating] = useState<boolean>(false);

  const loadNotifications = useCallback(async (nextQuery: ClientNotificationsQuery) => {
    setLoading(true);
    try {
      const items = await getNotifications(nextQuery);
      setNotifications(items);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadNotifications(query);
  }, [loadNotifications, query]);

  const handleSelectCategory = useCallback((category: string) => {
    setQuery((prev) => ({ ...prev, category }));
  }, []);

  const handleMarkRead = useCallback(async (id: string) => {
    setUpdatingId(id);
    try {
      const items = await markNotificationRead(id);
      setNotifications(applyQuery(items, query));
    } finally {
      setUpdatingId(null);
    }
  }, [query]);

  const handleMarkAllRead = useCallback(async () => {
    setUpdating(true);
    try {
      const items = await markAllNotificationsRead();
      setNotifications(applyQuery(items, query));
    } finally {
      setUpdating(false);
    }
  }, [query]);

  const handleDeleteNotification = useCallback(async (id: string) => {
    setUpdatingId(id);
    try {
      const items = await deleteNotification(id);
      setNotifications(applyQuery(items, query));
    } finally {
      setUpdatingId(null);
    }
  }, [query]);

  const activeCategory = query.category ?? 'all';
  const hasNotifications = notifications.length > 0;
  const unreadCount = useMemo(
    () => notifications.filter((item) => item.isUnread).length,
    [notifications]
  );

  return {
    activeCategory,
    hasNotifications,
    loading,
    notifications,
    query,
    unreadCount,
    updating,
    updatingId,
    setQuery,
    onDeleteNotification: handleDeleteNotification,
    onMarkAllRead: handleMarkAllRead,
    onSelectCategory: handleSelectCategory,
    onToggleRead: handleMarkRead
  };
};
