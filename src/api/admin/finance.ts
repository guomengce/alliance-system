import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';
import type { Transaction } from '../../types';

export interface AdminWithdrawalDto extends Transaction {
  reviewer?: string;
  reviewedAt?: string;
  rejectReason?: string;
}

export interface AdminFinanceQuery extends PaginationQuery {
  keyword?: string;
  status?: string;
}

export const adminFinanceApi = {
  listWithdrawals: (query: AdminFinanceQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<AdminWithdrawalDto>>>('/admin/finance/withdrawals', { query })
  ),
  approveWithdrawal: (withdrawalId: string) => (
    apiClient.post<ApiEnvelope<AdminWithdrawalDto>>(`/admin/finance/withdrawals/${withdrawalId}/approve`)
  ),
  rejectWithdrawal: (withdrawalId: string, reason?: string) => (
    apiClient.post<ApiEnvelope<AdminWithdrawalDto>, { reason?: string }>(
      `/admin/finance/withdrawals/${withdrawalId}/reject`,
      { reason }
    )
  )
};
