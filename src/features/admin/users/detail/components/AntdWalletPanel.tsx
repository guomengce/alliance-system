import { Form, InputNumber, Statistic } from 'antd';
import { Activity, Coins, Lock, Wallet } from 'lucide-react';

import { AntdCard } from '@/src/shared/antd/AntdCard';
import type { WalletPanelProps } from '../../types';

const TEXT = {
  title: '\u7528\u6237\u94b1\u5305\u53ca\u540c\u76df\u8d44\u4ea7\u6298\u6838 / \u5f02\u5e38\u7ea0\u504f',
  descTitle: '\u7ba1\u7406\u5458\u8d22\u52a1\u53ca\u8d44\u4ea7\u7cbe\u7b97\u7ea0\u504f\u9762\u677f',
  desc: '\u7ba1\u7406\u5458\u53ef\u4eba\u5de5\u62e8\u5907\u6216\u6263\u4ef6\u7528\u6237\u8d26\u6237\u4e2d\u56e0\u94fe\u4e0a\u4ea4\u6613\u5ef6\u8fdf\u3001\u5f02\u5e38\u963b\u585e\u6216\u4eba\u5de5\u8865\u989d\u5bfc\u81f4\u7684\u5404\u7c7b\u8d44\u4ea7\u548c\u4f63\u91d1\u4f59\u989d\u3002',
  total: '\u8be5\u7528\u6237\u5728\u5168\u8054\u76df\u6298\u5408\u9884\u4f30\u603b\u8d44\u4ea7\u4ef7\u503c',
  usdt: '\u53ef\u7528\u8d44\u4ea7 (USDT)',
  frozen: '\u51bb\u7ed3\u8d44\u4ea7 (USDT)',
  pending: 'D+1 \u5f85\u6838\u7b97\u4f63\u91d1',
  troo: 'TROO\u80a1\u7968\u4f59\u91cf',
  nodes: '\u4e0b\u7ea7\u7f51\u7edc\u603b\u88c2\u53d8\u8282\u70b9\u6570',
  volume: '\u76f4\u5c5e\u7ea7\u5927\u76d8\u7d2f\u79ef\u9500\u552e\u4e1a\u7ee9',
};

export default function AntdWalletPanel({
  formUsdt,
  setFormUsdt,
  formFrozenUsdt,
  setFormFrozenUsdt,
  formTroo,
  setFormTroo,
  formPending,
  setFormPending,
  formNodes,
  formVolume,
}: WalletPanelProps) {
  const total = formUsdt + formFrozenUsdt + formPending + (formTroo * 0.01);

  return (
    <AntdCard className="alliance-antd-user-detail-panel-card">
      <div className="flex items-center gap-2 pb-3 border-b border-white/5">
        <Wallet className="w-5 h-5 text-[#cfbcff]" />
        <h2 className="text-sm font-bold text-white tracking-wider">{TEXT.title}</h2>
      </div>

      <AntdCard className="alliance-antd-user-detail-note-card">
        <p className="font-extrabold text-[#cfbcff]">{TEXT.descTitle}</p>
        <p className="opacity-70 leading-relaxed">{TEXT.desc}</p>
      </AntdCard>

      <AntdCard className="alliance-antd-user-detail-total-card">
        <Statistic
          title={TEXT.total}
          value={total}
          precision={2}
          suffix="USDT"
          valueStyle={{ color: '#ffffff', fontWeight: 900 }}
        />
      </AntdCard>

      <Form layout="vertical" className="alliance-antd-user-detail-form">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
          <Form.Item label={<span className="inline-flex items-center gap-1"><Wallet className="w-3.5 h-3.5" />{TEXT.usdt}</span>}>
            <InputNumber value={formUsdt} min={0} step={0.01} controls={false} addonAfter="USDT" onChange={(value) => setFormUsdt(Number(value) || 0)} />
          </Form.Item>
          <Form.Item label={<span className="inline-flex items-center gap-1"><Lock className="w-3.5 h-3.5" />{TEXT.frozen}</span>}>
            <InputNumber value={formFrozenUsdt} min={0} step={0.01} controls={false} addonAfter="USDT" onChange={(value) => setFormFrozenUsdt(Number(value) || 0)} />
          </Form.Item>
          <Form.Item label={<span className="inline-flex items-center gap-1"><Lock className="w-3.5 h-3.5" />{TEXT.pending}</span>}>
            <InputNumber value={formPending} min={0} step={0.01} controls={false} addonAfter="USDT" onChange={(value) => setFormPending(Number(value) || 0)} />
          </Form.Item>
          <Form.Item label={<span className="inline-flex items-center gap-1"><Activity className="w-3.5 h-3.5" />{TEXT.troo}</span>}>
            <InputNumber value={formTroo} min={0} step={1} controls={false} addonAfter="\u80a1\u7968" onChange={(value) => setFormTroo(Number(value) || 0)} />
          </Form.Item>
        </div>
      </Form>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
        <AntdCard className="alliance-antd-user-detail-readonly-card">
          <Statistic title={TEXT.nodes} value={formNodes} suffix="\u4e2a\u4e0b\u5c5e" valueStyle={{ color: '#cfbcff', fontWeight: 900 }} />
        </AntdCard>
        <AntdCard className="alliance-antd-user-detail-readonly-card">
          <Statistic title={TEXT.volume} value={formVolume} prefix="USDT" valueStyle={{ color: '#34d399', fontWeight: 900 }} />
        </AntdCard>
      </div>

      <AntdCard className="alliance-antd-user-detail-note-card">
        <h3 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
          <Coins className="w-4 h-4 text-[#cfbcff]" />
          <span>\u540c\u76df\u4f53\u63a8\u5e7f\u5206\u6da6\u4e0e\u4f63\u91d1\u7cbe\u7b97\u5bf9\u8d26\u7edf\u8ba1</span>
        </h3>
      </AntdCard>
    </AntdCard>
  );
}
