import type { EChartsOption } from 'echarts';

export interface MetricCardProps {
  key?: string;
  title: string;
  value: string;
  sub: string;
  colorClass?: string;
}

export interface AdminDashboardViewProps {
  usdtBalance: number;
  lockedQueueAmount: number;
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

export interface TrendDataPoint {
  date: string;
  sub: number;
  comm: number;
  val: number;
}

export interface AdminDashboardMetricsDto {
  totalMembers: number;
  todaySubscriptionAmount: number;
  todayCommissionAmount: number;
  lockedQueueAmount: number;
  reserveBalance: number;
}

export interface AdminDashboardTrendDto {
  date: string;
  subscriptionAmount: number;
  commissionAmount: number;
}

export interface AdminDashboardOverviewDto {
  metrics: AdminDashboardMetricsDto;
  trooMarket: TrooMarketDataPoint[];
  trend: AdminDashboardTrendDto[];
}

export interface MetricCardViewModel extends MetricCardProps {
  key: string;
  colorClass: string;
}

export interface MetricGridProps {
  cards: MetricCardViewModel[];
}

export interface ChartSeriesViewModel {
  key: string;
  name: string;
  color: string;
  values: number[];
}

export interface TrendChartViewModel {
  xAxis: string[];
  series: ChartSeriesViewModel[];
  activeIndex: number;
  activePoint: {
    date: string;
    subscriptionAmountText: string;
    commissionAmountText: string;
  };
}

export interface TrooChartViewModel {
  xAxis: string[];
  prices: number[];
  changes: number[];
  activeIndex: number;
  activePoint: {
    time: string;
    priceText: string;
    changeText: string;
    change: number;
  };
}

export interface DashboardMetricsSectionViewModel {
  cards: MetricCardViewModel[];
}

export interface DashboardTrendSectionViewModel {
  chart: TrendChartViewModel;
  chartOption: EChartsOption;
}

export interface DashboardTrooPriceSectionViewModel {
  chart: TrooChartViewModel;
  chartOption: EChartsOption;
}

export interface DashboardPageViewModel {
  metrics: DashboardMetricsSectionViewModel;
  trooPrice: DashboardTrooPriceSectionViewModel;
  trend: DashboardTrendSectionViewModel;
}

export interface DashboardViewModel {
  pageData: DashboardPageViewModel;
  metricCards: MetricCardViewModel[];
  trendChart: TrendChartViewModel;
  trendOption: EChartsOption;
  trooChart: TrooChartViewModel;
  trooOption: EChartsOption;
}

export interface TrooPricePanelProps {
  data: DashboardTrooPriceSectionViewModel;
  onHoverIndexChange: (index: number | null) => void;
}

export interface TrendPanelProps {
  data: DashboardTrendSectionViewModel;
  onHoverIndexChange: (index: number | null) => void;
}
