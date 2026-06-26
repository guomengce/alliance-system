import type { ProgressCardProps } from '../types';

export default function ProgressVisualization({
  originalLocked,
  releasedAmount,
  remainingLocked,
  overallProgressPercent
}: ProgressCardProps) {
  return (
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden bg-[#16131c]">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#7c4dff]/5 to-transparent rounded-bl-full pointer-events-none"></div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="text-white text-lg font-black tracking-tight">买入及解锁进度可视化</h3>
          <p className="text-xs text-[#cbc4d2]/60 mt-0.5 font-medium">
            实时追踪您的理财方案从排队锁定到完全解锁并成份买入 TROO 股票的流转状态
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="text-2xl md:text-3.5xl font-black font-mono text-[#cfbcff] block leading-none tracking-tight">
            {overallProgressPercent}%
          </span>
          <span className="text-xs text-[#cbc4d2]/40 font-bold uppercase tracking-widest font-mono">
            OVERALL PROGRESS
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="relative pb-3 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#cbc4d2]/60 tracking-wide">
            原始锁定金额 (31%)
          </span>
          <p className="text-2xl font-black font-mono text-white mt-1.5 tracking-tight">
            ¥ {originalLocked.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 rounded-full"></div>
        </div>

        <div className="relative pb-3 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#cbc4d2]/60 tracking-wide">
            已解锁买入金额
          </span>
          <p className="text-2xl font-black font-mono text-[#cfbcff] mt-1.5 tracking-tight">
            ¥ {releasedAmount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 rounded-full"></div>
        </div>

        <div className="relative pb-3 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#cbc4d2]/60 tracking-wide">
            剩余锁定
          </span>
          <p className="text-2xl font-black font-mono text-white mt-1.5 tracking-tight">
            ¥ {remainingLocked.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 rounded-full"></div>
        </div>
      </div>

      <div className="w-full bg-[#100d14] rounded-full h-2.5 overflow-hidden border border-white/[0.02]">
        <div
          className="bg-[#cfbcff] h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${overallProgressPercent}%` }}
        />
      </div>
    </div>
  );
}
