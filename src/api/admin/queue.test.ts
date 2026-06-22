import { describe, expect, it } from 'vitest';
import { INITIAL_ADMIN_QUEUE_ROSTER_DTOS } from '../../mock/admin/queue';
import { getInitialAdminQueueRoster, mapAdminQueueRosterDto } from './queue';

describe('mapAdminQueueRosterDto', () => {
  it('maps an admin queue roster DTO into the queue roster view model', () => {
    const roster = mapAdminQueueRosterDto({
      uid: '889421',
      nickname: 'Jack',
      original: 10000,
      current: 3100,
      unlocked: 6900,
      count: 3,
      triggerHistory: [
        {
          id: 'TRIG-1',
          time: '2026-06-22 12:00:00',
          downlineUid: '889425',
          downlineNickname: 'Amanda',
          orderId: 'ORD-1',
          orderAmount: 5000,
          unlockedAmount: 500,
          status: 'success'
        }
      ]
    });

    expect(roster).toEqual({
      uid: '889421',
      nickname: 'Jack',
      original: 10000,
      current: 3100,
      unlocked: 6900,
      count: 3,
      triggerHistory: [
        {
          id: 'TRIG-1',
          time: '2026-06-22 12:00:00',
          downlineUid: '889425',
          downlineNickname: 'Amanda',
          orderId: 'ORD-1',
          orderAmount: 5000,
          unlockedAmount: 500,
          status: 'success'
        }
      ]
    });
  });

  it('returns mapped initial queue roster as a fresh array', () => {
    const firstRead = getInitialAdminQueueRoster();
    const secondRead = getInitialAdminQueueRoster();

    expect(firstRead).toHaveLength(INITIAL_ADMIN_QUEUE_ROSTER_DTOS.length);
    expect(firstRead.length).toBeGreaterThan(0);
    expect(firstRead[0]).toMatchObject({
      uid: expect.any(String),
      nickname: expect.any(String),
      triggerHistory: expect.any(Array)
    });
    expect(firstRead).not.toBe(secondRead);
  });
});
