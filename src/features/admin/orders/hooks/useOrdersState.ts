import { useState } from 'react';
import { getInitialAdminOrders } from '../../../../api/admin/orders';
import type { OrderDetail } from '../types';
import { buildOrdersCsvContent, filterAllocations, updateOrderStatus } from '../utils';

export function useOrdersState() {
  const [orders, setOrders] = useState<OrderDetail[]>(() => getInitialAdminOrders());
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const [detailSearchQuery, setDetailSearchQuery] = useState('');

  const filteredAllocations = selectedOrder
    ? filterAllocations(selectedOrder.commissionAllocations, detailSearchQuery)
    : [];

  const exportMockCSV = () => {
    const csvContent = `data:text/csv;charset=utf-8,${buildOrdersCsvContent(orders)}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `orders_full_audit_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderDetail['status']) => {
    setOrders(prev => updateOrderStatus(prev, orderId, status));
  };

  return {
    detailSearchQuery,
    exportMockCSV,
    filteredAllocations,
    handleUpdateOrderStatus,
    orders,
    selectedOrder,
    setDetailSearchQuery,
    setSelectedOrder
  };
}
