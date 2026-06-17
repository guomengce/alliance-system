import { apiClient } from '../request';
import type { ApiEnvelope, QueryParams } from '../types';

export type AdminReportDto = Record<string, unknown>;

export interface AdminReportsQuery extends QueryParams {
  range?: string;
  type?: string;
}

export const adminReportsApi = {
  getSummary: (query: AdminReportsQuery = {}) => (
    apiClient.get<ApiEnvelope<AdminReportDto>>('/admin/reports/summary', { query })
  )
};
