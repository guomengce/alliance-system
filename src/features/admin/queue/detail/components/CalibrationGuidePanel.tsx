import { DollarSign, Sliders } from 'lucide-react';

export function CalibrationGuidePanel() {
  return (
        <div className="lg:col-span-4 bg-[#1a1622] rounded-2xl p-5 border border-white/5 flex flex-col justify-between text-left h-fit space-y-6">
          <div className="space-y-4">
            <h4 className="text-xs font-black text-[#f1bf50] flex items-center gap-1.5 uppercase tracking-wider font-sans border-b border-white/5 pb-2">
              <Sliders className="w-4 h-4 text-[#f1bf50]" />
              <span>智能校对监控规范</span>
            </h4>
            <div className="text-xs text-[#cbc4d2]/70 space-y-4 leading-relaxed font-sans">
              <p>
                排队队列由<strong> 10% </strong>直推触发机制秒级交割。当您的下级成员认购成功，智能合约将立即执行出水动作，对冲并减免相应的排队待释放量。
              </p>
              <div className="p-3 bg-[#110e16] rounded-xl border border-white/5 space-y-2">
                <p className="font-extrabold text-white text-[10.5px]">📊 本单解锁实名对账式</p>
                <p className="text-[10px] leading-relaxed text-[#cbc4d2]/60">
                  若直辖一代玩家下单退款或由于财务特殊流转需要纠正，可进入修改模式手工修正，剩余锁仓与解锁额将在用户客户端无延迟刷新。
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#6750a4]/5 border border-[#6750a4]/10 rounded-xl text-xs text-[#cbc4d2] space-y-1.5 font-sans">
            <p className="font-bold text-[#cfbcff] flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-[#cfbcff]" />
              <span>结算风控提示</span>
            </p>
            <p className="text-[#cbc4d2]/75 leading-relaxed text-[11px]">
              所有的手工修正行为均会生成独特的 `TRIG-CAL` 校正对齐流水单号进行归档，多核账簿保持链上线下逻辑全一致。
            </p>
          </div>
        </div>
  );
}
