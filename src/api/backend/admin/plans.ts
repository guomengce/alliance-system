import { backendApiClient } from '../request';
import type { BackendMessageResponse, BackendPlanDto } from '../types';

export interface BackendAdminPlansResponse {
  plans: BackendPlanDto[];
}

export interface BackendUpdatePlansRequest {
  plans: BackendPlanDto[];
}

export interface BackendUpdatePlansResponse extends BackendMessageResponse {
  plans: BackendPlanDto[];
}

export const backendAdminPlansApi = {
  list: () => backendApiClient.get<BackendAdminPlansResponse>('/admin/plans'),
  update: (plans: BackendPlanDto[]) => (
    backendApiClient.post<BackendUpdatePlansResponse, BackendUpdatePlansRequest>(
      '/admin/plans',
      { plans }
    )
  )
};
