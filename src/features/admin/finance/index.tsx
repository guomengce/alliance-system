import React, { useState } from 'react';
import { Sliders, Search, Download, Wallet, Coins, ArrowUpRight, ArrowDownLeft, CheckCircle2, ShieldAlert, Eye, X, UserX, AlertCircle, RefreshCw, PenTool, Activity, ShieldCheck, Languages } from 'lucide-react';
import { Transaction, DownlineMember } from '../../../types';

interface AdminFinanceViewProps {
  pendingWithdrawals: Transaction[];
  onApproveWithdrawal: (id: string) => void;
  onRejectWithdrawal: (id: string) => void;
  downlines: DownlineMember[];
  transactions: Transaction[];
  onUpdateDownlines?: (updatedList: DownlineMember[]) => void; // Optional hook to push back balances edits
}

export default function AdminFinanceView({
  pendingWithdrawals,
  onApproveWithdrawal,
  onRejectWithdrawal,
  downlines,
  transactions,
  onUpdateDownlines
}: AdminFinanceViewProps) {
  const [activeTab, setActiveTab] = useState<'reserves' | 'wallets' | 'ledger'>('reserves');
  const [searchMemberQuery, setSearchMemberQuery] = useState('');
  const [ledgerTypeFilter, setLedgerTypeFilter] = useState<string>('all');
  const [searchLedgerQuery, setSearchLedgerQuery] = useState('');

  const companyUSDT = 31500000;
  const companyTROO = 950000000;
  const withdrawalFee = 15;

  // Aggregate stats
  const totalUserUSDT = downlines.reduce((acc, d) => acc + (d.usdtBalance || 0), 0);
  const totalUserTROO = downlines.reduce((acc, d) => acc + (d.trooBalance || 0), 0);
  const totalUserLocked = downlines.reduce((acc, d) => acc + (d.pendingBalance || 0), 0);

  // Expanded complete ledger combining initialTransactions and additional records
  const [fullLedger, setFullLedger] = useState<Transaction[]>([
    ...transactions,
    {
      id: 'TXN-77319',
      type: 'recharge',
      typeLabel: '充值首缴',
      desc: '用户 889421 通过 ERC-20 链上首季质押充值',
      amount: 10000.00,
      currency: 'USDT',
      time: '2026-05-28 14:02:11',
      status: 'success',
      statusLabel: '成功'
    },
    {
      id: 'TXN-77320',
      type: 'commission',
      typeLabel: '分派佣金',
      desc: '推广分红派发给 L1 推荐人 889425 (套餐 A)',
      amount: 400.00,
      currency: 'USDT',
      time: '2026-05-28 14:15:30',
      status: 'success',
      statusLabel: '成功'
    },
    {
      id: 'TXN-77321',
      type: 'exchange',
      typeLabel: '股票置换',
      desc: '认购套餐首推配售 TROO 代币赠送 (10倍系数)',
      amount: 10000.00,
      currency: 'TROO',
      time: '2026-05-28 14:16:00',
      status: 'success',
      statusLabel: '成功'
    },
    {
      id: 'TXN-77322',
      type: 'transfer',
      typeLabel: '代付划扣',
      desc: '扣减上线超级代理 889425 配售信用度额量',
      amount: -1000.00,
      currency: 'USDT',
      time: '2026-05-28 14:12:00',
      status: 'success',
      statusLabel: '成功'
    },
    {
      id: 'TXN-77323',
      type: 'lock',
      typeLabel: '排队解锁',
      desc: 'L1级直指成交成功触发 889421 解锁 (10%)',
      amount: 500.00,
      currency: 'USDT',
      time: '2026-05-28 14:18:22',
      status: 'success',
      statusLabel: '成功'
    }
  ]);

  // Modal interaction states
  const [selectedLedgerItem, setSelectedLedgerItem] = useState<Transaction | null>(null);
  const [selectedWalletMember, setSelectedWalletMember] = useState<DownlineMember | null>(null);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<Transaction | null>(null);

  // States for manual balance adjustment form
  const [adjustUsdt, setAdjustUsdt] = useState<number>(0);
  const [adjustTroo, setAdjustTroo] = useState<number>(0);
  const [adjustFrozen, setAdjustFrozen] = useState<number>(0);
  const [adjustStatus, setAdjustStatus] = useState<string>('normal');

  const handleOpenWalletDetails = (member: DownlineMember) => {
    setSelectedWalletMember(member);
    setAdjustUsdt(member.usdtBalance || 0);
    setAdjustTroo(member.trooBalance || 0);
    setAdjustFrozen(member.frozenBalance || 0);
    setAdjustStatus(member.status || 'normal');
  };

  // Submit manual wallet changes to parents/local list
  const handleSaveWalletAdjustment = () => {
    if (!selectedWalletMember) return;
    
    const updated = downlines.map(d => {
      if (d.uid === selectedWalletMember.uid) {
        return {
          ...d,
          usdtBalance: adjustUsdt,
          trooBalance: adjustTroo,
          frozenBalance: adjustFrozen,
          status: adjustStatus as any
        };
      }
      return d;
    });

    if (onUpdateDownlines) {
      onUpdateDownlines(updated);
    }
    
    // Also log a transaction record to full ledger
    const newTx: Transaction = {
      id: `TXN-ADJ-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'transfer',
      typeLabel: '人工对账',
      desc: `管理员手动对会员 UID ${selectedWalletMember.uid} 实施资金纠偏对置修正`,
      amount: adjustUsdt - (selectedWalletMember.usdtBalance || 0),
      currency: 'USDT',
      time: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: 'success',
      statusLabel: '成功'
    };
    
    setFullLedger(prev => [newTx, ...prev]);
    alert(`【人工财务纠偏对账成功】\n会员 ${selectedWalletMember.uid} 的资产池及状态已成功校对修改！余额更改记录已写至完整财务账簿日志中。`);
    setSelectedWalletMember(null);
  };

  // Export report as CSV
  const exportLedgerCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "流水ID,分类代号,账目详细描述,收支金额,币种,成交时间,状态\r\n";
    fullLedger.forEach(l => {
      csvContent += `${l.id},${l.typeLabel || l.type},${l.desc},${l.amount},${l.currency},${l.time},${l.status}\r\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `comprehensive_finance_ledger_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="admin_finance_module" className="space-y-6 animate-fadeIn select-none flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-4">
      <div className="glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-6 flex-grow flex flex-col">
      
      {/* Top operational brief info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-sm md:text-base font-black text-white tracking-tight flex items-center gap-2">
            <Wallet className="w-4 h-4 text-[#cfbcff]" />
            <span>财务列表</span>
          </h3>
          <p className="text-[11px] text-[#cbc4d2]/50 mt-0.5 leading-tight">
            浏览与审计平台公司财务大库、会员个人钱包余额以及各项出金审批。
          </p>
        </div>
      </div>

      {/* Tabs Menu Selection */}
      <div className="flex overflow-x-auto whitespace-nowrap scrollbar-none border-b border-white/5 pb-1 gap-5 md:gap-6 text-xs font-bold font-sans">
        <button
          type="button"
          onClick={() => setActiveTab('reserves')}
          className={`pb-2.5 border-b-2 hover:text-[#cfbcff] transition-all cursor-pointer shrink-0 ${activeTab === 'reserves' ? 'text-[#cfbcff] border-[#cfbcff]' : 'text-[#cbc4d2]/40 border-transparent'}`}
        >
          公司大库 & 出金审批
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('wallets')}
          className={`pb-2.5 border-b-2 hover:text-[#cfbcff] transition-all cursor-pointer shrink-0 ${activeTab === 'wallets' ? 'text-[#cfbcff] border-[#cfbcff]' : 'text-[#cbc4d2]/40 border-transparent'}`}
        >
          会员个人钱包存余普查
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('ledger')}
          className={`pb-2.5 border-b-2 hover:text-[#cfbcff] transition-all cursor-pointer shrink-0 ${activeTab === 'ledger' ? 'text-[#cfbcff] border-[#cfbcff]' : 'text-[#cbc4d2]/40 border-transparent'}`}
        >
          完整收支对账流水账谱
        </button>
      </div>

      {/* Tab CONTENT 1: Reserves and Withdrawals approvals */}
      {activeTab === 'reserves' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 font-sans">
            
            <div className="bg-gradient-to-br from-[#1b1527] to-[#14101e] border border-[#cfbcff]/15 p-5 rounded-2xl relative overflow-hidden">
              <div className="absolute right-3.5 top-3.5 font-mono font-bold text-[8px] text-white/20 uppercase tracking-widest">Reserve USDT</div>
              <p className="text-[10.5px] uppercase font-bold text-[#cfbcff] tracking-wider leading-none">公司保证金准备大库余额</p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-2xl font-black text-white font-mono">{companyUSDT.toLocaleString()}</span>
                <span className="text-[10px] font-bold text-[#cbc4d2]/60 font-mono">USDT</span>
              </div>
              <p className="text-[9.5px] text-[#cbc4d2]/40 mt-2">安全代扣垫资覆盖准备率 100%</p>
            </div>

            <div className="bg-gradient-to-br from-[#1f1915] to-[#151210] border border-amber-500/15 p-5 rounded-2xl relative overflow-hidden">
              <div className="absolute right-3.5 top-3.5 font-mono font-bold text-[8px] text-white/20 uppercase tracking-widest">Escrow TROO</div>
              <p className="text-[10.5px] uppercase font-bold text-[#f1bf50] tracking-wider leading-none">大仓托管股票锁定总余量</p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-2xl font-black text-white font-mono">{companyTROO.toLocaleString()}</span>
                <span className="text-[10px] font-bold text-[#cbc4d2]/60 font-mono">TROO</span>
              </div>
              <p className="text-[9.5px] text-[#cbc4d2]/40 mt-2">用于理财包买入配售和下级裂变解锁返拨</p>
            </div>

            <div className="bg-[#1c1824] border border-white/5 p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute right-3.5 top-3.5 font-mono font-bold text-[8px] text-white/20 uppercase tracking-widest">Aggregate Users Net</div>
              <p className="text-[10.5px] uppercase font-bold text-[#cbc4d2]/60 tracking-wider leading-none">全网代表累计总存余余额</p>
              <div className="mt-3.5 space-y-1 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#cbc4d2]/40">USDT 可支配:</span>
                  <span className="text-white font-bold">{totalUserUSDT.toLocaleString(undefined, {minimumFractionDigits: 2})} U</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#cbc4d2]/40">TROO 股票量:</span>
                  <span className="text-[#cfbcff] font-bold">{totalUserTROO.toLocaleString(undefined, {minimumFractionDigits: 0})} TROO</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#cbc4d2]/40">待核算/在途佣 U:</span>
                  <span className="text-amber-400 font-bold">{totalUserLocked.toLocaleString(undefined, {minimumFractionDigits: 2})} U</span>
                </div>
              </div>
            </div>

          </div>

          {/* Pending withdrawals */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-white font-sans flex items-center gap-1.5 font-bold">
              <Sliders className="w-4 h-4 text-[#cfbcff]" />
              提现出金终审核定池 ({pendingWithdrawals.length} 笔等待核销确认)
            </h4>

            {/* Desktop View Table */}
            <div className="hidden md:block overflow-x-auto border border-white/5 bg-[#1d1925]/20 rounded-2xl pr-1">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/5 text-[#cbc4d2]/50 font-bold bg-white/[0.01]">
                    <th className="py-3 px-4">提款单ID号</th>
                    <th className="py-3 px-4">申领人 UID</th>
                    <th className="py-3 px-4 font-mono">申提金额</th>
                    <th className="py-3 px-4 font-mono">处理手续费</th>
                    <th className="py-3 px-4 font-mono">应拨金额</th>
                    <th className="py-3 px-4">到账通道及TRC-20地址</th>
                    <th className="py-3 px-4 text-right">出纳状态及决策</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {pendingWithdrawals.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-white/30 font-semibold italic font-sans text-xs">
                        当前无排队等待审核的提币出金请求重审，全系统财务大铺账目平衡。
                      </td>
                    </tr>
                  ) : (
                    pendingWithdrawals.map(w => (
                      <tr key={w.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 px-4 font-mono font-bold text-white">{w.id}</td>
                        <td className="py-4 px-4 font-mono text-[#cbc4d2]/80 font-bold">UID {w.id.slice(-6)}</td>
                        <td className="py-4 px-4 font-mono text-[#ffb4ab] font-bold">-{Math.abs(w.amount).toLocaleString()} U</td>
                        <td className="py-4 px-4 font-mono text-[#cbc4d2]/60">{withdrawalFee} USDT</td>
                        <td className="py-4 px-4 font-mono text-emerald-400 font-extrabold">{(Math.abs(w.amount) - withdrawalFee).toLocaleString()} USDT</td>
                        <td className="py-4 px-4 text-[#cbc4d2]/80 font-mono text-[11px] truncate max-w-[200px]" title="TYX78Hqskm82K1Hshq82Ksh918Ksw">
                          TRC20: Tx78HqsmB...{w.id.slice(-4)}
                        </td>
                        <td className="py-4 px-4 text-right space-x-1.5 whitespace-nowrap">
                          <button 
                            type="button"
                            onClick={() => setSelectedWithdrawal(w)}
                            className="bg-[#cfbcff]/10 hover:bg-[#cfbcff]/25 text-[#cfbcff] font-bold px-3 py-1.5 rounded-xl text-[10.5px] transition-all cursor-pointer font-sans"
                          >
                            查看详情
                          </button>
                          <button 
                            type="button"
                            onClick={() => onApproveWithdrawal(w.id)}
                            className="bg-emerald-500/10 hover:bg-emerald-500/35 text-emerald-400 font-bold px-3 py-1.5 rounded-xl text-[10.5px] transition-all cursor-pointer font-sans"
                          >
                            通过并打款
                          </button>
                          <button 
                            type="button"
                            onClick={() => onRejectWithdrawal(w.id)}
                            className="bg-red-500/10 hover:bg-red-500/20 text-[#ffb4ab] font-bold px-3 py-1.5 rounded-xl text-[10.5px] transition-all cursor-pointer font-sans"
                          >
                            驳回
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
 
            {/* Mobile View Card Stack */}
            <div className="block md:hidden space-y-3">
              {pendingWithdrawals.length === 0 ? (
                <div className="py-8 text-center text-[#cbc4d2]/30 font-semibold italic border border-white/5 rounded-2xl bg-[#1d1925]/10 text-xs">
                   当前无排队等待审核 of 提币出金请求。
                </div>
              ) : (
                pendingWithdrawals.map(w => (
                  <div key={w.id} className="p-4 rounded-xl border border-white/5 bg-white/[0.01] space-y-3 font-sans text-xs">
                    <div className="flex justify-between items-start border-b border-white/5 pb-2">
                      <div>
                        <span className="font-mono text-white font-extrabold text-[#cfbcff]">{w.id}</span>
                        <div className="text-[10px] text-[#cbc4d2]/40 font-mono mt-0.5">UID: {w.id.slice(-6)}</div>
                      </div>
                      <span className="text-emerald-400 font-mono font-black text-xs text-right">
                        {(Math.abs(w.amount) - withdrawalFee).toLocaleString()} USDT
                      </span>
                    </div>
 
                    <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 font-mono text-[11px] pb-1">
                      <div>
                        <span className="text-[#cbc4d2]/40 text-[9px] font-sans block leading-none mb-1">申提金额</span>
                        <span className="text-[#ffb4ab] font-bold">-{Math.abs(w.amount).toLocaleString()} U</span>
                      </div>
                      <div>
                        <span className="text-[#cbc4d2]/40 text-[9px] font-sans block leading-none mb-1">手续费</span>
                        <span className="text-white/60">{withdrawalFee} USDT</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[#cbc4d2]/40 text-[9px] font-sans block leading-none mb-1">TRC20 地址</span>
                        <span className="text-white/75 truncate block select-all" title="TYX78Hqskm82K1Hshq82Ksh918Ksw">
                          Tx78HqsmB...{w.id.slice(-4)}
                        </span>
                      </div>
                    </div>
 
                    <div className="flex items-center gap-1.5 pt-2 border-t border-white/5">
                      <button 
                        type="button"
                        onClick={() => setSelectedWithdrawal(w)}
                        className="flex-1 bg-white/5 hover:bg-white/10 text-[#cbc4d2] font-bold py-2 rounded-xl text-xs transition-all cursor-pointer text-center"
                      >
                        详情/审计
                      </button>
                      <button 
                        type="button"
                        onClick={() => onApproveWithdrawal(w.id)}
                        className="px-3 bg-emerald-500/10 hover:bg-emerald-500/20 active:bg-emerald-500/30 text-emerald-400 font-bold py-2 rounded-xl text-xs transition-all cursor-pointer text-center"
                      >
                        通过
                      </button>
                      <button 
                        type="button"
                        onClick={() => onRejectWithdrawal(w.id)}
                        className="px-3 bg-red-500/10 hover:bg-red-500/20 text-[#ffb4ab] font-bold py-2 rounded-xl text-xs transition-all cursor-pointer text-center"
                      >
                        驳回
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab CONTENT 2: Member Wallet Explorer Search */}
      {activeTab === 'wallets' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h4 className="text-xs uppercase tracking-wider text-white font-sans font-bold flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-[#cfbcff]" />
                联盟代表个人USDT、冻结及TROO股票财富存余普查
              </h4>
              <p className="text-[10px] text-[#cbc4d2]/50 mt-0.5">
                实时监管特定代收理财代表的可用、排队在途、冻结等各项细项指标，点击“钱包纠偏详情”极速拨乱反正。
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <input 
                type="text"
                value={searchMemberQuery}
                onChange={(e) => setSearchMemberQuery(e.target.value)}
                placeholder="键入昵称 / UID 搜查账户存余..."
                className="w-full bg-[#1c1824] border border-white/10 rounded-xl px-3.5 py-2 pl-9 text-xs text-white placeholder-white/30 focus:ring-1 focus:ring-[#cfbcff] outline-none"
              />
              <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Desktop View Table */}
          <div className="hidden md:block overflow-x-auto border border-white/5 bg-[#1d1925]/20 rounded-2xl pr-1">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 text-[#cbc4d2]/50 font-bold bg-white/[0.01]">
                  <th className="py-4 px-4">会员昵称 / UID 账号</th>
                  <th className="py-4 px-4 font-mono text-emerald-400">可用资金余额 (USDT)</th>
                  <th className="py-4 px-4 font-mono text-cyan-400">已冻结资产 (USDT)</th>
                  <th className="py-4 px-4 font-mono text-[#cfbcff]">TROO 股票配售余量</th>
                  <th className="py-4 px-4 font-mono text-amber-500">D+1 待核算佣金 (USDT)</th>
                  <th className="py-4 px-4 font-mono text-white">总总资产折合 (USDT)</th>
                  <th className="py-4 px-4 text-center">状态</th>
                  <th className="py-4 px-4 text-right">钱包细节修正</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {downlines
                  .filter(d => {
                    if (!searchMemberQuery) return true;
                    const q = searchMemberQuery.toLowerCase();
                    return d.uid.includes(q) || 
                           (d.nickname && d.nickname.toLowerCase().includes(q)) ||
                           (d.email && d.email.toLowerCase().includes(q));
                  })
                  .map(d => {
                    // Total Assets calculation: USDT balance + Frozen Balance + Pending Balance
                    const totalWealth = (d.usdtBalance || 0) + (d.frozenBalance || 0) + (d.pendingBalance || 0);

                    return (
                      <tr key={d.uid} className="hover:bg-white/[0.015]">
                        <td className="py-3.5 px-4 font-sans">
                          <p className="font-extrabold text-white text-xs">{d.nickname || '新同盟会员'}</p>
                          <p className="font-mono text-[10px] text-[#cbc4d2]/40 mt-0.5">UID: {d.uid}</p>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-emerald-400 font-extrabold">{d.usdtBalance?.toLocaleString(undefined, {minimumFractionDigits: 2}) || '0.00'} U</td>
                        <td className="py-3.5 px-4 font-mono text-cyan-400 font-extrabold">{d.frozenBalance?.toLocaleString(undefined, {minimumFractionDigits: 2}) || '0.00'} U</td>
                        <td className="py-3.5 px-4 font-mono text-[#cfbcff] font-extrabold">{d.trooBalance?.toLocaleString(undefined, {minimumFractionDigits: 0}) || '0'} TROO</td>
                        <td className="py-3.5 px-4 font-mono text-amber-500 font-bold">{d.pendingBalance?.toLocaleString(undefined, {minimumFractionDigits: 2}) || '0.00'} U</td>
                        <td className="py-3.5 px-4 font-mono text-white font-black">
                          USDT {totalWealth.toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                            d.status === 'normal' ? 'bg-emerald-500/10 text-emerald-400' :
                            d.status === 'frozen' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
                          }`}>
                            {d.status === 'normal' ? '活跃' : d.status === 'frozen' ? '挂冻' : '受限'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleOpenWalletDetails(d)}
                            className="bg-white/5 hover:bg-[#cfbcff]/15 text-[#cbc4d2] hover:text-[#cfbcff] px-3 py-1.5 rounded-xl font-bold font-sans active:scale-95 transition-all text-xs inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>财务审计</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          {/* Mobile View Card Stack */}
          <div className="block md:hidden space-y-3">
            {downlines
              .filter(d => {
                if (!searchMemberQuery) return true;
                const q = searchMemberQuery.toLowerCase();
                return d.uid.includes(q) || 
                       (d.nickname && d.nickname.toLowerCase().includes(q)) ||
                       (d.email && d.email.toLowerCase().includes(q));
              })
              .map(d => {
                const totalWealth = (d.usdtBalance || 0) + (d.frozenBalance || 0) + (d.pendingBalance || 0);

                return (
                  <div key={d.uid} className="p-4 rounded-xl border border-white/5 bg-white/[0.01] space-y-3 font-sans text-xs">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                      <div>
                        <span className="font-extrabold text-white text-sm">{d.nickname || '新同盟会员'}</span>
                        <div className="text-[10px] text-[#cbc4d2]/40 font-mono mt-0.5">UID: {d.uid}</div>
                      </div>
                      <span className={`text-[9.5px] font-black uppercase px-2.5 py-0.5 rounded ${
                        d.status === 'normal' ? 'bg-emerald-500/10 text-emerald-400' :
                        d.status === 'frozen' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-100'
                      }`}>
                        {d.status === 'normal' ? '活跃' : d.status === 'frozen' ? '挂冻' : '受限'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 font-mono text-[11px] pb-1">
                      <div>
                        <span className="text-[#cbc4d2]/40 text-[9px] font-sans block leading-none mb-1">可用资金 (USDT)</span>
                        <span className="text-emerald-400 font-extrabold block text-xs">{d.usdtBalance?.toLocaleString(undefined, {minimumFractionDigits: 2}) || '0.00'} U</span>
                      </div>
                      <div>
                        <span className="text-[#cbc4d2]/40 text-[9px] font-sans block leading-none mb-1">冻结资产 (USDT)</span>
                        <span className="text-cyan-400 font-extrabold block text-xs">{d.frozenBalance?.toLocaleString(undefined, {minimumFractionDigits: 2}) || '0.00'} U</span>
                      </div>
                      <div>
                        <span className="text-[#cbc4d2]/40 text-[9px] font-sans block leading-none mb-1">TROO 股票量</span>
                        <span className="text-[#cfbcff] font-extrabold block text-xs">{d.trooBalance?.toLocaleString(undefined, {minimumFractionDigits: 0}) || '0'} TROO</span>
                      </div>
                      <div>
                        <span className="text-[#cbc4d2]/40 text-[9px] font-sans block leading-none mb-1">在途佣金</span>
                        <span className="text-amber-500 font-bold block text-xs">{d.pendingBalance?.toLocaleString(undefined, {minimumFractionDigits: 2}) || '0.00'} U</span>
                      </div>
                      <div className="col-span-2 pt-2 border-t border-white/5">
                        <span className="text-[#cbc4d2]/40 text-[9px] font-sans block leading-none mb-1">总资产折合 (Combined)</span>
                        <span className="text-white font-black text-xs font-mono">USDT {totalWealth.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                      </div>
                    </div>

                    <div className="pt-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenWalletDetails(d)}
                        className="w-full justify-center bg-white/5 hover:bg-[#cfbcff]/15 text-[#cbc4d2] hover:text-[#cfbcff] py-2.5 rounded-xl font-bold font-sans active:scale-95 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-4 h-4 text-[#cfbcff]" />
                        <span>财务审计与纠偏</span>
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Tab CONTENT 3: Complete Financial Ledger Stream with Filters & Export */}
      {activeTab === 'ledger' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h4 className="text-xs uppercase tracking-wider text-white font-sans font-bold flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-[#cfbcff]" />
                充值、提现、派发佣金、排队解锁完整总流水账谱
              </h4>
              <p className="text-[10px] text-[#cbc4d2]/50 mt-0.5">
                记录每一次美金和TROO股份变动，点击即可拉取单条记账证书对账。
              </p>
            </div>

            {/* Filter inputs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto text-xs font-sans">
              <select
                value={ledgerTypeFilter}
                onChange={(e) => setLedgerTypeFilter(e.target.value)}
                className="bg-[#211f24] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-bold cursor-pointer"
              >
                <option value="all">显示全部流水形态</option>
                <option value="recharge">🛡 仅显示 充值/买入流水</option>
                <option value="withdraw">💸 仅显示 提币/出金流水</option>
                <option value="commission">🎉 仅显示 五代派佣流水</option>
                <option value="lock">⏳ 仅显示 排队解锁流水</option>
              </select>

              <button
                type="button"
                onClick={exportLedgerCSV}
                className="bg-[#cfbcff]/5 hover:bg-[#cfbcff]/15 text-[#cfbcff] border border-[#cfbcff]/10 px-4 py-2.5 rounded-xl text-xs font-bold active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>备存总流水 (CSV)</span>
              </button>
            </div>
          </div>

          {/* Desktop View Table */}
          <div className="hidden md:block overflow-x-auto border border-white/5 bg-[#1d1925]/20 rounded-2xl pr-1">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 text-[#cbc4d2]/50 font-bold bg-white/[0.01]">
                  <th className="py-4 px-4">记账流水ID</th>
                  <th className="py-4 px-4">收支类型</th>
                  <th className="py-4 px-4">盟友资金交割详情描述</th>
                  <th className="py-4 px-4 font-mono">交割金额</th>
                  <th className="py-4 px-4 font-mono">币种</th>
                  <th className="py-4 px-4">交易完成时分</th>
                  <th className="py-4 px-4 text-center">细节证书</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {fullLedger
                  .filter(l => {
                    if (ledgerTypeFilter === 'all') return true;
                    return l.type === ledgerTypeFilter;
                  })
                  .map(l => (
                    <tr key={l.id} className="hover:bg-white/[0.015]">
                      <td className="py-3.5 px-4 font-mono font-bold text-white">{l.id}</td>
                      <td className="py-3.5 px-4">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                          l.type === 'recharge' ? 'bg-emerald-500/10 text-emerald-400' :
                          l.type === 'withdraw' ? 'bg-red-500/10 text-[#ffb4ab]' :
                          l.type === 'commission' ? 'bg-[#cfbcff]/10 text-[#cfbcff]' : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          {l.typeLabel || l.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#cbc4d2] font-sans truncate max-w-[280px]" title={l.desc}>{l.desc}</td>
                      <td className={`py-3.5 px-4 font-mono font-black ${l.amount < 0 ? 'text-[#ffb4ab]' : 'text-emerald-400'}`}>
                        {l.amount < 0 ? '' : '+'}{l.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#cbc4d2]/60 font-bold">{l.currency}</td>
                      <td className="py-3.5 px-4 font-mono text-[#cbc4d2]/40">{l.time}</td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => setSelectedLedgerItem(l)}
                          className="bg-white/5 hover:bg-white/10 text-[#cbc4d2] px-2.5 py-1 rounded-lg text-[10.5px] font-sans active:scale-95 transition-all outline-none mx-auto cursor-pointer flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3 text-[#cfbcff]" />
                          <span>凭证</span>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View Card Stack */}
          <div className="block md:hidden space-y-3">
            {fullLedger
              .filter(l => {
                if (ledgerTypeFilter === 'all') return true;
                return l.type === ledgerTypeFilter;
              })
              .map(l => (
                <div key={l.id} className="p-4 rounded-xl border border-white/5 bg-white/[0.01] space-y-3 font-sans text-xs">
                  <div className="flex justify-between items-start border-b border-white/5 pb-2">
                    <div>
                      <span className="font-mono text-white font-extrabold text-[11px]">{l.id}</span>
                      <div className="text-[10px] text-[#cbc4d2]/40 font-mono mt-0.5">{l.time}</div>
                    </div>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                      l.type === 'recharge' ? 'bg-emerald-500/10 text-emerald-400' :
                      l.type === 'withdraw' ? 'bg-red-500/10 text-[#ffb4ab]' :
                      l.type === 'commission' ? 'bg-[#cfbcff]/10 text-[#cfbcff]' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {l.typeLabel || l.type.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[#cbc4d2]/45 text-[9px] block leading-none">资金交割描述</span>
                    <span className="text-[#cbc4d2]/90 block leading-relaxed line-clamp-2 text-[11px]" title={l.desc}>
                      {l.desc}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="font-mono text-[11px]">
                      <span className="text-[#cbc4d2]/40 text-[9px] font-sans block leading-none mb-0.5">交割金额 / 币种</span>
                      <span className={`font-black text-xs ${l.amount < 0 ? 'text-[#ffb4ab]' : 'text-emerald-400'}`}>
                        {l.amount < 0 ? '' : '+'}{l.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                      </span>
                      <span className="text-[#cbc4d2]/60 font-bold ml-1 text-[10px]">{l.currency}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedLedgerItem(l)}
                      className="bg-white/5 hover:bg-white/10 text-[#cbc4d2] px-3 py-2 rounded-xl text-xs font-bold active:scale-95 transition-all outline-none cursor-pointer flex items-center gap-1 shrink-0"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#cfbcff]" />
                      <span>查看凭证</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      </div>

      {/* 🧾 LEDGER VOUCHER DETAILS POPUP DIALOG */}
      {selectedLedgerItem && (
        <div id="ledger_item_overlay" className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn p-4 overflow-y-auto font-sans">
          <div className="bg-[#181421] border border-white/10 rounded-3xl max-w-md w-full p-6 md:p-8 relative shadow-2xl shadow-black animate-slideUp space-y-5 max-h-[92vh] overflow-y-auto custom-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedLedgerItem(null)}
              className="absolute right-4 top-4 text-[#cbc4d2]/60 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 pb-2 border-b border-white/5">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>平台链上财务记账核心凭证</span>
              </h4>
              <p className="text-[10px] text-[#cbc4d2]/40 font-mono">TICKET ID: {selectedLedgerItem.id}</p>
            </div>

            <div className="space-y-3 bg-[#110e16] p-4.5 rounded-2xl border border-white/5 font-mono text-xs text-[#cbc4d2]/90">
              <div className="flex justify-between">
                <span>分类描述形态：</span>
                <span className="text-[#cfbcff] font-bold">{selectedLedgerItem.typeLabel || selectedLedgerItem.type.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span>交割本金方向：</span>
                <span className="text-white font-bold">{selectedLedgerItem.currency}</span>
              </div>
              <div className="flex justify-between">
                <span>实拨本金总值：</span>
                <span className={selectedLedgerItem.amount < 0 ? 'text-red-400 font-extrabold' : 'text-emerald-400 font-extrabold'}>
                  {selectedLedgerItem.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                </span>
              </div>
              <div className="flex justify-between">
                <span>写入系统时分：</span>
                <span>{selectedLedgerItem.time}</span>
              </div>
              <div className="flex justify-between">
                <span>对账智能状态：</span>
                <span className="text-emerald-400">Ledger Ok (已自动对账存证)</span>
              </div>
            </div>

            {(selectedLedgerItem.type === 'withdraw' || selectedLedgerItem.type === 'recharge') && (
              <div className="space-y-2.5 bg-gradient-to-r from-purple-950/20 to-indigo-950/20 p-4 rounded-2xl border border-indigo-500/20 font-mono text-[11px]">
                <p className="text-xs font-bold text-[#cfbcff] flex items-center gap-1.5 border-b border-white/5 pb-1.5 font-sans">
                  <span className="inline-block w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                  🌐 链上智能合约区块凭证 (Blockchain Proof)
                </p>
                <div className="space-y-2 text-[#cbc4d2]/85">
                  <div className="flex justify-between">
                    <span className="text-white/45">公链协议网络:</span>
                    <span className="text-white font-bold">{selectedLedgerItem.blockchainProof?.network || (selectedLedgerItem.desc.includes('ERC-20') || selectedLedgerItem.desc.includes('ERC20') ? 'Ethereum Mainnet (ERC-20)' : 'TRON Network (TRC-20)')}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 mt-1">
                    <span className="text-white/45">链上交易哈希 (TXID):</span>
                    <span className="text-[#cfbcff] bg-black/40 p-2 rounded text-[10px] break-all select-all border border-white/5 block text-left">
                      {selectedLedgerItem.blockchainProof?.txid || (selectedLedgerItem.id.replace('TXN-', '0x') + 'fa' + Math.floor(10293120).toString(16) + '8a9c')}
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-white/45">区块确权高度:</span>
                    <span className="text-white">{selectedLedgerItem.blockchainProof?.blockHeight || 61849204}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/45">全网共识确认:</span>
                    <span className="text-emerald-400 font-bold">{selectedLedgerItem.blockchainProof?.confirmations || 256} / 256 Confirmed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/45">平台燃气储备:</span>
                    <span className="text-white">{selectedLedgerItem.blockchainProof?.gasFee || (selectedLedgerItem.type === 'withdraw' ? '15.0' : '1.5')} USDT</span>
                  </div>
                  <div className="border-t border-white/5 pt-1.5 flex flex-col gap-1 text-[10px] opacity-80">
                    <div className="flex justify-between">
                      <span className="text-white/45">发款源地址:</span>
                      <span className="text-white/80 select-all font-mono">{selectedLedgerItem.blockchainProof?.fromAddress || 'Tx78HqsmB82K1Hshq82Ksh918Ksw'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/45">收讫目的端:</span>
                      <span className="text-white/80 select-all font-mono">{selectedLedgerItem.blockchainProof?.toAddress || '0x742d35Cc6634C0532925a3b844Bc454'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="p-3.5 bg-white/2 rounded-xl border border-white/5 space-y-1.5 text-xs text-[#cbc4d2]/85">
              <p className="font-bold text-white text-[11px]">资金流动记录描述如下：</p>
              <p className="leading-relaxed text-[11px] font-sans opacity-80">{selectedLedgerItem.desc}</p>
            </div>

            <div className="pt-2 flex justify-end text-xs">
              <button
                type="button"
                onClick={() => setSelectedLedgerItem(null)}
                className="bg-white/5 hover:bg-white/10 text-white px-5 py-2.5 rounded-xl font-bold cursor-pointer transition-all active:scale-95"
              >
                关闭凭证
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 💼 MEMBER WALLET DETAILS POPUP DIALOG - Allows manual recalibrations! */}
      {selectedWalletMember && (
        <div id="member_wallet_overlay" className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn p-4 overflow-y-auto font-sans">
          <div className="bg-[#181421] border border-white/10 rounded-3xl max-w-xl w-full p-6 md:p-8 relative shadow-2xl shadow-black animate-slideUp space-y-6 max-h-[92vh] overflow-y-auto custom-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedWalletMember(null)}
              className="absolute right-4 top-4 text-[#cbc4d2]/60 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 pb-2 border-b border-white/5 text-left">
              <h4 className="text-base font-black text-white flex items-center gap-2">
                <Wallet className="w-5 h-5 text-[#cfbcff]" />
                <span>加盟商个人金库审计及资金硬调改</span>
              </h4>
              <p className="text-xs text-[#cbc4d2]/40 font-mono">OWNER ACCOUNT UID: {selectedWalletMember.uid} / Nickname: {selectedWalletMember.nickname || '新同盟代表'}</p>
            </div>

            {/* Total assets display stats card */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 text-xs font-mono">
              <div className="bg-[#110e16] p-3 rounded-xl border border-white/5 text-center">
                <span className="text-[10px] text-[#cbc4d2]/45 font-sans block">可用资产 (U)</span>
                <span className="text-xs font-bold text-emerald-400">{(selectedWalletMember.usdtBalance || 0).toLocaleString()}</span>
              </div>
              <div className="bg-[#110e16] p-3 rounded-xl border border-white/5 text-center">
                <span className="text-[10px] text-cyan-400 font-sans block">冻结资金 (U)</span>
                <span className="text-xs font-bold text-cyan-400">{(selectedWalletMember.frozenBalance || 0).toLocaleString()}</span>
              </div>
              <div className="bg-[#110e16] p-3 rounded-xl border border-white/5 text-center">
                <span className="text-[10px] text-[#cfbcff] font-sans block">TROO 股票股数</span>
                <span className="text-xs font-bold text-[#cfbcff]">{(selectedWalletMember.trooBalance || 0).toLocaleString()}</span>
              </div>
              <div className="bg-[#110e16] p-3 rounded-xl border border-white/5 text-center">
                <span className="text-[10px] text-amber-500 font-sans block">在途待核 U</span>
                <span className="text-xs font-bold text-amber-500">{(selectedWalletMember.pendingBalance || 0).toLocaleString()}</span>
              </div>
              <div className="bg-[#110e16] p-3 rounded-xl border border-[#e7c365]/20 text-center relative overflow-hidden">
                <span className="text-[10px] text-[#e7c365]/80 font-sans block font-bold">排队待解锁 (U)</span>
                <span className="text-xs font-black text-[#e7c365]">
                  {((selectedWalletMember.pendingBalance || 1500) * 1.5).toLocaleString(undefined, {minimumFractionDigits: 2})}
                </span>
                <p className="text-[8px] text-[#e7c365]/40 leading-none mt-1 font-sans">等代下代认购</p>
              </div>
            </div>

            {/* Quick calibration inputs form */}
            <div className="bg-white/2 border border-white/5 p-5 rounded-2xl space-y-4 text-left font-sans">
              <div className="flex items-center gap-2 text-xs text-amber-300 pb-2 border-b border-white/5">
                <PenTool className="w-4 h-4 shrink-0" />
                <p className="font-bold">手动财务资金纠偏对调工具 (Manual Correction Form)</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10.5px] uppercase font-bold text-[#cbc4d2]/50">可用余额(USDT)</label>
                  <input
                    type="number"
                    value={adjustUsdt}
                    onChange={(e) => setAdjustUsdt(Number(e.target.value) || 0)}
                    className="bg-[#110e16] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10.5px] uppercase font-bold text-[#cbc4d2]/50">冻结资产(USDT)</label>
                  <input
                    type="number"
                    value={adjustFrozen}
                    onChange={(e) => setAdjustFrozen(Number(e.target.value) || 0)}
                    className="bg-[#110e16] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cyan-400 font-mono"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10.5px] uppercase font-bold text-[#cbc4d2]/50">TROO股票量(股)</label>
                  <input
                    type="number"
                    value={adjustTroo}
                    onChange={(e) => setAdjustTroo(Number(e.target.value) || 0)}
                    className="bg-[#110e16] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#cfbcff] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10.5px] uppercase font-bold text-[#cbc4d2]/50">运营风控状态</label>
                  <select
                    value={adjustStatus}
                    onChange={(e) => setAdjustStatus(e.target.value)}
                    className="bg-[#110e16] border border-white/10 rounded-xl px-3.5 py-3 text-xs text-white uppercase font-bold"
                  >
                    <option value="normal">⚡ NORMAL (活跃可用状态)</option>
                    <option value="frozen">❄ FROZEN (可提限制/冻结限制)</option>
                    <option value="disabled">🚫 REBUFF (锁定拉黑隔离)</option>
                  </select>
                </div>

                <div className="flex flex-col justify-end">
                  <p className="text-[10px] text-[#cbc4d2]/30 italic leading-tight">
                    * 对账计算备忘：调整可用或冻结金额后，保存操作将直接改写对应会员的中心财务大底单结构。
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex justify-end gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedWalletMember(null)}
                  className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all cursor-pointer font-bold"
                >
                  放弃修改
                </button>
                <button
                  type="button"
                  onClick={handleSaveWalletAdjustment}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:brightness-110 text-slate-900 font-black rounded-xl cursor-pointer transition-all shadow-md shadow-emerald-500/10"
                >
                  确认资金安全存证
                </button>
              </div>
            </div>

            {/* Bottom tips */}
            <div className="p-3.5 bg-red-950/20 border border-red-500/10 rounded-2xl text-[10px] text-red-200/80 leading-normal text-left">
              ⚠ **合规和安全提示**：人工财务调整为高级后门操作，任何对此特定加盟会员可用USDT与TROO股票硬改写的行为，都会被平台写入审计全周期日志存根。
            </div>

          </div>
        </div>
      )}

      {/* 🔮 WITHDRAWAL AUDIT & DETAILS OVERLAY DIALOG */}
      {selectedWithdrawal && (() => {
        const netAmount = Math.abs(selectedWithdrawal.amount) - withdrawalFee;
        const applicantUid = selectedWithdrawal.id.slice(-6);
        return (
          <div id="withdrawal_detail_overlay" className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn p-4 overflow-y-auto font-sans">
            <div className="bg-[#181421] border border-white/10 rounded-3xl max-w-lg w-full p-6 md:p-8 relative shadow-2xl shadow-black animate-slideUp space-y-6 max-h-[92vh] overflow-y-auto custom-scrollbar">
              <button
                type="button"
                onClick={() => setSelectedWithdrawal(null)}
                className="absolute right-4 top-4 text-[#cbc4d2]/60 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1 pb-2 border-b border-white/5 text-left">
                <h4 className="text-base font-black text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-amber-400" />
                  <span>提币出金委托高级安全决策审计报告</span>
                </h4>
                <p className="text-xs text-[#cbc4d2]/40 font-mono">TICKET: {selectedWithdrawal.id} / Status: {selectedWithdrawal.statusLabel || '待终核'}</p>
              </div>

              {/* Core Financial Block */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 text-left font-mono">
                <div className="bg-[#110e16] p-3 rounded-xl border border-white/5 col-span-2 md:col-span-1">
                  <span className="text-[10px] text-[#cbc4d2]/40 font-sans block">申请提现毛额</span>
                  <span className="text-sm font-extrabold text-[#ffb4ab]">
                    -{Math.abs(selectedWithdrawal.amount).toLocaleString(undefined, {minimumFractionDigits: 2})} U
                  </span>
                </div>
                <div className="bg-[#110e16] p-3 rounded-xl border border-white/5">
                  <span className="text-[10px] text-[#cbc4d2]/40 font-sans block">划转及Gas手续费</span>
                  <span className="text-sm font-bold text-white/70">
                    {withdrawalFee.toLocaleString(undefined, {minimumFractionDigits: 2})} U
                  </span>
                </div>
                <div className="bg-[#110e16] p-3 rounded-xl border border-emerald-500/20 text-emerald-400">
                  <span className="text-[10px] text-emerald-400/60 font-sans block font-bold">最终实拨出金</span>
                  <span className="text-sm font-black">
                    {netAmount.toLocaleString(undefined, {minimumFractionDigits: 2})} U
                  </span>
                </div>
              </div>

              {/* Applicant Risk Inspection Panel */}
              <div className="bg-white/2 border border-white/5 p-4.5 rounded-2xl text-left space-y-3.5">
                <div className="flex items-center gap-2 text-xs text-[#cfbcff] font-bold border-b border-white/5 pb-2">
                  <ShieldCheck className="w-4 h-4 text-[#cfbcff]" />
                  <span>用户信息 (User Info)</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-[#cbc4d2]/45 text-[10px] block leading-none">申领账户 UID:</span>
                    <span className="font-mono font-bold text-white">UID {applicantUid}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[#cbc4d2]/45 text-[10px] block leading-none">会员KYC级别:</span>
                    <span className="text-emerald-400 font-bold">已实名 L1 / L2 级别</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[#cbc4d2]/45 text-[10px] block leading-none">团队直属 Sponsor:</span>
                    <span className="font-mono font-bold text-white">999001 (SYS)</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[#cbc4d2]/45 text-[10px] block leading-none">当前运营风控状态:</span>
                    <span className="text-emerald-400 font-bold">⚡ NORMAL (正轨活跃)</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[#cbc4d2]/45 text-[10px] block leading-none">申领发起时分:</span>
                    <span className="font-mono text-white/80">{selectedWithdrawal.time}</span>
                  </div>
                </div>
              </div>

              {/* Blockchain target info panel */}
              <div className="bg-gradient-to-r from-purple-950/10 to-indigo-950/10 border border-indigo-500/10 p-4.5 rounded-2xl text-left space-y-3.5">
                <div className="flex items-center gap-2 text-xs text-indigo-300 font-bold border-b border-white/5 pb-2">
                  <Languages className="w-4 h-4" />
                  <span>到账通道及下发目标公网地址 (Blockchain Delivery Destination)</span>
                </div>

                <div className="space-y-2.5 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-[#cbc4d2]/50">下发承载协议公链:</span>
                    <span className="text-white font-bold">{selectedWithdrawal.blockchainProof?.network || 'Tether USD - TRON Network (TRC-20)'}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[#cbc4d2]/50">外部收款目标节点地址 (Target Wallet Destination):</span>
                    <span className="bg-black/30 p-2.5 font-mono text-[11px] text-[#cfbcff] border border-white/5 rounded-xl break-all select-all leading-normal text-left">
                      {selectedWithdrawal.blockchainProof?.toAddress || `Tx78HqsmB82K1Hshq82Ksh918Ksw${applicantUid}`}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-white/5 text-[11.5px]">
                    <span className="text-[#cbc4d2]/50">当前预判区块对账状态:</span>
                    <span className="text-amber-400 font-bold animate-pulse">待核放 (Await Dispatch Authorization)</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedWithdrawal(null)}
                  className="px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all cursor-pointer font-bold font-sans"
                >
                  放弃审计
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onRejectWithdrawal(selectedWithdrawal.id);
                      setSelectedWithdrawal(null);
                    }}
                    className="px-4 py-3 bg-red-500/15 hover:bg-red-500/25 text-[#ffb4ab] rounded-xl transition-all cursor-pointer font-bold font-sans"
                  >
                    拒绝驳回
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onApproveWithdrawal(selectedWithdrawal.id);
                      setSelectedWithdrawal(null);
                    }}
                    className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-400 hover:brightness-110 text-slate-950 font-black rounded-xl transition-all cursor-pointer shadow-md shadow-emerald-500/10 font-sans"
                  >
                    通过并打款
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
}

