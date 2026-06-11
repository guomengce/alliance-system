import React, { useState } from 'react';
import { RefreshCw, Bell, AlertTriangle, Eye, CheckCircle2, X, Send, Sparkles, AlertCircle, Coins } from 'lucide-react';

interface SettlementItem {
  id: string;
  memberUid: string;
  nickname: string;
  date: string;
  expectedCommissions: number;      // 预核算应派发佣金
  remainingPoolCapacity: number;     // 归属会员仍有佣金额度额
  actualSettledAmount: number;       // 实际抵扣并发放出的数额
  spilloverClipped: number;          // 自动溢出截流拦截数 (扣入Reserve大总仓)
  status: 'fully_settled' | 'clipped' | 'stalled_exception' | 'low_capacity_notified';
  contactEmail: string;
}

interface SettleLog {
  id: string;
  date: string;
  ordersCount: number;
  totalCommissions: number;
  status: 'completed' | 'pending' | 'failed';
}

interface AdminSettlementViewProps {
  onUpdateBalances: (usdtDiff: number, trooDiff: number) => void;
}

export default function AdminSettlementView({ onUpdateBalances }: AdminSettlementViewProps) {
  const [settlementLogs, setSettlementLogs] = useState<SettleLog[]>([
    { id: 'STL-9001', date: '2026-05-28', ordersCount: 12, totalCommissions: 48900.00, status: 'completed' },
    { id: 'STL-9002', date: '2026-05-27', ordersCount: 8, totalCommissions: 19500.00, status: 'completed' },
    { id: 'STL-9003', date: '2026-05-26', ordersCount: 15, totalCommissions: 55000.00, status: 'completed' }
  ]);

  const [settlementTransactions, setSettlementTransactions] = useState<SettlementItem[]>([
    { id: 'SREC-101', memberUid: '889425', nickname: '星空行者 (Amanda)', date: '2026-05-29', expectedCommissions: 2500, remainingPoolCapacity: 25000, actualSettledAmount: 2500, spilloverClipped: 0, status: 'fully_settled', contactEmail: 'amanda.stars@gmail.com' },
    { id: 'SREC-102', memberUid: '890112', nickname: '赛博信徒 (Sky)', date: '2026-05-29', expectedCommissions: 1200, remainingPoolCapacity: 380, actualSettledAmount: 380, spilloverClipped: 820, status: 'clipped', contactEmail: 'sky.cybers@yahoo.com' },
    { id: 'SREC-103', memberUid: '891044', nickname: '数字游民 (Dan)', date: '2026-05-29', expectedCommissions: 950, remainingPoolCapacity: 120, actualSettledAmount: 120, spilloverClipped: 830, status: 'clipped', contactEmail: 'dan_nomad99@gate.io' },
    { id: 'SREC-104', memberUid: '892019', nickname: '极光猎人 (Ray)', date: '2026-05-29', expectedCommissions: 800, remainingPoolCapacity: -50, actualSettledAmount: 0, spilloverClipped: 800, status: 'stalled_exception', contactEmail: 'ray.aurora@protonmail.com' }
  ]);

  const [manualSettleLoading, setManualSettleLoading] = useState<boolean>(false);
  const [selectedTx, setSelectedTx] = useState<SettlementItem | null>(null);

  // D+1 manual retry / override stalled nodes
  const handleResolveException = (txId: string) => {
    setSettlementTransactions(prev => prev.map(tx => {
      if (tx.id === txId) {
        return {
          ...tx,
          remainingPoolCapacity: 10000, // Refill capacity virtually
          actualSettledAmount: tx.expectedCommissions,
          spilloverClipped: 0,
          status: 'fully_settled'
        };
      }
      return tx;
    }));
    alert(`【结算异常数据修复成功】\n已成功人工重刷结算节点 SREC-104：\n强制校正该上线代理额度上限并补足其佣金！应发拨付 ${800} USDT 已全部交割入其可用资产。`);
    setSelectedTx(null);
  };

  // Push Urgent UI Alert notifying account they are running dry on commission capacity limits
  const handleNotifyInsufficientCapacity = (tx: SettlementItem) => {
    setSettlementTransactions(prev => prev.map(item => {
      if (item.id === tx.id) {
        return { ...item, status: 'low_capacity_notified' };
      }
      return item;
    }));
    
    // Simulate real alert push
    alert(`【🔔 全系统警告邮件与推送已广播】\n\n发送目标: UID "${tx.memberUid}" (${tx.nickname})\n绑定邮箱: ${tx.contactEmail}\n通知标题: "【警报】佣金额度极度匮乏提示"\n消息详情: "您好，系统检测到您所得下代会员佣金已产生触发溢漏！您的可用佣金额度仅剩 ${tx.remainingPoolCapacity} USDT，该等级下线将无法再为您增加推荐收益。请即刻通过在会员面板买入新理财套餐 A-E 等级包以倍数释放扩展解锁您的累积提现额度。"`);
    setSelectedTx(null);
  };

  // Run Manual D+1 Settlement Rollup
  const triggerManualSettlement = () => {
    setManualSettleLoading(true);
    setTimeout(() => {
      const newLog: SettleLog = {
        id: `STL-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString().split('T')[0],
        ordersCount: 4,
        totalCommissions: 8400.00,
        status: 'completed'
      };
      
      setSettlementLogs(prev => [newLog, ...prev]);
      onUpdateBalances(1500, 0); 
      alert('手动触发 D+1 04:00 全同盟多节点自动结算成功！历史累计总库已同步审计完毕。');
      setManualSettleLoading(false);
    }, 1200);
  };

  return (
    <div id="admin_settlement_view" className="space-y-6 animate-fadeIn select-none flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-4">
      <div className="glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-6 flex-grow flex flex-col">
      
        {/* Upper header action area */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
          <div>
            <h3 className="text-sm md:text-base font-black text-white tracking-tight flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[#cfbcff]" />
              <span>结算列表</span>
            </h3>
            <p className="text-[11px] text-[#cbc4d2]/50 mt-0.5 leading-tight">
              浏览与检索所有会员 D+1 结算日志、扣税明细、手动触发全盟自动结算扣缴及超额回笼对账。
            </p>
          </div>
          <button
            type="button"
            disabled={manualSettleLoading}
            onClick={triggerManualSettlement}
            className="bg-gradient-to-r from-[#6750a4] to-[#cfbcff] text-white px-4 py-2.5 rounded-xl text-xs font-bold active:scale-95 disabled:opacity-50 transition-all cursor-pointer flex items-center gap-1.5 shadow-lg shadow-[#6750a4]/15"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${manualSettleLoading ? 'animate-spin' : ''}`} />
            <span>{manualSettleLoading ? '正在核算中...' : '启动全盟结算对账'}</span>
          </button>
        </div>

        {/* Top-aligned Explanation Window (moved from right side to top of list module) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-[#17131e]/50 p-5 rounded-2xl border border-white/5 text-left animate-fadeIn">
          <div className="md:col-span-8 space-y-3">
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#cfbcff] font-sans border-b border-white/5 pb-2">
              D+1 轧账时序规则及防透干预 (Workflow Guide)
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="relative pl-4 border-l border-white/10 space-y-1">
                <p className="font-extrabold text-white">1. D+1 日常轮巡对账</p>
                <p className="text-[#cbc4d2]/60 text-[10px] leading-relaxed">
                  以 24 点日切、次日 04:00 点起息派发。将前日“待核算佣金”扣除溢流部分拨入可用余额钱包。
                </p>
              </div>

              <div className="relative pl-4 border-l border-white/10 space-y-1">
                <p className="font-extrabold text-[#e7c365]">2. 额度匮乏拦截 (溢漏)</p>
                <p className="text-[#cbc4d2]/60 text-[10px] leading-relaxed">
                  当预期派发额高于“仍可用额度”时，超额部分自动强行归集罚没至平台 Reserve 库中。
                </p>
              </div>

              <div className="relative pl-4 border-l border-white/10 space-y-1">
                <p className="font-extrabold text-emerald-400">3. 手动风控干预</p>
                <p className="text-[#cbc4d2]/60 text-[10px] leading-relaxed">
                  支持管理层一键人工补发拨付、下发枯竭邮件并调整多节点异常挂账。
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 bg-[#110e16]/60 p-4.5 border border-white/5 rounded-xl flex flex-col justify-between space-y-2">
            <div className="space-y-1.5">
              <p className="text-[10px] font-black uppercase text-[#cbc4d2]/40 tracking-wider">大盘结算实时审计 (AUDIT)</p>
              <div className="flex justify-between items-center text-[11px] text-[#cbc4d2]/70 font-mono leading-none">
                <span>涉及预拨总佣金:</span>
                <span className="font-black text-white">6,050 U</span>
              </div>
              <div className="flex justify-between items-center text-[11px] text-[#cbc4d2]/70 font-mono leading-none">
                <span>因池不足总拦截:</span>
                <span className="font-extrabold text-red-400">1,650 U</span>
              </div>
            </div>
            <p className="text-[9px] text-[#cbc4d2]/35 italic leading-tight">
              * 链上清结算风控提示：系统每日根据当前联盟充值释放倍率精确对算，手工轧账更正会存入机密审计。
            </p>
          </div>
        </div>

        {/* List module covering full width */}
        <div className="text-left space-y-4 flex-grow">
          <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#cfbcff]">当日各加盟会员具体结算与扣税账簿 (Settlement Logs)</h4>

          {/* Mobile card list */}
          <div className="block md:hidden space-y-3">
            {settlementTransactions.map(tx => (
              <div key={tx.id} className="bg-[#1d1925]/40 border border-white/5 p-4 rounded-2xl space-y-3 font-sans">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white text-xs font-bold leading-none">{tx.memberUid}</p>
                    <p className="text-[10px] text-[#cbc4d2]/40 font-normal mt-0.5">{tx.nickname}</p>
                  </div>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded ${tx.status === 'fully_settled' ? 'bg-emerald-500/10 text-emerald-400' : tx.status === 'clipped' ? 'bg-red-500/10 text-red-400' : tx.status === 'stalled_exception' ? 'bg-red-950 text-amber-500 animate-pulse border border-red-500/25' : 'bg-[#cfbcff]/10 text-[#cfbcff]'}`}>
                    {tx.status === 'fully_settled' ? '全额派发' : tx.status === 'clipped' ? '超额扣税' : tx.status === 'stalled_exception' ? '待干预' : '已推警告'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] border-t border-b border-white/5 py-2 font-mono">
                  <div>
                    <span className="text-[#cbc4d2]/40 text-[9px] block font-sans">预拨虚增应得</span>
                    <p className="text-white font-semibold mt-0.5">USDT {tx.expectedCommissions.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-[#cbc4d2]/40 text-[9px] block font-sans">可用佣金池限额</span>
                    <p className={`font-semibold mt-0.5 ${tx.remainingPoolCapacity < 1000 ? 'text-amber-400 font-extrabold' : 'text-[#cbc4d2]/85'}`}>{tx.remainingPoolCapacity.toLocaleString()} U</p>
                  </div>
                  <div>
                    <span className="text-[#cbc4d2]/40 text-[9px] block font-sans">实派到账</span>
                    <p className="text-emerald-400 font-bold mt-0.5">USDT {tx.actualSettledAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-red-400/80 text-[10px] block font-sans">溢扣平台准备金</span>
                    <p className="text-red-400 font-bold mt-0.5">USDT {tx.spilloverClipped.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedTx(tx)}
                    className="bg-white/5 hover:bg-[#cfbcff]/10 text-white hover:text-[#cfbcff] px-3 py-1.5 rounded-xl text-[11px] font-bold active:scale-95 transition-all cursor-pointer flex items-center gap-1 shrink-0"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>精算审核校准</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop density table */}
          <div className="hidden md:block overflow-x-auto border border-white/5 bg-[#1d1925]/20 rounded-2xl p-1">
            <table className="w-full text-left text-xs text-[#cbc4d2]/85">
              <thead>
                <tr className="border-b border-white/5 text-[#cbc4d2]/50 font-black bg-white/[0.01]">
                  <th className="py-4 px-4">对账代表 (UID)</th>
                  <th className="py-4 px-4 font-mono">预拨应得 (U)</th>
                  <th className="py-4 px-4 font-mono">当前可用佣额度 (U)</th>
                  <th className="py-4 px-4 font-mono">实到账派发 (U)</th>
                  <th className="py-4 px-4 font-mono text-red-400">溢漏回笼大盘 (U)</th>
                  <th className="py-4 px-4 text-center">状态说明</th>
                  <th className="py-4 px-4 text-center">排调监管</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {settlementTransactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-sans font-bold">
                      <div className="flex flex-col">
                        <span className="text-white text-xs">{tx.memberUid}</span>
                        <span className="text-[10px] text-[#cbc4d2]/40 font-normal">{tx.nickname}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-white">USDT {tx.expectedCommissions.toLocaleString()}</td>
                    <td className="py-3.5 px-4">
                      <span className={tx.remainingPoolCapacity < 1000 ? 'text-amber-400 font-extrabold' : 'text-[#cbc4d2]/85'}>
                        {tx.remainingPoolCapacity.toLocaleString()} U
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-emerald-400 font-extrabold">USDT {tx.actualSettledAmount.toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-red-500 font-extrabold">USDT {tx.spilloverClipped.toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded ${tx.status === 'fully_settled' ? 'bg-emerald-500/10 text-emerald-400' : tx.status === 'clipped' ? 'bg-red-500/10 text-red-400' : tx.status === 'stalled_exception' ? 'bg-red-950 text-amber-500 animate-pulse border border-red-500/25' : 'bg-[#cfbcff]/10 text-[#cfbcff]'}`}>
                        {tx.status === 'fully_settled' ? '全额派发' : tx.status === 'clipped' ? '超额溢流截断' : tx.status === 'stalled_exception' ? '待人工干预' : '已推警告邮件'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => setSelectedTx(tx)}
                        className="mx-auto bg-white/5 hover:bg-[#cfbcff]/10 text-white hover:text-[#cfbcff] px-2.5 py-1 rounded-lg text-[10px] font-bold font-sans active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3 h-3" />
                        <span>校准</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Settlement detail verification popup dialog */}
      {selectedTx && (
        <div id="settle_audit_overlay" className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn p-4 overflow-y-auto">
          <div className="bg-[#181421] border border-white/10 rounded-3xl max-w-lg w-full p-6 md:p-8 relative shadow-2xl shadow-black animate-slideUp space-y-6">
            
            {/* Close */}
            <button
              type="button"
              onClick={() => setSelectedTx(null)}
              className="absolute right-4 top-4 text-[#cbc4d2]/60 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-1 pb-2 border-b border-white/5">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#cfbcff]" />
                <span>加盟商佣金属限结算数据穿透校对簿</span>
              </h4>
              <p className="text-[10px] text-[#cbc4d2]/45 font-mono">STL ACCOUNT TICKET ID: {selectedTx.id}</p>
            </div>

            {/* Core facts */}
            <div className="space-y-3 bg-[#110e16] p-4.5 rounded-2xl border border-white/5 font-mono text-xs text-[#cbc4d2]/80">
              <div className="flex justify-between">
                <span className="text-[#cbc4d2]/50 font-sans">拟派发结算代理/UID：</span>
                <span className="text-white font-bold">{selectedTx.memberUid} ({selectedTx.nickname})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#cbc4d2]/50 font-sans">预提报结算结算期：</span>
                <span>{selectedTx.date}日结 (D+1)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#cbc4d2]/50 font-sans">下代下属累积总返本收益：</span>
                <span className="text-white font-bold font-mono">USDT {selectedTx.expectedCommissions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-white/5">
                <span className="text-[#cbc4d2]/50 font-sans">该账号当前仍可用额度池：</span>
                <span className="text-amber-300 font-extrabold font-mono">{selectedTx.remainingPoolCapacity.toLocaleString()} USDT</span>
              </div>
              <div className="flex justify-between pt-1 text-xs">
                <span className="text-emerald-400 font-sans font-bold">实际核发到账美金：</span>
                <span className="text-emerald-400 font-black font-mono">USDT {selectedTx.actualSettledAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-red-400">
                <span className="font-sans font-bold">超发部分大盘截扣溢漏额：</span>
                <span className="font-black font-mono">USDT {selectedTx.spilloverClipped.toLocaleString()}</span>
              </div>
            </div>

            {/* Low capacity alerts warnings explicitly detailing the instructions */}
            {selectedTx.remainingPoolCapacity < selectedTx.expectedCommissions && (
              <div className="p-4 bg-red-950/40 border border-red-500/20 rounded-2xl text-xs text-red-200/90 space-y-2 text-left">
                <p className="font-bold text-red-400 flex items-center gap-1.5 uppercase">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>额度池严重透支警报 (Capacity Exhausted)</span>
                </p>
                <p className="leading-relaxed text-[11px] font-sans">
                  该上线代理人的 [佣金额度] 仅剩余 <strong>{selectedTx.remainingPoolCapacity} USDT</strong>，因此超出了系统设限制。已触发强行溢出回笼大仓机制共 <strong>{selectedTx.spilloverClipped} USDT</strong> 被直接罚没截留。
                </p>
                <p className="text-[10px] text-white/30 font-sans italic">
                  * 如果该会员已通过其他渠道认购扩展补齐额度，管理员不仅可以发送警告推送，亦可执行“解决并重置异常”将其强行修正发放。
                </p>
              </div>
            )}

            {/* Actions for settlement details: manual intervention and notifications */}
            <div className="pt-2 space-y-3 text-left">
              <span className="text-[10px] text-[#cbc4d2]/40 font-black uppercase tracking-wider block font-sans">平台决策管理命令 (Bypass & Notification Workflow)</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-sans">
                
                {/* Action 1: Notify user of low capacity alert */}
                <button
                  type="button"
                  onClick={() => handleNotifyInsufficientCapacity(selectedTx)}
                  className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 p-3.5 rounded-xl font-bold border border-amber-500/30 cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Bell className="w-4 h-4 text-amber-300 animate-bounce" />
                  <span>🔔 通知会员佣金额池枯竭</span>
                </button>

                {/* Action 2: Exception handling override */}
                <button
                  type="button"
                  onClick={() => handleResolveException(selectedTx.id)}
                  className="bg-gradient-to-r from-[#6750a4] to-[#cfbcff] hover:brightness-110 active:scale-95 text-white p-3.5 rounded-xl font-extrabold cursor-pointer transition-all flex items-center justify-center gap-1 shadow-md shadow-[#cfbcff]/5"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>⚙️ 人工补发并强制轧账</span>
                </button>

              </div>
              
              <p className="text-[10px] text-[#cbc4d2]/30 text-center leading-normal font-sans">
                * 精算操作备查：发出“佣额度不足拦截警告”会自动下向用户发送系统弹窗通知协助其自助补足。
              </p>
            </div>

            {/* Footer */}
            <div className="pt-2 flex justify-end text-xs font-sans">
              <button
                type="button"
                onClick={() => setSelectedTx(null)}
                className="bg-white/5 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-white/10 transition-all cursor-pointer"
              >
                关闭对账详情
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

