import { describe, expect, it } from 'vitest';
import type { OrderDetail } from './types';
import { buildOrdersCsvContent, updateOrderStatus } from './utils';

const order: OrderDetail = {
  id: 'ORD-1',
  uid: '1001',
  planName: 'Gold',
  amount: 5000,
  status: 'pending',
  time: '2026-06-22 12:00:00',
  paymentChannel: 'TRC20',
  txid: 'TX-1',
  cashFlowTrack: 'Reserve',
  stockConversion: {
    buyRatio: 40,
    queueRatio: 60,
    directStocks: 100,
    queueStocks: 150,
    giftedStocks: 20
  },
  commissionAllocations: []
};

describe('admin orders utils', () => {
  it('updates order status by id', () => {
    expect(updateOrderStatus([order], 'ORD-1', 'confirmed')[0].status).toBe('confirmed');
  });

  it('builds orders CSV content', () => {
    const csv = buildOrdersCsvContent([order]);

    expect(csv).toContain('订单编号,会员UID,认购套餐,认购金额(USDT),支付通道,交易哈希,资金流向,状态,入账时间');
    expect(csv).toContain('ORD-1,1001,Gold,5000,TRC20,TX-1,Reserve,pending,2026-06-22 12:00:00');
  });
});
