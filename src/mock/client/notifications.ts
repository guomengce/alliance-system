import type { ApiEnvelope, ApiListResponse } from '../../api/types';
import type { NotificationItem } from '../../types';

interface MockNotificationsQuery {
  page?: number;
  pageSize?: number;
  category?: string;
  keyword?: string;
}

const initialNotificationDtos: NotificationItem[] = [
  {
    id: 'NOT-001',
    category: 'commission',
    categoryLabel: 'Commission',
    title: 'Commission settlement completed',
    desc: 'Your level 2 agent generated 1,245.50 USDT in commission. The amount has been credited to your wallet.',
    time: '5 minutes ago',
    isUnread: true
  },
  {
    id: 'NOT-002',
    category: 'order',
    categoryLabel: 'Order',
    title: 'Liquidity order executed',
    desc: 'Order ALX-882910 completed successfully. Liquidity was allocated across ETH/USDT and WBTC/DAI pools.',
    time: '15 minutes ago',
    isUnread: true
  },
  {
    id: 'NOT-003',
    category: 'system',
    categoryLabel: 'System',
    title: 'Alliance system upgraded to V3.0.4',
    desc: 'This release improves settlement speed and adds multi-dimensional revenue report export support.',
    time: '2 hours ago',
    isUnread: false
  },
  {
    id: 'NOT-004',
    category: 'commission',
    categoryLabel: 'Dividend',
    title: 'Monthly node dividend credited',
    desc: 'Your monthly liquidity dividend of 850.20 USDT has been credited to your account.',
    time: 'Yesterday 18:30',
    isUnread: false
  }
];

let notificationDtos: NotificationItem[] = initialNotificationDtos.map((item) => ({ ...item }));

const cloneNotifications = () => notificationDtos.map((item) => ({ ...item }));

const buildListResponse = (items: NotificationItem[], query: MockNotificationsQuery = {}) => {
  const page = Number(query.page ?? 1);
  const pageSize = Number(query.pageSize ?? (items.length || 10));
  const start = (page - 1) * pageSize;
  const pagedItems = items.slice(start, start + pageSize);

  return {
    items: pagedItems,
    total: items.length,
    page,
    pageSize
  };
};

const filterNotifications = (query: MockNotificationsQuery = {}) => {
  const keyword = query.keyword?.trim().toLowerCase();

  return notificationDtos.filter((item) => {
    const matchesCategory = !query.category || query.category === 'all' || item.category === query.category;
    const matchesKeyword = !keyword || [item.title, item.desc, item.categoryLabel].some((value) => (
      value.toLowerCase().includes(keyword)
    ));
    return matchesCategory && matchesKeyword;
  });
};

const listEnvelope = (
  query: MockNotificationsQuery = {}
): ApiEnvelope<ApiListResponse<NotificationItem>> => ({
  data: buildListResponse(filterNotifications(query), query),
  success: true
});

const notificationsEnvelope = (): ApiEnvelope<NotificationItem[]> => ({
  data: cloneNotifications(),
  success: true
});

export const handleClientNotificationsMockRequest = (
  path: string,
  method: string,
  query?: MockNotificationsQuery
) => {
  if (path === '/client/notifications' && method === 'GET') {
    return listEnvelope(query);
  }

  if (path === '/client/notifications/mark-all-read' && method === 'POST') {
    notificationDtos = notificationDtos.map((item) => ({ ...item, isUnread: false }));
    return notificationsEnvelope();
  }

  const readMatch = path.match(/^\/client\/notifications\/([^/]+)\/read$/);
  if (readMatch && method === 'PATCH') {
    const [, notificationId] = readMatch;
    notificationDtos = notificationDtos.map((item) => (
      item.id === notificationId ? { ...item, isUnread: false } : item
    ));
    return notificationsEnvelope();
  }

  const deleteMatch = path.match(/^\/client\/notifications\/([^/]+)$/);
  if (deleteMatch && method === 'DELETE') {
    const [, notificationId] = deleteMatch;
    notificationDtos = notificationDtos.filter((item) => item.id !== notificationId);
    return notificationsEnvelope();
  }

  return undefined;
};

export const resetClientNotificationsMock = () => {
  notificationDtos = initialNotificationDtos.map((item) => ({ ...item }));
};
