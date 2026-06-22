import { describe, expect, it, vi } from 'vitest';
import type { QueueRoster, QueueTrigger } from './types';
import { applyQueueCalibration } from './utils';

const baseTrigger: QueueTrigger = {
  id: 'TRIG-1',
  time: '2026-06-22 12:00:00',
  downlineUid: 'UID-2',
  downlineNickname: 'Downline',
  orderId: 'ORDER-1',
  orderAmount: 1000,
  unlockedAmount: 100,
  status: 'success'
};

const calibrationTrigger: QueueTrigger = {
  id: 'TRIG-CAL-1',
  time: '2026-06-22 12:30:00',
  downlineUid: 'ADMIN-SYS',
  downlineNickname: 'Admin',
  orderId: 'MANUAL-ADJUST',
  orderAmount: 0,
  unlockedAmount: 50,
  status: 'calibrated'
};

const rosters: QueueRoster[] = [
  {
    uid: 'UID-1',
    nickname: 'Alice',
    original: 1000,
    current: 800,
    unlocked: 200,
    count: 1,
    triggerHistory: [baseTrigger]
  },
  {
    uid: 'UID-2',
    nickname: 'Bob',
    original: 500,
    current: 400,
    unlocked: 100,
    count: 1,
    triggerHistory: []
  }
];

describe('applyQueueCalibration', () => {
  it('updates the selected roster and prepends a calibration trigger', () => {
    const createTrigger = vi.fn(() => calibrationTrigger);

    const result = applyQueueCalibration(rosters, 'UID-1', {
      original: 1100,
      current: 850,
      unlocked: 250
    }, createTrigger);

    expect(createTrigger).toHaveBeenCalledWith(50);
    expect(result.updatedRoster).toEqual({
      ...rosters[0],
      original: 1100,
      current: 850,
      unlocked: 250,
      count: 2,
      triggerHistory: [calibrationTrigger, baseTrigger]
    });
    expect(result.rosters[1]).toBe(rosters[1]);
  });

  it('keeps rosters unchanged when no selected roster matches', () => {
    const createTrigger = vi.fn(() => calibrationTrigger);

    const result = applyQueueCalibration(rosters, 'UID-X', {
      original: 1100,
      current: 850,
      unlocked: 250
    }, createTrigger);

    expect(createTrigger).not.toHaveBeenCalled();
    expect(result.updatedRoster).toBeNull();
    expect(result.rosters).toEqual(rosters);
  });
});
