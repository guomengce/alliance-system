import { describe, expect, it, vi } from 'vitest';

import { getCreditRing, getMarketChartPaths, getYesterdayDateString } from './utils';

describe('client home utils', () => {
  it('calculates credit ring stroke values from usage percent', () => {
    const ring = getCreditRing(25);

    expect(ring.radius).toBe(64);
    expect(ring.circumference).toBeCloseTo(2 * Math.PI * 64);
    expect(ring.strokeDashoffset).toBeCloseTo(ring.circumference * 0.75);
  });

  it('maps market data into chart points, line path, and area path', () => {
    const chart = getMarketChartPaths(
      [
        { time: 'low', price: 0.095, change: -5 },
        { time: 'mid', price: 0.1025, change: 0 },
        { time: 'high', price: 0.11, change: 5 },
      ],
      200,
      100,
    );

    expect(chart.points[0]).toMatchObject({ time: 'low', price: 0.095, change: -5, x: 0 });
    expect(chart.points[0].y).toBeCloseTo(100);
    expect(chart.points[1]).toMatchObject({ time: 'mid', price: 0.1025, change: 0, x: 100 });
    expect(chart.points[1].y).toBeCloseTo(50);
    expect(chart.points[2]).toMatchObject({ time: 'high', price: 0.11, change: 5, x: 200 });
    expect(chart.points[2].y).toBeCloseTo(0);
    expect(chart.linePath.startsWith('M 0 100 L 100 ')).toBe(true);
    expect(chart.areaPath.endsWith(' L 200 100 L 0 100 Z')).toBe(true);
  });

  it('formats yesterday date using local date parts', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 5, 22, 12));

    expect(getYesterdayDateString()).toBe('2026-06-21');

    vi.useRealTimers();
  });
});
