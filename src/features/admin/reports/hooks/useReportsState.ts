import { useEffect, useState } from 'react';

import { getAdminReportData } from '../../../../api/admin/reports';
import type { AdminReportDto } from '../../../../api/admin/reports';
import { buildSettlementCsv } from '../utils';

export function useReportsState() {
  const [reportData, setReportData] = useState<AdminReportDto>({
    metrics: [],
    packageSegments: [],
    settlementLogs: [],
    distributionLogs: []
  });

  useEffect(() => {
    let mounted = true;

    getAdminReportData().then((nextReportData) => {
      if (mounted) {
        setReportData(nextReportData);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const exportMockCSV = () => {
    const csvContent = buildSettlementCsv(reportData.settlementLogs);
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `settlement_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    exportMockCSV,
    reportData
  };
}
