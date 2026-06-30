import './antd-overrides.css';
import DetailView from './detail';
import ListView from './list';
import { useOrdersState } from './hooks/useOrdersState';

export default function AdminOrdersView() {
  const {
    detailSearchQuery,
    exportMockCSV,
    filteredAllocations,
    handleCancelOrder,
    handleConfirmOrderArrival,
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
        onConfirmOrderArrival={handleConfirmOrderArrival}
        onCancelOrder={handleCancelOrder}
      />
    );
  }

  return (
    <ListView
      orders={orders}
      setSelectedOrder={setSelectedOrder}
      setDetailSearchQuery={setDetailSearchQuery}
      exportMockCSV={exportMockCSV}
      onConfirmOrderArrival={handleConfirmOrderArrival}
      onCancelOrder={handleCancelOrder}
    />
  );
}
