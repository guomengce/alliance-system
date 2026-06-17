import { Sliders } from 'lucide-react';
import type { Transaction } from '@/src/types';

interface ReservesPanelProps {
  pendingWithdrawals: Transaction[];
  withdrawalFee: number;
  companyUSDT: number;
  companyTROO: number;
  totalUserUSDT: number;
  totalUserTROO: number;
  totalUserLocked: number;
  setSelectedWithdrawal: (withdrawal: Transaction) => void;
  onApproveWithdrawal: (id: string) => void;
  onRejectWithdrawal: (id: string) => void;
}

export default function ReservesPanel({
  pendingWithdrawals,
  withdrawalFee,
  companyUSDT,
  companyTROO,
  totalUserUSDT,
  totalUserTROO,
  totalUserLocked,
  setSelectedWithdrawal,
  onApproveWithdrawal,
  onRejectWithdrawal
}: ReservesPanelProps) {
  return (
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
  );
}
