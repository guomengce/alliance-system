import { useState } from 'react';
import { getInitialClientHomeData } from '../../../../mock/client/home';
import {
  MARKET_CHART_HEIGHT,
  buildMarketChartOption,
  getYesterdayDateString
} from '../utils';

export function useHomeMarket() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [{ marketData, orders }] = useState(() => getInitialClientHomeData());

  const activeIndex = hoveredIndex !== null ? hoveredIndex : marketData.length - 1;
  const activeData = marketData[activeIndex];
  const chartOption = buildMarketChartOption(marketData, activeIndex);
  const yesterdayDateStr = getYesterdayDateString();

  return {
    activeData,
    activeIndex,
    chartOption,
    chartHeight: MARKET_CHART_HEIGHT,
    hoveredIndex,
    marketData,
    orders,
    setHoveredIndex,
    yesterdayDateStr
  };
}
