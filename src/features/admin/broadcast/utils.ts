import type { NotificationItem } from '@/src/types';

export function createBroadcastNotification(title: string, body: string): NotificationItem {
  return {
    id: `NOT-${Math.floor(100 + Math.random() * 900)}`,
    category: 'system',
    categoryLabel: '官方公告',
    title,
    desc: body,
    time: '刚刚',
    isUnread: true
  };
}

export function getBroadcastTargetLabel(broadcastTarget: string) {
  return broadcastTarget === 'all' ? '全联盟会员' : `UID: ${broadcastTarget}`;
}


export function validateBroadcastForm(title: string, body: string) {
  if (!title || !body) return '标题和内容不能为空';
  return null;
}
