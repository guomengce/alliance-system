import { Coins, X } from 'lucide-react';
import type { ListProps } from '../types';
import DesktopTable from './DesktopTable';
import MobileCard from './MobileCard';

export default function List({
  filteredCommissions,
  commissionSearch,
  onCommissionSearchChange,
  onClearSearch,
  activeTab,
  onActiveTabChange,
  onSelectCommission
}: ListProps) {
  return (
    <div className="lg:col-span-12 glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-sm md:text-base font-black text-white tracking-tight flex items-center gap-2">
            <Coins className="w-4 h-4 text-[#cfbcff]" />
            <span>佣金列表</span>
          </h3>
          <p className="text-[11px] text-[#cbc4d2]/50 mt-0.5 leading-tight">
            浏览与检索会员五代分销分成明细，包括正常应答与受阻拦截回笼公积对账条目。
          </p>
        </div>
      </div>

      <div className="space-y-3 pt-1">
        <div className="relative">
          <input
            type="text"
            placeholder="检索返佣号/订单号/会员UID/代理人昵称..."
            value={commissionSearch}
            onChange={(e) => onCommissionSearchChange(e.target.value)}
            className="w-full bg-[#1c1824] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#cfbcff]/50 transition-all font-sans"
          />
          {commissionSearch && (
            <button
              type="button"
              onClick={onClearSearch}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#cbc4d2]/40 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 select-none border-b border-white/5 pb-2">
          <button
            type="button"
            onClick={() => onActiveTabChange('all')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wide transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#cfbcff] text-[#24134c]'
                : 'bg-white/5 text-[#cbc4d2]/70 hover:bg-white/10'
            }`}
          >
            全部明细
          </button>
          <button
            type="button"
            onClick={() => onActiveTabChange('credited')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wide transition-all cursor-pointer ${
              activeTab === 'credited'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-white/5 text-[#cbc4d2]/70 hover:bg-white/10'
            }`}
          >
            已入池划账
          </button>
          <button
            type="button"
            onClick={() => onActiveTabChange('blocked')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wide transition-all cursor-pointer ${
              activeTab === 'blocked'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-white/5 text-[#cbc4d2]/70 hover:bg-white/10'
            }`}
          >
            额度池阻塞
          </button>
          <button
            type="button"
            onClick={() => onActiveTabChange('intercepted')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wide transition-all cursor-pointer ${
              activeTab === 'intercepted'
                ? 'bg-red-500/30 text-red-300 border border-red-500/40 animate-pulse'
                : 'bg-white/5 text-[#cbc4d2]/70 hover:bg-white/10'
            }`}
          >
            受阻拦截回笼
          </button>
        </div>
      </div>

      {filteredCommissions.length === 0 ? (
        <div className="text-center py-12 bg-white/[0.01]/10 border border-white/5 rounded-2xl space-y-2 text-xs text-[#cbc4d2]/40 font-sans">
          <p>暂无符合当前过滤条件的佣金对账记录</p>
          <span className="text-[10px]">您可以试试清空关键词或点击其他分类选项</span>
        </div>
      ) : (
        <>
          <div className="block md:hidden space-y-3">
            {filteredCommissions.map(p => (
              <MobileCard key={p.id} payout={p} onSelectCommission={onSelectCommission} />
            ))}
          </div>
          <DesktopTable commissions={filteredCommissions} onSelectCommission={onSelectCommission} />
        </>
      )}
    </div>
  );
}
