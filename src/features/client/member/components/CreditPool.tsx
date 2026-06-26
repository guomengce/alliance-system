import { AlertCircle } from 'lucide-react';
import type { CreditPoolProps } from '../types';
import { CREDIT_POOL_PROGRESS_PERCENT, getCreditPoolRing } from '../utils';

export default function CreditPool({
  remainingCredit,
  totalCredit,
  onRaiseCredit
}: CreditPoolProps) {
  const { radius, circumference, strokeDashoffset } = getCreditPoolRing(CREDIT_POOL_PROGRESS_PERCENT);

  return (
    <div className="lg:col-span-4 glass-card rounded-2xl p-6 md:p-8 flex flex-col items-center justify-between">
      <div className="w-full flex justify-between items-center border-b border-white/5 pb-2">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">信用池 (Credit Pool)</h2>
        <AlertCircle className="w-4.5 h-4.5 text-[#cbc4d2] opacity-40" />
      </div>

      <div className="relative w-48 h-48 my-6">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 192 192" width="192" height="192">
          <circle className="text-[#36343a]" cx="96" cy="96" fill="transparent" r={radius} stroke="currentColor" strokeWidth="12"></circle>
          <circle 
            className="text-[#cfbcff] transition-all duration-1000 ease-out" 
            cx="96" cy="96" fill="transparent" r={radius} 
            stroke="currentColor" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} 
            strokeLinecap="round" strokeWidth="12" 
            style={{ filter: 'drop-shadow(0 0 6px rgba(207, 188, 255, 0.2))' }}
          ></circle>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-white leading-none">
            {CREDIT_POOL_PROGRESS_PERCENT}<span className="text-lg">%</span>
          </span>
          <span className="text-xs text-[#cbc4d2] font-bold uppercase tracking-widest mt-1">已占用</span>
        </div>
      </div>

      <div className="w-full space-y-3">
        <div className="flex justify-between items-center p-3.5 rounded-xl bg-[#211f24] border border-white/5">
          <span className="text-xs text-[#cbc4d2] font-medium">可用额度</span>
          <span className="text-sm font-bold text-[#cfbcff] font-mono">
            {remainingCredit.toLocaleString('zh-CN', { minimumFractionDigits: 2 })} USDT
          </span>
        </div>
        <div className="flex justify-between items-center p-3.5 rounded-xl bg-[#211f24] border border-white/5">
          <span className="text-xs text-[#cbc4d2] font-medium">总信用额度</span>
          <span className="text-sm font-bold text-white font-mono">
            {totalCredit.toLocaleString('zh-CN', { minimumFractionDigits: 2 })} USDT
          </span>
        </div>
      </div>

      <button 
        onClick={onRaiseCredit}
        className="w-full py-3 mt-6 rounded-xl bg-[#cfbcff] text-[#381e72] font-extrabold hover:brightness-110 shadow-lg shadow-[#cfbcff]/10 hover:shadow-[#cfbcff]/20 active:scale-95 transition-all text-sm"
      >
        提升信用额度
      </button>
    </div>
  );
}
