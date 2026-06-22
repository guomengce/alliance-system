import { describe, expect, it } from 'vitest';
import {
  getInitialPendingWithdrawals,
  INITIAL_PENDING_WITHDRAWAL_DTOS
} from './adminBusiness';

describe('admin business mock seeds', () => {
  it('returns pending withdrawals as a fresh array', () => {
    const withdrawals = getInitialPendingWithdrawals();

    expect(withdrawals).toHaveLength(INITIAL_PENDING_WITHDRAWAL_DTOS.length);
    expect(withdrawals[0]).toMatchObject({
      id: expect.any(String),
      type: 'withdraw',
      amount: expect.any(Number),
      status: 'pending'
    });
    expect(withdrawals).not.toBe(getInitialPendingWithdrawals());
  });
});
