import { backendAuthApi } from '../auth';

export const backendAdminRbacApi = {
  getCurrentAdmin: () => backendAuthApi.me()
};
