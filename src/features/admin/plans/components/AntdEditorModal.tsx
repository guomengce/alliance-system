import { Button, Form, Input, InputNumber, Modal, Select } from 'antd';
import { Sliders } from 'lucide-react';

import type { EditorModalProps } from '../types';

const giftRatioOptions = [
  { value: 1, label: '1.00 (不赠送)' },
  { value: 1.05, label: '1.05 (+5%)' },
  { value: 1.1, label: '1.10 (+10%)' },
  { value: 1.15, label: '1.15 (+15%)' },
  { value: 1.2, label: '1.20 (+20%)' },
  { value: 1.25, label: '1.25 (+25%)' },
  { value: 1.3, label: '1.30 (+30%)' },
];

const toSafeNumber = (value: number | null) => Number(value) || 0;

export function AntdEditorModal({
  editingPlan,
  planDraft,
  setPlanDraft,
  onClose,
  onSaveOrUpdatePlan,
}: EditorModalProps) {
  const updatePlanDraft = <Key extends keyof typeof planDraft>(key: Key, value: typeof planDraft[Key]) => {
    setPlanDraft(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Modal
      centered
      destroyOnHidden
      footer={null}
      open
      width={512}
      className="alliance-antd-modal alliance-antd-plan-modal"
      rootClassName="alliance-antd-plan-modal-root"
      onCancel={onClose}
      styles={{
        body: {
          background: 'transparent',
          color: '#cbc4d2',
        },
      }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#cfbcff]/10 flex items-center justify-center border border-[#cfbcff]/20 shrink-0">
            <Sliders className="w-5 h-5 text-[#cfbcff]" />
          </div>
          <div className="text-left">
            <h4 className="text-sm font-black text-white">
              {editingPlan ? '修改理财套餐配置参数' : '创建全新理财套餐'}
            </h4>
            <p className="text-xs text-[#cbc4d2]/40 font-mono mt-0.5">
              当前编辑对象：planDraft → 保存后写回 plansResponse.data.plans
            </p>
          </div>
        </div>
      </div>

      <Form layout="vertical" className="alliance-antd-form alliance-antd-plan-form">
        <Form.Item label="套餐名称">
          <Input
            value={planDraft.name}
            onChange={(event) => updatePlanDraft('name', event.target.value)}
            placeholder="例如: 套餐 F (尊享版)"
          />
        </Form.Item>

        <Form.Item label="套餐描述 / 规则介绍">
          <Input.TextArea
            value={planDraft.description}
            onChange={(event) => updatePlanDraft('description', event.target.value)}
            placeholder="请输入该理财套餐展示给会员的规则、权益或说明"
            rows={3}
          />
        </Form.Item>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Form.Item label="认购金额 (USDT)">
            <InputNumber
              value={planDraft.price}
              min={0}
              onChange={(value) => updatePlanDraft('price', toSafeNumber(value))}
            />
          </Form.Item>

          <Form.Item label="佣金额度 (USDT)">
            <InputNumber
              value={planDraft.commissionLimit}
              min={0}
              onChange={(value) => updatePlanDraft('commissionLimit', toSafeNumber(value))}
              className="is-success"
              placeholder="写入佣金上限数值"
            />
          </Form.Item>
        </div>

        <div className="border-t border-white/5 pt-4 space-y-3">
          <p className="text-xs font-black uppercase text-[#cfbcff] tracking-wider">
            TROO 股票赠送、买入及排队设置
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Form.Item label="赠送比例">
              <Select
                value={planDraft.giftRatio}
                options={giftRatioOptions}
                popupClassName="alliance-antd-plan-select-dropdown"
                onChange={(value) => updatePlanDraft('giftRatio', value)}
              />
            </Form.Item>

            <Form.Item label="买入比例 (%)">
              <InputNumber
                value={planDraft.buyRatio}
                min={0}
                max={100}
                className="is-warning"
                onChange={(value) => {
                  const nextValue = Math.min(100, Math.max(0, toSafeNumber(value)));
                  setPlanDraft(prev => ({
                    ...prev,
                    buyRatio: nextValue,
                    queueRatio: 100 - nextValue
                  }));
                }}
              />
            </Form.Item>

            <Form.Item label="排队比例 (%)">
              <InputNumber
                value={planDraft.queueRatio}
                min={0}
                max={100}
                className="is-info"
                onChange={(value) => {
                  const nextValue = Math.min(100, Math.max(0, toSafeNumber(value)));
                  setPlanDraft(prev => ({
                    ...prev,
                    queueRatio: nextValue,
                    buyRatio: 100 - nextValue
                  }));
                }}
              />
            </Form.Item>
          </div>

          <p className="text-xs text-[#cbc4d2]/30 italic leading-normal">
            当前 draft 比例：{planDraft.buyRatio}% / {planDraft.queueRatio}%，两个字段联动保持合计 100%。
          </p>
        </div>
      </Form>

      <div className="pt-4 border-t border-white/5 flex gap-3 text-xs">
        <Button className="alliance-antd-button-ghost alliance-antd-plan-modal-cancel" onClick={onClose}>
          取消
        </Button>
        <Button className="alliance-antd-button-submit alliance-antd-plan-modal-submit" onClick={onSaveOrUpdatePlan}>
          {editingPlan ? '保存并更新配置' : '确认创建套餐'}
        </Button>
      </div>
    </Modal>
  );
}
