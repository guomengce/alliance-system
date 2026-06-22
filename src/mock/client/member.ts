import type { RecentActivity } from '../../features/client/member/types';

const RECENT_ACTIVITY_SEEDS: RecentActivity[] = [
  { id: 'U9', uid: 'User_9921', action: '+$500 认购', time: '2 分钟前', highlight: true },
  { id: 'U1', uid: 'User_1245', action: '+$2,100 充值', time: '15 分钟前', highlight: true },
  { id: 'U0', uid: 'User_0083', action: '新推荐成员已注册', time: '1 小时前', highlight: false },
];

export const getInitialClientMemberData = () => ({
  recentActivities: RECENT_ACTIVITY_SEEDS.map((activity) => ({ ...activity }))
});
