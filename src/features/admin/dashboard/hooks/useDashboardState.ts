import { useState } from 'react';
import type { AdminDashboardOverviewDto } from '../types';
import {
  buildDashboardViewModel,
  getAdminTrooMarketData,
} from '../utils';

const simulatedDashboardOverview: AdminDashboardOverviewDto = {
  metrics: {
    totalMembers: 5420,
    todaySubscriptionAmount: 128450,
    todayCommissionAmount: 15240.22,
    lockedQueueAmount: 860000,
    reserveBalance: 31850000
  },
  trooMarket: getAdminTrooMarketData(0.125),
  trend: [
    { date: 'D-6', subscriptionAmount: 72000, commissionAmount: 9400 },
    { date: 'D-5', subscriptionAmount: 85000, commissionAmount: 11200 },
    { date: 'D-4', subscriptionAmount: 68000, commissionAmount: 8700 },
    { date: 'D-3', subscriptionAmount: 98000, commissionAmount: 13250 },
    { date: 'D-2', subscriptionAmount: 91000, commissionAmount: 12180 },
    { date: 'D-1', subscriptionAmount: 105000, commissionAmount: 14880 },
    { date: 'D0', subscriptionAmount: 128450, commissionAmount: 15240.22 }
  ]
};

export function useDashboardState() {
  const [overview] = useState<AdminDashboardOverviewDto>(() => simulatedDashboardOverview);
  const [hoveredChartIndex, setHoveredChartIndex] = useState<number | null>(null);
  const [hoveredTrooIndex, setHoveredTrooIndex] = useState<number | null>(null);

  const activeTrendIndex = hoveredChartIndex !== null ? hoveredChartIndex : overview.trend.length - 1;
  const activeTrooIndex = hoveredTrooIndex !== null ? hoveredTrooIndex : overview.trooMarket.length - 1;
  const viewModel = buildDashboardViewModel(overview, {
    activeTrendIndex,
    activeTrooIndex
  });

  return {
    hoveredChartIndex,
    hoveredTrooIndex,
    metricCards: viewModel.metricCards,
    setHoveredChartIndex,
    setHoveredTrooIndex,
    trendChart: viewModel.trendChart,
    trendOption: viewModel.trendOption,
    trooChart: viewModel.trooChart,
    trooOption: viewModel.trooOption
  };
}
