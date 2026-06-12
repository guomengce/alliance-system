import type { OrderStatusFilter, QueueOrderItem } from './types';

export const filterOrders = (
  orders: QueueOrderItem[],
  orderSearchQuery: string,
  orderStatusFilter: OrderStatusFilter
) =>
  orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
                          o.name.toLowerCase().includes(orderSearchQuery.toLowerCase());
    const matchesFilter = orderStatusFilter === 'all' || o.status === orderStatusFilter;
    return matchesSearch && matchesFilter;
  });

export const getProgressPercent = (releasedAmount: number, originalLocked: number) =>
  originalLocked > 0 ? Math.round((releasedAmount / originalLocked) * 100) : 0;
