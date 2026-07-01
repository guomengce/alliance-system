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

export const getClientWalletSummary = async (): Promise<ClientWalletSummaryDto> => {
  const response = await clientWalletApi.getSummary();
  return { ...response.data };
};

export const getClientTransactions = async (
  query: ClientTransactionsQuery = {}
): Promise<Transaction[]> => {
  const response = await clientWalletApi.listTransactions(query);
  return response.data.items.map((transaction) => ({ ...transaction }));
};

export const rechargeClientWallet = async (
  payload: ClientRechargePayload
): Promise<Transaction> => {
  const response = await clientWalletApi.recharge(payload);
  return { ...response.data };
};

export const withdrawClientWallet = async (
  payload: ClientWithdrawPayload
): Promise<Transaction> => {
  const response = await clientWalletApi.withdraw(payload);
  return { ...response.data };
};

export const transferClientWallet = async (
  payload: ClientTransferPayload
): Promise<Transaction> => {
  const response = await clientWalletApi.transfer(payload);
  return { ...response.data };
};
