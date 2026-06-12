import type { Dispatch, SetStateAction } from 'react';
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
  setActiveTab: (tab: string) => void;
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
  setActiveTab: (tab: string) => void;
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
  hoveredIndex: number | null;
  marketData: TrooMarketPoint[];
  points: ChartPoint[];
  linePath: string;
  areaPath: string;
  chartWidth: number;
  chartHeight: number;
  yesterdayDateStr: string;
  setHoveredIndex: Dispatch<SetStateAction<number | null>>;
  setActiveTab: (tab: string) => void;
}

export interface QuickActionsProps {
  setActiveTab: (tab: string) => void;
  onQuickAction: (actionType: string) => void;
}

export interface OrdersTableProps {
  orders: HomeOrder[];
  setActiveTab: (tab: string) => void;
  onQuickAction: (actionType: string) => void;
}
