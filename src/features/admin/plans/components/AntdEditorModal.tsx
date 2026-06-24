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
  formName,
  formPrice,
  formGiftRatio,
  formBuyRatio,
  formQueueRatio,
  formCommissionLimit,
  formDescription,
  setFormName,
  setFormPrice,
  setFormGiftRatio,
  setFormBuyRatio,
  setFormQueueRatio,
  setFormCommissionLimit,
  setFormDescription,
  onClose,
  onSaveOrUpdatePlan,
}: EditorModalProps) {
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
              {editingPlan ? '修改理财套餐配置参数' : '创建配置全新流动性理财套餐'}
            </h4>
            <p className="text-[10px] text-[#cbc4d2]/40 font-mono mt-0.5">
              请仔细填写各项数值参数，确认提交后系统认购渠道将即时生效更新。
            </p>
          </div>
        </div>
      </div>

      <Form layout="vertical" className="alliance-antd-form alliance-antd-plan-form">
        <Form.Item label="套餐标识名称">
          <Input
            value={formName}
            onChange={(event) => setFormName(event.target.value)}
            placeholder="例如: 套餐 F (尊享至尊版)"
          />
        </Form.Item>

        <Form.Item label="套餐功能描述 / 规则介绍">
          <Input.TextArea
            value={formDescription}
            onChange={(event) => setFormDescription(event.target.value)}
            placeholder="请输入该理财套餐对会员展示的具体功能描述与收益、锁定解锁规则介绍..."
            rows={3}
          />
        </Form.Item>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Form.Item label="认购基础理财额 (USDT)">
            <InputNumber
              value={formPrice}
              min={0}
              onChange={(value) => setFormPrice(toSafeNumber(value))}
            />
          </Form.Item>

          <Form.Item label="佣金额度绝对数值 (USDT)">
            <InputNumber
              value={formCommissionLimit}
              min={0}
              onChange={(value) => setFormCommissionLimit(toSafeNumber(value))}
              className="is-success"
              placeholder="写入佣金极限制数值"
            />
          </Form.Item>
        </div>

        <div className="border-t border-white/5 pt-4 space-y-3">
          <p className="text-[10px] font-black uppercase text-[#cfbcff] tracking-wider">
            TROO 股票赠送、买入及排队精算设置
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Form.Item label="股票赠送加权">
              <Select
                value={formGiftRatio}
                options={giftRatioOptions}
                popupClassName="alliance-antd-plan-select-dropdown"
                onChange={setFormGiftRatio}
              />
            </Form.Item>

            <Form.Item label="股票买入比例 (%)">
              <InputNumber
                value={formBuyRatio}
                min={0}
                max={100}
                className="is-warning"
                onChange={(value) => {
                  const nextValue = Math.min(100, Math.max(0, toSafeNumber(value)));
                  setFormBuyRatio(nextValue);
                  setFormQueueRatio(100 - nextValue);
                }}
              />
            </Form.Item>

            <Form.Item label="股票排队比例 (%)">
              <InputNumber
                value={formQueueRatio}
                min={0}
                max={100}
                className="is-info"
                onChange={(value) => {
                  const nextValue = Math.min(100, Math.max(0, toSafeNumber(value)));
                  setFormQueueRatio(nextValue);
                  setFormBuyRatio(100 - nextValue);
                }}
              />
            </Form.Item>
          </div>

          <p className="text-[9px] text-[#cbc4d2]/30 italic leading-normal">
            * 联动精算提示：系统自动保障 [买入比例] 与 [排队比例] 两项权重和等于 100%，当前已设定为 {formBuyRatio}% / {formQueueRatio}%。
          </p>
        </div>
      </Form>

      <div className="pt-4 border-t border-white/5 flex gap-3 text-xs">
        <Button className="alliance-antd-button-ghost alliance-antd-plan-modal-cancel" onClick={onClose}>
          取消
        </Button>
        <Button className="alliance-antd-button-submit alliance-antd-plan-modal-submit" onClick={onSaveOrUpdatePlan}>
          {editingPlan ? '保存并更新配置' : '确认无误，对外创建发布'}
        </Button>
      </div>
    </Modal>
  );
}
