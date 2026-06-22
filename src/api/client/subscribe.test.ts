import { describe, expect, it } from 'vitest';
import {
  INITIAL_CLIENT_PLAN_DTOS,
  INITIAL_CLIENT_SUBSCRIBE_ORDER_DTOS
} from '../../mock/client/subscribe';
import {
  getInitialClientPlans,
  getInitialClientSubscribeOrders,
  mapClientPlanDto,
  mapClientSubscribeOrderDto
} from './subscribe';

describe('client subscribe mappers', () => {
  it('maps plan and purchase DTOs', () => {
    expect(mapClientPlanDto({
      id: 'all-a',
      name: 'Plan A',
      price: 500,
      badge: '500 USDT',
      badgeStyle: 'badge',
      poolLimit: 1000,
      giftRatio: 1,
      releaseLimit: 70,
      queueRelease: 31,
      description: 'Plan',
    })).toMatchObject({
      id: 'all-a',
      name: 'Plan A',
      price: 500,
      poolLimit: 1000
    });

    expect(mapClientSubscribeOrderDto({
      id: 'SUB-1',
      name: 'Plan A',
      amount: 500,
      troo: 3500,
      giftRatio: 1,
      lockAmount: 155,
      progress: 0,
      date: '2026-06-22',
      status: 'Pending',
      statusType: 'pending'
    })).toMatchObject({
      id: 'SUB-1',
      amount: 500,
      statusType: 'pending'
    });
  });

  it('returns subscribe seed data as fresh arrays', () => {
    expect(getInitialClientPlans()).toHaveLength(INITIAL_CLIENT_PLAN_DTOS.length);
    expect(getInitialClientSubscribeOrders()).toHaveLength(INITIAL_CLIENT_SUBSCRIBE_ORDER_DTOS.length);
    expect(getInitialClientPlans()).not.toBe(getInitialClientPlans());
    expect(getInitialClientSubscribeOrders()).not.toBe(getInitialClientSubscribeOrders());
  });
});
