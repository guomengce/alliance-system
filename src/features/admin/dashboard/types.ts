export interface MetricCardProps {
  title: string;
  value: string;
  sub: string;
  colorClass?: string;
}

export interface AdminDashboardViewProps {
  usdtBalance: number;
  lockedQueueAmount: number;
}

export interface MetricGridProps {
  lockedQueueAmount: number;
  reserveBalance: number;
}

export interface TrooMarketDataPoint {
  time: string;
  price: number;
  change: number;
}

export interface TrooChartPoint extends TrooMarketDataPoint {
  x: number;
  y: number;
}

export interface TrooPricePanelProps {
  activeTrooData: TrooMarketDataPoint;
  trooChartHeight: number;
  trooChartWidth: number;
  trooAreaPath: string;
  trooLinePath: string;
  trooPoints: TrooChartPoint[];
  hoveredTrooIndex: number | null;
  onHoveredTrooIndexChange: (index: number | null) => void;
}

export interface TrendDataPoint {
  date: string;
  sub: number;
  comm: number;
  val: number;
}

export interface TrendPanelProps {
  hoveredChartIndex: number | null;
  onHoveredChartIndexChange: (index: number | null) => void;
}
