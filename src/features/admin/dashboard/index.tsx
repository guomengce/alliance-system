import React, { useState } from 'react';
import { ShieldCheck, Activity, TrendingUp } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  sub: string;
  colorClass?: string;
}

const MetricCard = ({ title, value, sub, colorClass = "text-white" }: MetricCardProps) => (
  <div className="bg-[#16131c] border border-white/5 p-4.5 rounded-2xl relative overflow-hidden group">
    <div className="absolute right-3 top-3 w-8 h-8 rounded-full bg-white/2 flex items-center justify-center font-mono text-[9px] text-white/25">KPI</div>
    <p className="text-[10.5px] uppercase tracking-wider font-bold text-[#cbc4d2]/50">{title}</p>
    <p className={`text-xl font-bold font-mono mt-2 ${colorClass}`}>{value}</p>
    <p className="text-[10px] text-[#cbc4d2]/40 mt-1.5 leading-none">{sub}</p>
  </div>
);

interface AdminDashboardViewProps {
  usdtBalance: number;
  lockedQueueAmount: number;
}

export default function AdminDashboardView({ usdtBalance, lockedQueueAmount }: AdminDashboardViewProps) {
  const [trooPriceUSD, setTrooPriceUSD] = useState<number>(0.125);
  const [hoveredChartIndex, setHoveredChartIndex] = useState<number | null>(null);
  const [hoveredTrooIndex, setHoveredTrooIndex] = useState<number | null>(null);
  
  // Static mock aggregates for display
  const companyUSDT = 31500000;

  // Yesterday's TROO Market History chart configuration
  const adminTrooMarketData = [
    { time: '00:00', price: trooPriceUSD * 0.941, change: -5.9 },
    { time: '04:00', price: trooPriceUSD * 0.962, change: -3.8 },
    { time: '08:00', price: trooPriceUSD * 0.950, change: -5.0 },
    { time: '12:00', price: trooPriceUSD * 0.984, change: -1.6 },
    { time: '16:00', price: trooPriceUSD * 1.012, change: 1.2 },
    { time: '20:00', price: trooPriceUSD * 1.031, change: 3.1 },
    { time: '24:00', price: trooPriceUSD * 1.042, change: 4.2 },
  ];

  const minTrooPrice = trooPriceUSD * 0.92;
  const maxTrooPrice = trooPriceUSD * 1.06;
  const trooChartWidth = 320;
  const trooChartHeight = 110;

  const trooPoints = adminTrooMarketData.map((d, i) => {
    const x = (i / (adminTrooMarketData.length - 1)) * trooChartWidth;
    const y = trooChartHeight - ((d.price - minTrooPrice) / (maxTrooPrice - minTrooPrice)) * trooChartHeight;
    return { x, y, ...d };
  });

  const trooLinePath = trooPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const trooAreaPath = `${trooLinePath} L ${trooChartWidth} ${trooChartHeight} L 0 ${trooChartHeight} Z`;

  const activeTrooIndex = hoveredTrooIndex !== null ? hoveredTrooIndex : adminTrooMarketData.length - 1;
  const activeTrooData = adminTrooMarketData[activeTrooIndex];

  return (
    <div id="admin_dashboard_page" className="space-y-6 select-none animate-fadeIn flex-grow flex flex-col pb-4 h-full">
      {/* Upper Status Line */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 dark bg-[#1c1822]/60 border border-white/5 p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/10 shrink-0">
            <ShieldCheck className="w-6 h-6 text-[#110e16]" />
          </div>
          <div>
            <h1 className="text-lg font-black text-white">全同盟高级运营管理控制中心</h1>
            <p className="text-xs text-[#cbc4d2]/60 mt-0.5 font-sans">
              拥有机构储备大盘监控、参数实时微调、跨层佣金对账及秒级广播最高特权
            </p>
          </div>
        </div>

        {/* Global manual control quick state indicator */}
        <div className="flex items-center gap-3 bg-[rgba(255,180,171,0.05)] border border-[rgba(255,180,171,0.15)] px-4 py-2 rounded-xl">
          <Activity className="w-4 h-4 text-[#ffb4ab]" />
          <div className="text-left">
            <p className="text-[9px] text-[#cbc4d2]/50 uppercase font-black tracking-widest leading-none">系统风控状态</p>
            <p className="text-xs font-black text-emerald-400 mt-1 leading-none font-mono">D+1 Settled Safely</p>
          </div>
        </div>
      </div>

      {/* Real-time KPI Metric Box Grids */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard 
          title="全网总会员数" 
          value="5,420 人" 
          sub="100% 链上真实注册账户" 
          colorClass="text-white"
        />
        <MetricCard 
          title="今日流动性认购单" 
          value="128,450.00 USDT" 
          sub="D0 今日到账累计单值" 
          colorClass="text-[#cfbcff]"
        />
        <MetricCard 
          title="今日已派发佣金 (L1-L5)" 
          value="15,240.22 USDT" 
          sub="D+1 04:00 精算核拨成功" 
          colorClass="text-emerald-400"
        />
        <MetricCard 
          title="全联盟锁仓排队总额" 
          value={`${lockedQueueAmount.toLocaleString()} USDT`} 
          sub="等待推荐下线认购实时释放" 
          colorClass="text-amber-400"
        />
        <MetricCard 
          title="储备账户总余量" 
          value={`${(companyUSDT + usdtBalance).toLocaleString()} USDT`} 
          sub="储备覆盖保证金充裕" 
          colorClass="text-teal-300"
        />
      </div>

      {/* TROO Pricing & Visual Grid */}
      {/* TROO Pricing & Visual Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">
        
        {/* TROO Realtime pricing node details */}
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
                    onMouseEnter={() => setHoveredTrooIndex(idx)}
                    onMouseLeave={() => setHoveredTrooIndex(null)}
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

        {/* Chart statistics */}
        <div className="lg:col-span-7 glass-card p-6 rounded-2xl border border-white/5 bg-[#141119] flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#cfbcff]" />
              近七日订阅认购单及公司结算佣金走向对比趋势
            </h3>
            <p className="text-xs text-[#cbc4d2]/60 mt-1 leading-relaxed">
              精算统计全系统每日新增流动性质押认购体量与 D+1 04:00 各代扣池佣金派扣划拨总值比重 (鼠标悬停或触控可实时对账)
            </p>
          </div>

          {/* Legend and interactive data display */}
          {(() => {
            const last7DaysData = [
              { date: '05-23', sub: 45000, comm: 18000, val: 45 },
              { date: '05-24', sub: 60000, comm: 24000, val: 60 },
              { date: '05-25', sub: 48000, comm: 19200, val: 48 },
              { date: '05-26', sub: 70000, comm: 28000, val: 70 },
              { date: '05-27', sub: 92000, comm: 36800, val: 92 },
              { date: '05-28', sub: 110000, comm: 44000, val: 110 },
              { date: '05-29', sub: 85000, comm: 34000, val: 85 }
            ];
            const activeDetailIdx = hoveredChartIndex !== null ? hoveredChartIndex : 6;
            const activeDayData = last7DaysData[activeDetailIdx];

            return (
              <div className="space-y-4">
                {/* Live Data Display Board */}
                <div className="grid grid-cols-3 gap-3 bg-[#1e1a26] border border-white/5 rounded-xl p-3 text-center my-2">
                  <div className="text-left pl-1">
                    <span className="text-[10px] uppercase font-bold text-[#cbc4d2]/40 tracking-wider">核算日期</span>
                    <p className="text-xs font-bold text-[#cbc4d2] font-mono mt-0.5">{activeDayData.date}</p>
                  </div>
                  <div className="text-left pl-1">
                    <span className="text-[10px] uppercase font-bold text-[#cfbcff] tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#cfbcff]"></span> 订阅认购金额
                    </span>
                    <p className="text-sm font-black text-[#cfbcff] font-mono mt-0.5">{activeDayData.sub.toLocaleString()} USDT</p>
                  </div>
                  <div className="text-left pl-1">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6750a4]"></span> D+1 结算分润
                    </span>
                    <p className="text-sm font-black text-emerald-400 font-mono mt-0.5">{activeDayData.comm.toLocaleString()} USDT</p>
                  </div>
                </div>

                {/* Bar Representation */}
                <div className="flex items-end gap-3.5 h-32 md:h-44 lg:h-52 xl:h-60 justify-between px-2 text-center relative select-none">
                  {last7DaysData.map((day, i) => {
                    const isActive = activeDetailIdx === i;
                    return (
                      <div 
                        key={i} 
                        onMouseEnter={() => setHoveredChartIndex(i)}
                        onMouseLeave={() => setHoveredChartIndex(null)}
                        className={`flex-1 flex flex-col items-center gap-2 group relative cursor-pointer p-1 rounded-lg transition-all ${
                          isActive ? 'bg-white/5 shadow-md shadow-purple-900/10' : 'hover:bg-white/[0.02]'
                        }`}
                      >
                        <div className="w-full flex gap-1.5 justify-center items-end h-20 md:h-28 lg:h-36 xl:h-44">
                          {/* Subscription limit bar */}
                          <div 
                            className={`w-3.5 rounded-t-sm transition-all duration-300 ${
                              isActive ? 'bg-[#cfbcff]' : 'bg-[#cfbcff]/40 group-hover:bg-[#cfbcff]/70'
                            }`}
                            style={{ height: `${(day.sub / 110000) * 100}%` }}
                          ></div>
                          {/* Commission paid out bar */}
                          <div 
                            className={`w-3.5 rounded-t-sm transition-all duration-300 ${
                              isActive ? 'bg-[#6750a4]' : 'bg-[#6750a4]/30 group-hover:bg-[#6750a4]/60'
                            }`}
                            style={{ height: `${(day.comm / 110000) * 100}%` }}
                          ></div>
                        </div>
                        <span className={`text-[10px] font-mono font-black mt-1 block transition-colors ${
                          isActive ? 'text-white' : 'text-[#cbc4d2]/40'
                        }`}>{day.date}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

