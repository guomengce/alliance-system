import { Download, Zap } from 'lucide-react';
import type { HeaderProps } from '../types';

export default function Header({
  onIncreaseLimit,
  onExport
}: HeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <p className="text-xs text-[#cbc4d2]/80">
          实时追踪您的下线贡献。佣金实行 <span className="text-[#00e676] font-bold">D+1 自动划转已开通</span>，每日凌晨 2:00 自动入账。
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="px-3.5 py-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/30 text-emerald-400 text-xs font-black flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.08)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>D+1 自动归集服务中</span>
        </div>

        <button 
          onClick={onIncreaseLimit}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-tr from-[#6750a4] to-[#cfbcff] text-[#110e16] font-black text-xs flex items-center gap-1.5 hover:brightness-110 shadow-lg active:scale-95 transition-all duration-150"
        >
          <Zap className="w-4 h-4 fill-[#110e16]" /> 提升额度
        </button>

        <button 
          onClick={onExport}
          className="px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-xs font-bold text-[#cfbcff] flex items-center gap-1.5 active:scale-[0.98]"
        >
          <Download className="w-4 h-4" /> 导出报表
        </button>
      </div>
    </div>
  );
}
