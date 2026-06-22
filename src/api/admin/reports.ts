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
