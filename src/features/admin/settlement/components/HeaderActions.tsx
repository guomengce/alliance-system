import { RefreshCw } from 'lucide-react';
import type { WorkspaceProps } from '../types';

type HeaderActionsProps = Pick<
  WorkspaceProps,
  | 'manualSettleLoading'
  | 'triggerManualSettlement'
>;

export default function HeaderActions({
  manualSettleLoading,
  triggerManualSettlement
}: HeaderActionsProps) {
  return (
    <>
      {/* Upper header action area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
        <div>
          <h3 className="text-sm md:text-base font-black text-white tracking-tight flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-[#cfbcff]" />
            <span>结算列表</span>
          </h3>
          <p className="text-[11px] text-[#cbc4d2]/50 mt-0.5 leading-tight">
            浏览与检索所有会员 D+1 结算日志、扣税明细、手动触发全盟自动结算扣缴及超额回笼对账。
          </p>
        </div>
        <button
          type="button"
          disabled={manualSettleLoading}
          onClick={triggerManualSettlement}
          className="bg-gradient-to-r from-[#6750a4] to-[#cfbcff] text-white px-4 py-2.5 rounded-xl text-xs font-bold active:scale-95 disabled:opacity-50 transition-all cursor-pointer flex items-center gap-1.5 shadow-lg shadow-[#6750a4]/15"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${manualSettleLoading ? 'animate-spin' : ''}`} />
          <span>{manualSettleLoading ? '正在核算中...' : '启动全盟结算对账'}</span>
        </button>
      </div>
    </>
  );
}
