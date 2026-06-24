import { AlertCircle, Coins, ShieldAlert } from 'lucide-react';

import { AntdCard } from '../../../../shared/antd/AntdCard';
import type { SummaryCardsProps } from '../types';

const SUMMARY_TEXT = {
  creditedTotal: '\u5f53\u524d\u7cfb\u7edf\u4e94\u4ee3\u603b\u8fd4\u672c\u4f63\u91d1\u62e8\u51fa',
  abnormal: '\u7cfb\u7edf\u81ea\u52a8\u963b\u65ad\u5f02\u5e38\u5bf9\u8d26',
  auditUnit: '\u5b97\u6302\u8d77\u5ba1\u8ba1',
  overflowTotal: '\u6c60\u6ee1\u81ea\u52a8\u56de\u7b3c\u603b\u5e93\u6ea2\u51fa\u8d44\u91d1',
};

export default function AntdSummaryCards({
  totalCreditedAmount,
  abnormalAuditCount,
  totalOverflowAmount,
}: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-sans">
      <AntdCard className="alliance-antd-commission-summary-card">
        <div className="space-y-1">
          <span className="text-[10px] text-[#cbc4d2]/40 block uppercase tracking-wider">{SUMMARY_TEXT.creditedTotal}</span>
          <span className="text-xl font-extrabold text-[#cfbcff] font-mono">
            {totalCreditedAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} USDT
          </span>
        </div>
        <Coins className="w-8 h-8 text-[#cfbcff]/20 shrink-0" />
      </AntdCard>

      <AntdCard className="alliance-antd-commission-summary-card">
        <div className="space-y-1">
          <span className="text-[10px] text-[#cbc4d2]/40 block uppercase tracking-wider">{SUMMARY_TEXT.abnormal}</span>
          <span className="text-xl font-extrabold text-amber-400 font-mono">
            {abnormalAuditCount} {SUMMARY_TEXT.auditUnit}
          </span>
        </div>
        <AlertCircle className="w-8 h-8 text-amber-400/20 shrink-0" />
      </AntdCard>

      <AntdCard className="alliance-antd-commission-summary-card">
        <div className="space-y-1">
          <span className="text-[10px] text-[#cbc4d2]/40 block uppercase tracking-wider">{SUMMARY_TEXT.overflowTotal}</span>
          <span className="text-xl font-extrabold text-red-400 font-mono">
            {totalOverflowAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} USDT
          </span>
        </div>
        <ShieldAlert className="w-8 h-8 text-red-400/20 shrink-0" />
      </AntdCard>
    </div>
  );
}
