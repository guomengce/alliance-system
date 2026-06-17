import { ArrowLeft, CheckCircle, Landmark, XCircle } from 'lucide-react';
import type { DetailViewProps } from '../types';

interface HeaderAndActionsProps {
  selectedOrder: DetailViewProps['selectedOrder'];
  setSelectedOrder: DetailViewProps['setSelectedOrder'];
  setDetailSearchQuery: DetailViewProps['setDetailSearchQuery'];
  onUpdateOrderStatus: DetailViewProps['onUpdateOrderStatus'];
}

export default function HeaderAndActions({
  selectedOrder,
  setSelectedOrder,
  setDetailSearchQuery,
  onUpdateOrderStatus
}: HeaderAndActionsProps) {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setSelectedOrder(null);
              setDetailSearchQuery('');
            }}
            className="bg-white/5 hover:bg-[#cfbcff]/10 text-[#cfbcff] px-3.5 py-2 rounded-xl text-xs font-bold border border-[#cfbcff]/10 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>返回订单列表</span>
          </button>

          <div className="h-4 w-px bg-white/10 hidden sm:block"></div>

          <div className="text-left">
            <span className="text-[10px] uppercase text-[#cbc4d2]/40 font-mono tracking-wider block">订单穿透详情审计</span>
            <p className="text-sm font-black text-white font-mono mt-0.5">{selectedOrder.id}</p>
          </div>
        </div>

        <div className="shrink-0">
          <span className={`text-[10px] font-black px-3 py-1.5 rounded-full ${selectedOrder.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400' : selectedOrder.status === 'pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'}`}>
            {selectedOrder.status === 'confirmed' ? '● 链上完成交割' : selectedOrder.status === 'pending' ? '● 待安全审核' : '● 已拒绝注销'}
          </span>
        </div>
      </div>

      {selectedOrder.status === 'pending' && (
        <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-xl space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
          <div className="space-y-1 text-left">
            <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Landmark className="w-4 h-4 animate-pulse" />
              <span>待确认的流动性质认购订单</span>
            </h4>
            <p className="text-[11px] text-[#cbc4d2]/70 leading-relaxed max-w-2xl">
              该笔订单交割额度为 <strong className="text-white font-mono">{selectedOrder.amount.toLocaleString()} USDT</strong>。请在核查链上付款哈希并在D+1个工作日内决定是否下发股票及派发佣金。
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                onUpdateOrderStatus(selectedOrder.id, 'confirmed');
                setSelectedOrder(prev => prev ? { ...prev, status: 'confirmed' } : null);
                alert(`订单 ${selectedOrder.id} 交易到货审核已经完成！USDT质押到账已确认，自动开始向对应上线计算佣金派发。`);
              }}
              className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 transition-all cursor-pointer"
            >
              <CheckCircle className="w-3.5 h-3.5" /> 确认到账并交割
            </button>
            <button
              type="button"
              onClick={() => {
                onUpdateOrderStatus(selectedOrder.id, 'cancelled');
                setSelectedOrder(prev => prev ? { ...prev, status: 'cancelled' } : null);
                alert(`订单 ${selectedOrder.id} 已执行撤回，已将其锁定余额原路全额退回到钱包缓存中。`);
              }}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 transition-all cursor-pointer"
            >
              <XCircle className="w-3.5 h-3.5" /> 驳回拒绝
            </button>
          </div>
        </div>
      )}
    </>
  );
}
