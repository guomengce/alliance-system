import { Button, InputNumber } from 'antd';
import { Coins } from 'lucide-react';

import { AntdCard } from '../../../../shared/antd/AntdCard';
import type { CommissionPanelProps } from '../types';

const TEXT = {
  title: 'L1 - L5 \u76f4\u63a8\u53ca\u56e2\u961f\u5206\u6d3e\u6bd4\u4f8b (%)',
  desc: '\u5206\u522b\u5bf9\u5e94\u7b2c\u4e00\u81f3\u4e94\u4ee3\u63a8\u8350\u4e0a\u7ebf\u53ef\u83b7\u5f97\u7684\u8fd4\u6bd4\u3002\u9ed8\u8ba4\uff1a\u5404\u7ea7\u5747\u4e3a 40% \u7684 U \u7b49\u503c\u6bd4\u4f8b\u8ba1\u7b97\u3002',
  levelSuffix: '\u7ea7\u4ee3\u7406\u6d3e\u4f63\u6bd4',
  save: '\u9501\u5b9a\u5206\u6210\u5360\u6bd4',
};

export default function AntdCommissionPanel({
  commissionLevels,
  setCommissionLevels,
  onSaveCommissionLevels,
}: CommissionPanelProps) {
  return (
    <AntdCard className="alliance-antd-admin-panel-card">
      <div>
        <h4 className="text-xs font-black text-[#cfbcff] uppercase tracking-wider pb-2.5 border-b border-white/5 flex items-center gap-1">
          <Coins className="w-4 h-4 text-[#cfbcff]" />
          {TEXT.title}
        </h4>
        <p className="text-[11px] text-[#cbc4d2]/50 leading-relaxed mt-2">{TEXT.desc}</p>

        <div className="space-y-2.5 mt-4">
          {['L1', 'L2', 'L3', 'L4', 'L5'].map((level) => (
            <div key={level} className="flex justify-between items-center text-xs">
              <span className="font-bold text-white font-mono">
                {level} {TEXT.levelSuffix}
              </span>
              <InputNumber
                className="alliance-antd-admin-number-input alliance-antd-admin-percent-input"
                value={commissionLevels[level]}
                min={0}
                max={100}
                controls={false}
                addonAfter="%"
                onChange={(value) => {
                  const nextValue = typeof value === 'number' ? value : 0;
                  setCommissionLevels({ ...commissionLevels, [level]: nextValue });
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <Button className="alliance-antd-admin-gradient-button" onClick={onSaveCommissionLevels}>
        {TEXT.save}
      </Button>
    </AntdCard>
  );
}
