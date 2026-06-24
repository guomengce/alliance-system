import { backendApiClient } from '../request';
import type { BackendMessageResponse, BackendUserDto } from '../types';

export interface BackendRunSettlementRequest {
  amount?: number;
}

export interface BackendRunSettlementResponse extends BackendMessageResponse {
  user: BackendUserDto;
}

export const backendAdminSettlementApi = {
  runManualSettlement: (payload: BackendRunSettlementRequest = {}) => (
    backendApiClient.post<BackendRunSettlementResponse, BackendRunSettlementRequest>('/admin/settlements/run', payload)
  )
};
