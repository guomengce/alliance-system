import { Button, Form, Input, Select } from 'antd';
import { Edit } from 'lucide-react';
import type { WorkspaceProps } from '../types';

type SubscriptionFormProps = Pick<
  WorkspaceProps,
  | 'commissionPoolLimit'
  | 'commissionPoolRemaining'
  | 'plans'
  | 'selectedPlan'
  | 'amountInput'
  | 'setAmountInput'
  | 'handleDropdownChange'
  | 'handleSubscriptionSubmit'
>;

export default function SubscriptionForm({
  commissionPoolLimit,
  commissionPoolRemaining,
  plans,
  selectedPlan,
  amountInput,
  setAmountInput,
  handleDropdownChange,
  handleSubscriptionSubmit
}: SubscriptionFormProps) {
  return (
    <div className="space-y-6">
      <div className="w-full glass-card rounded-2xl p-4 sm:p-6 md:p-8">
        <h2 className="text-sm sm:text-base font-bold text-white mb-4 sm:mb-6 uppercase tracking-wider flex items-center gap-2">
          <Edit className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#cfbcff]" /> 认购详情确认
        </h2>

        <Form
          component="form"
          onSubmitCapture={handleSubscriptionSubmit}
          className="alliance-antd-subscribe-form grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
        >
          <div className="space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <Form.Item className="alliance-antd-subscribe-form-item" label="选择套餐方案">
                <Select
                  options={plans.map((plan) => ({
                    label: `${plan.name} - ${plan.price.toLocaleString()} USDT`,
                    value: plan.id,
                  }))}
                  onChange={handleDropdownChange}
                  value={selectedPlan.id}
                />
              </Form.Item>

              <Form.Item
                className="alliance-antd-subscribe-form-item is-amount"
                label="认购金额 (USDT)"
                extra={`最低认购门槛 ${selectedPlan.price} USDT`}
              >
                <Input
                  className="font-mono font-extrabold"
                  min={selectedPlan.price}
                  onChange={(e) => setAmountInput(parseFloat(e.target.value) || 0)}
                  suffix={<span className="text-xs text-[#cbc4d2] font-bold">USDT</span>}
                  type="number"
                  value={amountInput}
                />
              </Form.Item>
            </div>

            <div className="pt-3 sm:pt-4 space-y-2.5">
              <Button className="w-full min-h-[46px] font-extrabold uppercase tracking-wider" htmlType="submit" type="primary">
                确认认购并签署协议文件
              </Button>
              <p className="text-left text-xs text-[#cbc4d2]/40 select-none leading-relaxed">
                点击确认即代表您同意《理财参与协议》及相关全自理风险授权声明协议
              </p>
            </div>
          </div>

          <div className="bg-[#141218]/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3.5 border border-white/5 text-xs md:text-sm">
            <div className="space-y-3.5">
              <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                <span className="text-xs text-[#cbc4d2]/80">充值赠送比例</span>
                <span className="text-xs sm:text-sm font-bold text-[#cfbcff] font-mono">{selectedPlan.giftRatio}%</span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                <span className="text-xs text-[#cbc4d2]/80">立即买入 (70% 对应 TROO)</span>
                <span className="text-xs sm:text-sm font-bold text-white font-mono">{(amountInput * 0.7 * 10).toLocaleString('zh-CN')} TROO</span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                <span className="text-xs text-[#cbc4d2]/80">排队锁定 (31%)</span>
                <span className="text-xs sm:text-sm font-bold text-[#e7c365] font-mono">{(amountInput * 0.31).toLocaleString('zh-CN')} USDT</span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                <span className="text-xs text-[#cbc4d2]/80">佣金池增加放款额度</span>
                <span className="text-xs sm:text-sm font-bold text-emerald-400 font-mono">+${(selectedPlan.poolLimit * (amountInput / selectedPlan.price)).toLocaleString()}</span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-[#cbc4d2]/80">当前可用佣金池限额</span>
              <span className="text-xs font-black text-[#cfbcff] font-mono">
                {commissionPoolRemaining.toLocaleString()} / {commissionPoolLimit.toLocaleString()} USDT
              </span>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
