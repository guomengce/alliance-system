import type { CommissionAllocation, OrderDetail } from './types';

export function filterAllocations(allocations: CommissionAllocation[], detailSearchQuery: string) {
  return allocations.filter(alloc => {
    const q = detailSearchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      alloc.level.toLowerCase().includes(q) ||
      alloc.targetUid.toLowerCase().includes(q) ||
      alloc.nickname.toLowerCase().includes(q)
    );
  });
}

export function updateOrderStatus(
  orders: OrderDetail[],
  orderId: string,
  status: OrderDetail['status']
) {
  return orders.map(item => (
    item.id === orderId ? { ...item, status } : item
  ));
}

export function buildOrdersCsvContent(orders: OrderDetail[]) {
  const header = '订单编号,会员UID,认购套餐,认购金额(USDT),支付通道,交易哈希,资金流向,状态,入账时间';
  const rows = orders.map(order => (
    `${order.id},${order.uid},${order.planName},${order.amount},${order.paymentChannel},${order.txid},${order.cashFlowTrack},${order.status},${order.time}`
  ));

  return [header, ...rows].join('\r\n');
}
