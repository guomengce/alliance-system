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
