import { Sliders } from 'lucide-react';

import { AntdCard } from '@/src/shared/antd/AntdCard';
import type { Transaction } from '@/src/types';
import AntdReservesDesktop from './AntdReservesDesktop';
import AntdReservesMobile from './AntdReservesMobile';

export interface AntdReservesPanelProps {
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

export const RESERVES_TEXT = {
  reserveUsdt: '\u516c\u53f8\u4fdd\u8bc1\u91d1\u51c6\u5907\u5927\u5e93\u4f59\u989d',
  reserveDesc: '\u5b89\u5168\u4ee3\u6263\u57ab\u8d44\u8986\u76d6\u51c6\u5907\u7387 100%',
  troo: '\u5927\u4ed3\u6258\u7ba1\u80a1\u7968\u9501\u5b9a\u603b\u4f59\u91cf',
  trooDesc: '\u7528\u4e8e\u7406\u8d22\u5305\u4e70\u5165\u914d\u552e\u548c\u4e0b\u7ea7\u88c2\u53d8\u89e3\u9501\u8fd4\u62e8',
  aggregate: '\u5168\u7f51\u4ee3\u8868\u7d2f\u8ba1\u603b\u5b58\u4f59\u4f59\u989d',
  usdt: 'USDT \u53ef\u652f\u914d',
  trooStock: 'TROO \u80a1\u7968\u91cf',
  locked: '\u5f85\u6838\u7b97 \u5728\u9014\u4f63 U:',
  title: '\u63d0\u73b0\u51fa\u91d1\u7ec8\u5ba1\u6838\u5b9a\u6c60',
  countSuffix: ' \u7b14\u7b49\u5f85\u6838\u9500\u786e\u8ba4',
  id: '\u63d0\u6b3e\u5355ID\u53f7',
  uid: '\u7533\u9886\u4eba UID',
  gross: '\u7533\u63d0\u91d1\u989d',
  fee: '\u5904\u7406\u624b\u7eed\u8d39',
  net: '\u5e94\u62e8\u91d1\u989d',
  address: '\u5230\u8d26\u901a\u9053\u53caTRC-20\u5730\u5740',
  actions: '\u51fa\u7eb3\u72b6\u6001\u53ca\u51b3\u7b56',
  empty: '\u5f53\u524d\u65e0\u6392\u961f\u7b49\u5f85\u5ba1\u6838\u7684\u63d0\u5e01\u51fa\u91d1\u8bf7\u6c42\uff0c\u5168\u7cfb\u7edf\u8d22\u52a1\u8d26\u76ee\u5e73\u8861\u3002',
  detail: '\u67e5\u770b\u8be6\u60c5',
  approve: '\u901a\u8fc7\u5e76\u6253\u6b3e',
  reject: '\u9a73\u56de',
  mobileDetail: '\u8be6\u60c5/\u5ba1\u8ba1',
};

export default function AntdReservesPanel({
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
}: AntdReservesPanelProps) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 font-sans">
        <AntdCard className="alliance-antd-finance-reserve-card is-usdt">
          <div className="absolute right-3.5 top-3.5 font-mono font-bold text-xs text-white/20 uppercase tracking-widest">Reserve USDT</div>
          <p className="text-[13px] uppercase font-bold text-[#cfbcff] tracking-wider leading-none">{RESERVES_TEXT.reserveUsdt}</p>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">{companyUSDT.toLocaleString()}</span>
            <span className="text-xs font-bold text-[#cbc4d2]/60 font-mono">USDT</span>
          </div>
          <p className="text-xs text-[#cbc4d2]/40 mt-2">{RESERVES_TEXT.reserveDesc}</p>
        </AntdCard>

        <AntdCard className="alliance-antd-finance-reserve-card is-troo">
          <div className="absolute right-3.5 top-3.5 font-mono font-bold text-xs text-white/20 uppercase tracking-widest">Escrow TROO</div>
          <p className="text-[13px] uppercase font-bold text-[#f1bf50] tracking-wider leading-none">{RESERVES_TEXT.troo}</p>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">{companyTROO.toLocaleString()}</span>
            <span className="text-xs font-bold text-[#cbc4d2]/60 font-mono">TROO</span>
          </div>
          <p className="text-xs text-[#cbc4d2]/40 mt-2">{RESERVES_TEXT.trooDesc}</p>
        </AntdCard>

        <AntdCard className="alliance-antd-finance-reserve-card is-users">
          <div className="absolute right-3.5 top-3.5 font-mono font-bold text-xs text-white/20 uppercase tracking-widest">Aggregate Users Net</div>
          <p className="text-[13px] uppercase font-bold text-[#cbc4d2]/60 tracking-wider leading-none">{RESERVES_TEXT.aggregate}</p>
          <div className="mt-3.5 space-y-1 font-mono text-[13px]">
            <div className="flex justify-between">
              <span className="text-[#cbc4d2]/40">{RESERVES_TEXT.usdt}</span>
              <span className="text-white font-bold">{totalUserUSDT.toLocaleString(undefined, { minimumFractionDigits: 2 })} U</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#cbc4d2]/40">{RESERVES_TEXT.trooStock}</span>
              <span className="text-[#cfbcff] font-bold">{totalUserTROO.toLocaleString(undefined, { minimumFractionDigits: 0 })} TROO</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#cbc4d2]/40">{RESERVES_TEXT.locked}</span>
              <span className="text-amber-400 font-bold">{totalUserLocked.toLocaleString(undefined, { minimumFractionDigits: 2 })} U</span>
            </div>
          </div>
        </AntdCard>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs uppercase tracking-wider text-white font-sans flex items-center gap-1.5 font-bold">
          <Sliders className="w-4 h-4 text-[#cfbcff]" />
          {RESERVES_TEXT.title} ({pendingWithdrawals.length}{RESERVES_TEXT.countSuffix})
        </h4>

        <AntdReservesDesktop
          pendingWithdrawals={pendingWithdrawals}
          withdrawalFee={withdrawalFee}
          setSelectedWithdrawal={setSelectedWithdrawal}
          onApproveWithdrawal={onApproveWithdrawal}
          onRejectWithdrawal={onRejectWithdrawal}
        />

        <AntdReservesMobile
          pendingWithdrawals={pendingWithdrawals}
          withdrawalFee={withdrawalFee}
          setSelectedWithdrawal={setSelectedWithdrawal}
          onApproveWithdrawal={onApproveWithdrawal}
          onRejectWithdrawal={onRejectWithdrawal}
        />
      </div>
    </div>
  );
}
