import { useState } from 'react';
import type { OrderDetail } from '../types';
import { INITIAL_ORDERS, filterAllocations } from '../utils';

export function useOrdersState() {
  const [orders, setOrders] = useState<OrderDetail[]>(INITIAL_ORDERS);
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