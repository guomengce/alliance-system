import { describe, expect, it, vi } from 'vitest';
import {
  buildTransferTransaction,
  buildWithdrawTransaction,
  validateTransfer,
  validateWithdraw
} from './utils';

describe('client wallet action helpers', () => {
  it('validates withdrawals', () => {
    expect(validateWithdraw(10, 100, 'addr', 'TRX')).toBe('提现金额不可低于最小提现要求: 20 USDT');
    expect(validateWithdraw(50, 40, 'addr', 'TRX')).toBe('您的可用余额不足！');
    expect(validateWithdraw(50, 100, '', 'TRX')).toBe('请输入收款钱包地址');
    expect(validateWithdraw(50, 100, 'addr', 'TRX')).toBeNull();
  });

  it('validates transfers', () => {
    expect(validateTransfer(5, 100, '1001')).toBe('站内划转金额不可低于最小划转限制: 10 USDT');
    expect(validateTransfer(20, 100, '')).toBe('请输入接收方的平台用户ID (UID)');
    expect(validateTransfer(120, 100, '1001')).toBe('您的可用余额不足！');
    expect(validateTransfer(20, 100, '1001')).toBeNull();
  });

  it('builds wallet transactions', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.111111111);
    const now = () => new Date('2026-06-22T12:00:00Z');

    expect(buildWithdrawTransaction(50, 'TRX', 'addr', { now })).toMatchObject({
      id: 'TXN-1999999999',
      type: 'withdraw',
      amount: -50,
      status: 'pending'
    });
    expect(buildTransferTransaction(20, '1001', { now })).toMatchObject({
      id: 'TXN-1999999999',
      type: 'transfer',
      amount: -20,
      status: 'success'
    });
  });
});
