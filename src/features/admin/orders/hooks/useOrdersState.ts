import { useState } from 'react';
import { getInitialAdminOrders } from '../../../../api/admin/orders';
import type { OrderDetail } from '../types';
import { filterAllocations } from '../utils';

export function useOrdersState() {
  const [orders, setOrders] = useState<OrderDetail[]>(() => getInitialAdminOrders());
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const [detailSearchQuery, setDetailSearchQuery] = useState('');

  const filteredAllocations = selectedOrder
    ? filterAllocations(selectedOrder.commissionAllocations, detailSearchQuery)
    : [];

  return {
    detailSearchQuery,
    filteredAllocations,
    orders,
    selectedOrder,
    setDetailSearchQuery,
    setOrders,
    setSelectedOrder
  };
}
