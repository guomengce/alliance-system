import type { NotificationItem } from '@/src/types';

export const INITIAL_NOTIFICATION_TEMPLATE =
  '【补额提醒】尊敬的会员 {uid}，您当前的信用度池已严重不足，请及时认购新代收方案。';

export const INITIAL_BROADCAST_TITLE = '系统升级与安全保障提示';

export const INITIAL_BROADCAST_BODY =
  '全联盟结算通道已完成例行维护，所有充值、解锁、认购在链上秒级同步确认，安心畅享有保障。';

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
