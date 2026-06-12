import { Edit, HelpCircle } from 'lucide-react';
import type { ListProps, PlanCardProps } from '../types';

function PlanCard({ plan: p, onOpenEditModal, onTogglePlanStatus }: PlanCardProps) {
  const isEnabled = p.status === 'enabled';

  return (
    <div
      className={`p-5 sm:p-6 md:p-7 rounded-2xl border transition-all duration-300 relative grid grid-cols-12 gap-5 items-center ${
        isEnabled
          ? 'bg-gradient-to-br from-[#1c1825]/90 to-[#120f18]/95 border-[#cfbcff]/20 hover:border-[#cfbcff]/45 shadow-lg shadow-black/20'
          : 'bg-[#141119]/80 border-white/5 opacity-70 hover:opacity-100'
      }`}
    >
      {/* Left Segment: Name of package, ID tag, and active status */}
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-2">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h4 className="text-base sm:text-lg font-black text-white tracking-tight">
            {p.name}
          </h4>
          <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
            isEnabled ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}>
            {isEnabled ? '可售中 (启用)' : '锁仓中 (停用)'}
          </span>
        </div>

        <p className="text-[11px] text-[#cbc4d2]/50 font-mono">
          套餐标识代码：<span className="text-[#cfbcff] select-all font-bold">{p.id.toUpperCase()}</span>
        </p>

        {/* Optional description based on the package name */}
        <p className="text-xs text-[#cbc4d2]/70 leading-relaxed mt-1 italic">
          {p.description || '系统管理员限定理财分销等级档。被用户充值认购后，将为其释放高额下级团队佣金提款吞吐容量、配售TROO股票份额以及发放质押队列配额。'}
        </p>
      </div>

      {/* Middle Segment: Specs comparison bento elements */}
      <div className="col-span-12 lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-6">

        {/* Stat 1: Minimum buy price */}
        <div className="flex flex-col justify-center bg-white/[0.02] hover:bg-white/[0.04] p-3 rounded-xl border border-white/5 transition-all">
          <span className="text-[10px] font-bold text-[#cbc4d2]/50 uppercase mb-1 tracking-wider">
            起购门槛
          </span>
          <span className="text-sm font-mono font-black text-white">
            {p.price.toLocaleString()} <span className="text-[10px] text-zinc-400">U</span>
          </span>
        </div>

        {/* Stat 2: Commission pool remaining capacity limit */}
        <div className="flex flex-col justify-center bg-emerald-500/[0.03] hover:bg-emerald-500/[0.05] p-3 rounded-xl border border-emerald-500/10 transition-all">
          <span className="text-[10px] font-bold text-emerald-400/60 uppercase mb-1 tracking-wider">
            佣金释放限额
          </span>
          <span className="text-sm font-mono font-black text-emerald-400">
            {p.commissionLimit.toLocaleString()} <span className="text-[10px] text-emerald-500/70">U</span>
          </span>
        </div>

        {/* Stat 3: Troo stock return gift ratio status */}
        <div className="flex flex-col justify-center bg-[#cfbcff]/[0.03] hover:bg-[#cfbcff]/[0.05] p-3 rounded-xl border border-[#cfbcff]/10 transition-all">
          <span className="text-[10px] font-bold text-[#cfbcff]/60 uppercase mb-1 tracking-wider">
            充值额外赠送
          </span>
          <span className="text-sm font-mono font-black text-[#cfbcff]">
            {p.giftRatio === 1.0 ? '无额外赠比' : `+${Math.round((p.giftRatio - 1) * 100)}%`}
          </span>
        </div>

        {/* Stat 4: TROO ratio distribution - buy/queue percentage allocation */}
        <div className="flex flex-col justify-center bg-amber-500/[0.02] hover:bg-amber-500/[0.04] p-3 rounded-xl border border-white/5 transition-all">
          <span className="text-[10px] font-bold text-amber-400/60 uppercase mb-1 tracking-wider">
            TROO 变现/排队
          </span>
          <span className="text-xs font-mono font-bold text-amber-300">
            {p.buyRatio}% <span className="text-[9px] text-[#cbc4d2]/40">/</span> {p.queueRatio}%
          </span>
        </div>

      </div>

      {/* Right Segment: Action buttons for active parameters edit configuration */}
      <div className="col-span-12 lg:col-span-2 flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 border-t lg:border-t-0 border-white/10 pt-4 lg:pt-0">
        <button
          type="button"
          onClick={() => onOpenEditModal(p)}
          className="w-full sm:w-auto lg:w-full bg-[#cfbcff]/10 hover:bg-[#cfbcff]/20 text-[#cfbcff] px-4 py-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all outline-none cursor-pointer active:scale-95"
        >
          <Edit className="w-3.5 h-3.5" />
          <span>配置参数</span>
        </button>

        <button
          type="button"
          onClick={() => onTogglePlanStatus(p.id)}
          className={`w-full sm:w-auto lg:w-full py-2 px-3 rounded-xl text-xs font-black cursor-pointer transition-all active:scale-95 text-center ${
            isEnabled
              ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/10'
              : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/10'
          }`}
        >
          {isEnabled ? '下架关停' : '启用上架'}
        </button>
      </div>

    </div>
  );
}

export function List({ plans, onOpenEditModal, onTogglePlanStatus }: ListProps) {
  return (
    <>
      {/* Visual Package Management Card Grid - High Fidelity Client Style Replica */}
      <div className="grid grid-cols-1 gap-5">
        {plans.map((p) => (
          <PlanCard
            key={p.id}
            plan={p}
            onOpenEditModal={onOpenEditModal}
            onTogglePlanStatus={onTogglePlanStatus}
          />
        ))}
      </div>

      <div className="p-4 rounded-xl border border-[#cfbcff]/10 bg-[#cfbcff]/2 text-[11px] text-[#cbc4d2] space-y-1.5">
        <p className="font-extrabold text-white flex items-center gap-1">
          <HelpCircle className="w-4 h-4 text-[#cfbcff]" />
          <span>理财配置及数值对算关系指南：</span>
        </p>
        <ul className="list-disc pl-4 space-y-1 opacity-80 leading-relaxed font-sans">
          <li><strong>佣金额度 (Commission Limit)</strong>：改变了以前信用乘数形式，采用精确数值填写。该套餐被认购后，用户最大能够核扣获取的下线推广佣金绝对值。</li>
          <li><strong>买入比例与排队比例 (Buy & Queue Ratios)</strong>：用于指导用户认购套餐时支付的本金中购买TROO股票的配售。买入比例（如40%）直接转换为活期股票资产；排队比例（如60%）将投入锁仓排队池排队交割。</li>
          <li><strong>股票赠送比例 (Gifting Bonus)</strong>：针对高净值认购级别给予的特殊贴息比例。</li>
        </ul>
      </div>
    </>
  );
}
