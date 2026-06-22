import { getInitialAdminReportData } from '../../../mock/admin/reports';

export const buildSettlementCsv = () => {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "结算日,关联订单量,派发总额(USDT),核对状态\r\n";
  getInitialAdminReportData().settlementLogs.forEach(l => {
    csvContent += `${l.date},${l.count},${l.total},${l.status}\r\n`;
  });
  return csvContent;
};
