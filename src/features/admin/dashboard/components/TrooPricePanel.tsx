import type { TrooPricePanelProps } from '../types';
import EChartPanel from './EChartPanel';

export default function TrooPricePanel({
  chart,
  option,
  onHoverIndexChange
}: TrooPricePanelProps) {
  const { activePoint } = chart;

  return (
    <div className="lg:col-span-5 glass-card p-6 rounded-2xl border border-white/5 bg-[#141119] flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center pb-3 border-b border-white/5">
          <span className="text-[10px] font-black text-[#cbc4d2]/50 tracking-wider uppercase">Yahoo Finance Feed</span>
        </div>
        
        <div className="mt-4 flex justify-between items-start">
          <div>
            <p className="text-xs text-[#cbc4d2]/70 font-semibold">TROO / USDT 昨日行情价格</p>
            <div className="flex items-center gap-3.5 mt-2">
              <span className="text-3xl font-extrabold text-white font-mono leading-none tracking-tight">
                {activePoint.priceText}
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 font-mono ${
                activePoint.change >= 0
                  ? 'text-[#00e676] bg-[#00e676]/10 border border-[#00e676]/20' 
                  : 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
              }`}>
                {activePoint.changeText}
              </span>
            </div>
          </div>
          <div className="text-right font-mono text-[10px] text-[#cbc4d2]/40 select-none">
            <p>时段 {activePoint.time}</p>
            <p className="mt-0.5 text-[#cfbcff]/70 font-sans">昨日历史走势</p>
          </div>
        </div>

        <EChartPanel
          className="relative w-full h-[110px] overflow-hidden select-none mt-6 mb-2"
          option={option}
          onHoverIndexChange={onHoverIndexChange}
        />
      </div>

      <div className="bg-white/3 border border-white/5 rounded-xl p-3.5 mt-5 text-xs text-[#cbc4d2]/80 space-y-2 font-sans leading-relaxed">
        <p>• 汇率基准溢阶: <span className="font-bold text-[#e7c365]">1 USDT = 10 TROO</span></p>
        <p>• 订阅认购时将即时以此售价换算 70% 对应 TROO 给予承购人账户。</p>
      </div>
    </div>
  );
}
