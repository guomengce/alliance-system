import { Badge, Segmented } from 'antd';
import type { CategoryTabsProps } from '../types';
import { hasUnreadNotifications } from '../utils';

export default function CategoryTabs({
  categories,
  notifications,
  activeCategory,
  onSelectCategory
}: CategoryTabsProps) {
  return (
    <div className="border-b border-white/5 pb-1 overflow-x-auto scrollbar-hide">
      <Segmented<string>
        className="alliance-antd-notification-tabs"
        options={categories.map((cat) => ({
          value: cat.id,
          label: (
            <Badge
              className="alliance-antd-notification-tab-badge"
              dot={cat.id !== 'all' && hasUnreadNotifications(notifications, cat.id)}
            >
              {cat.label}
            </Badge>
          ),
        }))}
        value={activeCategory}
        onChange={onSelectCategory}
      />
    </div>
  );
}
