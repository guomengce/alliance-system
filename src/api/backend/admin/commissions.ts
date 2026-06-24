import { backendWalletApi, type BackendUserStateQuery } from '../client/wallet';

export const backendAdminCommissionsApi = {
  getCommissionSourceState: (query: BackendUserStateQuery = {}) => backendWalletApi.getUserState(query)
};
