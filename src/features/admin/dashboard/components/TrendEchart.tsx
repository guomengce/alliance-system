import { TrendingUp } from 'lucide-react';
import { AntdCard } from '@/src/shared/antd/AntdCard';
import type { TrendPanelProps } from '../types';
import AntdEChartPanel from './EChartPanel';

export default function AntdTrendPanel({
  data,
  onHoverIndexChange
}: TrendPanelProps) {
  const { chart, chartOption } = data;

  return (
    <AntdCard className="alliance-antd-dashboard-panel-card lg:col-span-7">
      <div>
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#cfbcff]" />
          近七日认购单及公司结算佣金走势对比
        </h3>
        <p className="text-[13px] text-[#cbc4d2]/60 mt-1 leading-relaxed">
          精算统计全系统每日新增流动性质押认购体量与 D+1 04:00 各代扣池佣金派发划拨总值比率
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3 bg-[#1e1a26] border border-white/5 rounded-xl p-3 text-center my-2">
          <div className="text-left pl-1">
            <span className="text-xs uppercase font-bold text-[#cbc4d2]/40 tracking-wider">核算日期</span>
            <p className="text-[13px] font-bold text-[#cbc4d2] font-mono mt-0.5">{chart.activePoint.date}</p>
          </div>
          <div className="text-left pl-1">
            <span className="text-xs uppercase font-bold text-[#cfbcff] tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cfbcff]"></span> 订阅认购金额
            </span>
            <p className="text-[15px] font-black text-[#cfbcff] font-mono mt-0.5">{chart.activePoint.subscriptionAmountText}</p>
          </div>
          <div className="text-left pl-1">
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6750a4]"></span> D+1 结算分润
            </span>
            <p className="text-[15px] font-black text-emerald-400 font-mono mt-0.5">{chart.activePoint.commissionAmountText}</p>
          </div>
        </div>

        <AntdEChartPanel
          className="h-32 md:h-44 lg:h-52 xl:h-60 w-full"
          option={chartOption}
          onHoverIndexChange={onHoverIndexChange}
        />
      </div>
    </AntdCard>
  );
}
