import type { QueueTrigger } from './types';

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
