import { describe, expect, it, vi } from 'vitest';
import { buildCommissionWithdrawalTransaction } from './utils';

describe('client commission utils', () => {
  it('builds commission withdrawal transaction records', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.23456789);

    const transaction = buildCommissionWithdrawalTransaction(1200, {
      now: () => new Date('2026-06-22T11:22:33Z')
    });

    expect(transaction).toMatchObject({
      id: 'TXN-3111111010',
      type: 'commission',
      typeLabel: '佣金到账',
      amount: 1200,
      currency: 'USDT',
      time: '2026-06-22 11:22:33',
      status: 'success',
      statusLabel: '成功'
    });
  });
});
