import type { ChartPoint, HomeOrder, TrooMarketPoint } from './types';

export const TROO_MARKET_DATA: TrooMarketPoint[] = [
  { time: '02:00', price: 0.0982, change: -1.8 },
  { time: '04:00', price: 0.0991, change: -0.9 },
  { time: '06:00', price: 0.0988, change: -1.2 },
  { time: '08:00', price: 0.1004, change: 0.4 },
  { time: '10:00', price: 0.1018, change: 1.8 },
  { time: '12:00', price: 0.1032, change: 3.2 },
  { time: '14:00', price: 0.1025, change: 2.5 },
  { time: '16:00', price: 0.1041, change: 4.1 },
  { time: '18:00', price: 0.1058, change: 5.8 },
  { time: '20:00', price: 0.1065, change: 6.5 },
  { time: '22:00', price: 0.1059, change: 5.9 },
  { time: '24:00', price: 0.1074, change: 7.4 },
];

export const MY_ORDERS: HomeOrder[] = [
  { id: '#ORD-99281', name: '季度高增益认购 A', amount: '5,000.00', date: '2023-11-24', status: '处理中', statusType: 'pending' },
  { id: '#ORD-99245', name: '尊享团队成长计划', amount: '12,500.00', date: '2023-11-22', status: '已完成', statusType: 'success' },
  { id: '#ORD-99102', name: 'BTC 跨链加速认购', amount: '2,000.00', date: '2023-11-18', status: '已完成', statusType: 'success' },
];

export const MARKET_CHART_WIDTH = 500;
export const MARKET_CHART_HEIGHT = 130;

export function getCreditRing(creditUsedPercent: number) {
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (creditUsedPercent / 100) * circumference;

  return {
    radius,
    circumference,
    strokeDashoffset
  };
}

export function getMarketChartPaths(
  marketData: TrooMarketPoint[],
  chartWidth: number,
  chartHeight: number
) {
  const minPrice = 0.095;
  const maxPrice = 0.110;

  const points: ChartPoint[] = marketData.map((d, i) => {
    const x = (i / (marketData.length - 1)) * chartWidth;
    const y = chartHeight - ((d.price - minPrice) / (maxPrice - minPrice)) * chartHeight;
    return { x, y, ...d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;

  return {
    points,
    linePath,
    areaPath
  };
}

export function getYesterdayDateString() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  const yyyy = yesterday.getFullYear();
  const mm = String(yesterday.getMonth() + 1).padStart(2, '0');
  const dd = String(yesterday.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}
