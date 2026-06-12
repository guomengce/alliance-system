import { AlertCircle, Coins, ShieldAlert } from 'lucide-react';
import type { SummaryCardsProps } from '../types';

export default function SummaryCards({
  totalCreditedAmount,
  abnormalAuditCount,
  totalOverflowAmount
}: SummaryCardsProps) {
  return (
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
  );
}
