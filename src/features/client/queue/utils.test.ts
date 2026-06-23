import { describe, expect, it } from 'vitest';

import type { QueueOrderItem } from './types';
import { filterOrders, getNextVisibleCount, getProgressPercent } from './utils';

const orders: QueueOrderItem[] = [
  {
    id: 'Q-001',
    name: 'Alpha Growth',
    amount: 1000,
    originalLock: 1000,
    released: 0,
    remainingLock: 1000,
    status: 'queueing',
    statusLabel: 'Queueing',
  },
  {
    id: 'Q-002',
    name: 'Beta Released',
    amount: 2000,
    originalLock: 2000,
    released: 2000,
    remainingLock: 0,
    status: 'released',
    statusLabel: 'Released',
  },
  {
    id: 'Q-003',
    name: 'Gamma Partial',
    amount: 3000,
    originalLock: 3000,
    released: 1500,
    remainingLock: 1500,
    status: 'partially_released',
    statusLabel: 'Partial',
  },
];

describe('client queue utils', () => {
  it('filters orders by case-insensitive id or name and status', () => {
    expect(filterOrders(orders, 'beta', 'all')).toEqual([orders[1]]);
    expect(filterOrders(orders, 'q-00', 'released')).toEqual([orders[1]]);
    expect(filterOrders(orders, 'gamma', 'queueing')).toEqual([]);
  });

  it('calculates rounded release progress and protects zero original lock', () => {
    expect(getProgressPercent(25, 80)).toBe(31);
    expect(getProgressPercent(50, 0)).toBe(0);
  });

  it('caps the next visible count at total length', () => {
    expect(getNextVisibleCount(10, 24)).toBe(20);
    expect(getNextVisibleCount(20, 24)).toBe(24);
    expect(getNextVisibleCount(24, 24)).toBe(24);
  });
});
