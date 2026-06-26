import { TrendingUp } from 'lucide-react';
import type { TeamOverviewProps } from '../types';
import { RecentActivityDesktopRow, RecentActivityMobileCard } from './RecentActivityRows';

export default function TeamOverview({ recentActivities }: TeamOverviewProps) {
  return (
    <div className="lg:col-span-8 glass-card rounded-2xl p-6 md:p-8 flex flex-col gap-6">
      <div className="flex justify-between items-center pb-2 border-b border-white/5">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">团队概览</h2>
          <span className="text-xs text-[#cbc4d2] opacity-60">Team Overview</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* L1 count & L1-L5 count widgets */}
        <div className="md:col-span-4 grid grid-cols-1 gap-4">
          <div className="bg-[#211f24] p-4 rounded-xl border border-white/5">
            <p className="text-xs text-[#cbc4d2]/70 font-medium mb-1">直接推荐 (L1)</p>
            <p className="text-2xl font-black text-[#cfbcff]">
              128 <span className="text-xs font-normal text-[#cbc4d2]">人</span>
            </p>
          </div>
          <div className="bg-[#211f24] p-4 rounded-xl border border-white/5">
            <p className="text-xs text-[#cbc4d2]/70 font-medium mb-1">团队总数 (L1-L5)</p>
            <p className="text-2xl font-black text-white">
              2,490 <span className="text-xs font-normal text-[#cbc4d2]">人</span>
            </p>
          </div>
        </div>

        {/* Simulated circular dynamic depth map */}
        <div className="md:col-span-8 flex flex-col sm:flex-row items-center justify-around bg-[#211f24]/30 rounded-2xl p-6 border border-white/5">
          <div className="relative w-36 h-36">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 144 144" width="144" height="144">
              <circle className="text-[#36343a]" cx="72" cy="72" fill="transparent" r="58" stroke="currentColor" strokeWidth="10"></circle>
              <circle className="text-[#cfbcff]" cx="72" cy="72" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset="236.8" strokeLinecap="round" strokeWidth="10"></circle>
              <circle className="text-[#cdc0e9]" cx="72" cy="72" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset="310" strokeLinecap="round" strokeWidth="10" style={{ transform: 'rotate(126deg)', transformOrigin: 'center' }}></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-sm font-bold text-white">成员分布</span>
              <span className="text-xs text-[#cbc4d2] uppercase">L1-L5 Depth</span>
            </div>
          </div>
          <div className="space-y-3 mt-4 sm:mt-0">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#cfbcff] glow-accent"></span>
              <div className="flex flex-col">
                <span className="text-xs text-[#cbc4d2]">直接推荐 L1</span>
                <span className="text-xs font-bold text-white">35%</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#cdc0e9] glow-accent"></span>
              <div className="flex flex-col">
                <span className="text-xs text-[#cbc4d2]">间接推荐 L2-L5</span>
                <span className="text-xs font-bold text-white">65%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-white/5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#cbc4d2] mb-1 flex items-center gap-1">
          <TrendingUp className="w-4 h-4 text-[#cfbcff]" /> 最近下级动态
        </h3>
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <tbody>
              {recentActivities.map((act) => (
                <RecentActivityDesktopRow key={act.id} activity={act} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-3 pt-2">
          {recentActivities.map((act) => (
            <RecentActivityMobileCard key={act.id} activity={act} />
          ))}
        </div>
      </div>
    </div>
  );
}
