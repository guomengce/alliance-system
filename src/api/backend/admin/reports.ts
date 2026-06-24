import { backendWalletApi, type BackendUserStateQuery } from '../client/wallet';

export const backendAdminReportsApi = {
  getReportSourceState: (query: BackendUserStateQuery = {}) => backendWalletApi.getUserState(query)
};
