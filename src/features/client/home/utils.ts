import type { ChartPoint, TrooMarketPoint } from './types';

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
