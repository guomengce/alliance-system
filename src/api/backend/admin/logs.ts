import { backendWalletApi, type BackendUserStateQuery } from '../client/wallet';

export const backendAdminLogsApi = {
  getLogSourceState: (query: BackendUserStateQuery = {}) => backendWalletApi.getUserState(query)
};
