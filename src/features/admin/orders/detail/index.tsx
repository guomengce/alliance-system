import HeaderAndActions from './components/HeaderAndActions';
import BottomActions from './components/BottomActions';
import CommissionAllocationPanel from './components/CommissionAllocationPanel';
import FinancialTrackPanel from './components/FinancialTrackPanel';
import StockAllocationPanel from './components/StockAllocationPanel';
import type { DetailViewProps } from '../types';

export default function DetailView({
  selectedOrder,
  setSelectedOrder,
  detailSearchQuery,
  setDetailSearchQuery,
  filteredAllocations,
  onConfirmOrderArrival,
  onCancelOrder
}: DetailViewProps) {
  return (
    <div id="admin_orders_detail_view" className="space-y-4 animate-fadeIn select-none flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-3 font-sans">
      <div className="glass-card p-4 md:p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-6 flex-grow flex flex-col">
        <HeaderAndActions
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          setDetailSearchQuery={setDetailSearchQuery}
          onConfirmOrderArrival={onConfirmOrderArrival}
          onCancelOrder={onCancelOrder}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          <FinancialTrackPanel selectedOrder={selectedOrder} />
          <StockAllocationPanel selectedOrder={selectedOrder} />
        </div>

        <CommissionAllocationPanel
          filteredAllocations={filteredAllocations}
          detailSearchQuery={detailSearchQuery}
          setDetailSearchQuery={setDetailSearchQuery}
        />

        <BottomActions
          setSelectedOrder={setSelectedOrder}
          setDetailSearchQuery={setDetailSearchQuery}
        />
      </div>
    </div>
  );
}
