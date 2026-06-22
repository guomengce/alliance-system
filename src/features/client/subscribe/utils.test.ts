import { describe, expect, it, vi } from 'vitest';
import type { Plan, Purchase } from './types';
import {
  buildSubscribeTransaction,
  calculateSubscriptionEffects,
  createPurchasePreview,
  finalizePurchase
} from './utils';

const plan: Plan = {
  id: 'plan-gold',
  name: 'Plan Gold',
  price: 5000,
  badge: 'Gold',
  badgeStyle: '',
  poolLimit: 10000,
  giftRatio: 1.2,
  releaseLimit: 0,
  queueRelease: 0,
  description: 'Gold plan'
};

describe('client subscribe utils', () => {
  it('calculates subscription asset and commission effects', () => {
    expect(calculateSubscriptionEffects(plan, 10000)).toEqual({
      expectedTroo: 7000,
      queueLockAmount: 3100,
      calculatedLimit: 20000
    });
  });

  it('creates a confirmation preview purchase', () => {
    const preview = createPurchasePreview(plan, 10000, {
      createId: () => 'SUB-123',
      now: () => new Date('2026-06-22T10:30:00Z')
    });

    expect(preview).toMatchObject({
      id: 'SUB-123',
      name: 'Plan Gold',
      amount: 10000,
      troo: 70000,
      lockAmount: 3100,
      progress: 0,
      statusType: 'pending',
      isConfirmation: true
    });
    expect(preview.date).toBe('2026-06-22 10:30');
  });

  it('finalizes previews without mutating the original preview', () => {
    const preview: Purchase = {
      id: 'SUB-123',
      name: 'Plan Gold',
      amount: 10000,
      troo: 70000,
      giftRatio: 1.2,
      lockAmount: 3100,
      progress: 0,
      date: '2026-06-22 10:30',
      status: 'Pending',
      statusType: 'pending',
      isConfirmation: true
    };

    expect(finalizePurchase(preview)).toEqual({
      ...preview,
      status: '进行中',
      isConfirmation: false
    });
    expect(preview.isConfirmation).toBe(true);
  });

  it('builds subscription transaction records', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.123456789);

    const transaction = buildSubscribeTransaction(plan, 10000, {
      now: () => new Date('2026-06-22T10:30:00Z')
    });

    expect(transaction).toMatchObject({
      id: 'TXN-2111111101',
      type: 'subscribe',
      amount: -10000,
      currency: 'USDT',
      time: '2026-06-22 10:30:00',
      status: 'success',
      statusLabel: '进行中'
    });
    expect(transaction.desc).toContain('Plan Gold');
    expect(transaction.desc).toContain('3100.00');
  });
});
