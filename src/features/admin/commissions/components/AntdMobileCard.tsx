import { Button, Tag } from 'antd';
import { Eye } from 'lucide-react';

import { AntdCard } from '../../../../shared/antd/AntdCard';
import type { MobileCardProps } from '../types';
import AntdStatusBadge from './AntdStatusBadge';

const MOBILE_TEXT = {
  source: '\u6e90',
  generation: '\u4ee3',
  uidLabel: '\u4ee3\u7406\u4eba UID',
  interceptedAmount: '\u62e6\u622a\u56de\u7b3c\u989d\u5ea6',
  normalAmount: '\u6838\u7b97\u672c\u8f6e\u4f63\u91d1',
  statusLabel: '\u5230\u8d26\u6d3e\u53d1\u72b6\u6001',
  view: '\u67e5\u770b',
};

export default function AntdMobileCard({ payout: p, onSelectCommission }: MobileCardProps) {
  return (
    <AntdCard className="alliance-antd-commission-mobile-card">
      <div className="flex justify-between items-start">
        <div>
          <span className="font-extrabold text-xs text-white font-mono">{p.id}</span>
          <p className="text-xs text-[#cbc4d2]/30 font-mono mt-0.5">
            {MOBILE_TEXT.source}: {p.orderId}
          </p>
        </div>
        <Tag color="purple" className="alliance-antd-commission-mobile-tag">
          {p.level}
          {MOBILE_TEXT.generation}
        </Tag>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[13px] border-t border-b border-white/5 py-2 font-mono">
        <div>
          <span className="text-[#cbc4d2]/40 text-xs block font-sans">{MOBILE_TEXT.uidLabel}</span>
          <p className="text-[#cbc4d2] font-semibold">{p.uid}</p>
          <p className="text-xs text-[#cbc4d2]/40 font-sans truncate">{p.recipientNickname}</p>
        </div>
        <div>
          <span className="text-[#cbc4d2]/40 text-xs block font-sans">
            {p.status === 'intercepted' ? MOBILE_TEXT.interceptedAmount : MOBILE_TEXT.normalAmount}
          </span>
          <p className={`${p.status === 'intercepted' ? 'text-red-400' : 'text-emerald-400'} font-extrabold text-xs mt-0.5`}>
            USDT {p.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center text-[13px] gap-2">
        <div>
          <span className="text-[#cbc4d2]/40 text-xs block font-sans">{MOBILE_TEXT.statusLabel}</span>
          <div className="mt-1">
            <AntdStatusBadge status={p.status} variant="mobile" />
          </div>
        </div>

        <Button
          className="alliance-antd-commission-mobile-action-button"
          icon={<Eye className="w-3.5 h-3.5" />}
          size="small"
          onClick={() => onSelectCommission(p)}
        >
          {MOBILE_TEXT.view}
        </Button>
      </div>
    </AntdCard>
  );
}
