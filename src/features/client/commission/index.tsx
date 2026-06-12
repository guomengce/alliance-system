import { useState } from 'react';
import { 
  Percent, 
  HelpCircle, 
  Download, 
  Wallet, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';
import { Transaction } from '../../../types';
import PageView from '../../../components/PageView';
import AlertBanner from '../../../components/AlertBanner';

interface CommissionViewProps {
  cumulativeCommissions: number;
  pendingBalance: number;
  arrivedCommissions: number;
  failedCommissions: number;
  commissionPoolLimit: number;
  commissionPoolRemaining: number;
  onWithdrawCommissions: () => void;
  onAddTransaction: (txn: Transaction) => void;
  onIncreaseLimit?: (amount: number) => void;
  setActiveTab?: (tab: string) => void;
}

export default function CommissionView({
  cumulativeCommissions,
  pendingBalance,
  arrivedCommissions,
  failedCommissions,
  commissionPoolLimit,
  commissionPoolRemaining,
  onWithdrawCommissions,
  onAddTransaction,
  onIncreaseLimit,
  setActiveTab
}: CommissionViewProps) {
  const [successMsg, setSuccessMsg] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'success'>('all');

  // Dynamic calculations for the commission pool visual monitoring ring (matching Homepage Credit Monitor layout)
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const usedPercent = commissionPoolLimit > 0 
    ? ((commissionPoolLimit - commissionPoolRemaining) / commissionPoolLimit) * 100
    : 0;
  const percent = 100 - usedPercent; // 剩余额度是 100% - 已经使用的额度
  const strokeDashoffset = circumference - (usedPercent / 100) * circumference;
  const consumedAmount = commissionPoolLimit - commissionPoolRemaining;

  const ratios = [
    { id: 'L1', name: 'L1 级下线', ratio: '40.00%', cycle: 'D + 1', status: '运行中' },
    { id: 'L2', name: 'L2 级下线', ratio: '40.00%', cycle: 'D + 1', status: '运行中' },
    { id: 'L3', name: 'L3 级下线', ratio: '40.00%', cycle: 'D + 1', status: '运行中' },
    { id: 'L4', name: 'L4 级下线', ratio: '40.00%', cycle: 'D + 1', status: '运行中' },
    { id: 'L5', name: 'L5 级下线', ratio: '40.00%', cycle: 'D + 1', status: '运行中' },
  ];

  // Specific high fidelity transactions from SCREEN_11
  const historyList = [
    { id: 'TXN-9981273412', user: 'UID: 102456', userLetter: 'JD', amount: 5000, level: 'L1', reward: 2000, time: '2023-10-24 14:20:11', status: 'success', statusLabel: '已入账' },
    { id: 'TXN-9981273413', user: 'UID: 209182', userLetter: 'AM', amount: 2400, level: 'L2', reward: 960, time: '2023-10-24 15:45:02', status: 'pending', statusLabel: '待结算' },
    { id: 'TXN-9981273414', user: 'UID: 332019', userLetter: 'SK', amount: 10000, level: 'L1', reward: 4000, time: '2023-10-24 16:30:55', status: 'success', statusLabel: '已入账' },
    { id: 'TXN-9981273415', user: 'UID: 122904', userLetter: 'RR', amount: 1200, level: 'L3', reward: 480, time: '2023-10-24 18:05:12', status: 'failed', statusLabel: '处理失败' },
  ];

  const filteredHistory = historyList.filter(item => {
    if (activeFilter === 'pending' && item.status !== 'pending') return false;
    if (activeFilter === 'success' && item.status !== 'success') return false;
    return true;
  });

  const handleWithdrawClick = () => {
    if (pendingBalance <= 0) {
      alert('模拟结算提示：当前没有待处理的代收佣金！等有下线产生新的认购返佣并计入“代收中”后，即可再次点击此按钮模拟本系统D+1日结划转。');
      return;
    }
    const sum = pendingBalance;
    onWithdrawCommissions();
    
    // Add transaction record
    onAddTransaction({
      id: 'TXN-' + Math.floor(1000000000 + Math.random() * 9000000000),
      type: 'commission',
      typeLabel: '佣金到账',
      desc: 'D+1系统自动汇总划转 (模拟测试日结完成)',
      amount: sum,
      currency: 'USDT',
      time: new Date().toISOString().replace('T', ' ').slice(0, 19),
      status: 'success',
      statusLabel: '成功'
    });

    setSuccessMsg(`[D+1 日结模拟系统] 已自动触发结算：系统成功汇算代收池，并将 ¥ ${sum.toLocaleString()} 自动划转至您的可用余额 (Wallet Balance)`);
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  const handleExport = () => {
    alert('正在自动读取后台，打包成 xlsx 收益流水文档下载中...');
  };

  const handleIncreaseLimit = () => {
    if (setActiveTab) {
      setActiveTab('subscribe');
    } else {
      const amount = 50000;
      if (onIncreaseLimit) {
        onIncreaseLimit(amount);
        setSuccessMsg(`[额度提升成功] 通过专属大额绿色通道，系统已将您的可用佣金信用额度池上限成功提升 ¥ ${amount.toLocaleString()}！数据已自动上链同步。`);
        setTimeout(() => setSuccessMsg(''), 6000);
      } else {
        alert(`[额度提升申请] 系统检测到您的信用评级卓越，已自动为您提交审核，预计测评完成后自动追加额度 ¥ ${amount.toLocaleString()}`);
      }
    }
  };

  return (
    <PageView>
      {/* Header section with titles and primary action hooks */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs text-[#cbc4d2]/80">
            实时追踪您的下线贡献。佣金实行 <span className="text-[#00e676] font-bold">D+1 自动划转已开通</span>，每日凌晨 2:00 自动入账。
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-3.5 py-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/30 text-emerald-400 text-xs font-black flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.08)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>D+1 自动归集服务中</span>
          </div>

          <button 
            onClick={handleIncreaseLimit}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-tr from-[#6750a4] to-[#cfbcff] text-[#110e16] font-black text-xs flex items-center gap-1.5 hover:brightness-110 shadow-lg active:scale-95 transition-all duration-150"
          >
            <Zap className="w-4 h-4 fill-[#110e16]" /> 提升额度
          </button>

          <button 
            onClick={handleExport}
            className="px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-xs font-bold text-[#cfbcff] flex items-center gap-1.5 active:scale-[0.98]"
          >
            <Download className="w-4 h-4" /> 导出报表
          </button>
        </div>
      </div>

      {successMsg && (
        <AlertBanner message={successMsg} type="success" onClose={() => setSuccessMsg('')} />
      )}

      {/* Grid boxes representing standard commission boxes & the new Graphic Pool Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Stats list (col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Total earned */}
          <div className="glass-card p-5 rounded-[22px] relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#cfbcff]/5 blur-[35px] rounded-full group-hover:bg-[#cfbcff]/10 transition-all duration-300"></div>
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 bg-[#cfbcff]/10 rounded-lg text-[#cfbcff]">
                <TrendingUp className="w-4 h-4 animate-pulse" />
              </div>
              <span className="text-[#b4eeb4] text-xs font-bold">+12.5%</span>
            </div>
            <p className="text-[#cbc4d2]/70 text-[10px] font-bold uppercase tracking-wider mb-1">累计下线返佣总额 (Total Earned)</p>
            <h3 className="text-2.5xl font-black text-white font-mono flex items-baseline">
              <span className="text-sm font-medium opacity-60 mr-1">¥</span>
              {cumulativeCommissions.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
            </h3>
          </div>

          {/* Pending Balance Card */}
          <div className="glass-card p-5 rounded-[22px] relative overflow-hidden group border-l-4 border-l-[#cfbcff]/70">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#cfbcff]/5 blur-[35px] rounded-full"></div>
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 bg-[#cfbcff]/15 rounded-lg text-[#cfbcff]">
                <Clock className="w-4 h-4 animate-pulse" />
              </div>
              <span className="text-[#cfbcff] text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded-full bg-[#cfbcff]/10 border border-[#cfbcff]/10">代收中</span>
            </div>
            <p className="text-[#cbc4d2]/70 text-[10px] font-bold uppercase tracking-wider mb-1">当前待处理代收收益 (Pending Settle)</p>
            <h3 className="text-2.5xl font-black text-[#cfbcff] font-mono flex items-baseline">
              <span className="text-sm font-medium opacity-60 mr-1">¥</span>
              {pendingBalance.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
            </h3>
            <p className="text-[10px] text-[#cbc4d2]/50 font-bold mt-1.5 flex items-center gap-1.5 border-t border-white/5 pt-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e676] animate-pulse"></span>
              系统将于次日 (D+1) 凌晨 2:00 自动汇算入账
            </p>
          </div>

          {/* Mini split for success and failure */}
          <div className="grid grid-cols-2 gap-4">
            {/* Completed arrived */}
            <div className="glass-card p-4 rounded-[18px] relative overflow-hidden group border-l-2 border-l-[#00e676]/35">
              <p className="text-[#cbc4d2]/60 text-[9px] font-bold uppercase tracking-wider mb-1">已到账金额</p>
              <h4 className="text-lg font-black text-white font-mono flex items-baseline">
                <span className="text-xs opacity-60 mr-0.5">¥</span>
                {arrivedCommissions.toLocaleString('zh-CN', { minimumFractionDigits: 1 })}
              </h4>
              <div className="mt-1 flex items-center gap-1 text-[9px] text-[#00e676]/90 font-bold">
                <span className="w-1 h-1 rounded-full bg-[#00e676]"></span>
                <span>划转成功</span>
              </div>
            </div>

            {/* Failed and audit list */}
            <div className="glass-card p-4 rounded-[18px] relative overflow-hidden group border-l-2 border-l-[#ffb4ab]/35">
              <p className="text-[#cbc4d2]/60 text-[9px] font-bold uppercase tracking-wider mb-1">历史异常款</p>
              <h4 className="text-lg font-black text-white font-mono flex items-baseline">
                <span className="text-xs opacity-60 mr-0.5">¥</span>
                {failedCommissions.toLocaleString('zh-CN', { minimumFractionDigits: 1 })}
              </h4>
              <div className="mt-1 flex items-center gap-1 text-[9px] text-red-400 font-bold">
                <span className="w-1 h-1 rounded-full bg-red-400"></span>
                <span>异常审计</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Graphical Visualization Panel representing "可用佣金池" (col-span-7) */}
        <div className="lg:col-span-7 glass-card p-6 md:p-8 rounded-[24px] relative overflow-hidden group border border-[#cfbcff]/15 flex flex-col justify-between bg-[#16131c]">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#cfbcff]/5 blur-[60px] rounded-full pointer-events-none"></div>
          
          {/* Top Header */}
          <div className="border-b border-white/5 pb-4 mb-4">
            <h4 className="text-base font-bold text-white">可用佣金信用额度池实时监控</h4>
            <p className="text-xs text-[#cbc4d2]/80 mt-1 leading-relaxed">您当前的可用额度正处于健康水平</p>
          </div>

          {/* Middle Content Distribution (Dial & Numeric Display Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-auto py-2">
            {/* SVG Progress Circle */}
            <div className="md:col-span-5 flex justify-center py-2">
              <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 144 144" width="144" height="144">
                  <circle 
                    className="text-[#36343a]" 
                    cx="72" cy="72" fill="transparent" r={radius} 
                    stroke="currentColor" strokeWidth="8"
                  />
                  {/* Active fill with gradient glow */}
                  <circle 
                    cx="72" cy="72" fill="transparent" r={radius} 
                    stroke="url(#poolGrad)" 
                    strokeDasharray={circumference} 
                    strokeDashoffset={strokeDashoffset} 
                    strokeLinecap="round" strokeWidth="8"
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="poolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#cfbcff" />
                      <stop offset="100%" stopColor="#6750a4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-2xl font-black text-white">{usedPercent.toFixed(0)}%</p>
                  <p className="text-[10px] text-[#cbc4d2] font-bold uppercase tracking-wider mt-0.5">已使用</p>
                </div>
              </div>
            </div>

            {/* Numeric Indicators side cards */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex justify-between items-center hover:bg-white/[0.04] transition-colors">
                <div>
                  <span className="text-[10px] text-[#cbc4d2]/60 font-black uppercase tracking-wider">剩余额度</span>
                  <p className="text-lg font-bold text-white font-mono mt-0.5">
                    ¥{commissionPoolRemaining.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#cfbcff] animate-pulse"></span>
              </div>

              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex justify-between items-center hover:bg-white/[0.04] transition-colors">
                <div>
                  <span className="text-[10px] text-[#cbc4d2]/60 font-black uppercase tracking-wider">总额度</span>
                  <p className="text-lg font-bold text-white font-mono mt-0.5">
                    ¥{commissionPoolLimit.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <span className="w-2 h-2 rounded-full bg-white/20"></span>
              </div>
            </div>
          </div>


        </div>
      </div>

      {/* Ratios Table / Proportion */}
      <section className="glass-card rounded-[24px] overflow-hidden">
        <div className="p-5 px-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Percent className="w-5 h-5 text-[#cfbcff]" />
            <h4 className="text-sm md:text-base font-bold text-white">佣金下线比例说明</h4>
          </div>
          <span className="px-3 py-0.5 bg-[#cfbcff]/10 text-[#cfbcff] text-[10px] rounded-full font-bold uppercase tracking-wider border border-[#cfbcff]/10">
            当前最高层级: L5
          </span>
        </div>
        <div className="hidden md:block overflow-x-auto scrollbar-hide">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[#cbc4d2]/80 text-[11px] font-bold uppercase tracking-wider border-b border-white/5 bg-white/2">
                <th className="p-4 px-6">代理等级</th>
                <th className="p-4 px-6">返佣计算比例</th>
                <th className="p-4 px-6 text-right">结算周期</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {ratios.map((item, index) => (
                <tr key={index} className="hover:bg-white/3 transition-colors border-b border-white/5 last:border-none">
                  <td className="p-4 px-6 font-bold text-[#cfbcff]">{item.name}</td>
                  <td className="p-4 px-6 font-semibold text-white font-mono">{item.ratio}</td>
                  <td className="p-4 px-6 text-right text-[#cbc4d2]/80 font-mono text-xs">{item.cycle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View ratio cards */}
        <div className="md:hidden divide-y divide-white/5 space-y-4 p-4">
          {ratios.map((item, index) => (
            <div key={index} className={`space-y-2.5 ${index > 0 ? 'pt-4' : ''}`}>
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#cfbcff] text-sm">{item.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-[#cbc4d2]/40 text-[10px] font-bold font-mono">返佣计算比例</p>
                  <p className="text-white font-semibold font-mono mt-0.5">{item.ratio}</p>
                </div>
                <div>
                  <p className="text-[#cbc4d2]/40 text-[10px] font-bold font-mono text-right">结算周期</p>
                  <p className="text-[#cbc4d2] font-mono mt-0.5 text-right">{item.cycle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rules Notice */}
      <div className="bg-[#cfbcff]/5 border border-[#cfbcff]/20 rounded-2xl p-5 flex items-start gap-4">
        <HelpCircle className="w-6 h-6 text-[#cfbcff] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-[#cbc4d2]">
          <h5 className="font-extrabold text-[#cfbcff] text-sm mb-1 uppercase">佣金计算说明 (结算细则)</h5>
          <p className="leading-relaxed">
            1. <span className="text-white font-bold">D+1 自动结算：</span> 所有产生的返还佣金均在下线成功认购次日 (D+1) 凌晨 2:00 进行系统自动汇总结算并入账至您的资产钱包中。<br />
            2. <span className="text-white font-bold">额度同步扩展：</span> 您的最高结算额度伴随着团队下线成员的认购扩增而自动更新扩展，确保划转流程通畅运行。<br />
            3. <span className="text-white font-bold">自动化流程保障：</span> 智能合约自动执行，日结数据汇总上链后即秒级到账，透明公开且免除了传统的提现审核等待与人工干预。
          </p>
        </div>
      </div>

      {/* History Ledger List */}
      <section className="glass-card rounded-[24px] overflow-hidden">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h4 className="text-base font-bold text-white uppercase">佣金历史流水</h4>
          <div className="flex bg-[#211f24] rounded-xl p-1 overflow-x-auto scrollbar-hide">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeFilter === 'all' ? 'bg-[#36343a] text-[#cfbcff]' : 'text-[#cbc4d2]/80 hover:text-white'
              }`}
            >
              全部状态
            </button>
            <button 
              onClick={() => setActiveFilter('pending')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeFilter === 'pending' ? 'bg-[#36343a] text-[#cfbcff]' : 'text-[#cbc4d2]/80 hover:text-white'
              }`}
            >
              待处理
            </button>
            <button 
              onClick={() => setActiveFilter('success')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeFilter === 'success' ? 'bg-[#36343a] text-[#cfbcff]' : 'text-[#cbc4d2]/80 hover:text-white'
              }`}
            >
              已到账
            </button>
          </div>
        </div>

        <div className="hidden md:block overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[#cbc4d2] text-[11px] font-bold border-b border-white/5 bg-white/2 uppercase">
                <th className="p-4 px-6">流水单号</th>
                <th className="p-4 px-6">来源用户</th>
                <th className="p-4 px-6 text-right">对方订单金额</th>
                <th className="p-4 px-6 text-center">返佣层级</th>
                <th className="p-4 px-6 text-right">您的收益金</th>
                <th className="p-4 px-6 text-center">结算时间</th>
                <th className="p-4 px-6 text-center">状态</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredHistory.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/3 transition-colors last:border-none">
                  <td className="p-4 px-6 font-mono text-xs text-[#cbc4d2]">{item.id}</td>
                  <td className="p-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#36343a] text-[9px] flex items-center justify-center text-[#cfbcff] font-bold">
                        {item.userLetter}
                      </div>
                      <span className="font-semibold text-white/90">{item.user}</span>
                    </div>
                  </td>
                  <td className="p-4 px-6 text-right font-bold text-white font-mono">¥ {item.amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</td>
                  <td className="p-4 px-6 text-center">
                    <span className="px-2 py-0.5 bg-[#cfbcff]/10 text-[#cfbcff] text-[10px] rounded font-extrabold uppercase border border-[#cfbcff]/20">
                      {item.level}
                    </span>
                  </td>
                  <td className="p-4 px-6 text-right font-extrabold text-[#00e676] font-mono">
                    +¥ {item.reward.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-4 px-6 text-center text-xs text-[#cbc4d2]/70 font-mono whitespace-nowrap">{item.time}</td>
                  <td className="p-4 px-6 text-center whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      item.status === 'success' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/30' :
                      item.status === 'pending' ? 'bg-[#cfbcff]/10 text-[#cfbcff] border border-[#cfbcff]/20' :
                      'bg-rose-950/40 text-rose-400 border border-rose-800/30'
                    }`}>
                      {item.statusLabel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View history cards */}
        <div className="md:hidden divide-y divide-white/5 space-y-4 p-4 bg-[#1a1722]/30">
          {filteredHistory.map((item, index) => (
            <div key={item.id} className={`space-y-3 ${index > 0 ? 'pt-4' : ''}`}>
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-[10px] text-[#cbc4d2] bg-white/5 px-2 py-0.5 rounded border border-white/5">{item.id}</span>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-6 h-6 rounded-full bg-[#36343a] text-[9px] flex items-center justify-center text-[#cfbcff] font-bold">
                      {item.userLetter}
                    </div>
                    <span className="font-semibold text-white/90 text-xs">{item.user}</span>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                  item.status === 'success' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/30' :
                  item.status === 'pending' ? 'bg-[#cfbcff]/10 text-[#cfbcff] border border-[#cfbcff]/20' :
                  'bg-rose-950/40 text-rose-400 border border-rose-800/30'
                }`}>
                  {item.statusLabel}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                <div>
                  <p className="text-[#cbc4d2]/40 text-[10px] font-semibold font-mono">对方订单 / 层级</p>
                  <p className="text-white font-mono mt-0.5">
                    ¥ {item.amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                    <span className="ml-1.5 px-1 py-0.2 bg-[#cfbcff]/10 text-[#cfbcff] text-[8px] rounded uppercase">
                      {item.level}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-[#cbc4d2]/40 text-[10px] font-semibold font-mono text-right">您的收益金</p>
                  <p className="text-[#00e676] font-extrabold font-mono text-right mt-0.5">
                    +¥ {item.reward.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-[#cbc4d2]/50 font-mono">
                <span>结算时间</span>
                <span>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination mock bar */}
        <div className="p-4 px-6 bg-white/2 flex items-center justify-between border-t border-white/5 text-xs text-[#cbc4d2]">
          <span>显示 1-{filteredHistory.length} 条，共 {filteredHistory.length} 条</span>
          <div className="flex items-center gap-2">
            <button className="p-1 hover:text-white"><ChevronLeft className="w-4 h-4" /></button>
            <span className="font-bold bg-[#cfbcff] text-[#381e72] px-2 py-0.5 rounded">1</span>
            <button className="p-1 hover:text-white"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </section>
    </PageView>
  );
}
