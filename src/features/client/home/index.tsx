import { useState } from 'react';
import { 
  DollarSign, 
  Wallet, 
  TrendingUp, 
  TrendingDown,
  ShoppingCart, 
  Users, 
  ListTodo, 
  ArrowUpRight, 
  ChevronRight, 
  Info, 
  PlusCircle, 
  ExternalLink,
  Plus,
  Activity
} from 'lucide-react';
import { Transaction } from '../../../types';
import PageView from '../../../components/PageView';

interface HomeViewProps {
  usdtBalance: number;
  trooBalance: number;
  lockedQueueAmount: number;
  cumulativeCommissions: number;
  arrivedCommissions: number;
  failedCommissions: number;
  yesterdayRevenue: number;
  remainingCredit: number;
  totalCredit: number;
  creditUsedPercent: number;
  transactions: Transaction[];
  setActiveTab: (tab: string) => void;
  onQuickAction: (actionType: string) => void;
  onRaiseCredit: () => void;
}

export default function HomeView({
  usdtBalance,
  trooBalance,
  lockedQueueAmount,
  yesterdayRevenue,
  remainingCredit,
  totalCredit,
  creditUsedPercent,
  transactions,
  setActiveTab,
  onQuickAction,
  onRaiseCredit
}: HomeViewProps) {
  
  // Interactive TROO market history
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const trooMarketData = [
    { time: '02:00', price: 0.0982, change: -1.8 },
    { time: '04:00', price: 0.0991, change: -0.9 },
    { time: '06:00', price: 0.0988, change: -1.2 },
    { time: '08:00', price: 0.1004, change: 0.4 },
    { time: '10:00', price: 0.1018, change: 1.8 },
    { time: '12:00', price: 0.1032, change: 3.2 },
    { time: '14:00', price: 0.1025, change: 2.5 },
    { time: '16:00', price: 0.1041, change: 4.1 },
    { time: '18:00', price: 0.1058, change: 5.8 },
    { time: '20:00', price: 0.1065, change: 6.5 },
    { time: '22:00', price: 0.1059, change: 5.9 },
    { time: '24:00', price: 0.1074, change: 7.4 },
  ];

  // Currently displayed item on hover or latest index
  const activeIndex = hoveredIndex !== null ? hoveredIndex : trooMarketData.length - 1;
  const activeData = trooMarketData[activeIndex];

  // Graph math settings (dynamic layout bounding box)
  const minPrice = 0.095;
  const maxPrice = 0.110;
  const chartWidth = 500;
  const chartHeight = 130;

  const points = trooMarketData.map((d, i) => {
    const x = (i / (trooMarketData.length - 1)) * chartWidth;
    const y = chartHeight - ((d.price - minPrice) / (maxPrice - minPrice)) * chartHeight;
    return { x, y, ...d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;

  // High fidelity orders based on exact screenshot ORD-99281, etc.
  const myOrders = [
    { id: '#ORD-99281', name: '季度高增益认购 A', amount: '5,000.00', date: '2023-11-24', status: '处理中', statusType: 'pending' },
    { id: '#ORD-99245', name: '尊享团队成长计划', amount: '12,500.00', date: '2023-11-22', status: '已完成', statusType: 'success' },
    { id: '#ORD-99102', name: 'BTC 跨链加速认购', amount: '2,000.00', date: '2023-11-18', status: '已完成', statusType: 'success' },
  ];

  // Calculate dynamic circular progress for Credit Limit Pool (SVG circle path)
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (creditUsedPercent / 100) * circumference;

  // Dynamic Yesterday's date relative to current browser/system time
  const getYesterdayDateString = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    
    const yyyy = yesterday.getFullYear();
    const mm = String(yesterday.getMonth() + 1).padStart(2, '0');
    const dd = String(yesterday.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const yesterdayDateStr = getYesterdayDateString();

  return (
    <PageView>
      {/* Banner / Promotional Carousel */}
      <div className="relative w-full h-[260px] rounded-2xl overflow-hidden glass-card group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6750a4] via-[#4d4465]/60 to-transparent z-10"></div>
        <img 
          className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:scale-105 transition-transform duration-1000" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXFyBetc_aW7x6ZT7sTQW1oDOPLd3VbyqzZcalrN1mX_RmitSPN04SH7hd-OF1UWmVm64ch4WwQ8vE9va_4hY67puf6xk4FC8jAPJ-OnU7lgsWwO6IAmZzD6R_DEPcj9IZRYBMLeOldXoYc8K-wOU03rJR3QINfrH3PYjZcbAoAZaZM7vHQGiMmUlX03f-gm8vpb-Ni_vUVa3sl4TzcrnVz1qNd5rWmZiVwVWVBekmhDxGCMe0YWj2DWNDwuqfgP1qo9IjTCFwojW-" 
          alt="Abstract blockchain connections"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-20 h-full flex flex-col justify-center px-10 md:px-12 max-w-2xl">
          <span className="bg-[#e7c365] text-[#3e2e00] px-3 py-0.5 rounded-full text-xs font-bold w-fit mb-4 tracking-wide shadow-sm">
            限时活动 (Limited)
          </span>
          <h2 className="text-2xl md:text-3.5xl font-extrabold text-white leading-tight mb-2">
            同盟系统 2.0 正式上线
          </h2>
          <p className="text-sm md:text-base text-white/80 mb-6 font-medium leading-relaxed">
            尊享机构级理财与团队裂变收益，开启您的去中心化金融新纪元。
          </p>
          <button 
            onClick={() => setActiveTab('subscribe')}
            className="w-fit bg-[#cfbcff] text-[#381e72] px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-[#cfbcff]/20 transition-all active:scale-95 duration-200"
          >
            立即认购
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total Assets Card */}
        <div className="glass-card p-6 md:p-8 rounded-2xl flex flex-col justify-between min-h-[220px] relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#cfbcff]/5 blur-[80px] rounded-full"></div>
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-xs text-[#cbc4d2] flex items-center gap-1.5 font-medium uppercase tracking-wider">
                <Wallet className="w-4 h-4 text-[#cfbcff]" />
                总资产 (Total Assets)
              </p>
              <h3 className="text-3xl md:text-4xl font-black text-[#cfbcff] tracking-tight mt-3">
                {usdtBalance.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
                <span className="text-lg md:text-xl font-normal text-[#cbc4d2]">USDT</span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-6 pt-6 border-t border-white/5">
            <div>
              <p className="text-xs text-[#cbc4d2] font-medium opacity-70 mb-0.5">TROO</p>
              <p className="text-lg font-bold text-white font-mono">{trooBalance.toLocaleString()} TROO</p>
            </div>
            <div className="h-8 w-px bg-white/10"></div>
            <div>
              <p className="text-xs text-[#cbc4d2] font-medium opacity-70 mb-0.5">昨日收益</p>
              <p className="text-lg font-bold text-[#e7c365] font-mono flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +{yesterdayRevenue.toLocaleString('zh-CN', { minimumFractionDigits: 2 })} USDT
              </p>
            </div>
          </div>
        </div>

        {/* Credit Limit Pool Card */}
        <div className="glass-card p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6 md:gap-8 justify-between">
          <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 144 144" width="144" height="144">
              <circle 
                className="text-[#36343a]" 
                cx="72" cy="72" fill="transparent" r={radius} 
                stroke="currentColor" strokeWidth="8"
              ></circle>
              {/* Active fill with gradient glow */}
              <circle 
                cx="72" cy="72" fill="transparent" r={radius} 
                stroke="url(#creditGrad)" 
                strokeDasharray={circumference} 
                strokeDashoffset={strokeDashoffset} 
                strokeLinecap="round" strokeWidth="8"
                className="transition-all duration-1000 ease-out"
              ></circle>
              <defs>
                <linearGradient id="creditGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#cfbcff" />
                  <stop offset="100%" stopColor="#6750a4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-2xl font-black text-white">{creditUsedPercent}%</p>
              <p className="text-[10px] text-[#cbc4d2] font-bold uppercase tracking-wider mt-0.5">已使用</p>
            </div>
          </div>

          <div className="flex-1 w-full space-y-4">
            <div>
              <h4 className="text-base font-bold text-white">信用额度池 (Credit Pool)</h4>
              <p className="text-xs text-[#cbc4d2]/80 mt-1 leading-relaxed">您当前的可用额度正处于健康水平</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] text-[#cbc4d2] font-semibold opacity-75 uppercase tracking-wide">剩余额度</p>
                <p className="text-base font-bold text-white font-mono">
                  {remainingCredit.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-[#cbc4d2] font-semibold opacity-75 uppercase tracking-wide">总额度</p>
                <p className="text-base font-bold text-white font-mono">
                  {totalCredit.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
            <button 
              onClick={onRaiseCredit}
              className="w-full py-2.5 bg-[#36343a] text-[#cfbcff] rounded-xl font-bold hover:bg-[#cfbcff]/15 transition-all text-xs border border-white/5 active:scale-[0.98]"
            >
              提升额度
            </button>
          </div>
        </div>
      </div>

      {/* TROO Today's Market section */}
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
                {trooMarketData.map((_, i) => (
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
              {trooMarketData.map((d, i) => (
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

      {/* Quick Actions Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-base font-bold text-white uppercase tracking-wider">快捷操作 (Quick Actions)</h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => onQuickAction('recharge')}
            className="glass-card p-5 rounded-2xl flex flex-col items-center gap-3 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#cfbcff]/10 flex items-center justify-center group-hover:scale-110 duration-200 transition-transform">
              <PlusCircle className="w-7 h-7 text-[#cfbcff]" />
            </div>
            <span className="text-xs font-bold text-white tracking-wide">账户充值</span>
          </button>

          <button 
            onClick={() => setActiveTab('subscribe')}
            className="glass-card p-5 rounded-2xl flex flex-col items-center gap-3 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#e7c365]/10 flex items-center justify-center group-hover:scale-110 duration-200 transition-transform">
              <ShoppingCart className="w-7 h-7 text-[#e7c365]" />
            </div>
            <span className="text-xs font-bold text-white tracking-wide">项目认购</span>
          </button>

          <button 
            onClick={() => setActiveTab('team')}
            className="glass-card p-5 rounded-2xl flex flex-col items-center gap-3 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#cdc0e9]/10 flex items-center justify-center group-hover:scale-110 duration-200 transition-transform">
              <Users className="w-7 h-7 text-[#cdc0e9]" />
            </div>
            <span className="text-xs font-bold text-white tracking-wide">团队管理</span>
          </button>

          <button 
            onClick={() => onQuickAction('orders')}
            className="glass-card p-5 rounded-2xl flex flex-col items-center gap-3 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 duration-200 transition-transform">
              <ListTodo className="w-7 h-7 text-[#cbc4d2]" />
            </div>
            <span className="text-xs font-bold text-white tracking-wide">订单记录</span>
          </button>
        </div>
      </div>

      {/* My Orders Table */}
      <div className="glass-card rounded-2xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 flex items-center justify-between border-b border-white/5">
          <h4 className="text-base font-bold text-white uppercase tracking-wider">我的订单 (My Orders)</h4>
          <button 
            onClick={() => onQuickAction('orders')}
            className="text-xs text-[#cfbcff] font-semibold hover:underline flex items-center gap-1"
          >
            查看全部 <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="hidden md:block overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/3 text-[#cbc4d2]/80 text-[11px] font-bold uppercase tracking-widest border-b border-white/5">
              <tr>
                <th className="px-6 py-4">订单编号</th>
                <th className="px-4 py-4">产品名称</th>
                <th className="px-4 py-4 text-right">金额 (USDT)</th>
                <th className="px-4 py-4 text-center">日期</th>
                <th className="px-4 py-4 text-center">状态</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {myOrders.map((order) => (
                <tr key={order.id} className="hover:bg-white/3 transition-colors group">
                  <td className="px-6 py-4 font-mono font-medium text-white/90">{order.id}</td>
                  <td className="px-4 py-4 text-white font-semibold">{order.name}</td>
                  <td className="px-4 py-4 text-right font-bold text-white font-mono">{order.amount}</td>
                  <td className="px-4 py-4 text-center text-[#cbc4d2]/75 font-mono text-xs">{order.date}</td>
                  <td className="px-4 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold ${
                      order.statusType === 'pending' 
                        ? 'bg-[#6750a4]/30 text-[#cfbcff] border border-[#cfbcff]/20' 
                        : 'bg-[#e7c365]/20 text-[#e7c365] border border-[#e7c365]/20'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setActiveTab('subscribe')}
                      className="text-xs text-[#cfbcff] font-bold hover:underline"
                    >
                      详情
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View with Cards */}
        <div className="md:hidden divide-y divide-white/5 space-y-4 p-4 bg-[#1a1722]/30">
          {myOrders.map((order, index) => (
            <div key={order.id} className={`space-y-3 ${index > 0 ? 'pt-4' : ''}`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-white text-sm">{order.name}</div>
                  <div className="text-[10px] text-[#cbc4d2]/50 font-mono">#{order.id}</div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                  order.statusType === 'pending' 
                    ? 'bg-[#6750a4]/30 text-[#cfbcff] border border-[#cfbcff]/20' 
                    : 'bg-[#e7c365]/20 text-[#e7c365] border border-[#e7c365]/20'
                }`}>
                  {order.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-[#cbc4d2]/40 text-[10px] font-semibold font-mono">购买时间</p>
                  <p className="text-white/80 font-mono mt-0.5">{order.date}</p>
                </div>
                <div>
                  <p className="text-[#cbc4d2]/40 text-[10px] font-semibold font-mono text-right font-sans">方案金额</p>
                  <p className="text-[#cfbcff] font-bold font-mono text-right mt-0.5">{order.amount}</p>
                </div>
              </div>

              <div className="text-right pt-2 border-t border-white/5">
                <button 
                  onClick={() => setActiveTab('subscribe')}
                  className="text-xs text-[#cfbcff] font-bold hover:underline"
                >
                  详情
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageView>
  );
}
