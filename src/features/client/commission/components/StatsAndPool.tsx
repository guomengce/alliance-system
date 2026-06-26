import { Clock, TrendingUp } from 'lucide-react';
import type { StatsAndPoolProps } from '../types';
import { getCommissionPoolMetrics } from '../utils';

export default function StatsAndPool({
  cumulativeCommissions,
  pendingBalance,
  arrivedCommissions,
  failedCommissions,
  commissionPoolLimit,
  commissionPoolRemaining
}: StatsAndPoolProps) {
  const { radius, circumference, usedPercent, strokeDashoffset } = getCommissionPoolMetrics(
    commissionPoolLimit,
    commissionPoolRemaining
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Left Stats list (col-span-5) */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        {/* Total earned */}
        <div className="glass-card p-5 rounded-[22px] relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#cfbcff]/5 blur-[35px] rounded-full group-hover:bg-[#cfbcff]/10 transition-all duration-300"></div>
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-[#cfbcff]/10 rounded-lg text-[#cfbcff]">
              <TrendingUp className="w-4 h-4 animate-pulse" />
            </div>
            <span className="text-[#b4eeb4] text-xs font-bold">+12.5%</span>
          </div>
          <p className="text-[#cbc4d2]/70 text-xs font-bold uppercase tracking-wider mb-1">累计下线返佣总额 (Total Earned)</p>
          <h3 className="text-2.5xl font-black text-white font-mono flex items-baseline">
            <span className="text-sm font-medium opacity-60 mr-1">¥</span>
            {cumulativeCommissions.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
          </h3>
        </div>

        {/* Pending Balance Card */}
        <div className="glass-card p-5 rounded-[22px] relative overflow-hidden group border-l-4 border-l-[#cfbcff]/70">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#cfbcff]/5 blur-[35px] rounded-full"></div>
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-[#cfbcff]/15 rounded-lg text-[#cfbcff]">
              <Clock className="w-4 h-4 animate-pulse" />
            </div>
            <span className="text-[#cfbcff] text-xs font-bold uppercase font-mono px-2 py-0.5 rounded-full bg-[#cfbcff]/10 border border-[#cfbcff]/10">代收中</span>
          </div>
          <p className="text-[#cbc4d2]/70 text-xs font-bold uppercase tracking-wider mb-1">当前待处理代收收益 (Pending Settle)</p>
          <h3 className="text-2.5xl font-black text-[#cfbcff] font-mono flex items-baseline">
            <span className="text-sm font-medium opacity-60 mr-1">¥</span>
            {pendingBalance.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
          </h3>
          <p className="text-xs text-[#cbc4d2]/50 font-bold mt-1.5 flex items-center gap-1.5 border-t border-white/5 pt-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e676] animate-pulse"></span>
            系统将于次日 (D+1) 凌晨 2:00 自动汇算入账
          </p>
        </div>

        {/* Mini split for success and failure */}
        <div className="grid grid-cols-2 gap-4">
          {/* Completed arrived */}
          <div className="glass-card p-4 rounded-[18px] relative overflow-hidden group border-l-2 border-l-[#00e676]/35">
            <p className="text-[#cbc4d2]/60 text-xs font-bold uppercase tracking-wider mb-1">已到账金额</p>
            <h4 className="text-lg font-black text-white font-mono flex items-baseline">
              <span className="text-xs opacity-60 mr-0.5">¥</span>
              {arrivedCommissions.toLocaleString('zh-CN', { minimumFractionDigits: 1 })}
            </h4>
            <div className="mt-1 flex items-center gap-1 text-xs text-[#00e676]/90 font-bold">
              <span className="w-1 h-1 rounded-full bg-[#00e676]"></span>
              <span>划转成功</span>
            </div>
          </div>

          {/* Failed and audit list */}
          <div className="glass-card p-4 rounded-[18px] relative overflow-hidden group border-l-2 border-l-[#ffb4ab]/35">
            <p className="text-[#cbc4d2]/60 text-xs font-bold uppercase tracking-wider mb-1">历史异常款</p>
            <h4 className="text-lg font-black text-white font-mono flex items-baseline">
              <span className="text-xs opacity-60 mr-0.5">¥</span>
              {failedCommissions.toLocaleString('zh-CN', { minimumFractionDigits: 1 })}
            </h4>
            <div className="mt-1 flex items-center gap-1 text-xs text-red-400 font-bold">
              <span className="w-1 h-1 rounded-full bg-red-400"></span>
              <span>异常审计</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Graphical Visualization Panel representing "可用佣金池" (col-span-7) */}
      <div className="lg:col-span-7 glass-card p-6 md:p-8 rounded-[24px] relative overflow-hidden group border border-[#cfbcff]/15 flex flex-col justify-between bg-[#16131c]">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#cfbcff]/5 blur-[60px] rounded-full pointer-events-none"></div>
        
        {/* Top Header */}
        <div className="border-b border-white/5 pb-4 mb-4">
          <h4 className="text-base font-bold text-white">可用佣金信用额度池实时监控</h4>
          <p className="text-xs text-[#cbc4d2]/80 mt-1 leading-relaxed">您当前的可用额度正处于健康水平</p>
        </div>

        {/* Middle Content Distribution (Dial & Numeric Display Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-auto py-2">
          {/* SVG Progress Circle */}
          <div className="md:col-span-5 flex justify-center py-2">
            <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 144 144" width="144" height="144">
                <circle 
                  className="text-[#36343a]" 
                  cx="72" cy="72" fill="transparent" r={radius} 
                  stroke="currentColor" strokeWidth="8"
                />
                {/* Active fill with gradient glow */}
                <circle 
                  cx="72" cy="72" fill="transparent" r={radius} 
                  stroke="url(#poolGrad)" 
                  strokeDasharray={circumference} 
                  strokeDashoffset={strokeDashoffset} 
                  strokeLinecap="round" strokeWidth="8"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="poolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#cfbcff" />
                    <stop offset="100%" stopColor="#6750a4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-2xl font-black text-white">{usedPercent.toFixed(0)}%</p>
                <p className="text-xs text-[#cbc4d2] font-bold uppercase tracking-wider mt-0.5">已使用</p>
              </div>
            </div>
          </div>

          {/* Numeric Indicators side cards */}
          <div className="md:col-span-7 space-y-4">
            <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex justify-between items-center hover:bg-white/[0.04] transition-colors">
              <div>
                <span className="text-xs text-[#cbc4d2]/60 font-black uppercase tracking-wider">剩余额度</span>
                <p className="text-lg font-bold text-white font-mono mt-0.5">
                  ¥{commissionPoolRemaining.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#cfbcff] animate-pulse"></span>
            </div>

            <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex justify-between items-center hover:bg-white/[0.04] transition-colors">
              <div>
                <span className="text-xs text-[#cbc4d2]/60 font-black uppercase tracking-wider">总额度</span>
                <p className="text-lg font-bold text-white font-mono mt-0.5">
                  ¥{commissionPoolLimit.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <span className="w-2 h-2 rounded-full bg-white/20"></span>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}
