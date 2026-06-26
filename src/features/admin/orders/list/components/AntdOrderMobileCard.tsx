import { Button, Space, Tag } from 'antd';
import { Eye } from 'lucide-react';

import { AntdCard } from '../../../../../shared/antd/AntdCard';
import type { MobileOrderCardProps, OrderDetail } from '../../types';

function OrderStatusTag({ status }: { status: OrderDetail['status'] }) {
  if (status === 'confirmed') {
    return <Tag className="alliance-antd-tag alliance-antd-tag-success">已存证交割</Tag>;
  }

  if (status === 'pending') {
    return <Tag className="alliance-antd-tag alliance-antd-tag-warning animate-pulse">待审核</Tag>;
  }

  return <Tag className="alliance-antd-tag alliance-antd-tag-danger">已作废</Tag>;
}

export default function AntdOrderMobileCard({
  order,
  setSelectedOrder,
  setDetailSearchQuery,
  onConfirmOrderArrival,
  onCancelOrder,
}: MobileOrderCardProps) {
  const openOrderDetail = () => {
    setSelectedOrder(order);
    setDetailSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <AntdCard className="alliance-antd-mobile-card alliance-antd-order-mobile-card">
      <div className="flex justify-between items-center text-xs">
        <span className="font-bold text-white font-mono">{order.id}</span>
        <OrderStatusTag status={order.status} />
      </div>

      <div className="grid grid-cols-2 gap-2 text-[13px] border-t border-b border-white/5 py-2 font-mono">
        <div>
          <span className="text-[#cbc4d2]/40 text-xs block font-sans">会员 UID</span>
          <p className="text-[#cbc4d2]/80 mt-0.5">{order.uid}</p>
        </div>
        <div>
          <span className="text-[#cbc4d2]/40 text-xs block font-sans">认购理财规格</span>
          <p className="font-sans text-white font-bold mt-0.5">{order.planName}</p>
        </div>
        <div>
          <span className="text-[#cbc4d2]/40 text-xs block font-sans">认购金额</span>
          <p className="text-emerald-400 font-extrabold mt-0.5">USDT {order.amount.toLocaleString()}</p>
        </div>
        <div>
          <span className="text-[#cbc4d2]/40 text-xs block font-sans">到账结算时间</span>
          <p className="text-[#cbc4d2]/50 mt-0.5">{order.time}</p>
        </div>
      </div>

      <div className="flex justify-between items-center text-[13px] gap-2">
        <Button
          className="alliance-antd-mobile-action-button"
          icon={<Eye className="w-3.5 h-3.5" />}
          size="small"
          onClick={openOrderDetail}
        >
          操作
        </Button>

        <div className="flex items-center gap-1.5 ml-auto">
          {order.status === 'pending' && (
            <Space size={6}>
              <Button
                className="alliance-antd-mini-button alliance-antd-mini-button-success"
                size="small"
                onClick={() => onConfirmOrderArrival(order.id, 'short')}
              >
                确认
              </Button>
              <Button
                className="alliance-antd-mini-button alliance-antd-mini-button-danger"
                size="small"
                onClick={() => onCancelOrder(order.id, 'short')}
              >
                驳回
              </Button>
            </Space>
          )}
          {order.status === 'confirmed' && (
            <span className="text-xs text-emerald-400/60 font-semibold select-none">已交割</span>
          )}
          {order.status === 'cancelled' && (
            <span className="text-xs text-white/30 select-none">中止</span>
          )}
        </div>
      </div>
    </AntdCard>
  );
}
