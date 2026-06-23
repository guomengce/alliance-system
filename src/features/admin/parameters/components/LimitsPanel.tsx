import { Sliders } from 'lucide-react';
import type { LimitsPanelProps } from '../types';

export default function LimitsPanel({
  withdrawalFee,
  setWithdrawalFee,
  l1UnlockRatio,
  setL1UnlockRatio,
  onSaveLimits
}: LimitsPanelProps) {
  return (
    <div className="bg-[#1f1a26]/40 border border-white/5 rounded-2xl p-4.5 space-y-3.5 flex flex-col justify-between">
      <div>
        <h4 className="text-xs font-black text-[#e7c365] uppercase tracking-wider pb-2.5 border-b border-white/5 flex items-center gap-1">
          <Sliders className="w-4 h-4 text-[#e7c365]" />
          锁定与出金手续扣取参数
        </h4>
        <p className="text-[11px] text-[#cbc4d2]/50 leading-relaxed mt-2">
          对提现硬性手续封底限制及下线首期买入解锁释放比例设置
        </p>

        <div className="space-y-4 mt-4 text-xs font-sans">
          <div className="flex flex-col gap-1.5">
            <span className="font-semibold text-white">提现硬手续封顶限制 (USDT)</span>
            <input 
              type="number"
              value={withdrawalFee}
              onChange={(e) => setWithdrawalFee(parseFloat(e.target.value) || 0)}
              className="bg-[#110e16] border border-white/5 rounded-xl px-3 py-2 text-xs text-white font-mono focus:ring-1 focus:ring-[#cfbcff] outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="font-semibold text-white">L1 直推下级成交触发排队释放率 (%)</span>
            <input 
              type="number"
              value={l1UnlockRatio}
              onChange={(e) => setL1UnlockRatio(parseFloat(e.target.value) || 0)}
              className="bg-[#110e16] border border-white/5 rounded-xl px-3 py-2 text-xs text-white font-mono focus:ring-1 focus:ring-[#cfbcff] outline-none"
            />
          </div>
        </div>
      </div>

      <button 
        onClick={onSaveLimits}
        className="w-full mt-4 py-2 bg-[#36343a] text-[#cfbcff] rounded-xl text-xs font-bold active:scale-95 transition-all text-center cursor-pointer border border-white/5 hover:bg-[#cfbcff]/10"
      >
        确认扣比修改
      </button>
    </div>
  );
}
