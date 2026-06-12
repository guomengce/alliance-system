import { Activity, ArrowUpRight, TrendingDown, TrendingUp } from 'lucide-react';
import type { MarketPanelProps } from '../types';

export default function MarketPanel({
  activeData,
  activeIndex,
  hoveredIndex,
  marketData,
  points,
  linePath,
  areaPath,
  chartWidth,
  chartHeight,
  yesterdayDateStr,
  setHoveredIndex,
  setActiveTab
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
        {/* stats block */}
        <div className="bg-[#1c1824]/20 p-5 rounded-2xl border border-white/5 flex flex-col justify-between space-y-6 lg:space-y-4">
          <div>
            <span className="text-[10px] text-[#cbc4d2]/60 font-bold uppercase tracking-wider block">所选时段价格</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-mono font-black text-[#cfbcff] tracking-tight">{activeData.price.toFixed(4)}</span>
              <span className="text-xs font-semibold text-[#cbc4d2]">USDT</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              {activeData.change >= 0 ? (
                <span className="flex items-center text-xs font-extrabold text-[#00e676] bg-[#00e676]/10 px-2 py-0.5 rounded-lg border border-[#00e676]/20">
                  <TrendingUp className="w-3.5 h-3.5 mr-1" />
                  +{activeData.change.toFixed(1)}%
                </span>
              ) : (
                <span className="flex items-center text-xs font-extrabold text-rose-400 bg-rose-400/10 px-2 py-0.5 rounded-lg border border-rose-400/20">
                  <TrendingDown className="w-3.5 h-3.5 mr-1" />
                  {activeData.change.toFixed(1)}%
                </span>
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

          <button 
            onClick={() => setActiveTab('subscribe')}
            className="w-full mt-2 py-2.5 bg-gradient-to-r from-[#6750a4] to-[#cfbcff] text-white rounded-xl font-bold hover:opacity-90 active:scale-[0.98] transition-all text-xs flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>立即认购TROO</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Chart block */}
        <div className="lg:col-span-2 bg-[#1c1824]/20 p-5 rounded-2xl border border-white/5 flex flex-col justify-between min-h-[220px]">
          <div className="flex justify-between items-center text-[10px] text-[#cbc4d2]/50 font-semibold mb-2 font-mono">
            <span>昨日走势行情</span>
            <span className="text-[#e7c365]">1 USDT = 10 TROO 汇率溢价基准</span>
          </div>

          {/* Interactive chart display */}
          <div className="relative w-full overflow-hidden select-none mt-2" style={{ height: `${chartHeight}px` }}>
            <svg 
              viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Linear gradient fill for the chart path */}
                <linearGradient id="chartGlow" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#cfbcff" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#6750a4" stopOpacity="0.0" />
                </linearGradient>
                
                {/* Line stroke gradient */}
                <linearGradient id="lineColor" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#cfbcff" />
                  <stop offset="100%" stopColor="#9a82db" />
                </linearGradient>
              </defs>

              {/* Gridlines */}
              <line x1="0" y1={chartHeight * 0.25} x2={chartWidth} y2={chartHeight * 0.25} stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="0" y1={chartHeight * 0.5} x2={chartWidth} y2={chartHeight * 0.5} stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="0" y1={chartHeight * 0.75} x2={chartWidth} y2={chartHeight * 0.75} stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3,3" />

              {/* Flow Fill Area */}
              <path d={areaPath} fill="url(#chartGlow)" />

              {/* Stroke Trendline */}
              <path d={linePath} fill="none" stroke="url(#lineColor)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Focus Line elements on hover */}
              {hoveredIndex !== null && (
                <>
                  {/* Vertical Hover bar */}
                  <line 
                    x1={points[hoveredIndex].x} 
                    y1={0} 
                    x2={points[hoveredIndex].x} 
                    y2={chartHeight} 
                    stroke="#cbc4d2" 
                    strokeWidth="1" 
                    strokeDasharray="4 4" 
                    opacity="0.4"
                  />
                  
                  {/* Glowing outer hover circle */}
                  <circle 
                    cx={points[hoveredIndex].x} 
                    cy={points[hoveredIndex].y} 
                    r="7" 
                    fill="#cfbcff" 
                    opacity="0.3"
                  />
                  {/* Target dot center */}
                  <circle 
                    cx={points[hoveredIndex].x} 
                    cy={points[hoveredIndex].y} 
                    r="3.5" 
                    fill="#cfbcff" 
                    stroke="#110e16" 
                    strokeWidth="1.5"
                  />
                </>
              )}
            </svg>

            {/* Invisible interactive columns for exact cursor hover capture without any glitch */}
            <div className="absolute inset-0 flex">
              {marketData.map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-full cursor-crosshair"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              ))}
            </div>
          </div>

          {/* Time labels on X-axis */}
          <div className="flex justify-between items-center text-[10px] text-[#cbc4d2]/30 mt-3 font-mono font-bold select-none border-t border-white/5 pt-2 px-1">
            {marketData.map((d, i) => (
              <span 
                key={i} 
                className={`transition-colors duration-150 ${activeIndex === i ? 'text-[#cfbcff] font-extrabold' : ''}`}
              >
                {d.time}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
