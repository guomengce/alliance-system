import type { OrdersPanelProps } from '../types';
import OrderDetailModal from './OrderDetailModal';
import OrdersFeed from './OrdersFeed';
import OrdersToolbar from './OrdersToolbar';

export default function OrdersList({
  filteredOrders,
  orderSearchQuery,
  orderStatusFilter,
  visibleOrdersCount,
  loadingMoreOrders,
  selectedDetailOrder,
  onOrdersScroll,
  onSearchChange,
  onClearSearch,
  onStatusFilterChange,
  onSelectDetailOrder,
  onCloseDetailOrder,
  onLoadMoreOrders
}: OrdersPanelProps) {
  return (
    <div className="lg:col-span-2 space-y-4">
      <div className="glass-card rounded-2xl overflow-hidden bg-[#16131c]">
        <OrdersToolbar
          filteredOrdersCount={filteredOrders.length}
          orderSearchQuery={orderSearchQuery}
          orderStatusFilter={orderStatusFilter}
          onSearchChange={onSearchChange}
          onClearSearch={onClearSearch}
          onStatusFilterChange={onStatusFilterChange}
        />

        <OrdersFeed
          filteredOrders={filteredOrders}
          visibleOrdersCount={visibleOrdersCount}
          loadingMoreOrders={loadingMoreOrders}
          onOrdersScroll={onOrdersScroll}
          onSelectDetailOrder={onSelectDetailOrder}
          onLoadMoreOrders={onLoadMoreOrders}
        />
      </div>

      <OrderDetailModal selectedDetailOrder={selectedDetailOrder} onClose={onCloseDetailOrder} />
    </div>
  );
}
