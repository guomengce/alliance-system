import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';
import type { Plan } from '../../features/admin/plans/types';
import { INITIAL_ADMIN_PLAN_DTOS } from '../../mock/admin/plans';

export interface AdminPlanDto {
  id: string;
  name: string;
  price: number;
  giftRatio: number;
  buyRatio: number;
  queueRatio: number;
  commissionLimit: number;
  status: Plan['status'];
  description?: string;
}

export const adminPlansApi = {
  list: (query: PaginationQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<AdminPlanDto>>>('/admin/plans', { query })
  ),
  create: (payload: Partial<AdminPlanDto>) => (
    apiClient.post<ApiEnvelope<AdminPlanDto>, Partial<AdminPlanDto>>('/admin/plans', payload)
  ),
  update: (planId: string, payload: Partial<AdminPlanDto>) => (
    apiClient.patch<ApiEnvelope<AdminPlanDto>, Partial<AdminPlanDto>>(`/admin/plans/${planId}`, payload)
  )
};

export const mapAdminPlanDto = (dto: AdminPlanDto): Plan => ({
  id: dto.id,
  name: dto.name,
  price: dto.price,
  giftRatio: dto.giftRatio,
  buyRatio: dto.buyRatio,
  queueRatio: dto.queueRatio,
  commissionLimit: dto.commissionLimit,
  status: dto.status,
  description: dto.description
});

export const getInitialAdminPlans = (): Plan[] => (
  INITIAL_ADMIN_PLAN_DTOS.map((plan) => mapAdminPlanDto(plan))
);

export const getAdminPlans = async (): Promise<Plan[]> => {
  const response = await adminPlansApi.list();
  return response.data.items.map((plan) => mapAdminPlanDto(plan));
};

export const createAdminPlan = async (payload: Partial<AdminPlanDto>): Promise<Plan> => {
  const response = await adminPlansApi.create(payload);
  return mapAdminPlanDto(response.data);
};

export const updateAdminPlan = async (
  planId: string,
  payload: Partial<AdminPlanDto>
): Promise<Plan> => {
  const response = await adminPlansApi.update(planId, payload);
  return mapAdminPlanDto(response.data);
};
