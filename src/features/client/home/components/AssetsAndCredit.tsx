import { TrendingUp, Wallet } from 'lucide-react';
import type { AssetsAndCreditProps } from '../types';
import { getCreditRing } from '../utils';

export default function AssetsAndCredit({
  usdtBalance,
  trooBalance,
  yesterdayRevenue,
  remainingCredit,
  totalCredit,
  creditUsedPercent,
  onRaiseCredit
}: AssetsAndCreditProps) {
  const { radius, circumference, strokeDashoffset } = getCreditRing(creditUsedPercent);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Total Assets Card */}
      <div className="glass-card p-6 md:p-8 rounded-2xl flex flex-col justify-between min-h-[220px] relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#cfbcff]/5 blur-[80px] rounded-full"></div>
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-xs text-[#cbc4d2] flex items-center gap-1.5 font-medium uppercase tracking-wider">
              <Wallet className="w-4 h-4 text-[#cfbcff]" />
              总资产 (Total Assets)
            </p>
            <h3 className="text-3xl md:text-4xl font-black text-[#cfbcff] tracking-tight mt-3">
              {usdtBalance.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
              <span className="text-lg md:text-xl font-normal text-[#cbc4d2]">USDT</span>
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-6 pt-6 border-t border-white/5">
          <div>
            <p className="text-xs text-[#cbc4d2] font-medium opacity-70 mb-0.5">TROO</p>
            <p className="text-lg font-bold text-white font-mono">{trooBalance.toLocaleString()} TROO</p>
          </div>
          <div className="h-8 w-px bg-white/10"></div>
          <div>
            <p className="text-xs text-[#cbc4d2] font-medium opacity-70 mb-0.5">昨日收益</p>
            <p className="text-lg font-bold text-[#e7c365] font-mono flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +{yesterdayRevenue.toLocaleString('zh-CN', { minimumFractionDigits: 2 })} USDT
            </p>
          </div>
        </div>
      </div>

      {/* Credit Limit Pool Card */}
      <div className="glass-card p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6 md:gap-8 justify-between">
        <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 144 144" width="144" height="144">
            <circle 
              className="text-[#36343a]" 
              cx="72" cy="72" fill="transparent" r={radius} 
              stroke="currentColor" strokeWidth="8"
            ></circle>
            {/* Active fill with gradient glow */}
            <circle 
              cx="72" cy="72" fill="transparent" r={radius} 
              stroke="url(#creditGrad)" 
              strokeDasharray={circumference} 
              strokeDashoffset={strokeDashoffset} 
              strokeLinecap="round" strokeWidth="8"
              className="transition-all duration-1000 ease-out"
            ></circle>
            <defs>
              <linearGradient id="creditGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#cfbcff" />
                <stop offset="100%" stopColor="#6750a4" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-2xl font-black text-white">{creditUsedPercent}%</p>
            <p className="text-[10px] text-[#cbc4d2] font-bold uppercase tracking-wider mt-0.5">已使用</p>
          </div>
        </div>

        <div className="flex-1 w-full space-y-4">
          <div>
            <h4 className="text-base font-bold text-white">信用额度池 (Credit Pool)</h4>
            <p className="text-xs text-[#cbc4d2]/80 mt-1 leading-relaxed">您当前的可用额度正处于健康水平</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[11px] text-[#cbc4d2] font-semibold opacity-75 uppercase tracking-wide">剩余额度</p>
              <p className="text-base font-bold text-white font-mono">
                {remainingCredit.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-[#cbc4d2] font-semibold opacity-75 uppercase tracking-wide">总额度</p>
              <p className="text-base font-bold text-white font-mono">
                {totalCredit.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
          <button 
            onClick={onRaiseCredit}
            className="w-full py-2.5 bg-[#36343a] text-[#cfbcff] rounded-xl font-bold hover:bg-[#cfbcff]/15 transition-all text-xs border border-white/5 active:scale-[0.98]"
          >
            提升额度
          </button>
        </div>
      </div>
    </div>
  );
}
