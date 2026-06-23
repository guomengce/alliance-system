import { Eye } from 'lucide-react';
import type { OrderRowProps } from '../../types';

export default function OrderTableRow({
  order,
  setSelectedOrder,
  setDetailSearchQuery,
  onConfirmOrderArrival,
  onCancelOrder
}: OrderRowProps) {
  return (
    <tr className="hover:bg-white/[0.02] transition-colors">
      <td className="py-3.5 px-4 font-bold text-white font-mono">{order.id}</td>
      <td className="py-3.5 px-4 text-[#cbc4d2]/80">{order.uid}</td>
      <td className="py-3.5 px-4 font-sans text-white font-bold">{order.planName}</td>
      <td className="py-3.5 px-4 text-emerald-400 font-extrabold">USDT {order.amount.toLocaleString()}</td>
      <td className="py-3.5 px-4 text-[#cbc4d2]/50">{order.time}</td>
      <td className="py-3.5 px-4 text-center">
        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${order.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400' : order.status === 'pending' ? 'bg-amber-500/10 text-amber-400 animate-pulse' : 'bg-red-500/10 text-red-400'}`}>
          {order.status === 'confirmed' ? '完成/已交割' : order.status === 'pending' ? '待审核入账' : '已中止作废'}
        </span>
      </td>
      <td className="py-3.5 px-4 text-center">
        <button
          type="button"
          onClick={() => {
            setSelectedOrder(order);
            setDetailSearchQuery('');
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
          className="mx-auto bg-white/5 hover:bg-[#cfbcff]/10 text-white hover:text-[#cfbcff] px-2.5 py-1.5 rounded-lg active:scale-95 transition-all text-[11px] font-bold font-sans flex items-center gap-1 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>查看详情</span>
        </button>
      </td>
      <td className="py-3.5 px-4 text-right space-x-2">
        {order.status === 'pending' && (
          <div className="flex justify-end gap-1.5">
            <button
              type="button"
              onClick={() => {
                onConfirmOrderArrival(order.id);
              }}
              className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-sans font-bold px-2 py-1 rounded-lg text-[10px] transition-all cursor-pointer"
            >
              确认到账
            </button>
            <button
              type="button"
              onClick={() => {
                onCancelOrder(order.id);
              }}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-sans font-bold px-2 py-1 rounded-lg text-[10px] transition-all cursor-pointer"
            >
              驳回
            </button>
          </div>
        )}
        {order.status === 'confirmed' && (
          <span className="text-[10px] text-emerald-400/60 font-mono font-bold font-sans">✔ 交割锁证已存证</span>
        )}
        {order.status === 'cancelled' && (
          <span className="text-[10px] text-white/30 font-sans">链上中断</span>
        )}
      </td>
    </tr>
  );
}
