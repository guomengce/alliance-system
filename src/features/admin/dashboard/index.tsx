import React, { useState } from 'react';
import MetricGrid from './components/MetricGrid';
import StatusHeader from './components/StatusHeader';
import TrendPanel from './components/TrendPanel';
import TrooPricePanel from './components/TrooPricePanel';
import type { AdminDashboardViewProps } from './types';
import {
  COMPANY_USDT,
  TROO_CHART_HEIGHT,
  TROO_CHART_WIDTH,
  getAdminTrooMarketData,
  getAreaPath,
  getLinePath,
  getTrooChartPoints
} from './utils';

export default function AdminDashboardView({ usdtBalance, lockedQueueAmount }: AdminDashboardViewProps) {
  const [trooPriceUSD] = useState<number>(0.125);
  const [hoveredChartIndex, setHoveredChartIndex] = useState<number | null>(null);
  const [hoveredTrooIndex, setHoveredTrooIndex] = useState<number | null>(null);

  const adminTrooMarketData = getAdminTrooMarketData(trooPriceUSD);
  const trooPoints = getTrooChartPoints(adminTrooMarketData, trooPriceUSD);
  const trooLinePath = getLinePath(trooPoints);
  const trooAreaPath = getAreaPath(trooLinePath);
  const activeTrooIndex = hoveredTrooIndex !== null ? hoveredTrooIndex : adminTrooMarketData.length - 1;
  const activeTrooData = adminTrooMarketData[activeTrooIndex];

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
          trooChartHeight={TROO_CHART_HEIGHT}
          trooChartWidth={TROO_CHART_WIDTH}
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
