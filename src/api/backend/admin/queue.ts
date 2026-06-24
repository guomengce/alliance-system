import { backendWalletApi, type BackendUserStateQuery } from '../client/wallet';

export const backendAdminQueueApi = {
  getQueueSourceState: (query: BackendUserStateQuery = {}) => backendWalletApi.getUserState(query)
};
