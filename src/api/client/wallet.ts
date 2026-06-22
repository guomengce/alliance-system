import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';
import type { NetworkType } from '../../features/client/wallet/types';
import type { Transaction } from '../../types';

export interface ClientWalletSummaryDto {
  usdtBalance: number;
  trooBalance: number;
  lockedQueueAmount: number;
}

export interface ClientTransactionDto extends Transaction {}

export interface ClientRechargePayload {
  amount: number;
  network: NetworkType;
}

export interface ClientWithdrawPayload {
  amount: number;
  network: NetworkType;
  address: string;
}

export interface ClientTransferPayload {
  amount: number;
  targetUid: string;
}

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
  recharge: (payload: ClientRechargePayload) => (
    apiClient.post<ApiEnvelope<ClientTransactionDto>, ClientRechargePayload>('/client/wallet/recharge', payload)
  ),
  withdraw: (payload: ClientWithdrawPayload) => (
    apiClient.post<ApiEnvelope<ClientTransactionDto>, ClientWithdrawPayload>('/client/wallet/withdraw', payload)
  ),
  transfer: (payload: ClientTransferPayload) => (
    apiClient.post<ApiEnvelope<ClientTransactionDto>, ClientTransferPayload>('/client/wallet/transfer', payload)
  )
};
