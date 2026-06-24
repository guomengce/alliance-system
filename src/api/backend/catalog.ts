import { backendApiClient } from './request';
import type { BackendParametersDto, BackendPlanDto } from './types';

export interface BackendCatalogParametersResponse {
  parameters: BackendParametersDto | null;
}

export interface BackendCatalogPlansResponse {
  plans: BackendPlanDto[];
}

export const backendCatalogApi = {
  getParameters: () => backendApiClient.get<BackendCatalogParametersResponse>('/catalog/parameters'),
  getPlans: () => backendApiClient.get<BackendCatalogPlansResponse>('/catalog/plans')
};
