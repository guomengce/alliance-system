import type { AdminBroadcastConfigDto } from '../../api/admin/broadcast';

export const INITIAL_ADMIN_BROADCAST_CONFIG_DTO: AdminBroadcastConfigDto = {
  notificationTemplate: '【补额提醒】尊敬的会员 {uid}，您当前的信用度池已严重不足，请及时认购新代收方案。',
  broadcastTitle: '系统升级与安全保障提示',
  broadcastBody: '全联盟结算通道已完成例行维护，所有充值、解锁、认购在链上秒级同步确认，安心畅享有保障。',
  broadcastTarget: 'all'
};
