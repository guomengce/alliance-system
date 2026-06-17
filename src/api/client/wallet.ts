import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';

export type ClientWalletSummaryDto = Record<string, unknown>;
export type ClientTransactionDto = Record<string, unknown>;

export interface ClientTransactionsQuery extends PaginationQuery {
  keyword?: string;
  type?: string;
}

export const clientWalletApi = {
  getSummary: () => (
    apiClient.get<ApiEnvelope<ClientWalletSummaryDto>>('/client/wallet/summary')
  ),
  listTransactions: (query: ClientTransactionsQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<ClientTransactionDto>>>('/client/wallet/transactions', { query })
  ),
  recharge: (payload: Record<string, unknown>) => (
    apiClient.post<ApiEnvelope<ClientTransactionDto>, Record<string, unknown>>('/client/wallet/recharge', payload)
  ),
  withdraw: (payload: Record<string, unknown>) => (
    apiClient.post<ApiEnvelope<ClientTransactionDto>, Record<string, unknown>>('/client/wallet/withdraw', payload)
  ),
  transfer: (payload: Record<string, unknown>) => (
    apiClient.post<ApiEnvelope<ClientTransactionDto>, Record<string, unknown>>('/client/wallet/transfer', payload)
  )
};
