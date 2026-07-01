import { apiClient } from '../request';
import type { ApiEnvelope, QueryParams } from '../types';
import type {
  DistributionLog,
  Metric,
  PackageSegment,
  SettlementLog
} from '../../features/admin/reports/types';

export interface AdminReportDto {
  metrics: Metric[];
  packageSegments: PackageSegment[];
  settlementLogs: SettlementLog[];
  distributionLogs: DistributionLog[];
}

export interface AdminReportsQuery extends QueryParams {
  range?: string;
  type?: string;
}

export const adminReportsApi = {
  getSummary: (query: AdminReportsQuery = {}) => (
    apiClient.get<ApiEnvelope<AdminReportDto>>('/admin/reports/summary', { query })
  )
};

export const getAdminReportData = async (query: AdminReportsQuery = {}): Promise<AdminReportDto> => {
  const response = await adminReportsApi.getSummary(query);
  return {
    metrics: response.data.metrics.map((metric) => ({ ...metric })),
    packageSegments: response.data.packageSegments.map((segment) => ({ ...segment })),
    settlementLogs: response.data.settlementLogs.map((log) => ({ ...log })),
    distributionLogs: response.data.distributionLogs.map((log) => ({ ...log }))
  };
};
