import type { CommissionHistoryItem, CommissionRatio } from '../../features/client/commission/types';

const COMMISSION_RATIO_SEEDS: CommissionRatio[] = [
  { id: 'L1', name: 'L1 级下线', ratio: '40.00%', cycle: 'D + 1', status: '运行中' },
  { id: 'L2', name: 'L2 级下线', ratio: '40.00%', cycle: 'D + 1', status: '运行中' },
  { id: 'L3', name: 'L3 级下线', ratio: '40.00%', cycle: 'D + 1', status: '运行中' },
  { id: 'L4', name: 'L4 级下线', ratio: '40.00%', cycle: 'D + 1', status: '运行中' },
  { id: 'L5', name: 'L5 级下线', ratio: '40.00%', cycle: 'D + 1', status: '运行中' },
];

const COMMISSION_HISTORY_SEEDS: CommissionHistoryItem[] = [
  { id: 'TXN-9981273412', user: 'UID: 102456', userLetter: 'JD', amount: 5000, level: 'L1', reward: 2000, time: '2023-10-24 14:20:11', status: 'success', statusLabel: '已入账' },
  { id: 'TXN-9981273413', user: 'UID: 209182', userLetter: 'AM', amount: 2400, level: 'L2', reward: 960, time: '2023-10-24 15:45:02', status: 'pending', statusLabel: '待结算' },
  { id: 'TXN-9981273414', user: 'UID: 332019', userLetter: 'SK', amount: 10000, level: 'L1', reward: 4000, time: '2023-10-24 16:30:55', status: 'success', statusLabel: '已入账' },
  { id: 'TXN-9981273415', user: 'UID: 122904', userLetter: 'RR', amount: 1200, level: 'L3', reward: 480, time: '2023-10-24 18:05:12', status: 'failed', statusLabel: '处理失败' },
];

export const getInitialClientCommissionData = () => ({
  ratios: COMMISSION_RATIO_SEEDS.map((ratio) => ({ ...ratio })),
  history: COMMISSION_HISTORY_SEEDS.map((item) => ({ ...item }))
});
