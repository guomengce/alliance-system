import type { TrooChartPoint, TrooMarketDataPoint, TrendDataPoint } from './types';

export const COMPANY_USDT = 31500000;
export const TROO_CHART_WIDTH = 320;
export const TROO_CHART_HEIGHT = 110;

export const LAST_7_DAYS_DATA: TrendDataPoint[] = [
  { date: '05-23', sub: 45000, comm: 18000, val: 45 },
  { date: '05-24', sub: 60000, comm: 24000, val: 60 },
  { date: '05-25', sub: 48000, comm: 19200, val: 48 },
  { date: '05-26', sub: 70000, comm: 28000, val: 70 },
  { date: '05-27', sub: 92000, comm: 36800, val: 92 },
  { date: '05-28', sub: 110000, comm: 44000, val: 110 },
  { date: '05-29', sub: 85000, comm: 34000, val: 85 }
];

export function getAdminTrooMarketData(trooPriceUSD: number): TrooMarketDataPoint[] {
  return [
    { time: '00:00', price: trooPriceUSD * 0.941, change: -5.9 },
    { time: '04:00', price: trooPriceUSD * 0.962, change: -3.8 },
    { time: '08:00', price: trooPriceUSD * 0.950, change: -5.0 },
    { time: '12:00', price: trooPriceUSD * 0.984, change: -1.6 },
    { time: '16:00', price: trooPriceUSD * 1.012, change: 1.2 },
    { time: '20:00', price: trooPriceUSD * 1.031, change: 3.1 },
    { time: '24:00', price: trooPriceUSD * 1.042, change: 4.2 },
  ];
}

export function getTrooChartPoints(
  adminTrooMarketData: TrooMarketDataPoint[],
  trooPriceUSD: number,
  trooChartWidth = TROO_CHART_WIDTH,
  trooChartHeight = TROO_CHART_HEIGHT
): TrooChartPoint[] {
  const minTrooPrice = trooPriceUSD * 0.92;
  const maxTrooPrice = trooPriceUSD * 1.06;

  return adminTrooMarketData.map((d, i) => {
    const x = (i / (adminTrooMarketData.length - 1)) * trooChartWidth;
    const y = trooChartHeight - ((d.price - minTrooPrice) / (maxTrooPrice - minTrooPrice)) * trooChartHeight;
    return { x, y, ...d };
  });
}

export function getLinePath(trooPoints: TrooChartPoint[]) {
  return trooPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
}

export function getAreaPath(trooLinePath: string, trooChartWidth = TROO_CHART_WIDTH, trooChartHeight = TROO_CHART_HEIGHT) {
  return `${trooLinePath} L ${trooChartWidth} ${trooChartHeight} L 0 ${trooChartHeight} Z`;
}
