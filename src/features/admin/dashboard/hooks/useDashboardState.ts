import { useState } from 'react';
import {
  TROO_CHART_HEIGHT,
  TROO_CHART_WIDTH,
  getAdminTrooMarketData,
  getAreaPath,
  getLinePath,
  getTrooChartPoints
} from '../utils';

export function useDashboardState() {
  const [trooPriceUSD] = useState<number>(0.125);
  const [hoveredChartIndex, setHoveredChartIndex] = useState<number | null>(null);
  const [hoveredTrooIndex, setHoveredTrooIndex] = useState<number | null>(null);

  const adminTrooMarketData = getAdminTrooMarketData(trooPriceUSD);
  const trooPoints = getTrooChartPoints(adminTrooMarketData, trooPriceUSD);
  const trooLinePath = getLinePath(trooPoints);
  const trooAreaPath = getAreaPath(trooLinePath);
  const activeTrooIndex = hoveredTrooIndex !== null ? hoveredTrooIndex : adminTrooMarketData.length - 1;
  const activeTrooData = adminTrooMarketData[activeTrooIndex];

  return {
    activeTrooData,
    hoveredChartIndex,
    hoveredTrooIndex,
    setHoveredChartIndex,
    setHoveredTrooIndex,
    trooAreaPath,
    trooChartHeight: TROO_CHART_HEIGHT,
    trooChartWidth: TROO_CHART_WIDTH,
    trooLinePath,
    trooPoints
  };
}