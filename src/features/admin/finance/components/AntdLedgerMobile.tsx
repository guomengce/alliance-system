import { Button, Tag } from 'antd';
import { Eye } from 'lucide-react';

import { AntdCard } from '@/src/shared/antd/AntdCard';
import type { Transaction } from '@/src/types';
import { getLedgerTypeClassName, LEDGER_TEXT } from './AntdLedgerPanel';

interface AntdLedgerMobileProps {
  ledger: Transaction[];
  setSelectedLedgerItem: (item: Transaction) => void;
}

export default function AntdLedgerMobile({ ledger, setSelectedLedgerItem }: AntdLedgerMobileProps) {
  return (
    <div className="block md:hidden space-y-3">
      {ledger.map(item => (
        <AntdCard key={item.id} className="alliance-antd-finance-mobile-card">
          <div className="flex justify-between items-start border-b border-white/5 pb-2">
            <div>
              <span className="font-mono text-white font-extrabold text-[11px]">{item.id}</span>
              <div className="text-[10px] text-[#cbc4d2]/40 font-mono mt-0.5">{item.time}</div>
            </div>
            <Tag className={`alliance-antd-finance-status-tag ${getLedgerTypeClassName(item.type)}`}>
              {item.typeLabel || item.type.toUpperCase()}
            </Tag>
          </div>

          <div className="space-y-1">
            <span className="text-[#cbc4d2]/45 text-[9px] block leading-none">{LEDGER_TEXT.descCol}</span>
            <span className="text-[#cbc4d2]/90 block leading-relaxed line-clamp-2 text-[11px]" title={item.desc}>
              {item.desc}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <div className="font-mono text-[11px]">
              <span className="text-[#cbc4d2]/40 text-[9px] font-sans block leading-none mb-0.5">{LEDGER_TEXT.amount} / {LEDGER_TEXT.currency}</span>
              <span className={`font-black text-xs ${item.amount < 0 ? 'text-[#ffb4ab]' : 'text-emerald-400'}`}>
                {item.amount < 0 ? '' : '+'}{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[#cbc4d2]/60 font-bold ml-1 text-[10px]">{item.currency}</span>
            </div>

            <Button
              className="alliance-antd-finance-mobile-voucher-button"
              icon={<Eye className="w-3.5 h-3.5 text-[#cfbcff]" />}
              onClick={() => setSelectedLedgerItem(item)}
            >
              {LEDGER_TEXT.mobileVoucher}
            </Button>
          </div>
        </AntdCard>
      ))}
    </div>
  );
}
