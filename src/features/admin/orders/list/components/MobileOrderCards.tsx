import type { MobileOrderCardProps } from '../../types';
import OrderMobileCard from './OrderMobileCard';

interface MobileOrderCardsProps extends MobileOrderCardProps {
  orders: MobileOrderCardProps['order'][];
}

export default function MobileOrderCards({
  orders,
  setSelectedOrder,
  setDetailSearchQuery,
  onUpdateOrderStatus
}: MobileOrderCardsProps) {
  return (
    <div className="block md:hidden space-y-3">
      {orders.map(order => (
        <OrderMobileCard
          key={order.id}
          order={order}
          setSelectedOrder={setSelectedOrder}
          setDetailSearchQuery={setDetailSearchQuery}
          onUpdateOrderStatus={onUpdateOrderStatus}
        />
      ))}
    </div>
  );
}
