import { Button, Input, Select } from 'antd';
import { MessageSquare, Sliders } from 'lucide-react';

import { AntdCard } from '../../../../shared/antd/AntdCard';
import type { BroadcastFormProps } from '../types';

const { TextArea } = Input;

const TEXT = {
  title: '\u5411\u5168\u8054\u76df\u6ce8\u518c\u6fc0\u6d3b\u7528\u6237\u4ee3\u8868\u624b\u52a8\u5e7f\u64ad\u63a8\u9001\u901a\u77e5',
  target: '\u6307\u5b9a\u6295\u9001\u5bf9\u8c61',
  category: '\u5e7f\u64ad\u901a\u77e5\u7c7b\u522b',
  categoryValue: '\u5b98\u65b9\u901a\u77e5\u516c\u544a\u4e0e\u5b89\u5168\u7ef4\u62a4\u5927\u76d8\u63d0\u9192',
  titleLabel: '\u901a\u77e5\u4e3b\u6807\u9898',
  titlePlaceholder: '\u6bd4\u5982\uff1a\u7cfb\u7edf\u5347\u7ea7\u5927\u76d8\u6838\u5bf9\u65e5\u5fd7\u5b8c\u6210\u63d0\u9192',
  bodyLabel: '\u63a8\u9001\u6b63\u6587\u8be6\u60c5\u5185\u5bb9 (\u652f\u6301\u901a\u914d\u6807\u7b7e\u66ff\u6362)',
  bodyPlaceholder: '\u7f16\u5199\u8be6\u7ec6\u7684\u540c\u76df\u5b89\u5168\u58f0\u660e\u3001\u7ef4\u62a4\u6216\u5230\u8d26\u63d0\u9192...',
  send: '\u786e\u8ba4\u5411\u4f1a\u5458\u4e00\u952e\u4e0b\u53d1\u5b98\u65b9\u7cfb\u7edf\u5e7f\u64ad',
};

const TARGET_OPTIONS = [
  { value: 'all', label: '\u5411\u5168\u540c\u76df\u6240\u6709\u4f1a\u5458\u516c\u5f00\u5e7f\u64ad' },
  { value: '889421', label: '\u76f4\u6295\u81f3 UID: 889421 \u4ee3\u8868' },
  { value: '889425', label: '\u76f4\u6295\u81f3 UID: 889425 \u4ee3\u8868' },
  { value: '890112', label: '\u76f4\u6295\u81f3 UID: 890112 \u4ee3\u8868' },
];

export default function AntdBroadcastForm({
  broadcastTarget,
  setBroadcastTarget,
  broadcastTitle,
  setBroadcastTitle,
  broadcastBody,
  setBroadcastBody,
  onSendBroadcast,
}: BroadcastFormProps) {
  return (
    <AntdCard className="alliance-antd-broadcast-card lg:col-span-7">
      <h4 className="text-xs font-black uppercase text-white tracking-widest pb-3 border-b border-white/5 flex items-center gap-1.5 mb-2">
        <MessageSquare className="w-4 h-4 text-[#cfbcff]" />
        {TEXT.title}
      </h4>

      <div className="space-y-4 font-sans text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="font-semibold text-white">{TEXT.target}</span>
            <Select
              className="alliance-antd-admin-select"
              popupClassName="alliance-antd-admin-select-dropdown"
              value={broadcastTarget}
              options={TARGET_OPTIONS}
              onChange={setBroadcastTarget}
            />
          </label>

          <div className="flex flex-col gap-1.5">
            <span className="font-semibold text-white">{TEXT.category}</span>
            <span className="bg-[#110e16] text-[#cfbcff] border border-white/5 px-3.5 py-2 rounded-xl text-xs font-bold text-left block">
              {TEXT.categoryValue}
            </span>
          </div>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="font-semibold text-white">{TEXT.titleLabel}</span>
          <Input
            className="alliance-antd-admin-input"
            value={broadcastTitle}
            onChange={(event) => setBroadcastTitle(event.target.value)}
            placeholder={TEXT.titlePlaceholder}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="font-semibold text-white">{TEXT.bodyLabel}</span>
          <TextArea
            className="alliance-antd-admin-textarea"
            rows={4}
            value={broadcastBody}
            onChange={(event) => setBroadcastBody(event.target.value)}
            placeholder={TEXT.bodyPlaceholder}
          />
        </label>

        <Button className="alliance-antd-admin-gradient-button" icon={<Sliders className="w-3.5 h-3.5" />} onClick={onSendBroadcast}>
          {TEXT.send}
        </Button>
      </div>
    </AntdCard>
  );
}
