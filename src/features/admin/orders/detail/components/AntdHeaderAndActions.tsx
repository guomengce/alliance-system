import { Button, Tag } from 'antd';
import { ArrowLeft, CheckCircle, Landmark, XCircle } from 'lucide-react';
import type { DetailViewProps } from '../../types';

interface AntdHeaderAndActionsProps {
  selectedOrder: DetailViewProps['selectedOrder'];
  setSelectedOrder: DetailViewProps['setSelectedOrder'];
  setDetailSearchQuery: DetailViewProps['setDetailSearchQuery'];
  onConfirmOrderArrival: DetailViewProps['onConfirmOrderArrival'];
  onCancelOrder: DetailViewProps['onCancelOrder'];
}

function OrderStatusTag({ status }: { status: 'confirmed' | 'pending' | 'cancelled' }) {
  if (status === 'confirmed') {
    return <Tag color="success">已完成交割</Tag>;
  }

  if (status === 'pending') {
    return <Tag color="warning">待安全审核</Tag>;
  }

  return <Tag color="error">已拒绝注销</Tag>;
}

export default function AntdHeaderAndActions({
  selectedOrder,
  setSelectedOrder,
  setDetailSearchQuery,
  onConfirmOrderArrival,
  onCancelOrder,
}: AntdHeaderAndActionsProps) {
  const backToList = () => {
    setSelectedOrder(null);
    setDetailSearchQuery('');
  };

  const confirmOrder = () => {
    onConfirmOrderArrival(selectedOrder.id);
    setSelectedOrder((prev) => (prev ? { ...prev, status: 'confirmed' } : null));
  };

  const cancelOrder = () => {
    onCancelOrder(selectedOrder.id);
    setSelectedOrder((prev) => (prev ? { ...prev, status: 'cancelled' } : null));
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <Button
            type="default"
            onClick={backToList}
            icon={<ArrowLeft className="w-3.5 h-3.5" />}
          >
            返回订单列表
          </Button>

          <div className="h-4 w-px bg-white/10 hidden sm:block" />

          <div className="text-left">
            <span className="text-xs uppercase text-[#cbc4d2]/40 font-mono tracking-wider block">订单穿透详情审计</span>
            <p className="text-sm font-black text-white font-mono mt-0.5">{selectedOrder.id}</p>
          </div>
        </div>

        <div className="shrink-0">
          <OrderStatusTag status={selectedOrder.status} />
        </div>
      </div>

      {selectedOrder.status === 'pending' && (
        <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-xl space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
          <div className="space-y-1 text-left">
            <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Landmark className="w-4 h-4 animate-pulse" />
              <span>待确认的流动性质押认购订单</span>
            </h4>
            <p className="text-[13px] text-[#cbc4d2]/70 leading-relaxed max-w-2xl">
              该笔订单交割额度为
              <strong className="text-white font-mono"> {selectedOrder.amount.toLocaleString()} USDT</strong>。
              请在核查链上付款哈希后决定是否下发股票及派发佣金。
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              type="primary"
              onClick={confirmOrder}
              icon={<CheckCircle className="w-3.5 h-3.5" />}
            >
              确认到账并交割
            </Button>
            <Button
              danger
              type="default"
              onClick={cancelOrder}
              icon={<XCircle className="w-3.5 h-3.5" />}
            >
              驳回拒绝
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
