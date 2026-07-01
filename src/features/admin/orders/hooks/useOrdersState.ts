import { useEffect, useState } from 'react';
import { getAdminOrders } from '../../../../api/admin/orders';
import { useAppContext } from '../../../../context/AppContext';
import type { OrderDetail, OrderFeedbackVariant } from '../types';
import { buildOrdersCsvContent, filterAllocations, updateOrderStatus } from '../utils';

export function useOrdersState() {
  const { triggerGlobalAlert } = useAppContext();
  const [orders, setOrders] = useState<OrderDetail[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const [detailSearchQuery, setDetailSearchQuery] = useState('');

  const filteredAllocations = selectedOrder
    ? filterAllocations(selectedOrder.commissionAllocations, detailSearchQuery)
    : [];

  useEffect(() => {
    let mounted = true;

    getAdminOrders().then((nextOrders) => {
      if (mounted) {
        setOrders(nextOrders);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

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

  const handleConfirmOrderArrival = (orderId: string, variant: OrderFeedbackVariant = 'full') => {
    handleUpdateOrderStatus(orderId, 'confirmed');
    triggerGlobalAlert(
      variant === 'short'
        ? `订单 ${orderId} 交易到货审核已经完成！`
        : `订单 ${orderId} 交易到货审核已经完成！USDT质押到账已确认，自动开始向对应上线计算佣金派发。`,
      'success'
    );
  };

  const handleCancelOrder = (orderId: string, variant: OrderFeedbackVariant = 'full') => {
    handleUpdateOrderStatus(orderId, 'cancelled');
    triggerGlobalAlert(
      variant === 'short'
        ? `订单 ${orderId} 已执行拒绝驳回！`
        : `订单 ${orderId} 已执行撤回，已将其锁定余额原路全额退回到钱包缓存中。`,
      'success'
    );
  };

  return {
    detailSearchQuery,
    exportMockCSV,
    filteredAllocations,
    handleCancelOrder,
    handleConfirmOrderArrival,
    orders,
    selectedOrder,
    setDetailSearchQuery,
    setSelectedOrder
  };
}
