import { useEffect } from 'react';
import { Button, Form, Input, InputNumber, Modal, Select } from 'antd';
import { Sliders } from 'lucide-react';

import type { EditorModalProps, PlanDraft } from '../types';

const giftRatioOptions = [
  { value: 1, label: '1.00 (No gift)' },
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
  const [form] = Form.useForm<PlanDraft>();

  useEffect(() => {
    form.setFieldsValue(planDraft);
  }, [form, planDraft]);

  const updateLinkedRatio = (key: 'buyRatio' | 'queueRatio', value: number | null) => {
    const nextValue = Math.min(100, Math.max(0, toSafeNumber(value)));
    const nextDraft = {
      ...form.getFieldsValue(),
      [key]: nextValue,
      [key === 'buyRatio' ? 'queueRatio' : 'buyRatio']: 100 - nextValue
    } as PlanDraft;

    setPlanDraft(nextDraft);
    form.setFieldsValue(nextDraft);
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
              {editingPlan ? 'Edit Plan Settings' : 'Create Plan'}
            </h4>
            <p className="text-xs text-[#cbc4d2]/40 font-mono mt-0.5">
              planDraft to plansResponse.data.plans
            </p>
          </div>
        </div>
      </div>

      <Form form={form} layout="vertical" className="alliance-antd-form alliance-antd-plan-form" onFinish={onSaveOrUpdatePlan}>
        <Form.Item name="name" label="Plan Name">
          <Input placeholder="Example: Plan F" />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea placeholder="Enter plan rules, benefits, or notes" rows={3} />
        </Form.Item>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Form.Item name="price" label="Subscribe Amount (USDT)">
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item name="commissionLimit" label="Commission Limit (USDT)">
            <InputNumber className="is-success" min={0} placeholder="Commission limit" />
          </Form.Item>
        </div>

        <div className="border-t border-white/5 pt-4 space-y-3">
          <p className="text-xs font-black uppercase text-[#cfbcff] tracking-wider">
            TROO gift, buy, and queue ratios
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Form.Item name="giftRatio" label="Gift Ratio">
              <Select options={giftRatioOptions} popupClassName="alliance-antd-plan-select-dropdown" />
            </Form.Item>

            <Form.Item name="buyRatio" label="Buy Ratio (%)">
              <InputNumber
                className="is-warning"
                max={100}
                min={0}
                onChange={(value) => updateLinkedRatio('buyRatio', value)}
              />
            </Form.Item>

            <Form.Item name="queueRatio" label="Queue Ratio (%)">
              <InputNumber
                className="is-info"
                max={100}
                min={0}
                onChange={(value) => updateLinkedRatio('queueRatio', value)}
              />
            </Form.Item>
          </div>

          <p className="text-xs text-[#cbc4d2]/30 italic leading-normal">
            Current ratio: {planDraft.buyRatio}% / {planDraft.queueRatio}%. These two fields stay linked at 100%.
          </p>
        </div>

        <div className="pt-4 border-t border-white/5 flex gap-3 text-xs">
          <Button className="alliance-antd-button-ghost alliance-antd-plan-modal-cancel" onClick={onClose}>
            Cancel
          </Button>
          <Button className="alliance-antd-button-submit alliance-antd-plan-modal-submit" htmlType="submit" type="primary">
            {editingPlan ? 'Save Changes' : 'Create Plan'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
