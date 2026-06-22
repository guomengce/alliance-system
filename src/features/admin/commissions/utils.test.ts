import { describe, expect, it } from 'vitest';
import type { CommissionPayout, OverflowLog } from './types';
import {
  filterCommissionItems,
  getAbnormalAuditCount,
  getCombinedCommissionItems,
  getTotalCreditedAmount,
  getTotalOverflowAmount,
  mapOverflowLogs
} from './utils';

const creditedPayout: CommissionPayout = {
  id: 'COP-1',
  orderId: 'ORD-1',
  uid: '889421',
  level: 'L1',
  amount: 100,
  status: 'credited',
  time: '2026-06-22 12:00:00',
  recipientNickname: 'Alice'
};

const pendingPayout: CommissionPayout = {
  id: 'COP-2',
  orderId: 'ORD-2',
  uid: '889422',
  level: 'L2',
  amount: 200,
  status: 'pending',
  time: '2026-06-22 12:10:00',
  recipientNickname: 'Bob'
};

const failedPayout: CommissionPayout = {
  id: 'COP-3',
  orderId: 'ORD-3',
  uid: '889423',
  level: 'L3',
  amount: 300,
  status: 'failed',
  time: '2026-06-22 12:20:00',
  recipientNickname: 'Carol'
};

const overflowLog: OverflowLog = {
  id: 'OVF-1',
  memberUid: '889424',
  orderId: 'ORD-4',
  tierLevel: 'L2',
  missingAmount: 50,
  time: '2026-06-22 12:30:00'
};

describe('commission utilities', () => {
  it('maps overflow logs into intercepted commission items', () => {
    expect(mapOverflowLogs([overflowLog])).toMatchObject([
      {
        id: 'OVF-1',
        orderId: 'ORD-4',
        uid: '889424',
        level: 'L2',
        amount: 50,
        status: 'intercepted',
        time: '2026-06-22 12:30:00',
        triggerMemberLevel: 'L2',
        triggerRechargeAmount: 500
      }
    ]);
  });

  it('combines commission and overflow items sorted by newest time first', () => {
    const combined = getCombinedCommissionItems([creditedPayout], [overflowLog]);

    expect(combined.map((item) => item.id)).toEqual(['OVF-1', 'COP-1']);
  });

  it('filters by tab and searchable commission fields', () => {
    const items = [creditedPayout, pendingPayout, failedPayout, ...mapOverflowLogs([overflowLog])];

    expect(filterCommissionItems(items, 'credited', '')).toEqual([creditedPayout]);
    expect(filterCommissionItems(items, 'blocked', '')).toEqual([pendingPayout, failedPayout]);
    expect(filterCommissionItems(items, 'intercepted', '')).toHaveLength(1);
    expect(filterCommissionItems(items, 'all', 'alice')).toEqual([creditedPayout]);
    expect(filterCommissionItems(items, 'all', 'ORD-2')).toEqual([pendingPayout]);
    expect(filterCommissionItems(items, 'all', '889423')).toEqual([failedPayout]);
  });

  it('calculates credited, abnormal, and overflow totals', () => {
    expect(getTotalCreditedAmount([creditedPayout, pendingPayout])).toBe(2500);
    expect(getAbnormalAuditCount([creditedPayout, pendingPayout, failedPayout])).toBe(1);
    expect(getTotalOverflowAmount([overflowLog])).toBe(50);
  });
});
