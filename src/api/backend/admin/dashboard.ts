import { backendWalletApi, type BackendUserStateQuery } from '../client/wallet';

export const backendAdminDashboardApi = {
  getUserStateOverview: (query: BackendUserStateQuery = {}) => backendWalletApi.getUserState(query)
};
