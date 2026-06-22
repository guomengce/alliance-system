import { Fragment } from 'react';
import type { MobileOrderCardProps } from '../../types';
import OrderMobileCard from './OrderMobileCard';

interface MobileOrderCardsProps extends Omit<MobileOrderCardProps, 'order'> {
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
        <Fragment key={order.id}>
          <OrderMobileCard
            order={order}
            setSelectedOrder={setSelectedOrder}
            setDetailSearchQuery={setDetailSearchQuery}
            onUpdateOrderStatus={onUpdateOrderStatus}
          />
        </Fragment>
      ))}
    </div>
  );
}
