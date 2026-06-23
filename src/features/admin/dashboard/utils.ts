import type { EChartsOption } from 'echarts';
import type {
  AdminDashboardMetricsDto,
  AdminDashboardOverviewDto,
  AdminDashboardTrendDto,
  DashboardViewModel,
  MetricCardViewModel,
  TrendChartViewModel,
  TrooChartPoint,
  TrooChartViewModel,
  TrooMarketDataPoint
} from './types';

export const COMPANY_USDT = 31500000;
export const TROO_CHART_WIDTH = 320;
export const TROO_CHART_HEIGHT = 110;

export function getAdminTrooMarketData(trooPriceUSD: number): TrooMarketDataPoint[] {
  return [
    { time: '00:00', price: trooPriceUSD * 0.941, change: -5.9 },
    { time: '04:00', price: trooPriceUSD * 0.962, change: -3.8 },
    { time: '08:00', price: trooPriceUSD * 0.950, change: -5.0 },
    { time: '12:00', price: trooPriceUSD * 0.984, change: -1.6 },
    { time: '16:00', price: trooPriceUSD * 1.012, change: 1.2 },
    { time: '20:00', price: trooPriceUSD * 1.031, change: 3.1 },
    { time: '24:00', price: trooPriceUSD * 1.042, change: 4.2 },
  ];
}

export function getTrooChartPoints(
  adminTrooMarketData: TrooMarketDataPoint[],
  trooPriceUSD: number,
  trooChartWidth = TROO_CHART_WIDTH,
  trooChartHeight = TROO_CHART_HEIGHT
): TrooChartPoint[] {
  const minTrooPrice = trooPriceUSD * 0.92;
  const maxTrooPrice = trooPriceUSD * 1.06;

  return adminTrooMarketData.map((d, i) => {
    const x = (i / (adminTrooMarketData.length - 1)) * trooChartWidth;
    const y = trooChartHeight - ((d.price - minTrooPrice) / (maxTrooPrice - minTrooPrice)) * trooChartHeight;
    return { x, y, ...d };
  });
}

export function getLinePath(trooPoints: TrooChartPoint[]) {
  return trooPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
}

export function getAreaPath(trooLinePath: string, trooChartWidth = TROO_CHART_WIDTH, trooChartHeight = TROO_CHART_HEIGHT) {
  return `${trooLinePath} L ${trooChartWidth} ${trooChartHeight} L 0 ${trooChartHeight} Z`;
}

const formatUsdt = (value: number) => `${value.toLocaleString()} USDT`;

const getSafeActiveIndex = (length: number, preferredIndex: number) => {
  if (length <= 0) return 0;
  return Math.min(Math.max(preferredIndex, 0), length - 1);
};

export function buildMetricCards(metrics: AdminDashboardMetricsDto): MetricCardViewModel[] {
  return [
    {
      key: 'totalMembers',
      title: '全网总会员数',
      value: `${metrics.totalMembers.toLocaleString()} 人`,
      sub: '100% 链上真实注册账户',
      colorClass: 'text-white'
    },
    {
      key: 'todaySubscriptionAmount',
      title: '今日流动性认购单',
      value: formatUsdt(metrics.todaySubscriptionAmount),
      sub: 'D0 今日到账累计单值',
      colorClass: 'text-[#cfbcff]'
    },
    {
      key: 'todayCommissionAmount',
      title: '今日已派发佣金 (L1-L5)',
      value: formatUsdt(metrics.todayCommissionAmount),
      sub: 'D+1 04:00 精算核拨成功',
      colorClass: 'text-emerald-400'
    },
    {
      key: 'lockedQueueAmount',
      title: '全联盟锁仓排队总额',
      value: formatUsdt(metrics.lockedQueueAmount),
      sub: '等待推荐下线认购实时释放',
      colorClass: 'text-amber-400'
    },
    {
      key: 'reserveBalance',
      title: '储备账户总余量',
      value: formatUsdt(metrics.reserveBalance),
      sub: '储备覆盖保证金充裕',
      colorClass: 'text-teal-300'
    }
  ];
}

