import DetailView from './detail';
import ListView from './list';
import { useOrdersState } from './hooks/useOrdersState';

export default function AdminOrdersView() {
  const {
    detailSearchQuery,
    exportMockCSV,
    filteredAllocations,
    handleUpdateOrderStatus,
    orders,
    selectedOrder,
    setDetailSearchQuery,
    setSelectedOrder
  } = useOrdersState();

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
