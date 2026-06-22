import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';
import type { CommissionAllocation, OrderDetail } from '../../features/admin/orders/types';
import { INITIAL_ADMIN_ORDER_DTOS } from '../../mock/admin/orders';

export interface AdminOrderDto {
  id: string;
  uid: string;
  planName: string;
  amount: number;
  status: OrderDetail['status'];
  time: string;
  paymentChannel: string;
  txid: string;
  cashFlowTrack: string;
  stockConversion: OrderDetail['stockConversion'];
  commissionAllocations?: CommissionAllocation[];
}

export interface AdminOrdersQuery extends PaginationQuery {
  keyword?: string;
  status?: string;
  type?: string;
}

export const adminOrdersApi = {
  list: (query: AdminOrdersQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<AdminOrderDto>>>('/admin/orders', { query })
  ),
  detail: (orderId: string) => (
    apiClient.get<ApiEnvelope<AdminOrderDto>>(`/admin/orders/${orderId}`)
  )
};

export const mapAdminOrderDto = (dto: AdminOrderDto): OrderDetail => ({
  id: dto.id,
  uid: dto.uid,
  planName: dto.planName,
  amount: dto.amount,
  status: dto.status,
  time: dto.time,
  paymentChannel: dto.paymentChannel,
  txid: dto.txid,
  cashFlowTrack: dto.cashFlowTrack,
  stockConversion: dto.stockConversion,
  commissionAllocations: dto.commissionAllocations ?? []
});

export const getInitialAdminOrders = (): OrderDetail[] => (
  INITIAL_ADMIN_ORDER_DTOS.map((order) => mapAdminOrderDto(order))
);
