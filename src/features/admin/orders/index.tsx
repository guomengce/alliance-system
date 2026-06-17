import DetailView from './detail';
import ListView from './list';
import { useOrdersState } from './hooks/useOrdersState';
import type { OrderDetail } from './types';

export default function AdminOrdersView() {
  const {
    detailSearchQuery,
    filteredAllocations,
    orders,
    selectedOrder,
    setDetailSearchQuery,
    setOrders,
    setSelectedOrder
  } = useOrdersState();

  // Export CSV
  const exportMockCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "订单编号,会员UID,认购套餐,认购金额(USDT),支付通道,交易哈希,资金流向,状态,入账时间\r\n";
    orders.forEach(o => {
      csvContent += `${o.id},${o.uid},${o.planName},${o.amount},${o.paymentChannel},${o.txid},${o.cashFlowTrack},${o.status},${o.time}\r\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `orders_full_audit_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderDetail['status']) => {
    setOrders(prev => prev.map(item => item.id === orderId ? { ...item, status } : item));
  };


  if (selectedOrder) {
    return (
      <DetailView
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        detailSearchQuery={detailSearchQuery}
        setDetailSearchQuery={setDetailSearchQuery}
        filteredAllocations={filteredAllocations}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />
    );
  }

  return (
    <ListView
      orders={orders}
      setSelectedOrder={setSelectedOrder}
      setDetailSearchQuery={setDetailSearchQuery}
      exportMockCSV={exportMockCSV}
      onUpdateOrderStatus={handleUpdateOrderStatus}
    />
  );
}
