import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';
import type { DownlineMember, Transaction } from '../../types';
import { adminUsersApi } from './users';
import { clientWalletApi } from '../client/wallet';

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

export const getAdminFinanceWithdrawals = async (
  query: AdminFinanceQuery = {}
): Promise<AdminWithdrawalDto[]> => {
  const response = await adminFinanceApi.listWithdrawals(query);
  return response.data.items.map((withdrawal) => ({ ...withdrawal }));
};

export const approveAdminWithdrawal = async (
  withdrawalId: string
): Promise<AdminWithdrawalDto> => {
  const response = await adminFinanceApi.approveWithdrawal(withdrawalId);
  return { ...response.data };
};

export const rejectAdminWithdrawal = async (
  withdrawalId: string,
  reason?: string
): Promise<AdminWithdrawalDto> => {
  const response = await adminFinanceApi.rejectWithdrawal(withdrawalId, reason);
  return { ...response.data };
};

export const getAdminFinanceMembers = async (): Promise<DownlineMember[]> => {
  const response = await adminUsersApi.list();
  return response.data.items.map((member) => ({ ...member }));
};

export const getAdminFinanceLedger = async (): Promise<Transaction[]> => {
  const response = await clientWalletApi.listTransactions();
  return response.data.items.map((transaction) => ({ ...transaction }));
};

export const updateAdminFinanceMember = async (
  userId: string,
  payload: Partial<DownlineMember>
): Promise<DownlineMember> => {
  const response = await adminUsersApi.update(userId, payload);
  return { ...response.data };
};
