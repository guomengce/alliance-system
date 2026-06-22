import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';
import type { SettlementItem, SettleLog } from '../../features/admin/settlement/types';
import {
  INITIAL_ADMIN_SETTLEMENT_LOG_DTOS,
  INITIAL_ADMIN_SETTLEMENT_TRANSACTION_DTOS
} from '../../mock/admin/settlement';

export interface AdminSettlementTransactionDto {
  id: string;
  memberUid: string;
  nickname: string;
  date: string;
  expectedCommissions: number;
  remainingPoolCapacity: number;
  actualSettledAmount: number;
  spilloverClipped: number;
  status: SettlementItem['status'];
  contactEmail: string;
}

export interface AdminSettlementLogDto {
  id: string;
  date: string;
  ordersCount: number;
  totalCommissions: number;
  status: SettleLog['status'];
}

export const adminSettlementApi = {
  list: (query: PaginationQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<AdminSettlementTransactionDto>>>('/admin/settlements', { query })
  ),
  execute: (settlementId: string) => (
    apiClient.post<ApiEnvelope<AdminSettlementTransactionDto>>(`/admin/settlements/${settlementId}/execute`)
  )
};

export const mapAdminSettlementTransactionDto = (
  dto: AdminSettlementTransactionDto
): SettlementItem => ({
  id: dto.id,
  memberUid: dto.memberUid,
  nickname: dto.nickname,
  date: dto.date,
  expectedCommissions: dto.expectedCommissions,
  remainingPoolCapacity: dto.remainingPoolCapacity,
  actualSettledAmount: dto.actualSettledAmount,
  spilloverClipped: dto.spilloverClipped,
  status: dto.status,
  contactEmail: dto.contactEmail
});

export const mapAdminSettlementLogDto = (dto: AdminSettlementLogDto): SettleLog => ({
  id: dto.id,
  date: dto.date,
  ordersCount: dto.ordersCount,
  totalCommissions: dto.totalCommissions,
  status: dto.status
});

export const getInitialAdminSettlementTransactions = (): SettlementItem[] => (
  INITIAL_ADMIN_SETTLEMENT_TRANSACTION_DTOS.map((transaction) => (
    mapAdminSettlementTransactionDto(transaction)
  ))
);

export const getInitialAdminSettlementLogs = (): SettleLog[] => (
  INITIAL_ADMIN_SETTLEMENT_LOG_DTOS.map((log) => mapAdminSettlementLogDto(log))
);
