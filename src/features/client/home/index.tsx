import { useState } from 'react';
import PageView from '../../../components/PageView';
import AssetsAndCredit from './components/AssetsAndCredit';
import Banner from './components/Banner';
import MarketPanel from './components/MarketPanel';
import OrdersTable from './components/OrdersTable';
import QuickActions from './components/QuickActions';
import type { HomeViewProps } from './types';
import {
  MARKET_CHART_HEIGHT,
  MARKET_CHART_WIDTH,
  MY_ORDERS,
  TROO_MARKET_DATA,
  getMarketChartPaths,
  getYesterdayDateString
} from './utils';

export default function HomeView({
  usdtBalance,
  trooBalance,
  lockedQueueAmount,
  cumulativeCommissions,
  arrivedCommissions,
  failedCommissions,
  yesterdayRevenue,
  remainingCredit,
  totalCredit,
  creditUsedPercent,
  transactions,
  setActiveTab,
  onQuickAction,
  onRaiseCredit
}: HomeViewProps) {
  
  // Interactive TROO market history
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Currently displayed item on hover or latest index
  const activeIndex = hoveredIndex !== null ? hoveredIndex : TROO_MARKET_DATA.length - 1;
  const activeData = TROO_MARKET_DATA[activeIndex];

  const { points, linePath, areaPath } = getMarketChartPaths(
    TROO_MARKET_DATA,
    MARKET_CHART_WIDTH,
    MARKET_CHART_HEIGHT
  );
  const yesterdayDateStr = getYesterdayDateString();

  return (
    <PageView>
      {/* Banner / Promotional Carousel */}
      <Banner setActiveTab={setActiveTab} />

      {/* Stats Grid */}
      <AssetsAndCredit
        usdtBalance={usdtBalance}
        trooBalance={trooBalance}
        yesterdayRevenue={yesterdayRevenue}
        remainingCredit={remainingCredit}
        totalCredit={totalCredit}
        creditUsedPercent={creditUsedPercent}
        onRaiseCredit={onRaiseCredit}
      />

      {/* TROO Today's Market section */}
      <MarketPanel
        activeData={activeData}
        activeIndex={activeIndex}
        hoveredIndex={hoveredIndex}
        marketData={TROO_MARKET_DATA}
        points={points}
        linePath={linePath}
        areaPath={areaPath}
        chartWidth={MARKET_CHART_WIDTH}
        chartHeight={MARKET_CHART_HEIGHT}
        yesterdayDateStr={yesterdayDateStr}
        setHoveredIndex={setHoveredIndex}
        setActiveTab={setActiveTab}
      />

      {/* Quick Actions Grid */}
      <QuickActions
        setActiveTab={setActiveTab}
        onQuickAction={onQuickAction}
      />

      {/* My Orders Table */}
      <OrdersTable
        orders={MY_ORDERS}
        setActiveTab={setActiveTab}
        onQuickAction={onQuickAction}
      />
    </PageView>
  );
}
