import { describe, expect, it } from 'vitest';
import { INITIAL_ADMIN_ORDER_DTOS } from '../../mock/admin/orders';
import { getInitialAdminOrders, mapAdminOrderDto } from './orders';

describe('mapAdminOrderDto', () => {
  it('maps an admin order DTO into the order detail view model', () => {
    const order = mapAdminOrderDto({
      id: 'ORD-1',
      uid: '889421',
      planName: 'Plan A',
      amount: 1000,
      status: 'confirmed',
      time: '2026-06-22 10:00:00',
      paymentChannel: 'wallet',
      txid: '0xabc',
      cashFlowTrack: 'wallet -> custody',
      stockConversion: {
        buyRatio: 30,
        queueRatio: 70,
        directStocks: 300,
        queueStocks: 700,
        giftedStocks: 0
      },
      commissionAllocations: [
        {
          level: 'L1',
          targetUid: '889425',
          nickname: 'Amanda',
          rate: 10,
          amount: 100,
          status: 'distributed'
        }
      ]
    });

    expect(order).toEqual({
      id: 'ORD-1',
      uid: '889421',
      planName: 'Plan A',
      amount: 1000,
      status: 'confirmed',
      time: '2026-06-22 10:00:00',
      paymentChannel: 'wallet',
      txid: '0xabc',
      cashFlowTrack: 'wallet -> custody',
      stockConversion: {
        buyRatio: 30,
        queueRatio: 70,
        directStocks: 300,
        queueStocks: 700,
        giftedStocks: 0
      },
      commissionAllocations: [
        {
          level: 'L1',
          targetUid: '889425',
          nickname: 'Amanda',
          rate: 10,
          amount: 100,
          status: 'distributed'
        }
      ]
    });
  });

  it('defaults missing commission allocations to an empty list', () => {
    const order = mapAdminOrderDto({
      id: 'ORD-2',
      uid: '890112',
      planName: 'Plan B',
      amount: 5000,
      status: 'pending',
      time: '2026-06-22 11:00:00',
      paymentChannel: 'wallet',
      txid: '0xdef',
      cashFlowTrack: 'wallet -> pending',
      stockConversion: {
        buyRatio: 40,
        queueRatio: 60,
        directStocks: 200,
        queueStocks: 300,
        giftedStocks: 0
      }
    });

    expect(order.commissionAllocations).toEqual([]);
  });

  it('returns mapped initial admin orders as a fresh array', () => {
    const firstRead = getInitialAdminOrders();
    const secondRead = getInitialAdminOrders();

    expect(firstRead).toHaveLength(INITIAL_ADMIN_ORDER_DTOS.length);
    expect(firstRead.length).toBeGreaterThan(0);
    expect(firstRead[0]).toMatchObject({
      id: expect.any(String),
      uid: expect.any(String),
      planName: expect.any(String),
      amount: expect.any(Number),
      commissionAllocations: expect.any(Array)
    });
    expect(firstRead).not.toBe(secondRead);
  });
});
