import { useState } from 'react';
import {
  MARKET_CHART_HEIGHT,
  MARKET_CHART_WIDTH,
  TROO_MARKET_DATA,
  getMarketChartPaths,
  getYesterdayDateString
} from '../utils';

export function useHomeMarket() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeIndex = hoveredIndex !== null ? hoveredIndex : TROO_MARKET_DATA.length - 1;
  const activeData = TROO_MARKET_DATA[activeIndex];
  const { points, linePath, areaPath } = getMarketChartPaths(
    TROO_MARKET_DATA,
    MARKET_CHART_WIDTH,
    MARKET_CHART_HEIGHT
  );
  const yesterdayDateStr = getYesterdayDateString();

  return {
    activeData,
    activeIndex,
    areaPath,
    chartHeight: MARKET_CHART_HEIGHT,
    chartWidth: MARKET_CHART_WIDTH,
    hoveredIndex,
    linePath,
    marketData: TROO_MARKET_DATA,
    points,
    setHoveredIndex,
    yesterdayDateStr
  };
}
