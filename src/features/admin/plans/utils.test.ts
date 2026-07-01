import { describe, expect, it, vi } from 'vitest';
import type { Plan } from './types';
import {
  createPlanDraft,
  createPlanFromForm,
  createPlansResponse,
  getPlansFromResponse,
  savePlanDraftToResponse,
  togglePlanStatus,
  updatePlanFromForm
} from './utils';

const plans: Plan[] = [
  {
    id: 'plan-101',
    name: 'Basic',
    price: 1000,
    giftRatio: 1,
    buyRatio: 40,
    queueRatio: 60,
    commissionLimit: 4000,
    description: 'Starter',
    status: 'enabled'
  }
];

const form = {
  name: 'Gold',
  price: 5000,
  giftRatio: 1.2,
  buyRatio: 45,
  queueRatio: 55,
  commissionLimit: 8000,
  description: 'Gold tier'
};

describe('admin plan utils', () => {
  it('keeps plans inside a backend-like response object', () => {
    const response = createPlansResponse(plans);

    expect(response).toEqual({
      requestId: 'mock-admin-plans',
      data: {
        plans
      }
    });
    expect(getPlansFromResponse(response)).toBe(plans);
  });

  it('creates one editable draft object from the selected plan', () => {
    expect(createPlanDraft(plans[0])).toEqual({
      name: 'Basic',
      price: 1000,
      giftRatio: 1,
      buyRatio: 40,
      queueRatio: 60,
      commissionLimit: 4000,
      description: 'Starter'
    });
  });

  it('saves a plan draft back into the backend-like response object', () => {
    const response = createPlansResponse(plans);

    expect(savePlanDraftToResponse(response, 'plan-101', form).data.plans[0]).toEqual({
      id: 'plan-101',
      ...form,
      status: 'enabled'
    });
  });

  it('creates a plan from editor form values', () => {
    const createId = vi.fn(() => 'plan-999');

    expect(createPlanFromForm(form, createId)).toEqual({
      id: 'plan-999',
      ...form,
      status: 'enabled'
    });
  });

  it('updates matching plan from editor form values', () => {
    expect(updatePlanFromForm(plans, 'plan-101', form)[0]).toEqual({
      id: 'plan-101',
      ...form,
      status: 'enabled'
    });
  });

  it('toggles plan status without changing other fields', () => {
    expect(togglePlanStatus(plans, 'plan-101')[0]).toMatchObject({
      id: 'plan-101',
      status: 'disabled',
      name: 'Basic'
    });
  });
});
