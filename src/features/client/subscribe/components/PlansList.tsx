import { Sparkles } from 'lucide-react';
import type { WorkspaceProps } from '../types';

type PlansListProps = Pick<
  WorkspaceProps,
  | 'plans'
  | 'selectedPlan'
  | 'handleSelectPlan'
>;

export default function PlansList({
  plans,
  selectedPlan,
  handleSelectPlan
}: PlansListProps) {
  return (
    <>
      {/* 1. Plans Selection Area (Vertical High Fidelity Rows - with high contrast purple triggers) */}
      <div className="flex flex-col gap-4 sm:gap-5">
        {plans.map((plan) => {
          const isSelected = selectedPlan.id === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => handleSelectPlan(plan)}
              className={`p-5 sm:p-6 md:p-8 rounded-2xl grid grid-cols-12 gap-5 lg:gap-6 items-center cursor-pointer border transition-all duration-300 relative ${
                isSelected 
                  ? 'bg-gradient-to-br from-[#6750a4]/20 to-[#cfbcff]/5 border-[#cfbcff] ring-2 ring-[#cfbcff]/50 shadow-2xl scale-[1.015] glow-accent' 
                  : `bg-[#1a1620]/75 ${plan.borderStyle || 'border-white/5'} hover:border-[#cfbcff]/30`
              }`}
            >
              {/* Left Column: Plan information and Tier identity */}
              <div className="col-span-12 lg:col-span-4 xl:col-span-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white tracking-tight">
                    {plan.name}
                  </h3>
                  {plan.isPopular && (
                    <span className="px-2.5 py-0.5 bg-gradient-to-r from-[#6750a4] to-[#cfbcff] text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider rounded-md flex items-center gap-1 shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" /> 推荐
                    </span>
                  )}
                </div>
                
                <p className="text-xs sm:text-[13px] text-[#cbc4d2]/85 leading-relaxed font-normal mt-0.5">
                  {plan.description}
                </p>

                <div className="mt-2.5 flex items-baseline gap-2">
                  <span className="text-[11px] text-[#cbc4d2]/60 uppercase font-black tracking-wide">起购门槛:</span>
                  <span className="text-xl sm:text-2xl font-mono font-black text-white tracking-tight">
                    {plan.price.toLocaleString()}
                  </span>
                  <span className="text-xs font-black text-[#cfbcff] font-mono">USDT</span>
                </div>
              </div>

              {/* Middle Column: Specs comparison (super prominent stats bento grids without overflow) */}
              <div className="col-span-12 lg:col-span-8 xl:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-6 xl:pl-8">
                {/* Spec 1: 佣金池放款额 */}
                <div className="flex flex-col justify-center bg-white/2 p-3 rounded-xl border border-white/5 transition-all hover:bg-white/5">
                  <span className="text-[10px] sm:text-xs font-bold text-[#cbc4d2]/50 uppercase mb-1 tracking-wider leading-tight">
                    佣金池放款额
                  </span>
                  <span className="text-xs sm:text-sm md:text-base lg:text-sm xl:text-lg font-mono font-black text-emerald-400">
                    ¥{plan.poolLimit.toLocaleString()}
                  </span>
                </div>

                {/* Spec 2: 充值返赠比例 */}
                <div className="flex flex-col justify-center bg-[#cfbcff]/2 p-3 rounded-xl border border-[#cfbcff]/5 transition-all hover:bg-[#cfbcff]/5 animate-none">
                  <span className="text-[10px] sm:text-xs font-bold text-[#cfbcff]/60 uppercase mb-1 tracking-wider leading-tight">
                    充值返赠比例
                  </span>
                  <span className="text-xs sm:text-sm md:text-base lg:text-sm xl:text-lg font-mono font-black text-[#cfbcff]">
                    +{plan.giftRatio}%
                  </span>
                </div>

                {/* Spec 3: 立即释放买入 */}
                <div className="flex flex-col justify-center bg-white/2 p-3 rounded-xl border border-white/5 transition-all hover:bg-white/5">
                  <span className="text-[10px] sm:text-xs font-bold text-[#cbc4d2]/50 uppercase mb-1 tracking-wider leading-tight">
                    立即释放买入
                  </span>
                  <span className="text-xs sm:text-sm md:text-base lg:text-sm xl:text-lg font-mono font-black text-white">
                    {plan.releaseLimit}%
                  </span>
                </div>

                {/* Spec 4: 排队等候锁定 */}
                <div className="flex flex-col justify-center bg-white/2 p-3 rounded-xl border border-white/5 transition-all hover:bg-white/5">
                  <span className="text-[10px] sm:text-xs font-bold text-[#e7c365]/60 uppercase mb-1 tracking-wider leading-tight">
                    排队等候锁定
                  </span>
                  <span className="text-xs sm:text-sm md:text-base lg:text-sm xl:text-lg font-mono font-black text-[#e7c365]">
                    {plan.queueRelease}%
                  </span>
                </div>
              </div>

              {/* Right Column: Interactive Trigger Button */}
              <div className="col-span-12 lg:col-span-12 xl:col-span-2 flex justify-end mt-2 lg:mt-4 xl:mt-0">
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPlan(plan);
                  }}
                  className={`w-full xl:w-28 py-2.5 sm:py-3 px-5 rounded-xl text-xs sm:text-[13px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-lg hover:translate-y-[-1px] active:translate-y-[0px] ${
                    isSelected 
                      ? 'bg-gradient-to-r from-[#6750a4] to-[#cfbcff] text-white shadow-[#6750a4]/30 border border-[#cfbcff]/40' 
                      : 'bg-white/5 text-[#cbc4d2] hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {isSelected ? '当前已选' : '立即选择'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
