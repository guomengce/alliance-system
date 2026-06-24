import { Button, InputNumber } from 'antd';
import { Sliders } from 'lucide-react';

import { AntdCard } from '../../../../shared/antd/AntdCard';
import type { LimitsPanelProps } from '../types';

const TEXT = {
  title: '\u9501\u5b9a\u4e0e\u51fa\u91d1\u624b\u7eed\u6263\u53d6\u53c2\u6570',
  desc: '\u5bf9\u63d0\u73b0\u786c\u6027\u624b\u7eed\u5c01\u9876\u9650\u5236\u53ca\u4e0b\u7ebf\u9996\u671f\u4e70\u5165\u89e3\u9501\u91ca\u653e\u6bd4\u4f8b\u8bbe\u7f6e',
  fee: '\u63d0\u73b0\u786c\u624b\u7eed\u5c01\u9876\u9650\u5236 (USDT)',
  ratio: 'L1 \u76f4\u63a8\u4e0b\u7ea7\u6210\u4ea4\u89e6\u53d1\u6392\u961f\u91ca\u653e\u7387 (%)',
  save: '\u786e\u8ba4\u6263\u6bd4\u4fee\u6539',
};

export default function AntdLimitsPanel({
  withdrawalFee,
  setWithdrawalFee,
  l1UnlockRatio,
  setL1UnlockRatio,
  onSaveLimits,
}: LimitsPanelProps) {
  return (
    <AntdCard className="alliance-antd-admin-panel-card">
      <div>
        <h4 className="text-xs font-black text-[#e7c365] uppercase tracking-wider pb-2.5 border-b border-white/5 flex items-center gap-1">
          <Sliders className="w-4 h-4 text-[#e7c365]" />
          {TEXT.title}
        </h4>
        <p className="text-[11px] text-[#cbc4d2]/50 leading-relaxed mt-2">{TEXT.desc}</p>

        <div className="space-y-4 mt-4 text-xs font-sans">
          <label className="flex flex-col gap-1.5">
            <span className="font-semibold text-white">{TEXT.fee}</span>
            <InputNumber
              className="alliance-antd-admin-number-input"
              value={withdrawalFee}
              min={0}
              controls={false}
              onChange={(value) => setWithdrawalFee(typeof value === 'number' ? value : 0)}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="font-semibold text-white">{TEXT.ratio}</span>
            <InputNumber
              className="alliance-antd-admin-number-input"
              value={l1UnlockRatio}
              min={0}
              max={100}
              controls={false}
              onChange={(value) => setL1UnlockRatio(typeof value === 'number' ? value : 0)}
            />
          </label>
        </div>
      </div>

      <Button className="alliance-antd-admin-secondary-button" onClick={onSaveLimits}>
        {TEXT.save}
      </Button>
    </AntdCard>
  );
}
