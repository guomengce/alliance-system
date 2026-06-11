import React, { useState } from 'react';
import { Activity, Eye, ShieldAlert, CheckCircle, RefreshCw, X, AlertTriangle, AlertCircle, Sparkles, Send, Coins } from 'lucide-react';

interface CommissionPayout {
  id: string;
  orderId: string;
  uid: string;
  level: string;               // L1, L2, L3, L4, L5
  amount: number;               // USDT Expected
  status: 'credited' | 'pending' | 'failed' | 'pool_insufficient' | 'intercepted';
  time: string;
  recipientNickname: string;
  errorMessage?: string;        // If status === failed or pool_insufficient
  triggerMemberUid?: string;     // Triggering team member UID
  triggerMemberLevel?: string;   // Triggering member's relative level layer (e.g. L1, L2, etc)
  triggerRechargeAmount?: number; // How much they recharged in USDT
}

export default function AdminCommissionsView() {
  const [commissions, setCommissions] = useState<CommissionPayout[]>([
    { id: 'COP-91283', orderId: 'ORD-2026052901', uid: '889425', level: 'L1', amount: 400.00, status: 'credited', time: '2026-05-29 08:30:11', recipientNickname: '星空行者 (Amanda)', triggerMemberUid: '891044', triggerMemberLevel: '1代 (L1)', triggerRechargeAmount: 4000.00 },
    { id: 'COP-91284', orderId: 'ORD-2026052901', uid: '890112', level: 'L2', amount: 400.00, status: 'credited', time: '2026-05-29 08:30:11', recipientNickname: '赛博信徒 (Sky)', triggerMemberUid: '891044', triggerMemberLevel: '2代 (L2)', triggerRechargeAmount: 4000.00 },
    { id: 'COP-91285', orderId: 'ORD-2026052902', uid: '889425', level: 'L1', amount: 2000.00, status: 'pending', time: '2026-05-29 09:20:00', recipientNickname: '星空行者 (Amanda)', triggerMemberUid: '891050', triggerMemberLevel: '1代 (L1)', triggerRechargeAmount: 20000.00 },
    { id: 'COP-91286', orderId: 'ORD-2026052809', uid: '892019', level: 'L2', amount: 1200.00, status: 'credited', time: '2026-05-28 14:15:30', recipientNickname: '极光猎人 (Ray)', triggerMemberUid: '895001', triggerMemberLevel: '2代 (L2)', triggerRechargeAmount: 12000.00 },
    { id: 'COP-91287', orderId: 'ORD-2026052809', uid: '891044', level: 'L3', amount: 1200.00, status: 'pool_insufficient', time: '2026-05-28 14:15:30', recipientNickname: '数字游民 (Dan)', errorMessage: '对应代理人的 [佣金额度池] 余额不足（当前池剩余 380.00 USDT，拟派发 1200.00 USDT），已触发防止超额提取限额保护，处于冻结阻塞状态！', triggerMemberUid: '895001', triggerMemberLevel: '3代 (L3)', triggerRechargeAmount: 12000.00 },
    { id: 'COP-91288', orderId: 'ORD-2026052712', uid: '889421', level: 'L1', amount: 350.00, status: 'failed', time: '2026-05-27 16:45:00', recipientNickname: '飞跃极客 (Jack)', errorMessage: '结算期主网RPC心跳超时，USDT资产发放广播事务回滚 (TxRollbackException)', triggerMemberUid: '889552', triggerMemberLevel: '1代 (L1)', triggerRechargeAmount: 3500.00 }
  ]);

  const [overflowLogs, setOverflowLogs] = useState<any[]>([
    { id: 'OVF-001', memberUid: '891044', orderId: 'ORD-2026052809', tierLevel: 'L3', missingAmount: 820.00, time: '2026-05-28 14:15:30' },
    { id: 'OVF-002', memberUid: '889425', orderId: 'ORD-2026052812', tierLevel: 'L1', missingAmount: 140.00, time: '2026-05-28 16:22:10' },
    { id: 'OVF-003', memberUid: '890112', orderId: 'ORD-2026052815', tierLevel: 'L2', missingAmount: 310.00, time: '2026-05-28 19:40:05' },
    { id: 'OVF-004', memberUid: '892019', orderId: 'ORD-2026052901', tierLevel: 'L2', missingAmount: 450.00, time: '2026-05-29 08:30:11' },
    { id: 'OVF-005', memberUid: '889421', orderId: 'ORD-2026052903', tierLevel: 'L1', missingAmount: 220.00, time: '2026-05-29 10:15:44' },
    { id: 'OVF-006', memberUid: '891044', orderId: 'ORD-2026052906', tierLevel: 'L3', missingAmount: 600.00, time: '2026-05-29 13:02:19' },
    { id: 'OVF-007', memberUid: '890112', orderId: 'ORD-2026052909', tierLevel: 'L2', missingAmount: 180.00, time: '2026-05-29 15:48:30' },
    { id: 'OVF-008', memberUid: '889425', orderId: 'ORD-2026052912', tierLevel: 'L1', missingAmount: 85.00,  time: '2026-05-29 18:20:00' },
    { id: 'OVF-009', memberUid: '892019', orderId: 'ORD-2026052918', tierLevel: 'L2', missingAmount: 500.00, time: '2026-05-29 21:55:12' },
    { id: 'OVF-010', memberUid: '891044', orderId: 'ORD-2026053001', tierLevel: 'L3', missingAmount: 750.00, time: '2026-05-30 01:10:05' },
    { id: 'OVF-011', memberUid: '889421', orderId: 'ORD-2026053004', tierLevel: 'L1', missingAmount: 190.00, time: '2026-05-30 05:30:00' },
    { id: 'OVF-012', memberUid: '890112', orderId: 'ORD-2026053008', tierLevel: 'L2', missingAmount: 420.00, time: '2026-05-30 09:12:44' },
    { id: 'OVF-013', memberUid: '889425', orderId: 'ORD-2026053011', tierLevel: 'L1', missingAmount: 280.00, time: '2026-05-30 11:45:18' },
    { id: 'OVF-014', memberUid: '892019', orderId: 'ORD-2026053015', tierLevel: 'L2', missingAmount: 620.00, time: '2026-05-30 14:02:30' },
    { id: 'OVF-015', memberUid: '891044', orderId: 'ORD-2026053019', tierLevel: 'L3', missingAmount: 900.00, time: '2026-05-30 17:35:10' },
    { id: 'OVF-016', memberUid: '889421', orderId: 'ORD-2026053102', tierLevel: 'L1', missingAmount: 340.00, time: '2026-05-31 03:22:55' },
    { id: 'OVF-017', memberUid: '890112', orderId: 'ORD-2026053105', tierLevel: 'L2', missingAmount: 110.00, time: '2026-05-31 07:14:02' },
    { id: 'OVF-018', memberUid: '889425', orderId: 'ORD-2026053109', tierLevel: 'L1', missingAmount: 490.00, time: '2026-05-31 10:45:00' },
    { id: 'OVF-019', memberUid: '892019', orderId: 'ORD-2026053114', tierLevel: 'L2', missingAmount: 710.00, time: '2026-05-31 13:58:11' },
    { id: 'OVF-020', memberUid: '891044', orderId: 'ORD-2026053118', tierLevel: 'L3', missingAmount: 1050.00, time: '2026-05-31 16:30:44' },
    { id: 'OVF-021', memberUid: '889421', orderId: 'ORD-2026060101', tierLevel: 'L1', missingAmount: 230.00, time: '2026-06-01 02:11:05' },
    { id: 'OVF-022', memberUid: '890112', orderId: 'ORD-2026060105', tierLevel: 'L2', missingAmount: 380.00, time: '2026-06-01 06:45:30' }
  ]);

  const [selectedCommission, setSelectedCommission] = useState<CommissionPayout | null>(null);

  // Tab and search filters for the main commission table
  const [activeTab, setActiveTab] = useState<'all' | 'credited' | 'blocked' | 'intercepted'>('all');
  const [commissionSearch, setCommissionSearch] = useState<string>('');

  // Manual Intervention to resolve errors / force payout bypass
  const handleForcePayout = (payoutId: string) => {
    setCommissions(prev => prev.map(c => {
      if (c.id === payoutId) {
        return { ...c, status: 'credited', errorMessage: undefined };
      }
      return c;
    }));
    // Remove from overflow tracker if active
    const targetComp = commissions.find(c => c.id === payoutId);
    if (targetComp) {
      setOverflowLogs(prev => prev.filter(l => !(l.memberUid === targetComp.uid && l.orderId === targetComp.orderId)));
    }
    alert(`【系统异常人工处理成功】\n已强制 bypass 对应上线代理的佣金限额池拦截，强写该条收益划账业务！\n\n已划归金额: ${targetComp?.amount} USDT\n交割渠道已成功变更为「平台内置账户钱包余额」并增加存池！`);
    setSelectedCommission(null);
  };

  // Adjusting commission parameters / retry under pool limit bypass
  const handleAdjustCommissionAmount = (payoutId: string, secureNewAmount: number) => {
    setCommissions(prev => prev.map(c => {
      if (c.id === payoutId) {
        return { ...c, amount: secureNewAmount, status: 'credited', errorMessage: undefined };
      }
      return c;
    }));
    alert(`【人工参数修正对算成功】\n已成功将佣金实发金额修正降低为 ${secureNewAmount} USDT (刚好不突破该代理人的额度限制)。状态已自动恢复为“已入账划账”。`);
    setSelectedCommission(null);
  };

  const totalCreditedAmount = commissions
    .filter(c => c.status === 'credited')
    .reduce((sum, item) => sum + item.amount, 0) + 2400; // Anchored with initial system offsets
  const abnormalAuditCount = commissions.filter(c => c.status === 'pool_insufficient' || c.status === 'failed').length;
  const totalOverflowAmount = overflowLogs.reduce((sum, item) => sum + item.missingAmount, 0);

  // Unify standard commissions and overflow intercepted logs
  const mappedOverflows: CommissionPayout[] = overflowLogs.map(l => ({
    id: l.id,
    orderId: l.orderId,
    uid: l.memberUid,
    level: l.tierLevel,
    amount: l.missingAmount,
    status: 'intercepted',
    time: l.time,
    recipientNickname: '联盟拦截归集 (Recycled)',
    errorMessage: '因该线上级代理人代付限额大池额度已满，未予下拨支付的溢散金额已被系统自动拦截、解缴并回笼结转入公共 Reserve 准备金库。',
    triggerMemberUid: '891099',
    triggerMemberLevel: l.tierLevel,
    triggerRechargeAmount: l.missingAmount * 10
  }));

  const allCombinedItems = [...commissions, ...mappedOverflows].sort((a, b) => b.time.localeCompare(a.time));

  const filteredCommissions = allCombinedItems.filter(p => {
    const matchesSearch = commissionSearch ? (
      p.id.toLowerCase().includes(commissionSearch.toLowerCase()) ||
      p.orderId.toLowerCase().includes(commissionSearch.toLowerCase()) ||
      p.uid.includes(commissionSearch) ||
      p.recipientNickname.toLowerCase().includes(commissionSearch.toLowerCase())
    ) : true;

    if (!matchesSearch) return false;

    if (activeTab === 'credited') {
      return p.status === 'credited';
    }
    if (activeTab === 'blocked') {
      return p.status === 'pool_insufficient' || p.status === 'failed' || p.status === 'pending';
    }
    if (activeTab === 'intercepted') {
      return p.status === 'intercepted';
    }
    return true; // 'all'
  });

  return (
    <div id="admin_commissions_view" className="space-y-4 animate-fadeIn select-none flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-3">
      
      {/* Horizontal Dashboard Summary Card Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-sans">
        <div className="bg-[#1c1824] p-4.5 rounded-2xl border border-white/5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-[#cbc4d2]/40 block uppercase tracking-wider">当前系统五代总返本佣金拨出</span>
            <span className="text-xl font-extrabold text-[#cfbcff] font-mono">
              {totalCreditedAmount.toLocaleString(undefined, {minimumFractionDigits: 2})} USDT
            </span>
          </div>
          <Coins className="w-8 h-8 text-[#cfbcff]/20 shrink-0" />
        </div>
        <div className="bg-[#1c1824] p-4.5 rounded-2xl border border-white/5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-[#cbc4d2]/40 block uppercase tracking-wider">系统自动阻断异常对账</span>
            <span className="text-xl font-extrabold text-amber-400 font-mono">{abnormalAuditCount} 宗挂起审计</span>
          </div>
          <AlertCircle className="w-8 h-8 text-amber-400/20 shrink-0" />
        </div>
        <div className="bg-[#1c1824] p-4.5 rounded-2xl border border-white/5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-[#cbc4d2]/40 block uppercase tracking-wider">池满自动回笼总库溢出资金</span>
            <span className="text-xl font-extrabold text-red-400 font-mono">
              {totalOverflowAmount.toLocaleString(undefined, {minimumFractionDigits: 2})} USDT
            </span>
          </div>
          <ShieldAlert className="w-8 h-8 text-red-400/20 shrink-0" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">
        
        {/* Left col - List view of all commissions (col-12) */}
        <div className="lg:col-span-12 glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-sm md:text-base font-black text-white tracking-tight flex items-center gap-2">
                <Coins className="w-4 h-4 text-[#cfbcff]" />
                <span>佣金列表</span>
              </h3>
              <p className="text-[11px] text-[#cbc4d2]/50 mt-0.5 leading-tight">
                浏览与检索会员五代分销分成明细，包括正常应答与受阻拦截回笼公积对账条目。
              </p>
            </div>
          </div>

          {/* Search bar & Tabs row */}
          <div className="space-y-3 pt-1">
            <div className="relative">
              <input
                type="text"
                placeholder="检索返佣号/订单号/会员UID/代理人昵称..."
                value={commissionSearch}
                onChange={(e) => setCommissionSearch(e.target.value)}
                className="w-full bg-[#1c1824] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#cfbcff]/50 transition-all font-sans"
              />
              {commissionSearch && (
                <button
                  type="button"
                  onClick={() => setCommissionSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#cbc4d2]/40 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 select-none border-b border-white/5 pb-2">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wide transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#cfbcff] text-[#24134c]'
                    : 'bg-white/5 text-[#cbc4d2]/70 hover:bg-white/10'
                }`}
              >
                全部明细
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('credited')}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wide transition-all cursor-pointer ${
                  activeTab === 'credited'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-white/5 text-[#cbc4d2]/70 hover:bg-white/10'
                }`}
              >
                已入池划账
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('blocked')}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wide transition-all cursor-pointer ${
                  activeTab === 'blocked'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-white/5 text-[#cbc4d2]/70 hover:bg-white/10'
                }`}
              >
                额度池阻塞
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('intercepted')}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wide transition-all cursor-pointer ${
                  activeTab === 'intercepted'
                    ? 'bg-red-500/30 text-red-300 border border-red-500/40 animate-pulse'
                    : 'bg-white/5 text-[#cbc4d2]/70 hover:bg-white/10'
                }`}
              >
                受阻拦截回笼
              </button>
            </div>
          </div>

          {filteredCommissions.length === 0 ? (
            <div className="text-center py-12 bg-white/[0.01]/10 border border-white/5 rounded-2xl space-y-2 text-xs text-[#cbc4d2]/40 font-sans">
              <p>暂无符合当前过滤条件的佣金对账记录</p>
              <span className="text-[10px]">您可以试试清空关键词或点击其他分类选项</span>
            </div>
          ) : (
            <>
              {/* Mobile representation */}
              <div className="block md:hidden space-y-3">
                {filteredCommissions.map(p => (
                  <div key={p.id} className="bg-[#1d1925]/40 border border-white/5 p-4 rounded-2xl space-y-3 font-sans">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-extrabold text-xs text-white font-mono">{p.id}</span>
                        <p className="text-[9px] text-[#cbc4d2]/30 font-mono mt-0.5">源: {p.orderId}</p>
                      </div>
                      <span className="text-[10px] font-black text-[#cfbcff] bg-[#cfbcff]/10 px-2 py-0.5 rounded">
                        {p.level}代
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] border-t border-b border-white/5 py-2 font-mono">
                      <div>
                        <span className="text-[#cbc4d2]/40 text-[9px] block font-sans">代理人 UID</span>
                        <p className="text-[#cbc4d2] font-semibold">{p.uid}</p>
                        <p className="text-[9px] text-[#cbc4d2]/40 font-sans truncate">{p.recipientNickname}</p>
                      </div>
                      <div>
                        <span className="text-[#cbc4d2]/40 text-[9px] block font-sans">{p.status === 'intercepted' ? '拦截回笼额度' : '核算本轮佣金'}</span>
                        <p className={`${p.status === 'intercepted' ? 'text-red-400' : 'text-emerald-400'} font-extrabold text-xs mt-0.5`}>USDT {p.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[11px] gap-2">
                      <div>
                        <span className="text-[#cbc4d2]/40 text-[9px] block font-sans">到账派发状态</span>
                        <div className="mt-1">
                          {p.status === 'credited' ? (
                            <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 whitespace-nowrap">已入池划账</span>
                          ) : p.status === 'pending' ? (
                            <span className="text-[9px] font-black text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 animate-pulse whitespace-nowrap">待日终划账</span>
                          ) : p.status === 'pool_insufficient' ? (
                            <span className="text-[9px] font-black text-amber-500 bg-amber-500/15 px-1.5 py-0.5 rounded border border-amber-400/30 whitespace-nowrap">额度池枯竭</span>
                          ) : p.status === 'intercepted' ? (
                            <span className="text-[9px] font-black text-red-500/60 bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20 whitespace-nowrap">⛔ 拦截回笼</span>
                          ) : (
                            <span className="text-[9px] font-black text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20 whitespace-nowrap">❌ 广播失败</span>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedCommission(p)}
                        className="bg-white/5 hover:bg-[#cfbcff]/10 text-white hover:text-[#cfbcff] px-2.5 py-1.5 rounded-xl text-[10px] font-bold active:scale-95 transition-all cursor-pointer flex items-center gap-1 shrink-0"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>查看</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop representation */}
              <div className="hidden md:block overflow-x-auto border border-white/5 bg-[#1d1925]/20 rounded-2xl p-1">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/5 text-[#cbc4d2]/50 font-black tracking-wide bg-white/[0.01]">
                      <th className="py-3 px-4">返佣号/关联号</th>
                      <th className="py-3 px-4 text-center">级别</th>
                      <th className="py-3 px-4">代理人 / UID</th>
                      <th className="py-3 px-4 font-mono">分配数值 (USDT)</th>
                      <th className="py-3 px-4">到账核算状态</th>
                      <th className="py-3 px-4 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono">
                    {filteredCommissions.map(p => (
                      <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-white">
                          <div className="flex flex-col">
                            <span>{p.id}</span>
                            <span className="text-[9px] text-[#cbc4d2]/30 font-normal">源: {p.orderId}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="text-[10px] font-black text-[#cfbcff] bg-[#cfbcff]/10 px-2 py-0.5 rounded">
                            {p.level}代
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="text-[#cbc4d2] font-semibold">{p.uid}</p>
                          <p className="text-[9px] text-[#cbc4d2]/40 font-sans truncate max-w-[130px]">{p.recipientNickname}</p>
                        </td>
                        <td className={`py-3.5 px-4 font-extrabold text-xs ${p.status === 'intercepted' ? 'text-red-400' : 'text-emerald-400'}`}>
                          USDT {p.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </td>
                        <td className="py-3.5 px-4">
                          {p.status === 'credited' ? (
                            <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">已入池划账</span>
                          ) : p.status === 'pending' ? (
                            <span className="text-[9px] font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 animate-pulse">待日终划账</span>
                          ) : p.status === 'pool_insufficient' ? (
                            <span className="text-[9px] font-black text-amber-500 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-400/30">⚠ 额度不足阻塞</span>
                          ) : p.status === 'intercepted' ? (
                            <span className="text-[9px] font-black text-red-400 bg-red-500/15 px-2 py-0.5 rounded border border-red-500/30">⛔ 拦截回笼存池</span>
                          ) : (
                            <span className="text-[9px] font-black text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">❌ 广播回滚失败</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button; submit"
                            onClick={() => setSelectedCommission(p)}
                            className="bg-white/5 hover:bg-[#cfbcff]/10 select-none text-white hover:text-[#cfbcff] px-2.5 py-1 rounded-lg text-[11px] font-bold font-sans active:scale-95 transition-all outline-none inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3 h-3" />
                            <span>查看</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

      </div>

      {/* Structured Commission Details Overlay Drawer */}
      {selectedCommission && (
        <div id="commission_detail_overlay" className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn p-4 overflow-y-auto">
          <div className="bg-[#181421] border border-white/10 rounded-3xl max-w-lg w-full p-5 md:p-7 relative shadow-2xl shadow-black animate-slideUp flex flex-col max-h-[90vh]">
            
            {/* Header X button */}
            <button
              type="button"
              onClick={() => setSelectedCommission(null)}
              className="absolute right-4 top-4 text-[#cbc4d2]/60 hover:text-white transition-colors cursor-pointer outline-none z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 pb-3 border-b border-white/5 shrink-0 pr-8">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#cfbcff]" />
                <span>分销佣金精算派发审计日志详情</span>
              </h4>
              <p className="text-[10px] text-[#cbc4d2]/45 font-mono">TRANSACTION ID: {selectedCommission.id}</p>
            </div>

            {/* Scrollable Container with max height limitation */}
            <div className="overflow-y-auto py-4 pr-1 flex-grow space-y-5 scrollbar-thin scrollbar-thumb-white/10 text-left">
              {/* Core facts in tidy code format */}
              <div className="space-y-3 bg-[#110e16] p-4 rounded-xl border border-white/5 font-mono text-xs text-[#cbc4d2]">
                <div className="flex justify-between">
                  <span className="text-[#cbc4d2]/40 font-bold font-sans">拟发放代理/UID：</span>
                  <span className="text-white font-extrabold">{selectedCommission.uid} ({selectedCommission.recipientNickname})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#cbc4d2]/40 font-bold font-sans">分销推荐代数层级：</span>
                  <span className="text-[#cfbcff] font-bold font-sans">{selectedCommission.level} (直属级下线裂变推广)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#cbc4d2]/40 font-bold font-sans">认购代收关联源订单：</span>
                  <span className="text-white">{selectedCommission.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#cbc4d2]/40 font-bold font-sans">预估分拨金额：</span>
                  <span className="text-emerald-400 font-extrabold text-sm">USDT {selectedCommission.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#cbc4d2]/40 font-bold font-sans">交割目标接收账户：</span>
                  <span className="text-emerald-400 font-bold text-[11px]">平台用户内置钱包余额</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#cbc4d2]/40 font-bold font-sans">交易计入时间点：</span>
                  <span>{selectedCommission.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#cbc4d2]/40 font-bold font-sans">精算派发终审状态：</span>
                  <span className={selectedCommission.status === 'credited' ? 'text-emerald-400' : selectedCommission.status === 'intercepted' ? 'text-red-400 font-bold' : 'text-amber-500 animate-pulse'}>
                    {selectedCommission.status === 'credited' ? '✔ 审核已通过到账' : selectedCommission.status === 'pending' ? '⏳ 待结算轮询' : selectedCommission.status === 'intercepted' ? '⛔ 拦截回笼入库 (Recycled)' : '❌ 挂账阻塞/发生账目赤字'}
                  </span>
                </div>
              </div>

              {/* Tracking commission origin source detail info */}
              <div className="p-4 bg-[#1e1329]/55 border border-[#cfbcff]/15 rounded-2xl text-xs space-y-2.5">
                <p className="font-extrabold flex items-center gap-1.5 uppercase font-sans text-[#cfbcff]">
                  <Coins className="w-4 h-4 shrink-0 text-[#cfbcff]" />
                  <span>分润提供源头追踪 (Origin Commission Flow)</span>
                </p>
                <div className="space-y-1.5 font-sans leading-relaxed text-[#cbc4d2]/90">
                  <p>
                    本笔分销收益由您的团队第 <span className="text-[#cfbcff] font-extrabold font-mono text-sm">{selectedCommission.triggerMemberLevel || `${selectedCommission.level}`}</span> 代代理成员 
                    <span className="text-white font-mono font-bold bg-[#110e16] px-1.5 py-0.5 rounded ml-1 text-xs select-all">
                      UID: {selectedCommission.triggerMemberUid || (selectedCommission.status === 'intercepted' ? '891099' : '895002')}
                    </span> 执行充值操作所触发提供。
                  </p>
                  <div className="flex justify-between items-center bg-black/25 px-3 py-2 rounded-xl mt-1 text-[11px] font-mono">
                    <span className="text-[#cbc4d2]/45">对应伞下实际充值数额:</span>
                    <span className="text-emerald-400 font-extrabold">USDT {(selectedCommission.triggerRechargeAmount || (selectedCommission.amount * 10)).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                  </div>
                </div>
              </div>

              {/* Exception trace display */}
              {selectedCommission.errorMessage && (
                selectedCommission.status === 'intercepted' ? (
                  <div className="p-4 bg-indigo-950/40 border border-[#cfbcff]/20 rounded-2xl text-xs text-[#cbc4d2] space-y-2">
                    <p className="font-extrabold flex items-center gap-1.5 uppercase font-sans text-[#cfbcff]">
                      <CheckCircle className="w-4 h-4 shrink-0 text-[#cfbcff]" />
                      <span>资金溢出拦截回笼对账报告 (System Recycle Log)</span>
                    </p>
                    <p className="leading-relaxed opacity-90 text-[11px] font-mono text-left">{selectedCommission.errorMessage}</p>
                    <p className="text-[10px] text-white/30 italic font-sans leading-normal">
                      * 本笔分销溢价收益已由系统智能合约机制自动执行拦截并结转归集至平台准备金账户中，实现完璧入库。
                    </p>
                  </div>
                ) : (
                  <div className="p-4 bg-red-950/40 border border-red-500/20 rounded-2xl text-xs text-red-200 space-y-2">
                    <p className="font-extrabold flex items-center gap-1.5 uppercase font-sans text-red-400">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>系统对账异常检测报告 (Critical Alert)</span>
                    </p>
                    <p className="leading-relaxed opacity-90 text-[11px] font-mono text-left">{selectedCommission.errorMessage}</p>
                    <p className="text-[10px] text-white/30 italic font-sans leading-normal">
                      * 针对该挂账状态，除非人工强写跳过额度限额限制，否则此款项将始终处于待付阻塞队列中，不可入账。
                    </p>
                  </div>
                )
              )}

              {/* Manual actions area */}
              {selectedCommission.status === 'intercepted' ? (
                <div className="p-4 bg-[#1a1523]/60 border border-white/5 rounded-2xl space-y-2">
                  <span className="text-[10px] text-[#cbc4d2]/40 uppercase font-black tracking-wider block">回笼机制干预处理</span>
                  <p className="text-xs text-[#cbc4d2]/80 leading-normal text-left">
                    该交易为<strong>系统机制自动回笼归集</strong>，属于出入账合规闭环链条的一部分，因此不需要并且无法进行人工微调、二次强划或纠偏 bypass 操作。
                  </p>
                </div>
              ) : (
                <div className="space-y-3.5 pt-2 border-t border-white/5">
                  <span className="text-[10px] text-[#cbc4d2]/40 uppercase font-black tracking-wider block">异常处理与手动纠偏差操工作流 (Exception Intervention Workflow)</span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                    
                    {/* Action 1: Force credit override pool */}
                    <button
                      type="button"
                      onClick={() => handleForcePayout(selectedCommission.id)}
                      className="bg-gradient-to-r from-[#6750a4] to-[#cfbcff] hover:brightness-110 active:scale-95 text-white p-3 rounded-xl font-bold cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>手动强行发放 (Bypass Pool)</span>
                    </button>

                    {/* Action 2: Adjust amount to pool limit */}
                    <button
                      type="button"
                      onClick={() => {
                        const adjustPrompt = prompt(`修正用户 UID: ${selectedCommission.uid} 的实际该单派发佣金额度。(上限请限制在额度容量内，例如输入金额 380U)`, '380');
                        if (adjustPrompt) {
                          const num = parseFloat(adjustPrompt);
                          if (isNaN(num) || num <= 0) return alert('请输入有效数值');
                          handleAdjustCommissionAmount(selectedCommission.id, num);
                        }
                      }}
                      className="bg-white/5 hover:bg-white/10 text-[#cbc4d2] p-3 rounded-xl font-bold border border-white/10 cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-[#cfbcff]" />
                      <span>手动微调额度后重试</span>
                    </button>

                  </div>
                  
                  <p className="text-[10px] text-[#cbc4d2]/30 text-center leading-normal">
                    * 操作警告：手动发放和微调会直接改写中心流动性账簿。任何人工干预都将记录进管理员财务审计日志链中供后续溯源。
                  </p>
                </div>
              )}
            </div>

            {/* Modal Bottom Footer close */}
            <div className="pt-3 border-t border-white/5 flex justify-end text-xs shrink-0">
              <button
                type="button"
                onClick={() => setSelectedCommission(null)}
                className="bg-white/5 hover:bg-white/10 text-white px-5 py-2 rounded-xl font-semibold transition-all cursor-pointer"
              >
                关闭详情
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

