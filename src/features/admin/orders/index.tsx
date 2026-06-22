import DetailView from './detail';
import ListView from './list';
import { useOrdersState } from './hooks/useOrdersState';
import type { OrderDetail } from './types';
import { buildOrdersCsvContent, updateOrderStatus } from './utils';

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
    csvContent += buildOrdersCsvContent(orders);
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `orders_full_audit_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderDetail['status']) => {
    setOrders(prev => updateOrderStatus(prev, orderId, status));
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
