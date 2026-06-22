import { describe, expect, it } from 'vitest';
import {
  INITIAL_CLIENT_QUEUE_ORDER_DTOS,
  INITIAL_CLIENT_RELEASE_LOG_DTOS
} from '../../mock/client/queue';
import {
  getInitialClientQueueOrders,
  getInitialClientReleaseLogs,
  mapClientQueueOrderDto,
  mapClientReleaseLogDto
} from './queue';

describe('client queue mappers', () => {
  it('maps queue order and release log DTOs', () => {
    expect(mapClientQueueOrderDto({
      id: 'ORD-1',
      name: 'Plan A',
      amount: 1000,
      originalLock: 300,
      released: 100,
      remainingLock: 200,
      status: 'partially_released',
      statusLabel: 'Partial',
      unlockHistory: []
    })).toEqual({
      id: 'ORD-1',
      name: 'Plan A',
      amount: 1000,
      originalLock: 300,
      released: 100,
      remainingLock: 200,
      status: 'partially_released',
      statusLabel: 'Partial',
      unlockHistory: []
    });

    expect(mapClientReleaseLogDto({
      id: 'LOG-1',
      date: '2026-06-22 12:00',
      desc: 'Released'
    })).toEqual({
      id: 'LOG-1',
      date: '2026-06-22 12:00',
      desc: 'Released'
    });
  });

  it('returns queue seed data as fresh arrays', () => {
    expect(getInitialClientQueueOrders()).toHaveLength(INITIAL_CLIENT_QUEUE_ORDER_DTOS.length);
    expect(getInitialClientReleaseLogs()).toHaveLength(INITIAL_CLIENT_RELEASE_LOG_DTOS.length);
    expect(getInitialClientQueueOrders()).not.toBe(getInitialClientQueueOrders());
    expect(getInitialClientReleaseLogs()).not.toBe(getInitialClientReleaseLogs());
  });
});
