import { buildSettlementCsv } from '../utils';

export function useReportsState() {
  const exportMockCSV = () => {
    const csvContent = buildSettlementCsv();
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `settlement_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    exportMockCSV
  };
}
