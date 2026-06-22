import { describe, expect, it } from 'vitest';
import type { CommissionPayout, OverflowLog } from './types';
import {
  adjustCommissionAmount,
  forceCommissionPayout,
  removeOverflowForCommission
} from './utils';

const commission: CommissionPayout = {
  id: 'PAY-1',
  orderId: 'ORD-1',
  uid: '1001',
  level: 'L1',
  amount: 300,
  status: 'pool_insufficient',
  time: '2026-06-22 12:00:00',
  recipientNickname: 'Alice',
  errorMessage: 'Pool missing'
};

const overflow: OverflowLog = {
  id: 'OV-1',
  memberUid: '1001',
  orderId: 'ORD-1',
  tierLevel: 'L1',
  missingAmount: 300,
  time: '2026-06-22 12:00:00'
};

describe('admin commission actions', () => {
  it('forces a commission payout to credited', () => {
    expect(forceCommissionPayout([commission], 'PAY-1')[0]).toMatchObject({
      status: 'credited',
      errorMessage: undefined
    });
  });

  it('adjusts commission amount and credits it', () => {
    expect(adjustCommissionAmount([commission], 'PAY-1', 120)[0]).toMatchObject({
      amount: 120,
      status: 'credited',
      errorMessage: undefined
    });
  });

  it('removes matching overflow log for a commission', () => {
    expect(removeOverflowForCommission([overflow], commission)).toEqual([]);
  });
});
