import { backendApiClient } from '../request';
import type { BackendDownlineDto, BackendMessageResponse } from '../types';

export interface BackendUpdateDownlinesRequest {
  downlines: BackendDownlineDto[];
}

export interface BackendUpdateDownlinesResponse extends BackendMessageResponse {
  downlines: BackendDownlineDto[];
}

export const backendAdminUsersApi = {
  updateDownlines: (downlines: BackendDownlineDto[]) => (
    backendApiClient.post<BackendUpdateDownlinesResponse, BackendUpdateDownlinesRequest>(
      '/admin/update-downlines',
      { downlines }
    )
  )
};
