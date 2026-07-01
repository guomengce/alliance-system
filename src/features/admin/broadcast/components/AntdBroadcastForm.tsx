import { useEffect } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { MessageSquare, Sliders } from 'lucide-react';

import { AntdCard } from '../../../../shared/antd/AntdCard';
import type { BroadcastFormProps, BroadcastFormValues } from '../types';

const TEXT = {
  title: '向全联盟注册激活用户代表手动广播推送通知',
  target: '指定投送对象',
  category: '广播通知类别',
  categoryValue: '官方通知公告与安全维护大盘提醒',
  titleLabel: '通知主标题',
  titlePlaceholder: '比如：系统升级大盘核对日志完成提醒',
  bodyLabel: '推送正文详情内容 (支持通配标签替换)',
  bodyPlaceholder: '编写详细的同盟安全声明、维护或到账提醒...',
  send: '确认向会员一键下发官方系统广播',
};

const TARGET_OPTIONS = [
  { value: 'all', label: '向全同盟所有会员公开广播' },
  { value: '889421', label: '直投至 UID: 889421 代表' },
  { value: '889425', label: '直投至 UID: 889425 代表' },
  { value: '890112', label: '直投至 UID: 890112 代表' },
];

export default function AntdBroadcastForm({
  broadcastTarget,
  broadcastTitle,
  broadcastBody,
  onSendBroadcast,
}: BroadcastFormProps) {
  const [form] = Form.useForm<BroadcastFormValues>();

  useEffect(() => {
    form.setFieldsValue({
      target: broadcastTarget,
      title: broadcastTitle,
      body: broadcastBody
    });
  }, [broadcastBody, broadcastTarget, broadcastTitle, form]);

  return (
    <AntdCard className="alliance-antd-broadcast-card lg:col-span-7">
      <h4 className="text-xs font-black uppercase text-white tracking-widest pb-3 border-b border-white/5 flex items-center gap-1.5 mb-2">
        <MessageSquare className="w-4 h-4 text-[#cfbcff]" />
        {TEXT.title}
      </h4>

      <Form form={form} layout="vertical" className="font-sans text-xs" onFinish={onSendBroadcast}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Form.Item name="target" label={TEXT.target}>
            <Select
              className="alliance-antd-admin-select"
              popupClassName="alliance-antd-admin-select-dropdown"
              options={TARGET_OPTIONS}
            />
          </Form.Item>

          <div className="flex flex-col gap-1.5">
            <span className="font-semibold text-white">{TEXT.category}</span>
            <span className="bg-[#110e16] text-[#cfbcff] border border-white/5 px-3.5 py-2 rounded-xl text-xs font-bold text-left block">
              {TEXT.categoryValue}
            </span>
          </div>
        </div>

        <Form.Item name="title" label={TEXT.titleLabel}>
          <Input className="alliance-antd-admin-input" placeholder={TEXT.titlePlaceholder} />
        </Form.Item>

        <Form.Item name="body" label={TEXT.bodyLabel}>
          <Input.TextArea
            className="alliance-antd-admin-textarea"
            rows={4}
            placeholder={TEXT.bodyPlaceholder}
          />
        </Form.Item>

        <Button
          className="alliance-antd-admin-gradient-button"
          htmlType="submit"
          icon={<Sliders className="w-3.5 h-3.5" />}
          type="primary"
        >
          {TEXT.send}
        </Button>
      </Form>
    </AntdCard>
  );
}
