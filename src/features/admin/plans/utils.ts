import type { Plan } from './types';

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

export const togglePlanStatus = (
  plans: Plan[],
  planId: string
): Plan[] => plans.map(plan => {
  if (plan.id !== planId) return plan;

  const nextStatus: Plan['status'] = plan.status === 'enabled' ? 'disabled' : 'enabled';

  return { ...plan, status: nextStatus };
});
