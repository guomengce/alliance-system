import type { QueueRoster, QueueTrigger } from './types';

export const INITIAL_LOCKED_ROSTER: QueueRoster[] = [
  {
    uid: '889421',
    nickname: '飞跃极客 (Jack)',
    original: 10000,
    current: 3100,
    unlocked: 6900,
    count: 3,
    triggerHistory: [
      { id: 'TRIG-1002', time: '2026-05-29 08:12:00', downlineUid: '889425', downlineNickname: '星空行者 (Amanda)', orderId: 'ORD-2026052901', orderAmount: 5000, unlockedAmount: 500, status: 'success' },
      { id: 'TRIG-1003', time: '2026-05-29 11:20:45', downlineUid: '890112', downlineNickname: '赛博信徒 (Sky)', orderId: 'ORD-2026052902', orderAmount: 10000, unlockedAmount: 1000, status: 'success' },
      { id: 'TRIG-1004', time: '2026-05-28 14:02:11', downlineUid: '891044', downlineNickname: '数字游民 (Dan)', orderId: 'ORD-2026052809', orderAmount: 30000, unlockedAmount: 3000, status: 'success' }
    ]
  },
  {
    uid: '889425',
    nickname: '星空行者 (Amanda)',
    original: 25000,
    current: 12500,
    unlocked: 12500,
    count: 2,
    triggerHistory: [
      { id: 'TRIG-2011', time: '2026-05-28 10:05:00', downlineUid: '890112', downlineNickname: '赛博信徒 (Sky)', orderId: 'ORD-2026052712', orderAmount: 5000, unlockedAmount: 500, status: 'success' },
      { id: 'TRIG-2012', time: '2026-05-27 16:30:00', downlineUid: '892019', downlineNickname: '极光猎人 (Ray)', orderId: 'ORD-2026052511', orderAmount: 120000, unlockedAmount: 12000, status: 'success' }
    ]
  },
  {
    uid: '890112',
    nickname: '赛博信徒 (Sky)',
    original: 5000,
    current: 1500,
    unlocked: 3500,
    count: 1,
    triggerHistory: [
      { id: 'TRIG-3001', time: '2026-05-29 09:14:22', downlineUid: '892019', downlineNickname: '极光猎人 (Ray)', orderId: 'ORD-2026052902', orderAmount: 35000, unlockedAmount: 3500, status: 'success' }
    ]
  }
];

export const createCalibrationTrigger = (unlockedAmount: number): QueueTrigger => ({
  id: `TRIG-CAL-${Math.floor(1000 + Math.random() * 9000)}`,
  time: new Date().toISOString().replace('T', ' ').substring(0, 19),
  downlineUid: 'ADMIN-SYS',
  downlineNickname: '系统管理员人工校正',
  orderId: 'MANUAL-ADJUST',
  orderAmount: 0,
  unlockedAmount,
  status: 'calibrated'
});

export const filterTriggerHistory = (triggerHistory: QueueTrigger[], searchQuery: string) => {
  const query = searchQuery.trim().toLowerCase();
  if (!query) return triggerHistory;

  return triggerHistory.filter(trig => (
    trig.id.toLowerCase().includes(query) ||
    trig.orderId.toLowerCase().includes(query) ||
    trig.downlineUid.toLowerCase().includes(query) ||
    trig.downlineNickname.toLowerCase().includes(query)
  ));
};
