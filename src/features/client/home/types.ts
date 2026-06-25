import type { Dispatch, SetStateAction } from 'react';
import type { EChartsOption } from 'echarts';
import type { Transaction } from '../../../types';

export interface HomeViewProps {
  usdtBalance: number;
  trooBalance: number;
  lockedQueueAmount: number;
  cumulativeCommissions: number;
  arrivedCommissions: number;
  failedCommissions: number;
  yesterdayRevenue: number;
  remainingCredit: number;
  totalCredit: number;
  creditUsedPercent: number;
  transactions: Transaction[];
  onNavigateToRoute: (routeId: string) => void;
  onQuickAction: (actionType: string) => void;
  onRaiseCredit: () => void;
}

export interface TrooMarketPoint {
  time: string;
  price: number;
  change: number;
}

export interface ChartPoint extends TrooMarketPoint {
  x: number;
  y: number;
}

export interface HomeOrder {
  id: string;
  name: string;
  amount: string;
  date: string;
  status: string;
  statusType: string;
}

export interface BannerProps {
  onNavigateToRoute: (routeId: string) => void;
}

export interface AssetsAndCreditProps {
  usdtBalance: number;
  trooBalance: number;
  yesterdayRevenue: number;
  remainingCredit: number;
  totalCredit: number;
  creditUsedPercent: number;
  onRaiseCredit: () => void;
}

export interface MarketPanelProps {
  activeData: TrooMarketPoint;
  activeIndex: number;
  chartOption: EChartsOption;
  hoveredIndex: number | null;
  marketData: TrooMarketPoint[];
  chartHeight: number;
  yesterdayDateStr: string;
  setHoveredIndex: Dispatch<SetStateAction<number | null>>;
  onNavigateToRoute: (routeId: string) => void;
}

export interface QuickActionsProps {
  onNavigateToRoute: (routeId: string) => void;
  onQuickAction: (actionType: string) => void;
}

export interface OrdersTableProps {
  orders: HomeOrder[];
  onNavigateToRoute: (routeId: string) => void;
  onQuickAction: (actionType: string) => void;
}
