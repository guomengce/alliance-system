import { describe, expect, it } from 'vitest';
import type { SettlementItem } from './types';
import { markLowCapacityNotified, resolveSettlementException } from './utils';

const items: SettlementItem[] = [
  {
    id: 'SREC-104',
    memberUid: '1001',
    nickname: 'Alice',
    date: '2026-06-22',
    expectedCommissions: 800,
    remainingPoolCapacity: 25,
    actualSettledAmount: 100,
    spilloverClipped: 700,
    status: 'stalled_exception',
    contactEmail: 'alice@example.com'
  }
];

describe('admin settlement utils', () => {
  it('resolves stalled settlement exceptions', () => {
    expect(resolveSettlementException(items, 'SREC-104')[0]).toMatchObject({
      remainingPoolCapacity: 10000,
      actualSettledAmount: 800,
      spilloverClipped: 0,
      status: 'fully_settled'
    });
  });

  it('marks low-capacity settlement as notified', () => {
    expect(markLowCapacityNotified(items, 'SREC-104')[0]).toMatchObject({
      status: 'low_capacity_notified'
    });
  });
});
