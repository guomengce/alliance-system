import ListHeader from './components/ListHeader';
import AntdOrderMobileCard from './components/AntdOrderMobileCard';
import AntdOrdersTable from './components/AntdOrdersTable';
import type { ListViewProps } from '../types';

export default function ListView({
  orders,
  setSelectedOrder,
  setDetailSearchQuery,
  exportMockCSV,
  onConfirmOrderArrival,
  onCancelOrder
}: ListViewProps) {
  return (
    <div id="admin_orders_view" className="space-y-4 animate-fadeIn select-none flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-3">
      <div className="glass-card p-4 md:p-5 rounded-2xl border border-white/5 bg-[#141119] space-y-4 flex-grow flex flex-col">
        <ListHeader onExport={exportMockCSV} />

        <div className="space-y-4">
          <div className="block md:hidden space-y-3">
            {orders.map((order) => (
              <div key={order.id}>
                <AntdOrderMobileCard
                  order={order}
                  setSelectedOrder={setSelectedOrder}
                  setDetailSearchQuery={setDetailSearchQuery}
                  onConfirmOrderArrival={onConfirmOrderArrival}
                  onCancelOrder={onCancelOrder}
                />
              </div>
            ))}
          </div>
          <AntdOrdersTable
            orders={orders}
            setSelectedOrder={setSelectedOrder}
            setDetailSearchQuery={setDetailSearchQuery}
            onConfirmOrderArrival={onConfirmOrderArrival}
            onCancelOrder={onCancelOrder}
          />
        </div>
      </div>
    </div>
  );
}
