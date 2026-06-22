import type { TrooChartPoint, TrooMarketDataPoint } from './types';

export const COMPANY_USDT = 31500000;
export const TROO_CHART_WIDTH = 320;
export const TROO_CHART_HEIGHT = 110;

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
