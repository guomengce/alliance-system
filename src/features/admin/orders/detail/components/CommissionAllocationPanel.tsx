import { Search, ShieldCheck } from 'lucide-react';
import type { CommissionAllocation, DetailViewProps } from '../../types';

interface CommissionAllocationPanelProps {
  filteredAllocations: CommissionAllocation[];
  detailSearchQuery: string;
  setDetailSearchQuery: DetailViewProps['setDetailSearchQuery'];
}

export default function CommissionAllocationPanel({
  filteredAllocations,
  detailSearchQuery,
  setDetailSearchQuery
}: CommissionAllocationPanelProps) {
  return (
    <div className="bg-[#120f1a] p-5 rounded-2xl border border-white/5 text-xs text-[#cbc4d2]/90 text-left space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-3">
        <h5 className="text-[11px] font-black uppercase text-emerald-400 flex items-center gap-1.5 tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>对应上级同盟链条推广佣金穿透分拨明细 (Alliance L1-L5 distribution trace)</span>
        </h5>

        {/* Table search filter input */}
        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="w-3.5 h-3.5 text-[#cbc4d2]/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={detailSearchQuery}
            onChange={(e) => setDetailSearchQuery(e.target.value)}
            placeholder="查找关联 UID、昵称或等级..."
            className="bg-[#181421] border border-white/10 rounded-xl pl-8 pr-3.5 py-1.5 text-xs text-white placeholder-[#cbc4d2]/30 outline-none focus:border-[#cfbcff]/40 transition-colors w-full font-medium"
          />
        </div>
      </div>

      {/* Desktop View Table */}
      <div className="hidden md:block border border-white/5 rounded-xl overflow-hidden bg-[#181421]/60">
        <div className="grid grid-cols-5 bg-white/3 py-2.5 px-3.5 text-[9px] font-black uppercase tracking-wider text-[#cbc4d2]/40 border-b border-white/5">
          <span>层级 / 代数</span>
          <span>承接代管人 UID</span>
          <span>昵称属性</span>
          <span className="text-right font-mono">返佣比例</span>
          <span className="text-right">结算金额 (USDT)</span>
        </div>
        <div className="divide-y divide-white/5 font-mono text-xs">
          {filteredAllocations.length > 0 ? (
            filteredAllocations.map((alloc, idx) => (
              <div key={idx} className="grid grid-cols-5 py-3.5 px-3.5 items-center hover:bg-white/[0.01] transition-colors">
                <span className="font-sans text-[#cfbcff] font-bold text-left">{alloc.level}</span>
                <span className="text-left text-white">{alloc.targetUid}</span>
                <span className="truncate font-sans font-medium text-[#cbc4d2] text-left">{alloc.nickname}</span>
                <span className="text-right text-[#cbc4d2]/60 font-bold">{alloc.rate}%</span>
                <span className="text-right text-emerald-400 font-extrabold">USDT {alloc.amount.toLocaleString()}</span>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-[#cbc4d2]/30 font-sans text-xs">
              未找到符合检索的分拨记录 (可尝试更改关键词)
            </div>
          )}
        </div>
      </div>

      {/* Mobile View Cards */}
      <div className="block md:hidden border border-white/5 rounded-xl divide-y divide-white/5 overflow-hidden bg-[#181421]/60">
        {filteredAllocations.length > 0 ? (
          filteredAllocations.map((alloc, idx) => (
            <div key={idx} className="p-3.5 space-y-2 bg-white/[0.01] hover:bg-white/[0.02] transition-colors">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="font-sans text-[#cfbcff] font-bold text-xs">{alloc.level}</span>
                <span className="text-emerald-400 font-extrabold text-xs font-mono">USDT {alloc.amount.toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] font-mono">
                <div>
                  <span className="text-[#cbc4d2]/40 text-[9px] font-sans block leading-none mb-1">承接人 UID</span>
                  <span className="text-white font-medium block">{alloc.targetUid}</span>
                </div>
                <div>
                  <span className="text-[#cbc4d2]/40 text-[9px] font-sans block leading-none mb-1">返佣比例</span>
                  <span className="text-white/80 block font-bold">{alloc.rate}%</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[#cbc4d2]/40 text-[9px] font-sans block leading-none mb-1">昵称及属性</span>
                  <span className="text-[#cbc4d2]/90 block font-sans truncate" title={alloc.nickname}>
                    {alloc.nickname}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-6 text-center text-[#cbc4d2]/30 font-sans text-xs">
            未找到符合检索的分拨记录 (可尝试更改关键词)
          </div>
        )}
      </div>

      <div className="p-3 bg-[#cfbcff]/5 border border-[#cfbcff]/10 rounded-xl text-[11px] text-[#cbc4d2] space-y-1.5 leading-relaxed font-sans">
        <p className="font-extrabold text-[#cfbcff] flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#cfbcff]" />
          <span>分销推广佣金分配核心逻辑说明</span>
        </p>
        <p>
          本笔交易触发的推广佣金<strong>仅会返现给该会员直属的 L1 上级</strong>。
          倘若 <strong>L1 级代理人的佣金限额池额度已满 (可用配额已耗尽)</strong>，溢漏或无法派发的剩余佣金部分才会执行溢存滑落，触发穿透性继续往上一层级 (L2、L3等) 继续逐级派发或回拢平台准备金库。
        </p>
      </div>
    </div>
  );
}
