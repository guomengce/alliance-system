import { useEffect, useState } from 'react';
import { getAdminDashboardOverview } from '../../../../api/admin/dashboard';
import type { AdminDashboardOverviewDto } from '../types';
import { buildDashboardPageData } from '../utils';

const emptyDashboardOverview: AdminDashboardOverviewDto = {
  metrics: {
    totalMembers: 0,
    todaySubscriptionAmount: 0,
    todayCommissionAmount: 0,
    lockedQueueAmount: 0,
    reserveBalance: 0
  },
  trooMarket: [],
  trend: []
};

export function useDashboardState() {
  const [overview, setOverview] = useState<AdminDashboardOverviewDto>(emptyDashboardOverview);
  const [hoveredTrendIndex, setHoveredTrendIndex] = useState<number | null>(null);
  const [hoveredTrooIndex, setHoveredTrooIndex] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    getAdminDashboardOverview().then((nextOverview) => {
      if (mounted) {
        setOverview(nextOverview);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const pageData = buildDashboardPageData(overview, {
    activeTrendIndex: hoveredTrendIndex ?? overview.trend.length - 1,
    activeTrooIndex: hoveredTrooIndex ?? overview.trooMarket.length - 1
  });

  return {
    pageData,
    actions: {
      setHoveredTrendIndex,
      setHoveredTrooIndex
    }
  };
}
