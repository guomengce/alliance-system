import { describe, expect, it } from 'vitest';

import {
  TROO_CHART_HEIGHT,
  TROO_CHART_WIDTH,
  buildDashboardPageData,
  buildDashboardViewModel,
  buildMetricCards,
  buildTrendChartOption,
  buildTrendChartViewModel,
  buildTrooChartOption,
  buildTrooChartViewModel,
  getAdminTrooMarketData,
  getAreaPath,
  getLinePath,
  getTrooChartPoints,
} from './utils';
import type { AdminDashboardOverviewDto } from './types';

const dashboardOverview: AdminDashboardOverviewDto = {
  metrics: {
    totalMembers: 5420,
    todaySubscriptionAmount: 128450,
    todayCommissionAmount: 15240.22,
    lockedQueueAmount: 860000,
    reserveBalance: 31850000,
  },
  trooMarket: [
    { time: '00:00', price: 0.117625, change: -5.9 },
    { time: '12:00', price: 0.123, change: -1.6 },
    { time: '24:00', price: 0.13025, change: 4.2 },
  ],
  trend: [
    { date: 'D-2', subscriptionAmount: 88000, commissionAmount: 12000 },
    { date: 'D-1', subscriptionAmount: 96000, commissionAmount: 15000 },
    { date: 'D0', subscriptionAmount: 128450, commissionAmount: 15240.22 },
  ],
};

describe('admin dashboard utils', () => {
  it('derives the fixed intraday TROO market samples from the base price', () => {
    const marketData = getAdminTrooMarketData(0.125);

    expect(marketData).toHaveLength(7);
    expect(marketData[0]).toEqual({ time: '00:00', price: 0.117625, change: -5.9 });
    expect(marketData[6]).toEqual({ time: '24:00', price: 0.13025, change: 4.2 });
  });

  it('maps TROO market prices into chart coordinates', () => {
    const points = getTrooChartPoints(
      [
        { time: 'low', price: 92, change: -8 },
        { time: 'mid', price: 99, change: -1 },
        { time: 'high', price: 106, change: 6 },
      ],
      100,
      200,
      140,
    );

    expect(points).toEqual([
      { time: 'low', price: 92, change: -8, x: 0, y: 140 },
      { time: 'mid', price: 99, change: -1, x: 100, y: 70 },
      { time: 'high', price: 106, change: 6, x: 200, y: 0 },
    ]);
  });

  it('builds SVG line and area paths from chart points', () => {
    const points = getTrooChartPoints(getAdminTrooMarketData(0.125), 0.125);
    const linePath = getLinePath(points);

    expect(linePath.startsWith('M 0 ')).toBe(true);
    expect(linePath).toContain('L 320 ');
    expect(getAreaPath(linePath)).toBe(`${linePath} L ${TROO_CHART_WIDTH} ${TROO_CHART_HEIGHT} L 0 ${TROO_CHART_HEIGHT} Z`);
  });

  it('builds metric cards from dashboard overview metrics', () => {
    const cards = buildMetricCards(dashboardOverview.metrics);

    expect(cards).toHaveLength(5);
    expect(cards[0]).toMatchObject({
      key: 'totalMembers',
      title: '全网总会员数',
      value: '5,420 人',
    });
    expect(cards[3]).toMatchObject({
      key: 'lockedQueueAmount',
      value: '860,000 USDT',
    });
  });

  it('builds trend chart view model and echarts option from overview trend data', () => {
    const chart = buildTrendChartViewModel(dashboardOverview.trend, 1);
    const option = buildTrendChartOption(chart);

    expect(chart.xAxis).toEqual(['D-2', 'D-1', 'D0']);
    expect(chart.activePoint).toEqual({
      date: 'D-1',
      subscriptionAmountText: '96,000 USDT',
      commissionAmountText: '15,000 USDT',
    });
    expect(chart.series.map((item) => item.key)).toEqual(['subscription', 'commission']);
    expect(option).toMatchObject({
      xAxis: { type: 'category', data: ['D-2', 'D-1', 'D0'] },
      yAxis: { type: 'value' },
    });
    expect(Array.isArray(option.series)).toBe(true);
  });

  it('builds troo chart view model and echarts option from market points', () => {
    const chart = buildTrooChartViewModel(dashboardOverview.trooMarket, 2);
    const option = buildTrooChartOption(chart);

    expect(chart.xAxis).toEqual(['00:00', '12:00', '24:00']);
    expect(chart.activePoint).toEqual({
      time: '24:00',
      priceText: '$0.1303',
      changeText: '+4.20%',
      change: 4.2,
    });
    expect(option).toMatchObject({
      xAxis: { type: 'category', data: ['00:00', '12:00', '24:00'] },
      yAxis: { type: 'value' },
    });
    expect(Array.isArray(option.series)).toBe(true);
  });

  it('builds page data that can be passed directly from index to components', () => {
    const pageData = buildDashboardPageData(dashboardOverview, {
      activeTrendIndex: 0,
      activeTrooIndex: 1,
    });

    expect(pageData.metrics.cards).toHaveLength(5);
    expect(pageData.trend.chart.activePoint.date).toBe('D-2');
    expect(pageData.trend.chartOption.series).toBeDefined();
    expect(pageData.trooPrice.chart.activePoint.time).toBe('12:00');
    expect(pageData.trooPrice.chartOption.series).toBeDefined();
  });

  it('keeps the legacy flat dashboard view model for compatibility', () => {
    const viewModel = buildDashboardViewModel(dashboardOverview, {
      activeTrendIndex: 0,
      activeTrooIndex: 1,
    });

    expect(viewModel.metricCards).toBe(viewModel.pageData.metrics.cards);
    expect(viewModel.trendChart).toBe(viewModel.pageData.trend.chart);
    expect(viewModel.trooChart).toBe(viewModel.pageData.trooPrice.chart);
  });
});
