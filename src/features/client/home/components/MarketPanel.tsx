import { Button, Tag } from 'antd';
import { Activity, ArrowUpRight, TrendingDown, TrendingUp } from 'lucide-react';
import EChartPanel from '../../../../shared/charts/EChartPanel';
import type { MarketPanelProps } from '../types';

export default function MarketPanel({
  activeData,
  activeIndex,
  chartOption,
  marketData,
  chartHeight,
  yesterdayDateStr,
  setHoveredIndex,
  onNavigateToRoute
}: MarketPanelProps) {
  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#cfbcff] animate-pulse" />
            TROO 昨日行情 ({yesterdayDateStr})
          </h4>
          <p className="text-xs text-[#cbc4d2]/70 mt-1">实时链上交易汇率，移动光标交互查看各时段价格浮动</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        <div className="bg-[#1c1824]/20 p-5 rounded-2xl border border-white/5 flex flex-col justify-between space-y-6 lg:space-y-4">
          <div>
            <span className="text-[10px] text-[#cbc4d2]/60 font-bold uppercase tracking-wider block">所选时段价格</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-mono font-black text-[#cfbcff] tracking-tight">{activeData.price.toFixed(4)}</span>
              <span className="text-xs font-semibold text-[#cbc4d2]">USDT</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              {activeData.change >= 0 ? (
                <Tag className="alliance-antd-home-market-tag is-up" icon={<TrendingUp className="w-3.5 h-3.5" />}>
                  +{activeData.change.toFixed(1)}%
                </Tag>
              ) : (
                <Tag className="alliance-antd-home-market-tag is-down" icon={<TrendingDown className="w-3.5 h-3.5" />}>
                  {activeData.change.toFixed(1)}%
                </Tag>
              )}
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/5 font-mono">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#cbc4d2]/40">24H 最高</span>
              <span className="text-white font-semibold">0.1085 USDT</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#cbc4d2]/40">24H 最低</span>
              <span className="text-white font-semibold">0.0975 USDT</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#cbc4d2]/40">交易量 (24h Vol)</span>
              <span className="text-[#cfbcff] font-semibold">84,219,300 TROO</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#cbc4d2]/40">时间点</span>
              <span className="text-white font-semibold">{activeData.time}</span>
            </div>
          </div>

          <Button
            className="alliance-antd-button-gradient mt-2"
            icon={<ArrowUpRight className="w-3.5 h-3.5" />}
            iconPosition="end"
            onClick={() => onNavigateToRoute('subscribe')}
          >
            立即认购 TROO
          </Button>
        </div>

        <div className="lg:col-span-2 bg-[#1c1824]/20 p-5 rounded-2xl border border-white/5 flex flex-col justify-between min-h-[220px]">
          <div className="flex justify-between items-center text-[10px] text-[#cbc4d2]/50 font-semibold mb-2 font-mono">
            <span>昨日走势行情</span>
            <span className="text-[#e7c365]">1 USDT = 10 TROO 汇率溢价基准</span>
          </div>

          <div className="relative w-full overflow-hidden select-none mt-2" style={{ height: `${chartHeight}px` }}>
            <EChartPanel
              className="h-full w-full cursor-crosshair"
              hoverDataLength={marketData.length}
              option={chartOption}
              onHoverIndexChange={setHoveredIndex}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] text-[#cbc4d2]/30 mt-3 font-mono font-bold select-none border-t border-white/5 pt-2 px-1">
            {marketData.map((d, i) => (
              <span key={i} className={`transition-colors duration-150 ${activeIndex === i ? 'text-[#cfbcff] font-extrabold' : ''}`}>
                {d.time}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
