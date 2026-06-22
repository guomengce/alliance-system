import { Fragment } from 'react';
import OrderTableRow from './OrderTableRow';
import type { MobileOrderCardProps } from '../../types';

interface OrdersTableProps extends Omit<MobileOrderCardProps, 'order'> {
  orders: MobileOrderCardProps['order'][];
}

export default function OrdersTable({
  orders,
  setSelectedOrder,
  setDetailSearchQuery,
  onUpdateOrderStatus
}: OrdersTableProps) {
  return (
    <div className="hidden md:block overflow-x-auto border border-white/5 rounded-2xl bg-[#1c1825]/40 p-1">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-white/5 text-[#cbc4d2]/50 font-bold bg-white/[0.01]">
            <th className="py-4 px-4">订单编号 (Tx ID)</th>
            <th className="py-4 px-4">会员 UID</th>
            <th className="py-4 px-4">认购理财规格</th>
            <th className="py-4 px-4 font-mono">认购金额</th>
            <th className="py-4 px-4">到账结算时间</th>
            <th className="py-4 px-4 text-center">状态说明</th>
            <th className="py-4 px-4 text-center">操作</th>
            <th className="py-4 px-4 text-right">审核处理</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 font-mono">
          {orders.map(order => (
            <Fragment key={order.id}>
              <OrderTableRow
                order={order}
                setSelectedOrder={setSelectedOrder}
                setDetailSearchQuery={setDetailSearchQuery}
                onUpdateOrderStatus={onUpdateOrderStatus}
              />
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
