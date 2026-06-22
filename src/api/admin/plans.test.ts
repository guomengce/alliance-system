import { describe, expect, it } from 'vitest';
import { INITIAL_ADMIN_PLAN_DTOS } from '../../mock/admin/plans';
import { getInitialAdminPlans, mapAdminPlanDto } from './plans';

describe('mapAdminPlanDto', () => {
  it('maps an admin plan DTO into the plan view model', () => {
    const plan = mapAdminPlanDto({
      id: 'plan-x',
      name: 'Plan X',
      price: 12000,
      giftRatio: 1.2,
      buyRatio: 45,
      queueRatio: 55,
      commissionLimit: 80000,
      status: 'enabled',
      description: 'Plan description'
    });

    expect(plan).toEqual({
      id: 'plan-x',
      name: 'Plan X',
      price: 12000,
      giftRatio: 1.2,
      buyRatio: 45,
      queueRatio: 55,
      commissionLimit: 80000,
      status: 'enabled',
      description: 'Plan description'
    });
  });

  it('returns mapped initial admin plans as a fresh array', () => {
    const firstRead = getInitialAdminPlans();
    const secondRead = getInitialAdminPlans();

    expect(firstRead).toHaveLength(INITIAL_ADMIN_PLAN_DTOS.length);
    expect(firstRead.length).toBeGreaterThan(0);
    expect(firstRead[0]).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      price: expect.any(Number),
      status: expect.any(String)
    });
    expect(firstRead).not.toBe(secondRead);
  });
});
