import PageView from '../../../components/PageView';
import AssetsAndCredit from './components/AssetsAndCredit';
import Banner from './components/Banner';
import MarketPanel from './components/MarketPanel';
import OrdersTable from './components/OrdersTable';
import QuickActions from './components/QuickActions';
import { useHomeMarket } from './hooks/useHomeMarket';
import type { HomeViewProps } from './types';
import { MY_ORDERS } from './utils';

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
  onNavigateToRoute,
  onQuickAction,
  onRaiseCredit
}: HomeViewProps) {
  const {
    activeData,
    activeIndex,
    areaPath,
    chartHeight,
    chartWidth,
    hoveredIndex,
    linePath,
    marketData,
    points,
    setHoveredIndex,
    yesterdayDateStr
  } = useHomeMarket();

  return (
    <PageView>
      {/* Banner / Promotional Carousel */}
      <Banner onNavigateToRoute={onNavigateToRoute} />

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
        marketData={marketData}
        points={points}
        linePath={linePath}
        areaPath={areaPath}
        chartWidth={chartWidth}
        chartHeight={chartHeight}
        yesterdayDateStr={yesterdayDateStr}
        setHoveredIndex={setHoveredIndex}
        onNavigateToRoute={onNavigateToRoute}
      />

      {/* Quick Actions Grid */}
      <QuickActions
        onNavigateToRoute={onNavigateToRoute}
        onQuickAction={onQuickAction}
      />

      {/* My Orders Table */}
      <OrdersTable
        orders={MY_ORDERS}
        onNavigateToRoute={onNavigateToRoute}
        onQuickAction={onQuickAction}
      />
    </PageView>
  );
}
