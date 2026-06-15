import PageView from '../../../components/PageView';
import CategoryTabs from './components/CategoryTabs';
import HeaderActions from './components/HeaderActions';
import NotificationList from './components/NotificationList';
import { useNotificationsState } from './hooks/useNotificationsState';
import type { NotificationsViewProps } from './types';
import { NOTIFICATION_CATEGORIES } from './utils';

export default function NotificationsView({
  notifications,
  onMarkAllRead,
  onClearNotifications,
  onToggleRead
}: NotificationsViewProps) {
  const {
    activeCategory,
    filteredNotifications,
    setActiveCategory
  } = useNotificationsState({ notifications });

  return (
    <PageView>
      <HeaderActions
        notifications={notifications}
        onMarkAllRead={onMarkAllRead}
        onClearNotifications={onClearNotifications}
      />

      {/* Tabs list categorizing */}
      <CategoryTabs
        categories={NOTIFICATION_CATEGORIES}
        notifications={notifications}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* Main notifications history panel */}
      <NotificationList
        notifications={filteredNotifications}
        onToggleRead={onToggleRead}
      />
    </PageView>
  );
}
