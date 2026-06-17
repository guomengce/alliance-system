import { Eye } from 'lucide-react';
import type { MobileOrderCardProps } from '../../types';

interface OrderMobileCardProps extends MobileOrderCardProps {}

export default function OrderMobileCard({
  order,
  setSelectedOrder,
  setDetailSearchQuery,
  onUpdateOrderStatus
}: OrderMobileCardProps) {
  return (
    <div className="bg-[#1c1825]/60 border border-white/5 p-4 rounded-2xl space-y-3 font-sans">
      <div className="flex justify-between items-center text-xs">
        <span className="font-bold text-white font-mono">{order.id}</span>
        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${order.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400' : order.status === 'pending' ? 'bg-amber-500/10 text-amber-400 animate-pulse' : 'bg-red-500/10 text-red-400'}`}>
          {order.status === 'confirmed' ? '已存证交割' : order.status === 'pending' ? '待审核' : '已作废'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px] border-t border-b border-white/5 py-2 font-mono">
        <div>
          <span className="text-[#cbc4d2]/40 text-[9px] block font-sans">会员 UID</span>
          <p className="text-[#cbc4d2]/80 mt-0.5">{order.uid}</p>
        </div>
        <div>
          <span className="text-[#cbc4d2]/40 text-[9px] block font-sans">认购理财规格</span>
          <p className="font-sans text-white font-bold mt-0.5">{order.planName}</p>
        </div>
        <div>
          <span className="text-[#cbc4d2]/40 text-[9px] block font-sans">认购金额</span>
          <p className="text-emerald-400 font-extrabold mt-0.5">USDT {order.amount.toLocaleString()}</p>
        </div>
        <div>
          <span className="text-[#cbc4d2]/40 text-[9px] block font-sans">到账结算时间</span>
          <p className="text-[#cbc4d2]/50 mt-0.5">{order.time}</p>
        </div>
      </div>

      <div className="flex justify-between items-center text-[11px] gap-2">
        <button
          type="button"
          onClick={() => {
            setSelectedOrder(order);
            setDetailSearchQuery('');
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
          className="bg-white/5 hover:bg-[#cfbcff]/10 text-white hover:text-[#cfbcff] px-2.5 py-1.5 rounded-xl active:scale-95 transition-all text-[11px] font-bold flex items-center gap-1 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>操作</span>
        </button>

        <div className="flex items-center gap-1.5 ml-auto">
          {order.status === 'pending' && (
            <>
              <button
                type="button"
                onClick={() => {
                  onUpdateOrderStatus(order.id, 'confirmed');
                  alert(`订单 ${order.id} 交易到货审核已经完成！`);
                }}
                className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-bold px-2 py-1 rounded-lg text-[10px] cursor-pointer"
              >
                确认
              </button>
              <button
                type="button"
                onClick={() => {
                  onUpdateOrderStatus(order.id, 'cancelled');
                  alert(`订单 ${order.id} 已执行拒绝驳回！`);
                }}
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold px-2 py-1 rounded-lg text-[10px] cursor-pointer"
              >
                驳回
              </button>
            </>
          )}
          {order.status === 'confirmed' && (
            <span className="text-[10px] text-emerald-400/60 font-semibold select-none">✔ 已交割</span>
          )}
          {order.status === 'cancelled' && (
            <span className="text-[10px] text-white/30 select-none">中止</span>
          )}
        </div>
      </div>
    </div>
  );
}
