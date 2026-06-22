import type { QueueRoster, QueueTrigger } from './types';

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

interface QueueCalibrationValues {
  original: number;
  current: number;
  unlocked: number;
}

export const applyQueueCalibration = (
  rosters: QueueRoster[],
  selectedUid: string,
  values: QueueCalibrationValues,
  createTrigger: (unlockedDelta: number) => QueueTrigger = createCalibrationTrigger
) => {
  let updatedRoster: QueueRoster | null = null;

  const nextRosters = rosters.map((roster) => {
    if (roster.uid !== selectedUid) return roster;

    const newTriggerLog = createTrigger(values.unlocked - roster.unlocked);
    updatedRoster = {
      ...roster,
      original: values.original,
      current: values.current,
      unlocked: values.unlocked,
      count: roster.count + 1,
      triggerHistory: [newTriggerLog, ...roster.triggerHistory]
    };

    return updatedRoster;
  });

  return {
    rosters: nextRosters,
    updatedRoster
  };
};
