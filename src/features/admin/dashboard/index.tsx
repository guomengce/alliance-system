import MetricGrid from './components/MetricGrid';
import StatusHeader from './components/StatusHeader';
import TrendPanel from './components/TrendPanel';
import TrooPricePanel from './components/TrooPricePanel';
import { useDashboardState } from './hooks/useDashboardState';
import type { AdminDashboardViewProps } from './types';
import { COMPANY_USDT } from './utils';

export default function AdminDashboardView({ usdtBalance, lockedQueueAmount }: AdminDashboardViewProps) {
  const {
    activeTrooData,
    hoveredChartIndex,
    hoveredTrooIndex,
    setHoveredChartIndex,
    setHoveredTrooIndex,
    trooAreaPath,
    trooChartHeight,
    trooChartWidth,
    trooLinePath,
    trooPoints
  } = useDashboardState();

  return (
    <div id="admin_dashboard_page" className="space-y-6 select-none animate-fadeIn flex-grow flex flex-col pb-4 h-full">
      <StatusHeader />
      <MetricGrid
        lockedQueueAmount={lockedQueueAmount}
        reserveBalance={COMPANY_USDT + usdtBalance}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">
        <TrooPricePanel
          activeTrooData={activeTrooData}
          trooChartHeight={trooChartHeight}
          trooChartWidth={trooChartWidth}
          trooAreaPath={trooAreaPath}
          trooLinePath={trooLinePath}
          trooPoints={trooPoints}
          hoveredTrooIndex={hoveredTrooIndex}
          onHoveredTrooIndexChange={setHoveredTrooIndex}
        />
        <TrendPanel
          hoveredChartIndex={hoveredChartIndex}
          onHoveredChartIndexChange={setHoveredChartIndex}
        />
      </div>
    </div>
  );
}
