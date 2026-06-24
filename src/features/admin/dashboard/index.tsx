import MetricGrid from './components/MetricGrid';
import StatusHeader from './components/StatusHeader';
import TrendPanel from './components/TrendPanel';
import TrooPricePanel from './components/TrooPricePanel';

import { useDashboardState } from './hooks/useDashboardState';
import type { AdminDashboardViewProps } from './types';

export default function AdminDashboardView(_props: AdminDashboardViewProps) {
  const { pageData, actions } = useDashboardState();

  return (
    <div id="admin_dashboard_page" className="space-y-6 select-none animate-fadeIn flex-grow flex flex-col pb-4 h-full">
      <StatusHeader />
      <MetricGrid cards={pageData.metrics.cards} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">
        <TrooPricePanel
          data={pageData.trooPrice}
          onHoverIndexChange={actions.setHoveredTrooIndex}
        />
        <TrendPanel
          data={pageData.trend}
          onHoverIndexChange={actions.setHoveredTrendIndex}
        />
      </div>
    </div>
  );
}