export function buildTrendChartViewModel(
  trend: AdminDashboardTrendDto[],
  activeIndex = trend.length - 1
): TrendChartViewModel {
  const safeActiveIndex = getSafeActiveIndex(trend.length, activeIndex);
  const activeItem = trend[safeActiveIndex] ?? {
    date: '-',
    subscriptionAmount: 0,
    commissionAmount: 0
  };

  return {
    xAxis: trend.map((item) => item.date),
    series: [
      {
        key: 'subscription',
        name: '订阅认购金额',
        color: '#cfbcff',
        values: trend.map((item) => item.subscriptionAmount)
      },
      {
        key: 'commission',
        name: 'D+1 结算分润',
        color: '#6750a4',
        values: trend.map((item) => item.commissionAmount)
      }
    ],
    activeIndex: safeActiveIndex,
    activePoint: {
      date: activeItem.date,
      subscriptionAmountText: formatUsdt(activeItem.subscriptionAmount),
      commissionAmountText: formatUsdt(activeItem.commissionAmount)
    }
  };
}

export function buildTrooChartViewModel(
  marketData: TrooMarketDataPoint[],
  activeIndex = marketData.length - 1
): TrooChartViewModel {
  const safeActiveIndex = getSafeActiveIndex(marketData.length, activeIndex);
  const activeItem = marketData[safeActiveIndex] ?? {
    time: '-',
    price: 0,
    change: 0
  };

  return {
    xAxis: marketData.map((item) => item.time),
    prices: marketData.map((item) => item.price),
    changes: marketData.map((item) => item.change),
    activeIndex: safeActiveIndex,
    activePoint: {
      time: activeItem.time,
      priceText: `$${activeItem.price.toFixed(4)}`,
      changeText: `${activeItem.change >= 0 ? '+' : ''}${activeItem.change.toFixed(2)}%`,
      change: activeItem.change
    }
  };
}

export function buildTrendChartOption(chart: TrendChartViewModel): EChartsOption {
  return {
    animation: true,
    grid: { top: 12, right: 10, bottom: 24, left: 8, containLabel: false },
    tooltip: { show: false },
    xAxis: {
      type: 'category',
      data: chart.xAxis,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: 'rgba(203,196,210,0.42)', fontSize: 10, fontWeight: 700 }
    },
    yAxis: {
      type: 'value',
      show: false,
      splitLine: { show: false }
    },
    series: chart.series.map((item) => ({
      name: item.name,
      type: 'bar',
      data: item.values,
      barWidth: 14,
      itemStyle: {
        color: item.color,
        borderRadius: [3, 3, 0, 0],
        opacity: item.key === 'subscription' ? 0.86 : 0.68
      },
      emphasis: {
        itemStyle: {
          opacity: 1
        }
      }
    }))
  };
}

export function buildTrooChartOption(chart: TrooChartViewModel): EChartsOption {
  return {
    animation: true,
    grid: { top: 8, right: 6, bottom: 18, left: 6, containLabel: false },
    tooltip: { show: false },
    xAxis: {
      type: 'category',
      data: chart.xAxis,
      boundaryGap: false,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false }
    },
    yAxis: {
      type: 'value',
      show: false,
      scale: true,
      splitLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.04)',
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: 'TROO / USDT',
        type: 'line',
        data: chart.prices,
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        showSymbol: false,
        lineStyle: {
          width: 3,
          color: '#cfbcff'
        },
        itemStyle: {
          color: '#cfbcff',
          borderColor: '#141119',
          borderWidth: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(207,188,255,0.26)' },
              { offset: 1, color: 'rgba(103,80,164,0)' }
            ]
          }
        },
        emphasis: {
          focus: 'series',
          scale: true
        }
      }
    ]
  };
}

export function buildDashboardViewModel(
  overview: AdminDashboardOverviewDto,
  {
    activeTrendIndex = overview.trend.length - 1,
    activeTrooIndex = overview.trooMarket.length - 1
  }: {
    activeTrendIndex?: number;
    activeTrooIndex?: number;
  } = {}
): DashboardViewModel {
  const trendChart = buildTrendChartViewModel(overview.trend, activeTrendIndex);
  const trooChart = buildTrooChartViewModel(overview.trooMarket, activeTrooIndex);

  return {
    metricCards: buildMetricCards(overview.metrics),
    trendChart,
    trendOption: buildTrendChartOption(trendChart),
    trooChart,
    trooOption: buildTrooChartOption(trooChart)
  };
}
