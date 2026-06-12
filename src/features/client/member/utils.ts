import type { RecentActivity } from './types';

export const RECENT_ACTIVITIES: RecentActivity[] = [
  { id: 'U9', uid: 'User_9921', action: '+$500 认购', time: '2 分钟前', highlight: true },
  { id: 'U1', uid: 'User_1245', action: '+$2,100 充值', time: '15 分钟前', highlight: true },
  { id: 'U0', uid: 'User_0083', action: '新推荐成员已注册', time: '1 小时前', highlight: false },
];

export const CREDIT_POOL_PROGRESS_PERCENT = 65;

export function getCreditPoolRing(progressPercent: number) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return {
    radius,
    circumference,
    strokeDashoffset
  };
}
