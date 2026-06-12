import { Eye } from 'lucide-react';
import type { MobileCardProps } from '../types';
import StatusBadge from './StatusBadge';

export default function MobileCard({ payout: p, onSelectCommission }: MobileCardProps) {
  return (
    <div className="bg-[#1d1925]/40 border border-white/5 p-4 rounded-2xl space-y-3 font-sans">
      <div className="flex justify-between items-start">
        <div>
          <span className="font-extrabold text-xs text-white font-mono">{p.id}</span>
          <p className="text-[9px] text-[#cbc4d2]/30 font-mono mt-0.5">源: {p.orderId}</p>
        </div>
        <span className="text-[10px] font-black text-[#cfbcff] bg-[#cfbcff]/10 px-2 py-0.5 rounded">
          {p.level}代
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px] border-t border-b border-white/5 py-2 font-mono">
        <div>
          <span className="text-[#cbc4d2]/40 text-[9px] block font-sans">代理人 UID</span>
          <p className="text-[#cbc4d2] font-semibold">{p.uid}</p>
          <p className="text-[9px] text-[#cbc4d2]/40 font-sans truncate">{p.recipientNickname}</p>
        </div>
        <div>
          <span className="text-[#cbc4d2]/40 text-[9px] block font-sans">{p.status === 'intercepted' ? '拦截回笼额度' : '核算本轮佣金'}</span>
          <p className={`${p.status === 'intercepted' ? 'text-red-400' : 'text-emerald-400'} font-extrabold text-xs mt-0.5`}>USDT {p.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
        </div>
      </div>

      <div className="flex justify-between items-center text-[11px] gap-2">
        <div>
          <span className="text-[#cbc4d2]/40 text-[9px] block font-sans">到账派发状态</span>
          <div className="mt-1">
            <StatusBadge status={p.status} variant="mobile" />
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSelectCommission(p)}
          className="bg-white/5 hover:bg-[#cfbcff]/10 text-white hover:text-[#cfbcff] px-2.5 py-1.5 rounded-xl text-[10px] font-bold active:scale-95 transition-all cursor-pointer flex items-center gap-1 shrink-0"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>查看</span>
        </button>
      </div>
    </div>
  );
}
