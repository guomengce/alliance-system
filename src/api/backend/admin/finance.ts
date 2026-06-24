import { backendApiClient } from '../request';
import type { BackendMessageResponse, BackendTransactionDto } from '../types';

export interface BackendPendingWithdrawalsResponse {
  pendingWithdrawals: BackendTransactionDto[];
}

export interface BackendWithdrawalReviewRequest {
  id: string;
}

export interface BackendWithdrawalReviewResponse extends BackendMessageResponse {
  pendingWithdrawals: BackendTransactionDto[];
}

export const backendAdminFinanceApi = {
  getPendingWithdrawals: () => (
    backendApiClient.get<BackendPendingWithdrawalsResponse>('/admin/pending-withdrawals')
  ),
  approveWithdrawal: (id: string) => (
    backendApiClient.post<BackendWithdrawalReviewResponse, BackendWithdrawalReviewRequest>(
      '/admin/approve-withdrawal',
      { id }
    )
  ),
  rejectWithdrawal: (id: string) => (
    backendApiClient.post<BackendWithdrawalReviewResponse, BackendWithdrawalReviewRequest>(
      '/admin/reject-withdrawal',
      { id }
    )
  )
};
