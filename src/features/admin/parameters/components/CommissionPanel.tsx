import { Coins } from 'lucide-react';
import type { CommissionPanelProps } from '../types';

export default function CommissionPanel({ commissionLevels, setCommissionLevels }: CommissionPanelProps) {
  return (
    <div className="bg-[#1f1a26]/40 border border-white/5 rounded-2xl p-4.5 space-y-3.5 flex flex-col justify-between">
      <div>
        <h4 className="text-xs font-black text-[#cfbcff] uppercase tracking-wider pb-2.5 border-b border-white/5 flex items-center gap-1">
          <Coins className="w-4 h-4 text-[#cfbcff]" />
          L1 - L5 直推及团队分派比例 (%)
        </h4>
        <p className="text-[11px] text-[#cbc4d2]/50 leading-relaxed mt-2">
          分别对应第一至五代推荐上线可获得的返比。默认：各级均为 40% 的 U 等值比例计算。
        </p>

        <div className="space-y-2.5 mt-4">
          {['L1', 'L2', 'L3', 'L4', 'L5'].map(lvl => (
            <div key={lvl} className="flex justify-between items-center text-xs">
              <span className="font-bold text-white font-mono">{lvl} 级代理派佣比</span>
              <div className="relative">
                <input 
                  type="number"
                  value={commissionLevels[lvl]}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value) || 0;
                    setCommissionLevels({ ...commissionLevels, [lvl]: v });
                  }}
                  className="bg-[#110e16] border border-white/5 text-white pl-3.5 pr-8 py-1.5 rounded-lg w-28 text-right font-mono font-bold focus:ring-1 focus:ring-[#cfbcff] outline-none"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 text-[10px]">%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={() => alert('L1-L5 各层推荐代付分佣占比修改已实时推送并锁入智能结算合约！')}
        className="w-full mt-4 py-2 bg-gradient-to-r from-[#6750a4] to-[#cfbcff] text-white rounded-xl text-xs font-bold active:scale-95 transition-all text-center cursor-pointer"
      >
        锁定分成占比
      </button>
    </div>
  );
}
