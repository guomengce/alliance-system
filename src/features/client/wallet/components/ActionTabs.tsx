import { ArrowDownLeft, ArrowUpRight, Info, RefreshCcw } from 'lucide-react';
import type { ActionTabsProps } from '../types';

export default function ActionTabs({ activeAction, onToggleAction }: ActionTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
      <button
        onClick={() => onToggleAction(activeAction === 'recharge' ? 'none' : 'recharge')}
        className={`flex items-center justify-center gap-1.5 px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-xl font-bold transition-all duration-150 text-xs sm:text-sm cursor-pointer border ${
          activeAction === 'recharge'
            ? 'bg-[#6750a4] text-white shadow-md glow-accent border border-[#cfbcff]/40 ring-1 ring-[#cfbcff] scale-[1.02]'
            : activeAction === 'none'
              ? 'bg-[#6750a4] text-white border-transparent hover:scale-[1.02] active:scale-[0.98] shadow-md glow-accent'
              : 'bg-[#141218]/45 text-[#cbc4d2]/40 border-white/5 opacity-60 hover:opacity-85'
        }`}
      >
        <ArrowDownLeft className="w-4 sm:w-4.5 h-4 sm:h-4.5" /> 充值
      </button>

      <button
        onClick={() => onToggleAction(activeAction === 'withdraw' ? 'none' : 'withdraw')}
        className={`flex items-center justify-center gap-1.5 px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-xl font-bold transition-all duration-150 text-xs sm:text-sm cursor-pointer border ${
          activeAction === 'withdraw'
            ? 'bg-[#6750a4] text-white shadow-md glow-accent border border-[#cfbcff]/40 ring-1 ring-[#cfbcff] scale-[1.02]'
            : activeAction === 'none'
              ? 'bg-[#211f24] text-[#cfbcff] border-[#cfbcff]/20 hover:border-[#cfbcff]/50 hover:bg-[#cfbcff]/5 hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-[#141218]/45 text-[#cbc4d2]/40 border-white/5 opacity-60 hover:opacity-85'
        }`}
      >
        <ArrowUpRight className="w-4 sm:w-4.5 h-4 sm:h-4.5" /> 提现
      </button>

      <button
        onClick={() => onToggleAction(activeAction === 'transfer' ? 'none' : 'transfer')}
        className={`flex items-center justify-center gap-1.5 px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-xl font-bold transition-all duration-150 text-xs sm:text-sm cursor-pointer border ${
          activeAction === 'transfer'
            ? 'bg-[#6750a4] text-white shadow-md glow-accent border border-[#cfbcff]/40 ring-1 ring-[#cfbcff] scale-[1.02]'
            : activeAction === 'none'
              ? 'bg-[#211f24] text-white border-white/10 hover:border-white/20 hover:bg-white/5 hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-[#141218]/45 text-[#cbc4d2]/40 border-white/5 opacity-60 hover:opacity-85'
        }`}
      >
        <RefreshCcw className="w-4 sm:w-4.5 h-4 sm:h-4.5" /> 划转
      </button>

      <div className="w-full sm:w-auto sm:ml-auto flex items-center gap-1 text-[10px] sm:text-xs text-[#cbc4d2] opacity-60 font-medium">
        <Info className="w-3.5 h-3.5 text-[#cfbcff]" />
        <span>交易流程均经多重安全链上校验</span>
      </div>
    </div>
  );
}
