import type { EChartsOption } from 'echarts';
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

export function buildMarketChartOption(
  marketData: TrooMarketPoint[],
  activeIndex: number
): EChartsOption {
  return {
    animation: false,
    grid: { top: 12, right: 0, bottom: 8, left: 0, containLabel: false },
    tooltip: { show: false },
    xAxis: {
      type: 'category',
      data: marketData.map((item) => item.time),
      boundaryGap: false,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false }
    },
    yAxis: {
      type: 'value',
      min: 0.095,
      max: 0.11,
      splitNumber: 4,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.04)',
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: 'TROO / USDT',
        type: 'line',
        data: marketData.map((item) => item.price),
        smooth: false,
        symbol: 'circle',
        symbolSize: 7,
        showSymbol: false,
        lineStyle: {
          width: 2.5,
          color: '#b9a6f8'
        },
        itemStyle: {
          color: '#cfbcff',
          borderColor: '#110e16',
          borderWidth: 1.5
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(207,188,255,0.28)' },
              { offset: 1, color: 'rgba(103,80,164,0)' }
            ]
          }
        },
        markLine: {
          symbol: 'none',
          silent: true,
          animation: false,
          label: { show: false },
          lineStyle: {
            color: 'rgba(203,196,210,0.45)',
            type: 'dashed',
            width: 1
          },
          data: [{ xAxis: activeIndex }]
        },
        markPoint: {
          symbol: 'circle',
          symbolSize: 14,
          silent: true,
          label: { show: false },
          itemStyle: {
            color: 'rgba(207,188,255,0.3)',
            borderColor: '#cfbcff',
            borderWidth: 2
          },
          data: [{ name: 'active', coord: [activeIndex, marketData[activeIndex]?.price ?? 0] }]
        },
        emphasis: {
          focus: 'none',
          scale: false
        }
      }
    ]
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
