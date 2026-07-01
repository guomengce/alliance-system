import { Empty, Input, Tag } from 'antd';
import { ShieldCheck } from 'lucide-react';
import type { CommissionAllocation, DetailViewProps } from '../../types';

interface AntdCommissionAllocationPanelProps {
  filteredAllocations: CommissionAllocation[];
  detailSearchQuery: string;
  setDetailSearchQuery: DetailViewProps['setDetailSearchQuery'];
}

export default function AntdCommissionAllocationPanel({
  filteredAllocations,
  detailSearchQuery,
  setDetailSearchQuery,
}: AntdCommissionAllocationPanelProps) {
  return (
    <div className="bg-[#120f1a] p-5 rounded-2xl border border-white/5 text-xs text-[#cbc4d2]/90 text-left space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-3">
        <h5 className="text-[13px] font-black uppercase text-emerald-400 flex items-center gap-1.5 tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>对应上级同盟链条推广佣金穿透分拨明细 (Alliance L1-L5 distribution trace)</span>
        </h5>

        <Input.Search
          allowClear
          defaultValue={detailSearchQuery}
          key={detailSearchQuery}
          onSearch={setDetailSearchQuery}
          placeholder="查找关联 UID、昵称或等级..."
          className="w-full sm:w-64 shrink-0"
        />
      </div>

      <div className="hidden md:block border border-white/5 rounded-xl overflow-hidden bg-[#181421]/60">
        <div className="grid grid-cols-5 bg-white/3 py-2.5 px-3.5 text-xs font-black uppercase tracking-wider text-[#cbc4d2]/40 border-b border-white/5">
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
                <Tag color="purple">{alloc.level}</Tag>
                <span className="text-left text-white">{alloc.targetUid}</span>
                <span className="truncate font-sans font-medium text-[#cbc4d2] text-left">{alloc.nickname}</span>
                <span className="text-right text-[#cbc4d2]/60 font-bold">{alloc.rate}%</span>
                <span className="text-right text-emerald-400 font-extrabold">USDT {alloc.amount.toLocaleString()}</span>
              </div>
            ))
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="未找到符合检索的分拨记录" />
          )}
        </div>
      </div>

      <div className="block md:hidden border border-white/5 rounded-xl divide-y divide-white/5 overflow-hidden bg-[#181421]/60">
        {filteredAllocations.length > 0 ? (
          filteredAllocations.map((alloc, idx) => (
            <div key={idx} className="p-3.5 space-y-2 bg-white/[0.01] hover:bg-white/[0.02] transition-colors">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <Tag color="purple">{alloc.level}</Tag>
                <span className="text-emerald-400 font-extrabold text-xs font-mono">USDT {alloc.amount.toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[13px] font-mono">
                <div>
                  <span className="text-[#cbc4d2]/40 text-xs font-sans block leading-none mb-1">承接人 UID</span>
                  <span className="text-white font-medium block">{alloc.targetUid}</span>
                </div>
                <div>
                  <span className="text-[#cbc4d2]/40 text-xs font-sans block leading-none mb-1">返佣比例</span>
                  <span className="text-white/80 block font-bold">{alloc.rate}%</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[#cbc4d2]/40 text-xs font-sans block leading-none mb-1">昵称及属性</span>
                  <span className="text-[#cbc4d2]/90 block font-sans truncate" title={alloc.nickname}>
                    {alloc.nickname}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="未找到符合检索的分拨记录" />
        )}
      </div>

      <div className="p-3 bg-[#cfbcff]/5 border border-[#cfbcff]/10 rounded-xl text-[13px] text-[#cbc4d2] space-y-1.5 leading-relaxed font-sans">
        <p className="font-extrabold text-[#cfbcff] flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#cfbcff]" />
          <span>分销推广佣金分配核心逻辑说明</span>
        </p>
        <p>
          本笔交易触发的推广佣金仅会返现给该会员直属 L1 上级。倘若 L1 佣金额度池已满，剩余佣金才会继续向上穿透分配。
        </p>
      </div>
    </div>
  );
}
