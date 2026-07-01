import { useEffect, useState } from 'react';
import { getClientHomeOverview } from '../../../../api/client/home';
import type { HomeOrder, TrooMarketPoint } from '../types';
import {
  MARKET_CHART_HEIGHT,
  buildMarketChartOption,
  getYesterdayDateString
} from '../utils';

export function useHomeMarket() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [marketData, setMarketData] = useState<TrooMarketPoint[]>([]);
  const [orders, setOrders] = useState<HomeOrder[]>([]);

  useEffect(() => {
    let mounted = true;

    void getClientHomeOverview().then((overview) => {
      if (!mounted) return;
      setMarketData(overview.marketData);
      setOrders(overview.recentOrders);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const activeIndex = hoveredIndex !== null ? hoveredIndex : Math.max(0, marketData.length - 1);
  const activeData = marketData[activeIndex] ?? { time: '', price: 0, change: 0 };
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
