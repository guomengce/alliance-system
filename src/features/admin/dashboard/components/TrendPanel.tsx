import { TrendingUp } from 'lucide-react';
import { getInitialAdminTrendData } from '../../../../mock/admin/dashboard';
import type { TrendPanelProps } from '../types';

export default function TrendPanel({
  hoveredChartIndex,
  onHoveredChartIndexChange
}: TrendPanelProps) {
  const trendData = getInitialAdminTrendData();
  const activeDetailIdx = hoveredChartIndex !== null ? hoveredChartIndex : 6;
  const activeDayData = trendData[activeDetailIdx];

  return (
    <div className="lg:col-span-7 glass-card p-6 rounded-2xl border border-white/5 bg-[#141119] flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#cfbcff]" />
          近七日订阅认购单及公司结算佣金走向对比趋势
        </h3>
        <p className="text-xs text-[#cbc4d2]/60 mt-1 leading-relaxed">
          精算统计全系统每日新增流动性质押认购体量与 D+1 04:00 各代扣池佣金派扣划拨总值比重 (鼠标悬停或触控可实时对账)
        </p>
      </div>

      {/* Legend and interactive data display */}
      <div className="space-y-4">
        {/* Live Data Display Board */}
        <div className="grid grid-cols-3 gap-3 bg-[#1e1a26] border border-white/5 rounded-xl p-3 text-center my-2">
          <div className="text-left pl-1">
            <span className="text-[10px] uppercase font-bold text-[#cbc4d2]/40 tracking-wider">核算日期</span>
            <p className="text-xs font-bold text-[#cbc4d2] font-mono mt-0.5">{activeDayData.date}</p>
          </div>
          <div className="text-left pl-1">
            <span className="text-[10px] uppercase font-bold text-[#cfbcff] tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cfbcff]"></span> 订阅认购金额
            </span>
            <p className="text-sm font-black text-[#cfbcff] font-mono mt-0.5">{activeDayData.sub.toLocaleString()} USDT</p>
          </div>
          <div className="text-left pl-1">
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6750a4]"></span> D+1 结算分润
            </span>
            <p className="text-sm font-black text-emerald-400 font-mono mt-0.5">{activeDayData.comm.toLocaleString()} USDT</p>
          </div>
        </div>

        {/* Bar Representation */}
        <div className="flex items-end gap-3.5 h-32 md:h-44 lg:h-52 xl:h-60 justify-between px-2 text-center relative select-none">
          {trendData.map((day, i) => {
            const isActive = activeDetailIdx === i;
            return (
              <div 
                key={i} 
                onMouseEnter={() => onHoveredChartIndexChange(i)}
                onMouseLeave={() => onHoveredChartIndexChange(null)}
                className={`flex-1 flex flex-col items-center gap-2 group relative cursor-pointer p-1 rounded-lg transition-all ${
                  isActive ? 'bg-white/5 shadow-md shadow-purple-900/10' : 'hover:bg-white/[0.02]'
                }`}
              >
                <div className="w-full flex gap-1.5 justify-center items-end h-20 md:h-28 lg:h-36 xl:h-44">
                  {/* Subscription limit bar */}
                  <div 
                    className={`w-3.5 rounded-t-sm transition-all duration-300 ${
                      isActive ? 'bg-[#cfbcff]' : 'bg-[#cfbcff]/40 group-hover:bg-[#cfbcff]/70'
                    }`}
                    style={{ height: `${(day.sub / 110000) * 100}%` }}
                  ></div>
                  {/* Commission paid out bar */}
                  <div 
                    className={`w-3.5 rounded-t-sm transition-all duration-300 ${
                      isActive ? 'bg-[#6750a4]' : 'bg-[#6750a4]/30 group-hover:bg-[#6750a4]/60'
                    }`}
                    style={{ height: `${(day.comm / 110000) * 100}%` }}
                  ></div>
                </div>
                <span className={`text-[10px] font-mono font-black mt-1 block transition-colors ${
                  isActive ? 'text-white' : 'text-[#cbc4d2]/40'
                }`}>{day.date}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
