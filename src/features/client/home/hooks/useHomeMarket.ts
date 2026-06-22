import { useState } from 'react';
import { getInitialClientHomeData } from '../../../../mock/client/home';
import {
  MARKET_CHART_HEIGHT,
  MARKET_CHART_WIDTH,
  getMarketChartPaths,
  getYesterdayDateString
} from '../utils';

export function useHomeMarket() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { marketData } = getInitialClientHomeData();

  const activeIndex = hoveredIndex !== null ? hoveredIndex : marketData.length - 1;
  const activeData = marketData[activeIndex];
  const { points, linePath, areaPath } = getMarketChartPaths(
    marketData,
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
    marketData,
    points,
    setHoveredIndex,
    yesterdayDateStr
  };
}
