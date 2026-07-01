import { useEffect } from 'react';
import { Button, Form, Input } from 'antd';

import { AntdCard } from '../../../../shared/antd/AntdCard';
import type { TemplateFormValues, TemplatePanelProps } from '../types';

const TEXT = {
  title: '池枯竭额度补缴警告通配模板配置',
  desc:
    '配置当出现 D0 发生买单但超级上级佣金代付信用限额剩余容量不足时的即时警告补款模板：',
  label: '池红线即将枯竭警告通配富文本',
  save: '保存池告警文案模板',
};

export default function AntdTemplatePanel({
  notificationTemplate,
  onSaveTemplate,
}: TemplatePanelProps) {
  const [form] = Form.useForm<TemplateFormValues>();

  useEffect(() => {
    form.setFieldsValue({ notificationTemplate });
  }, [form, notificationTemplate]);

  return (
    <AntdCard className="alliance-antd-broadcast-card alliance-antd-broadcast-template-card lg:col-span-5">
      <div>
        <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider pb-2 border-b border-white/5">{TEXT.title}</h4>
        <p className="text-[13px] text-[#cbc4d2]/50 mt-1.5 leading-relaxed font-sans">{TEXT.desc}</p>
      </div>

      <Form form={form} layout="vertical" className="mt-4 font-mono text-xs" onFinish={onSaveTemplate}>
        <Form.Item name="notificationTemplate" label={TEXT.label}>
          <Input.TextArea className="alliance-antd-admin-textarea" rows={4} />
        </Form.Item>

        <div className="mt-6">
          <Button className="alliance-antd-admin-secondary-button" htmlType="submit" type="primary">
            {TEXT.save}
          </Button>
        </div>
      </Form>
    </AntdCard>
  );
}
