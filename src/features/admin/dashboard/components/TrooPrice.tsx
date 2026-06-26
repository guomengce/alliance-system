import { Tag } from 'antd';
import { AntdCard } from '@/src/shared/antd/AntdCard';
import type { TrooPricePanelProps } from '../types';
import AntdEChartPanel from './EChartPanel';

export default function AntdTrooPricePanel({
  data,
  onHoverIndexChange
}: TrooPricePanelProps) {
  const { chart, chartOption } = data;
  const { activePoint } = chart;
  const changeClassName = activePoint.change >= 0
    ? 'alliance-antd-dashboard-change-tag is-up'
    : 'alliance-antd-dashboard-change-tag is-down';

  return (
    <AntdCard className="alliance-antd-dashboard-panel-card lg:col-span-5">
      <div>
        <div className="flex justify-between items-center pb-3 border-b border-white/5">
          <span className="text-[16px] font-black text-[#cbc4d2]/50 tracking-wider uppercase">Yahoo Finance Feed</span>
        </div>

        <div className="mt-4 flex justify-between items-start">
          <div>
            <p className="text-xs text-[#cbc4d2]/70 font-semibold">TROO / USDT 昨日行情价格</p>
            <div className="flex items-center gap-3.5 mt-2">
              <span className="text-3xl font-extrabold text-white font-mono leading-none tracking-tight">
                {activePoint.priceText}
              </span>
              <Tag className={changeClassName}>
                {activePoint.changeText}
              </Tag>
            </div>
          </div>
          <div className="text-right font-mono text-[14px] text-[#cbc4d2]/40 select-none">
            <p>时段 {activePoint.time}</p>
            <p className="mt-0.5 text-[#cfbcff]/70 font-sans">昨日历史走势</p>
          </div>
        </div>

        <AntdEChartPanel
          className="relative w-full h-[110px] overflow-hidden select-none mt-6 mb-2"
          option={chartOption}
          onHoverIndexChange={onHoverIndexChange}
        />
      </div>

      <div className="bg-white/3 border border-white/5 rounded-xl p-3.5 mt-5 text-xs text-[#cbc4d2]/80 space-y-2 font-sans leading-relaxed">
        <p>汇率基准溢阶: <span className="font-bold text-[#e7c365]">1 USDT = 10 TROO</span></p>
        <p>订阅认购时将即时以此售价换算 70% 对应 TROO 给予承购人账户。</p>
      </div>
    </AntdCard>
  );
}
