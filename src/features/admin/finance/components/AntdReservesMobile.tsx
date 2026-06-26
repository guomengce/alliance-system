import { Button } from 'antd';

import { AntdCard } from '@/src/shared/antd/AntdCard';
import type { Transaction } from '@/src/types';
import { RESERVES_TEXT } from './AntdReservesPanel';

interface AntdReservesMobileProps {
  pendingWithdrawals: Transaction[];
  withdrawalFee: number;
  setSelectedWithdrawal: (withdrawal: Transaction) => void;
  onApproveWithdrawal: (id: string) => void;
  onRejectWithdrawal: (id: string) => void;
}

export default function AntdReservesMobile({
  pendingWithdrawals,
  withdrawalFee,
  setSelectedWithdrawal,
  onApproveWithdrawal,
  onRejectWithdrawal
}: AntdReservesMobileProps) {
  return (
    <div className="block md:hidden space-y-3">
      {pendingWithdrawals.length === 0 ? (
        <div className="py-8 text-center text-[#cbc4d2]/30 font-semibold italic border border-white/5 rounded-2xl bg-[#1d1925]/10 text-xs">
          {RESERVES_TEXT.empty}
        </div>
      ) : (
        pendingWithdrawals.map(withdrawal => (
          <AntdCard key={withdrawal.id} className="alliance-antd-finance-mobile-card">
            <div className="flex justify-between items-start border-b border-white/5 pb-2">
              <div>
                <span className="font-mono text-white font-extrabold text-[#cfbcff]">{withdrawal.id}</span>
                <div className="text-xs text-[#cbc4d2]/40 font-mono mt-0.5">UID: {withdrawal.id.slice(-6)}</div>
              </div>
              <span className="text-emerald-400 font-mono font-black text-xs text-right">
                {(Math.abs(withdrawal.amount) - withdrawalFee).toLocaleString()} USDT
              </span>
            </div>

            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 font-mono text-[13px] pb-1">
              <div>
                <span className="text-[#cbc4d2]/40 text-xs font-sans block leading-none mb-1">{RESERVES_TEXT.gross}</span>
                <span className="text-[#ffb4ab] font-bold">-{Math.abs(withdrawal.amount).toLocaleString()} U</span>
              </div>
              <div>
                <span className="text-[#cbc4d2]/40 text-xs font-sans block leading-none mb-1">{RESERVES_TEXT.fee}</span>
                <span className="text-white/60">{withdrawalFee} USDT</span>
              </div>
              <div className="col-span-2">
                <span className="text-[#cbc4d2]/40 text-xs font-sans block leading-none mb-1">TRC20 \u5730\u5740</span>
                <span className="text-white/75 truncate block select-all" title="TYX78Hqskm82K1Hshq82Ksh918Ksw">
                  Tx78HqsmB...{withdrawal.id.slice(-4)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 pt-2 border-t border-white/5">
              <Button className="alliance-antd-finance-mobile-button is-muted" onClick={() => setSelectedWithdrawal(withdrawal)}>
                {RESERVES_TEXT.mobileDetail}
              </Button>
              <Button className="alliance-antd-finance-mobile-button is-success" onClick={() => onApproveWithdrawal(withdrawal.id)}>
                {RESERVES_TEXT.approve}
              </Button>
              <Button className="alliance-antd-finance-mobile-button is-danger" onClick={() => onRejectWithdrawal(withdrawal.id)}>
                {RESERVES_TEXT.reject}
              </Button>
            </div>
          </AntdCard>
        ))
      )}
    </div>
  );
}
