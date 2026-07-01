import { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { Globe } from 'lucide-react';

import { AntdCard } from '../../../../shared/antd/AntdCard';
import type { ApiPanelFormValues, ApiPanelProps } from '../types';

const TEXT = {
  title: 'TROO股票价 Yahoo API 参数',
  desc: '指定调用的 Yahoo Finance 跨界股票 API 端点，系统按 D+1 交易收盘均价自动加点。',
  endpoint: 'API Endpoint Query URL',
  feedback: '当前调试反馈',
  connected: 'HTTP 200 Connected',
  test: '实时抓取测试',
};

export default function AntdApiPanel({ apiPriceUrl, onTestApiPrice }: ApiPanelProps) {
  const [form] = Form.useForm<ApiPanelFormValues>();

  useEffect(() => {
    form.setFieldsValue({ apiPriceUrl });
  }, [apiPriceUrl, form]);

  return (
    <AntdCard className="alliance-antd-admin-panel-card">
      <div>
        <h4 className="text-xs font-black text-[#5fc4ff] uppercase tracking-wider pb-2.5 border-b border-white/5 flex items-center gap-1">
          <Globe className="w-4 h-4 text-[#5fc4ff]" />
          {TEXT.title}
        </h4>
        <p className="text-[13px] text-[#cbc4d2]/50 leading-relaxed mt-2">{TEXT.desc}</p>

        <Form form={form} layout="vertical" className="space-y-4 mt-4 text-xs font-mono" onFinish={onTestApiPrice}>
          <Form.Item name="apiPriceUrl" label={TEXT.endpoint}>
            <Input.TextArea className="alliance-antd-admin-textarea" rows={3} />
          </Form.Item>

          <div className="flex justify-between items-center bg-[#110e16] p-2.5 rounded-xl border border-white/5 text-[13px]">
            <span className="text-[#cbc4d2]/50 font-sans">{TEXT.feedback}</span>
            <span className="text-emerald-400 font-bold font-mono">{TEXT.connected}</span>
          </div>

          <Button className="alliance-antd-admin-cyan-button" htmlType="submit" type="primary">
            {TEXT.test}
          </Button>
        </Form>
      </div>
    </AntdCard>
  );
}
