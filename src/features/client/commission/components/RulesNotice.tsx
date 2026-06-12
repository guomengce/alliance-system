import { HelpCircle } from 'lucide-react';

export default function RulesNotice() {
  return (
    <div className="bg-[#cfbcff]/5 border border-[#cfbcff]/20 rounded-2xl p-5 flex items-start gap-4">
      <HelpCircle className="w-6 h-6 text-[#cfbcff] shrink-0 mt-0.5" />
      <div className="space-y-1 text-xs text-[#cbc4d2]">
        <h5 className="font-extrabold text-[#cfbcff] text-sm mb-1 uppercase">佣金计算说明 (结算细则)</h5>
        <p className="leading-relaxed">
          1. <span className="text-white font-bold">D+1 自动结算：</span> 所有产生的返还佣金均在下线成功认购次日 (D+1) 凌晨 2:00 进行系统自动汇总结算并入账至您的资产钱包中。<br />
          2. <span className="text-white font-bold">额度同步扩展：</span> 您的最高结算额度伴随着团队下线成员的认购扩增而自动更新扩展，确保划转流程通畅运行。<br />
          3. <span className="text-white font-bold">自动化流程保障：</span> 智能合约自动执行，日结数据汇总上链后即秒级到账，透明公开且免除了传统的提现审核等待与人工干预。
        </p>
      </div>
    </div>
  );
}
