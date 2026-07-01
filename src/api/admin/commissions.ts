import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';
import type { CommissionPayout, OverflowLog } from '../../features/admin/commissions/types';
import {
  INITIAL_ADMIN_COMMISSION_DTOS,
  INITIAL_ADMIN_OVERFLOW_LOG_DTOS
} from '../../mock/admin/commissions';

export interface AdminCommissionDto {
  id: string;
  orderId: string;
  uid: string;
  level: string;
  amount: number;
  status: CommissionPayout['status'];
  time: string;
  recipientNickname: string;
  errorMessage?: string;
  triggerMemberUid?: string;
  triggerMemberLevel?: string;
  triggerRechargeAmount?: number;
}

export interface AdminOverflowLogDto {
  id: string;
  memberUid: string;
  orderId: string;
  tierLevel: string;
  missingAmount: number;
  time: string;
}

export interface AdminCommissionsQuery extends PaginationQuery {
  keyword?: string;
  status?: string;
}

export const adminCommissionsApi = {
  list: (query: AdminCommissionsQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<AdminCommissionDto>>>('/admin/commissions', { query })
  )
};

export const mapAdminCommissionDto = (dto: AdminCommissionDto): CommissionPayout => ({
  id: dto.id,
  orderId: dto.orderId,
  uid: dto.uid,
  level: dto.level,
  amount: dto.amount,
  status: dto.status,
  time: dto.time,
  recipientNickname: dto.recipientNickname,
  errorMessage: dto.errorMessage,
  triggerMemberUid: dto.triggerMemberUid,
  triggerMemberLevel: dto.triggerMemberLevel,
  triggerRechargeAmount: dto.triggerRechargeAmount
});

export const mapAdminOverflowLogDto = (dto: AdminOverflowLogDto): OverflowLog => ({
  id: dto.id,
  memberUid: dto.memberUid,
  orderId: dto.orderId,
  tierLevel: dto.tierLevel,
  missingAmount: dto.missingAmount,
  time: dto.time
});

export const getInitialAdminCommissions = (): CommissionPayout[] => (
  INITIAL_ADMIN_COMMISSION_DTOS.map((commission) => mapAdminCommissionDto(commission))
);

export const getInitialAdminOverflowLogs = (): OverflowLog[] => (
  INITIAL_ADMIN_OVERFLOW_LOG_DTOS.map((log) => mapAdminOverflowLogDto(log))
);

export const getAdminCommissions = async (
  query: AdminCommissionsQuery = {}
): Promise<CommissionPayout[]> => {
  const response = await adminCommissionsApi.list(query);
  return response.data.items.map((commission) => mapAdminCommissionDto(commission));
};

export const getAdminOverflowLogs = async (
  query: PaginationQuery = {}
): Promise<OverflowLog[]> => {
  const response = await apiClient.get<ApiEnvelope<ApiListResponse<AdminOverflowLogDto>>>(
    '/admin/commissions/overflow-logs',
    { query }
  );
  return response.data.items.map((log) => mapAdminOverflowLogDto(log));
};
