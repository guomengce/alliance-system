import './antd-overrides.css';
import PageView from '../../../shared/components/PageView';
import CategoryTabs from './components/CategoryTabs';
import HeaderActions from './components/HeaderActions';
import NotificationList from './components/NotificationList';
import { useNotificationsState } from './hooks/useNotificationsState';
import { NOTIFICATION_CATEGORIES } from './utils';

export default function NotificationsView() {
  const {
    activeCategory,
    hasNotifications,
    loading,
    notifications,
    updating,
    updatingId,
    onDeleteNotification,
    onMarkAllRead,
    onSelectCategory,
    onToggleRead
  } = useNotificationsState();

  return (
    <PageView>
      <HeaderActions
        hasNotifications={hasNotifications}
        loading={loading}
        updating={updating}
        onMarkAllRead={onMarkAllRead}
      />

      <CategoryTabs
        categories={NOTIFICATION_CATEGORIES}
        notifications={notifications}
        activeCategory={activeCategory}
        onSelectCategory={onSelectCategory}
      />

      <NotificationList
        loading={loading}
        notifications={notifications}
        updatingId={updatingId}
        onDeleteNotification={onDeleteNotification}
        onToggleRead={onToggleRead}
      />
    </PageView>
  );
}
