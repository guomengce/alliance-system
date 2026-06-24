import { backendWalletApi, type BackendUserStateQuery } from '../client/wallet';

export const backendAdminOrdersApi = {
  getTransactionsFromUserState: (query: BackendUserStateQuery = {}) => backendWalletApi.getUserState(query)
};
