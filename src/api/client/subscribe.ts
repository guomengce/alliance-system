import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';
import type { Plan, Purchase } from '../../features/client/subscribe/types';
import {
  INITIAL_CLIENT_PLAN_DTOS,
  INITIAL_CLIENT_SUBSCRIBE_ORDER_DTOS
} from '../../mock/client/subscribe';

export interface ClientPlanDto extends Plan {}

export interface ClientSubscribeOrderDto extends Purchase {}

export interface CreateClientSubscribeOrderPayload {
  planId: string;
  amount: number;
}

export const clientSubscribeApi = {
  listPlans: (query: PaginationQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<ClientPlanDto>>>('/client/subscribe/plans', { query })
  ),
  createOrder: (payload: CreateClientSubscribeOrderPayload) => (
    apiClient.post<ApiEnvelope<ClientSubscribeOrderDto>, CreateClientSubscribeOrderPayload>('/client/subscribe/orders', payload)
  )
};

export const mapClientPlanDto = (dto: ClientPlanDto): Plan => ({ ...dto });

export const mapClientSubscribeOrderDto = (dto: ClientSubscribeOrderDto): Purchase => ({ ...dto });

export const getInitialClientPlans = (): Plan[] => (
  INITIAL_CLIENT_PLAN_DTOS.map((plan) => mapClientPlanDto(plan))
);

export const getInitialClientSubscribeOrders = (): Purchase[] => (
  INITIAL_CLIENT_SUBSCRIBE_ORDER_DTOS.map((order) => mapClientSubscribeOrderDto(order))
);
