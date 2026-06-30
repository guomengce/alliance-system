import './antd-overrides.css';
import PageView from '../../../shared/components/PageView';
import AssetsAndCredit from './components/AssetsAndCredit';
import Banner from './components/Banner';
import MarketPanel from './components/MarketPanel';
import OrdersTable from './components/OrdersTable';
import QuickActions from './components/QuickActions';
import { useHomeMarket } from './hooks/useHomeMarket';
import type { HomeViewProps } from './types';

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
    chartHeight,
    chartOption,
    hoveredIndex,
    marketData,
    orders,
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
        chartOption={chartOption}
        hoveredIndex={hoveredIndex}
        marketData={marketData}
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
        orders={orders}
        onNavigateToRoute={onNavigateToRoute}
        onQuickAction={onQuickAction}
      />
    </PageView>
  );
}
