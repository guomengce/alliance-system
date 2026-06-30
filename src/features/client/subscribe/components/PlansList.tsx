import { Button, Tag } from 'antd';
import { Sparkles } from 'lucide-react';
import { AntdCard } from '../../../../shared/antd/AntdCard';
import type { WorkspaceProps } from '../types';

type PlansListProps = Pick<
  WorkspaceProps,
  | 'plans'
  | 'selectedPlan'
  | 'handleSelectPlan'
>;

const getPlanBorderTone = (borderStyle?: string) => {
  if (!borderStyle) return 'tone-default';
  if (borderStyle.includes('amber')) return 'tone-amber';
  if (borderStyle.includes('sky')) return 'tone-sky';
  if (borderStyle.includes('purple') || borderStyle.includes('#cfbcff')) return 'tone-purple';
  if (borderStyle.includes('slate')) return 'tone-slate';
  return 'tone-zinc';
};

export default function PlansList({
  plans,
  selectedPlan,
  handleSelectPlan
}: PlansListProps) {
  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {plans.map((plan) => {
        const isSelected = selectedPlan.id === plan.id;
        return (
          <AntdCard
            key={plan.id}
            className={`alliance-antd-subscribe-plan-card ${getPlanBorderTone(plan.borderStyle)} ${isSelected ? 'is-selected' : ''}`}
            onClick={() => handleSelectPlan(plan)}
          >
            <div className="p-5 sm:p-6 md:p-8 grid grid-cols-12 gap-5 lg:gap-6 items-center">
              <div className="col-span-12 lg:col-span-4 xl:col-span-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white tracking-tight">
                    {plan.name}
                  </h3>
                  {plan.isPopular && (
                    <Tag className="alliance-antd-subscribe-recommend-tag" icon={<Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />}>
                      推荐
                    </Tag>
                  )}
                </div>

                <p className="text-xs sm:text-[13px] text-[#cbc4d2]/85 leading-relaxed font-normal mt-0.5">
                  {plan.description}
                </p>

                <div className="mt-2.5 flex items-baseline gap-2">
                  <span className="text-xs text-[#cbc4d2]/60 uppercase font-black tracking-wide">起购门槛:</span>
                  <span className="text-xl sm:text-2xl font-mono font-black text-white tracking-tight">
                    {plan.price.toLocaleString()}
                  </span>
                  <span className="text-xs font-black text-[#cfbcff] font-mono">USDT</span>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-8 xl:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-6 xl:pl-8">
                <div className="flex flex-col justify-center bg-white/2 p-3 rounded-xl border border-white/5 transition-all hover:bg-white/5">
                  <span className="text-xs sm:text-xs font-bold text-[#cbc4d2]/50 uppercase mb-1 tracking-wider leading-tight">
                    佣金池放款额
                  </span>
                  <span className="text-xs sm:text-sm md:text-base lg:text-sm xl:text-lg font-mono font-black text-emerald-400">
                    ${plan.poolLimit.toLocaleString()}
                  </span>
                </div>

                <div className="flex flex-col justify-center bg-[#cfbcff]/2 p-3 rounded-xl border border-[#cfbcff]/5 transition-all hover:bg-[#cfbcff]/5 animate-none">
                  <span className="text-xs sm:text-xs font-bold text-[#cfbcff]/60 uppercase mb-1 tracking-wider leading-tight">
                    充值返赠比例
                  </span>
                  <span className="text-xs sm:text-sm md:text-base lg:text-sm xl:text-lg font-mono font-black text-[#cfbcff]">
                    +{plan.giftRatio}%
                  </span>
                </div>

                <div className="flex flex-col justify-center bg-white/2 p-3 rounded-xl border border-white/5 transition-all hover:bg-white/5">
                  <span className="text-xs sm:text-xs font-bold text-[#cbc4d2]/50 uppercase mb-1 tracking-wider leading-tight">
                    立即释放买入
                  </span>
                  <span className="text-xs sm:text-sm md:text-base lg:text-sm xl:text-lg font-mono font-black text-white">
                    {plan.releaseLimit}%
                  </span>
                </div>

                <div className="flex flex-col justify-center bg-white/2 p-3 rounded-xl border border-white/5 transition-all hover:bg-white/5">
                  <span className="text-xs sm:text-xs font-bold text-[#e7c365]/60 uppercase mb-1 tracking-wider leading-tight">
                    排队等待锁定
                  </span>
                  <span className="text-xs sm:text-sm md:text-base lg:text-sm xl:text-lg font-mono font-black text-[#e7c365]">
                    {plan.queueRelease}%
                  </span>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-12 xl:col-span-2 flex justify-end mt-2 lg:mt-4 xl:mt-0">
                <Button
                  className={`alliance-antd-subscribe-plan-button ${isSelected ? 'is-selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPlan(plan);
                  }}
                >
                  {isSelected ? '当前已选' : '立即选择'}
                </Button>
              </div>
            </div>
          </AntdCard>
        );
      })}
    </div>
  );
}
