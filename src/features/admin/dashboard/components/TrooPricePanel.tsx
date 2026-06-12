import type { TrooPricePanelProps } from '../types';

export default function TrooPricePanel({
  activeTrooData,
  trooChartHeight,
  trooChartWidth,
  trooAreaPath,
  trooLinePath,
  trooPoints,
  hoveredTrooIndex,
  onHoveredTrooIndexChange
}: TrooPricePanelProps) {
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
                ${activeTrooData.price.toFixed(4)}
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 font-mono ${
                activeTrooData.change >= 0 
                  ? 'text-[#00e676] bg-[#00e676]/10 border border-[#00e676]/20' 
                  : 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
              }`}>
                {activeTrooData.change >= 0 ? '+' : ''}{activeTrooData.change.toFixed(2)}%
              </span>
            </div>
          </div>
          <div className="text-right font-mono text-[10px] text-[#cbc4d2]/40 select-none">
            <p>时段 {activeTrooData.time}</p>
            <p className="mt-0.5 text-[#cfbcff]/70 font-sans">昨日历史走势</p>
          </div>
        </div>

        {/* Sparkline chart of yesterday's TROO performance */}
        <div className="relative w-full overflow-hidden select-none mt-6 mb-2" style={{ height: `${trooChartHeight}px` }}>
          <svg 
            viewBox={`0 0 ${trooChartWidth} ${trooChartHeight}`} 
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="trooChartGlow" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#cfbcff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#6750a4" stopOpacity="0.0" />
              </linearGradient>
              
              <linearGradient id="trooLineColor" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#cfbcff" />
                <stop offset="100%" stopColor="#9a82db" />
              </linearGradient>
            </defs>

            {/* Gridlines */}
            <line x1="0" y1={trooChartHeight * 0.25} x2={trooChartWidth} y2={trooChartHeight * 0.25} stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="0" y1={trooChartHeight * 0.5} x2={trooChartWidth} y2={trooChartHeight * 0.5} stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="0" y1={trooChartHeight * 0.75} x2={trooChartWidth} y2={trooChartHeight * 0.75} stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3,3" />

            {/* Flow Fill Area */}
            <path d={trooAreaPath} fill="url(#trooChartGlow)" />

            {/* Stroke Trendline */}
            <path d={trooLinePath} fill="none" stroke="url(#trooLineColor)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Focus Line elements on hover */}
            {hoveredTrooIndex !== null && (
              <>
                <line 
                  x1={trooPoints[hoveredTrooIndex].x} 
                  y1={0} 
                  x2={trooPoints[hoveredTrooIndex].x} 
                  y2={trooChartHeight} 
                  stroke="#cbc4d2" 
                  strokeWidth="1" 
                  strokeDasharray="4 4" 
                  opacity="0.4"
                />
                
                <circle 
                  cx={trooPoints[hoveredTrooIndex].x} 
                  cy={trooPoints[hoveredTrooIndex].y} 
                  r="6" 
                  fill="#cfbcff" 
                  stroke="#141119" 
                  strokeWidth="2" 
                />
              </>
            )}
          </svg>

          {/* Invisible interactive hover anchors overlay */}
          <div className="absolute inset-0 flex">
            {trooPoints.map((p, idx) => (
              <div
                key={idx}
                className="flex-grow h-full cursor-crosshair"
                onMouseEnter={() => onHoveredTrooIndexChange(idx)}
                onMouseLeave={() => onHoveredTrooIndexChange(null)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white/3 border border-white/5 rounded-xl p-3.5 mt-5 text-xs text-[#cbc4d2]/80 space-y-2 font-sans leading-relaxed">
        <p>• 汇率基准溢阶: <span className="font-bold text-[#e7c365]">1 USDT = 10 TROO</span></p>
        <p>• 订阅认购时将即时以此售价换算 70% 对应 TROO 给予承购人账户。</p>
      </div>
    </div>
  );
}
