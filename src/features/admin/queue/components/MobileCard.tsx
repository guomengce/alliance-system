import { Eye } from 'lucide-react';
import type { MobileCardProps } from '../types';

export function MobileCard({ roster: r, onOpenDetails }: MobileCardProps) {
  return (
    <div className="bg-[#1d1925]/40 border border-white/5 p-4 rounded-2xl space-y-3 font-sans">
      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse animate-duration-1000"></div>
          <div>
            <p className="text-white leading-none font-bold text-xs">{r.uid}</p>
            <p className="text-[10px] text-[#cbc4d2]/40 font-normal mt-1">{r.nickname}</p>
          </div>
        </div>
        <span className="text-[9px] font-black text-white bg-white/5 px-2 py-0.5 rounded-full border border-white/10 font-mono">
          {r.count} 次触发
        </span>
      </div>

      <div className="grid grid-cols-3 gap-1.5 text-[11px] border-t border-b border-white/5 py-2.5 font-mono text-center">
        <div>
          <span className="text-[#cbc4d2]/40 text-[9px] block font-sans text-left">初始锁定</span>
          <p className="text-[#cbc4d2]/80 mt-0.5 text-left truncate">USDT {r.original.toLocaleString()}</p>
        </div>
        <div>
          <span className="text-[#cbc4d2]/40 text-[9px] block font-sans">锁定余额</span>
          <p className="text-amber-300 font-extrabold mt-0.5 truncate">USDT {r.current.toLocaleString()}</p>
        </div>
        <div>
          <span className="text-[#cbc4d2]/40 text-[9px] block font-sans text-right">已释出</span>
          <p className="text-emerald-400 font-extrabold mt-0.5 text-right truncate">USDT {r.unlocked.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => onOpenDetails(r)}
          className="bg-white/5 hover:bg-[#cfbcff]/15 text-[#cbc4d2] hover:text-[#cfbcff] px-3 py-1.5 rounded-xl font-bold font-sans active:scale-95 transition-all text-xs flex items-center gap-1 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>查看记录详情</span>
        </button>
      </div>
    </div>
  );
}
