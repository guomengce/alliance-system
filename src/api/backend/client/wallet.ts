import { backendApiClient } from '../request';
import type { BackendMessageResponse, BackendTransactionDto, BackendUserDto, BackendUserStateResponse } from '../types';

export interface BackendUserStateQuery extends Record<string, string | undefined> {
  email?: string;
}

export interface BackendDirectSimulationRequest {
  purchaseAmt: number;
  commissionPercent: number;
  subUid: string;
  subPlanName: string;
}

export interface BackendDirectSimulationResponse extends BackendMessageResponse {
  calculation: unknown;
  user: BackendUserDto;
}

export interface BackendWithdrawRequest {
  amount: number;
  network: string;
  toAddress: string;
}

export interface BackendSubscribePlanRequest {
  amount: number;
  planName: string;
  planPrice: number;
  poolLimit: number;
  trooRatio?: number;
  queueRatio?: number;
}

export interface BackendTransferRequest {
  amount: number;
  targetUid: string;
}

export interface BackendUpdateBalancesRequest {
  email: string;
  usdtDiff?: number;
  trooDiff?: number;
  lockedDiff?: number;
  transaction?: BackendTransactionDto;
}

export interface BackendUserMutationResponse extends BackendMessageResponse {
  user?: BackendUserDto;
}

export const backendWalletApi = {
  getUserState: (query: BackendUserStateQuery = {}) => (
    backendApiClient.get<BackendUserStateResponse>('/wallet/user-state', { query })
  ),
  directSimulation: (payload: BackendDirectSimulationRequest) => (
    backendApiClient.post<BackendDirectSimulationResponse, BackendDirectSimulationRequest>('/wallet/direct-simulation', payload)
  ),
  withdrawCommissions: () => (
    backendApiClient.post<BackendUserMutationResponse>('/wallet/withdraw-commissions')
  ),
  withdraw: (payload: BackendWithdrawRequest) => (
    backendApiClient.post<BackendUserMutationResponse, BackendWithdrawRequest>('/wallet/withdraw', payload)
  ),
  subscribe: (payload: BackendSubscribePlanRequest) => (
    backendApiClient.post<BackendUserMutationResponse, BackendSubscribePlanRequest>('/wallet/subscribe', payload)
  ),
  transfer: (payload: BackendTransferRequest) => (
    backendApiClient.post<BackendUserMutationResponse, BackendTransferRequest>('/wallet/transfer', payload)
  ),
  raiseLimit: () => (
    backendApiClient.post<BackendMessageResponse>('/wallet/raise-limit')
  ),
  updateBalances: (payload: BackendUpdateBalancesRequest) => (
    backendApiClient.post<BackendMessageResponse, BackendUpdateBalancesRequest>('/wallet/update-balances', payload)
  )
};
