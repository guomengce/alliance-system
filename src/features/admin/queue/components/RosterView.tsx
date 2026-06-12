import { Activity, Lock, ShieldCheck } from 'lucide-react';
import type { RosterViewProps } from '../types';
import { DesktopTable } from './DesktopTable';
import { MobileCard } from './MobileCard';

export function RosterView({ lockedRoster, onOpenDetails }: RosterViewProps) {
  return (
    <div id="admin_queue_view" className="space-y-6 animate-fadeIn select-none flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-4">
      <div className="glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-6 flex-grow flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-2 border-b border-white/5 text-left">
          <div>
            <h3 className="text-sm md:text-base font-black text-white tracking-tight flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#cfbcff]" />
              <span>排队列表</span>
            </h3>
            <p className="text-[11px] text-[#cbc4d2]/50 mt-0.5 leading-tight">
              浏览与检索所有会员锁仓排队资金明细、直属下线认购解锁明细以及账额手动校正存证。
            </p>
          </div>
        </div>

        {/* Top-aligned Explanation Window (moved from right side to top of list module) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-[#1a1622]/40 p-5 rounded-2xl border border-white/5 text-left animate-fadeIn">
          <div className="space-y-3">
            <h4 className="text-xs font-black text-[#f1bf50] flex items-center gap-1.5 uppercase tracking-wider font-sans border-b border-white/5 pb-2">
              <ShieldCheck className="w-4 h-4 text-[#f1bf50]" />
              <span>排队与交割核心机制指南</span>
            </h4>
            <div className="text-xs text-[#cbc4d2]/70 space-y-2.5 leading-relaxed font-sans">
              <p className="font-extrabold text-white text-[11px]">💡 触发机制对算公式</p>
              <p className="leading-relaxed text-[11px]">
                当且仅当该上级会员的一代直推 (L1 下属) 划转认购理财套餐时，会立刻激发该条排队账单。
              </p>
              <div className="p-2 py-1.5 bg-emerald-500/5 text-emerald-400 border border-emerald-500/10 rounded font-mono text-[10px] font-bold text-center w-full max-w-xs">
                解锁释放 USDT = L1 实付认购额 * 10%
              </div>
              <p className="text-[10px] text-[#cbc4d2]/40">同时，用户客户端将按解锁额的 <strong>10 倍</strong> 比例获得分配的 TROO 股权现货交让发放。</p>
            </div>
          </div>

          <div className="space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-black text-[#cfbcff] flex items-center gap-1.5 uppercase tracking-wider font-sans border-b border-white/5 pb-2">
                <Activity className="w-4 h-4 text-[#cfbcff]" />
                <span>智能校对账务监控</span>
              </h4>
              <p className="text-[#cbc4d2]/75 leading-relaxed text-[11px] font-sans mt-2">
                如果由于特殊业务调整退订，导致下线订单锁仓数据失衡，管理员可通过点击 “记录详情”，切换至纠偏编辑状态重写剩余排队金额。
              </p>
            </div>
            <div className="p-3 bg-[#cfbcff]/5 border border-[#cfbcff]/10 rounded-xl text-[10px] text-[#cbc4d2]/70 leading-normal font-sans">
              所有的手工修正行为均会生成独特的 `TRIG-CAL` 校正对齐流水单号进行归档，多核账簿保持链上线下逻辑全一致。
            </div>
          </div>
        </div>

        {/* List module covering full width */}
        <div className="text-left space-y-4 flex-grow">

          {/* Mobile-first card list */}
          <div className="block md:hidden space-y-3">
            {lockedRoster.map(r => (
              <MobileCard key={r.uid} roster={r} onOpenDetails={onOpenDetails} />
            ))}
          </div>

          {/* Desktop density table */}
          <DesktopTable lockedRoster={lockedRoster} onOpenDetails={onOpenDetails} />
        </div>

      </div>
    </div>
  );
}
