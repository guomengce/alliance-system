import { Button, Tag } from 'antd';
import { Eye } from 'lucide-react';

import { AntdCard } from '../../../../../shared/antd/AntdCard';
import type { MobileCardProps } from '../../types';

const TEXT = {
  triggerCount: '\u6b21\u89e6\u53d1',
  original: '\u521d\u59cb\u9501\u5b9a',
  current: '\u9501\u5b9a\u4f59\u989d',
  unlocked: '\u5df2\u91ca\u653e',
  view: '\u67e5\u770b\u8bb0\u5f55\u8be6\u60c5',
};

export function AntdMobileCard({ roster: r, onOpenDetails }: MobileCardProps) {
  return (
    <AntdCard className="alliance-antd-queue-mobile-card">
      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          <div>
            <p className="text-white leading-none font-bold text-xs">{r.uid}</p>
            <p className="text-[10px] text-[#cbc4d2]/40 font-normal mt-1">{r.nickname}</p>
          </div>
        </div>
        <Tag className="alliance-antd-queue-count-tag">
          {r.count} {TEXT.triggerCount}
        </Tag>
      </div>

      <div className="grid grid-cols-3 gap-1.5 text-[11px] border-t border-b border-white/5 py-2.5 font-mono text-center">
        <div>
          <span className="text-[#cbc4d2]/40 text-[9px] block font-sans text-left">{TEXT.original}</span>
          <p className="text-[#cbc4d2]/80 mt-0.5 text-left truncate">USDT {r.original.toLocaleString()}</p>
        </div>
        <div>
          <span className="text-[#cbc4d2]/40 text-[9px] block font-sans">{TEXT.current}</span>
          <p className="text-amber-300 font-extrabold mt-0.5 truncate">USDT {r.current.toLocaleString()}</p>
        </div>
        <div>
          <span className="text-[#cbc4d2]/40 text-[9px] block font-sans text-right">{TEXT.unlocked}</span>
          <p className="text-emerald-400 font-extrabold mt-0.5 text-right truncate">USDT {r.unlocked.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <Button
          className="alliance-antd-queue-mobile-action-button"
          icon={<Eye className="w-3.5 h-3.5" />}
          size="small"
          onClick={() => onOpenDetails(r)}
        >
          {TEXT.view}
        </Button>
      </div>
    </AntdCard>
  );
}
