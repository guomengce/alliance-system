import { ChevronRight } from 'lucide-react';
import type { OrderCardProps } from '../types';

export default function OrderCard({ item, onSelectDetailOrder }: OrderCardProps) {
  const percentComplete = item.originalLock > 0 ? Math.round((item.released / item.originalLock) * 100) : 0;

  return (
    <div
      className="relative bg-[#1c1924]/60 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-lg group overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/[0.02] to-transparent pointer-events-none rounded-tr-2xl"></div>

      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="min-w-0">
          <h5 className="font-extrabold text-sm text-white tracking-wide group-hover:text-[#cfbcff] transition-colors truncate">
            {item.name}
          </h5>
          <p className="text-[10px] text-[#cbc4d2]/30 font-mono mt-1">
            订单编号 ID: <span className="text-[#cbc4d2]/50">{item.id}</span>
          </p>
        </div>
        <div className="shrink-0">
          {item.status === 'released' && (
            <span className="inline-flex items-center px-2.5 py-0.5 bg-emerald-950/50 text-emerald-400 border border-emerald-500/25 rounded-full text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5"></span>
              {item.statusLabel}
            </span>
          )}
          {item.status === 'partially_released' && (
            <span className="inline-flex items-center px-2.5 py-0.5 bg-[#cfbcff]/15 text-[#cfbcff] border border-[#cfbcff]/30 rounded-full text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cfbcff] animate-pulse mr-1.5"></span>
              {item.statusLabel}
            </span>
          )}
          {item.status === 'queueing' && (
            <span className="inline-flex items-center px-2.5 py-0.5 bg-amber-950/50 text-amber-400 border border-amber-500/25 rounded-full text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse mr-1.5"></span>
              {item.statusLabel}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-2 border-t border-b border-white/5 py-3 relative z-10">
        <div>
          <span className="text-[#cbc4d2]/40 text-[9px] font-bold uppercase tracking-wider block">认购方案金额</span>
          <span className="text-white font-mono font-black text-sm block mt-0.5">
            ¥ {item.amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div>
          <span className="text-[#cbc4d2]/40 text-[9px] font-bold uppercase tracking-wider block">排队锁定金额 (31%)</span>
          <span className="text-[#cbc4d2]/80 font-mono font-semibold text-sm block mt-0.5">
            ¥ {item.originalLock.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div>
          <span className="text-[#cbc4d2]/40 text-[9px] font-bold uppercase tracking-wider block">已解锁并买入</span>
          <span className="text-[#cfbcff] font-mono font-black text-sm block mt-0.5">
            ¥ {item.released.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div>
          <span className="text-amber-400/60 text-[9px] font-bold uppercase tracking-wider block">剩余锁定�?</span>
          <span className="text-amber-400 font-mono font-black text-sm block mt-0.5">
            ¥ {item.remainingLock.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <div className="space-y-1.5 relative z-10">
        <div className="flex items-center justify-between text-[11px] font-bold">
          <span className="text-[#cbc4d2]/50">解锁买入进度 (Unlock Ratio)</span>
          <span className="text-white font-mono">{percentComplete}%</span>
        </div>
        <div className="w-full bg-[#100d14] rounded-full h-2 overflow-hidden border border-white/[0.02]">
          <div
            className="bg-gradient-to-r from-[#8a6eff] to-[#cfbcff] h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      </div>

      <div className="pt-2.5 border-t border-white/5 flex justify-between items-center relative z-10">
        <span className="text-[10px] text-[#cbc4d2]/30 font-bold uppercase font-mono">
          UNLOCK HISTORY ({item.unlockHistory?.length || 0})
        </span>
        <button
          type="button"
          onClick={() => onSelectDetailOrder(item)}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#cfbcff] hover:text-[#e5d5ff] hover:underline transition-colors cursor-pointer"
        >
          查看明细
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
