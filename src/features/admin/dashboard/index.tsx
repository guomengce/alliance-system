import MetricGrid from './components/MetricGrid';
import StatusHeader from './components/StatusHeader';
import TrendPanel from './components/TrendPanel';
import TrooPricePanel from './components/TrooPricePanel';
import { useDashboardState } from './hooks/useDashboardState';
import type { AdminDashboardViewProps } from './types';

export default function AdminDashboardView(_props: AdminDashboardViewProps) {
  const {
    metricCards,
    setHoveredChartIndex,
    setHoveredTrooIndex,
    trendChart,
    trendOption,
    trooChart,
    trooOption
  } = useDashboardState();

  return (
    <div id="admin_dashboard_page" className="space-y-6 select-none animate-fadeIn flex-grow flex flex-col pb-4 h-full">
      <StatusHeader />
      <MetricGrid cards={metricCards} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">
        <TrooPricePanel
          chart={trooChart}
          option={trooOption}
          onHoverIndexChange={setHoveredTrooIndex}
        />
        <TrendPanel
          chart={trendChart}
          option={trendOption}
          onHoverIndexChange={setHoveredChartIndex}
        />
      </div>
    </div>
  );
}
