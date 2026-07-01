import { Button, Input } from 'antd';

import { AntdCard } from '../../../../shared/antd/AntdCard';
import type { TemplatePanelProps } from '../types';

const { TextArea } = Input;

const TEXT = {
  title: '\u6c60\u67af\u7aed\u989d\u5ea6\u8865\u7f34\u8b66\u544a\u901a\u914d\u6a21\u677f\u914d\u7f6e',
  desc:
    '\u914d\u7f6e\u5f53\u51fa\u73b0 D0 \u53d1\u751f\u4e70\u5355\u4f46\u8d85\u7ea7\u4e0a\u7ebf\u4f63\u91d1\u4ee3\u4ed8\u4fe1\u7528\u9650\u989d\u5269\u4f59\u5bb9\u91cf\u4e0d\u8db3\u65f6\u7684\u5373\u65f6\u8b66\u544a\u8865\u6b3e\u6a21\u677f\uff1a',
  label: '\u6c60\u7ea2\u7ebf\u5373\u5c06\u67af\u7aed\u8b66\u544a\u901a\u914d\u5bcc\u6587\u672c',
  save: '\u4fdd\u5b58\u6c60\u544a\u8b66\u6587\u6848\u6a21\u677f',
};

export default function AntdTemplatePanel({
  value,
  isLoading,
  isSaving,
  onChange,
  onSaveTemplate,
}: TemplatePanelProps) {
  return (
    <AntdCard className="alliance-antd-broadcast-card alliance-antd-broadcast-template-card lg:col-span-5">
      <div>
        <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider pb-2 border-b border-white/5">{TEXT.title}</h4>
        <p className="text-[13px] text-[#cbc4d2]/50 mt-1.5 leading-relaxed font-sans">{TEXT.desc}</p>

        <label className="mt-4 flex flex-col gap-2 font-mono text-xs">
          <span className="text-white font-sans text-xs font-bold block">{TEXT.label}</span>
          <TextArea
            className="alliance-antd-admin-textarea"
            disabled={isLoading}
            rows={4}
            value={value.content}
            onChange={(event) => onChange('content', event.target.value)}
          />
        </label>
      </div>

      <div className="mt-6">
        <Button
          className="alliance-antd-admin-secondary-button"
          loading={isSaving}
          onClick={onSaveTemplate}
        >
          {TEXT.save}
        </Button>
        {value.updatedAt && (
          <p className="mt-2 text-xs text-[#cbc4d2]/35 font-mono">
            更新时间：{value.updatedAt}
          </p>
        )}
      </div>
    </AntdCard>
  );
}
