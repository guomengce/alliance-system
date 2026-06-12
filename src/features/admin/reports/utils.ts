import type { DistributionLog, Metric, PackageSegment, SettlementLog } from './types';

export const SETTLEMENT_LOGS: SettlementLog[] = [
  { date: '2026-05-28', count: 12, total: 48900.00, status: 'completed' },
  { date: '2026-05-27', count: 8, total: 19500.00, status: 'completed' },
  { date: '2026-05-26', count: 15, total: 55000.00, status: 'completed' }
];

export const METRICS: Metric[] = [
  { label: 'L1-L5 跨级结算发放率', value: '99.85%', valueClassName: 'text-emerald-400', hint: '昨日顺利自动核销完成', hintClassName: 'text-white/30' },
  { label: '今日累计风控溢出总量', value: '2,400.00 USDT', valueClassName: 'text-orange-400', hint: '已全自动流转归属于公司平衡池', hintClassName: 'text-white/30' },
  { label: 'TROO股票公摊均线价', value: '$0.1250 USD', valueClassName: 'text-white', hint: '7日内行情波动范围：0.11 - 0.14', hintClassName: 'text-[#cbc4d2]/40' },
  { label: '全网质押总流转池', value: '12,854,000 USDT', valueClassName: 'text-teal-300' }
];

export const PACKAGE_SEGMENTS: PackageSegment[] = [
  { label: '套餐 C (黄金大包 - $10,000)', val: '45%', barWidth: 'w-[45%]', color: 'bg-[#cfbcff]' },
  { label: '套餐 B (中级大包 - $5,000)', val: '25%', barWidth: 'w-[25%]', color: 'bg-indigo-400' },
  { label: '套餐 D (机构高级 - $30,000)', val: '15%', barWidth: 'w-[15%]', color: 'bg-emerald-400' },
  { label: '套餐 E (超级旗舰级 - $50,000)', val: '10%', barWidth: 'w-[10%]', color: 'bg-amber-400' },
  { label: '套餐 A (体验大包 - $1,000)', val: '5%', barWidth: 'w-[5%]', color: 'bg-rose-400' },
];

export const DISTRIBUTION_LOGS: DistributionLog[] = [
  { period: '2026-05-28 运营报表', count: '12 仓申购份数', total: '48,900.00 USDT', profit: '19,560.00 USDT', status: '审计核对无差额' },
  { period: '2026-05-27 运营报表', count: '8 仓申购份数', total: '19,500.00 USDT', profit: '7,800.00 USDT', status: '审计核对无差额' },
  { period: '2026-05-26 运营报表', count: '15 仓申购份数', total: '55,000.00 USDT', profit: '22,000.00 USDT', status: '审计核对无差额' },
];

export const buildSettlementCsv = () => {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "结算日,关联订单量,派发总额(USDT),核对状态\r\n";
  SETTLEMENT_LOGS.forEach(l => {
    csvContent += `${l.date},${l.count},${l.total},${l.status}\r\n`;
  });
  return csvContent;
};
