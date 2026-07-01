import type { Plan, PlanDraft } from './types';

export const createPlanId = () => `plan-${Math.floor(100 + Math.random() * 900)}`;

export interface PlanFormValues {
  name: string;
  price: number;
  giftRatio: number;
  buyRatio: number;
  queueRatio: number;
  commissionLimit: number;
  description: string;
}

export interface AdminPlansResponse {
  requestId: string;
  data: {
    plans: Plan[];
  };
}

export const createPlansResponse = (plans: Plan[]): AdminPlansResponse => ({
  requestId: 'mock-admin-plans',
  data: {
    plans
  }
});

export const getPlansFromResponse = (response: AdminPlansResponse): Plan[] => response.data.plans;

export const createPlanDraft = (plan?: Plan | null): PlanDraft => ({
  name: plan?.name ?? '',
  price: plan?.price ?? 1000,
  giftRatio: plan?.giftRatio ?? 1.0,
  buyRatio: plan?.buyRatio ?? 40,
  queueRatio: plan?.queueRatio ?? 60,
  commissionLimit: plan?.commissionLimit ?? 5000,
  description: plan?.description ?? ''
});

export const createPlanFromForm = (
  values: PlanFormValues,
  createId: () => string = createPlanId
): Plan => ({
  id: createId(),
  name: values.name,
  price: values.price,
  giftRatio: values.giftRatio,
  buyRatio: values.buyRatio,
  queueRatio: values.queueRatio,
  commissionLimit: values.commissionLimit,
  description: values.description,
  status: 'enabled'
});

export const updatePlanFromForm = (
  plans: Plan[],
  planId: string,
  values: PlanFormValues
): Plan[] => plans.map(plan => (
  plan.id === planId
    ? {
        ...plan,
        name: values.name,
        price: values.price,
        giftRatio: values.giftRatio,
        buyRatio: values.buyRatio,
        queueRatio: values.queueRatio,
        commissionLimit: values.commissionLimit,
        description: values.description
      }
    : plan
));

export const savePlanDraftToResponse = (
  response: AdminPlansResponse,
  planId: string,
  values: PlanDraft
): AdminPlansResponse => ({
  ...response,
  data: {
    ...response.data,
    plans: updatePlanFromForm(response.data.plans, planId, values)
  }
});

export const togglePlanStatus = (
  plans: Plan[],
  planId: string
): Plan[] => plans.map(plan => {
  if (plan.id !== planId) return plan;

  const nextStatus: Plan['status'] = plan.status === 'enabled' ? 'disabled' : 'enabled';

  return { ...plan, status: nextStatus };
});
