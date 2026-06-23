import type { ChartsGridProps } from '../types';

export function ChartsGrid({ distributionLogs, packageSegments }: ChartsGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-[#1a1622] rounded-2xl p-5 border border-white/5">
        <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4 pb-2 border-b border-white/5 font-sans">套餐大宗认购比例饼图分析</h4>
        <div className="space-y-3">
          {packageSegments.map((item, idx) => (
            <div key={idx} className="text-xs space-y-1 font-sans">
              <div className="flex justify-between font-bold text-[#cbc4d2]/85">
                <span>{item.label}</span>
                <span className="font-mono text-white">{item.val}</span>
              </div>
              <div className="w-full bg-[#110e16] h-2.5 rounded-full overflow-hidden">
                <div className={`h-full ${item.color} rounded-full ${item.barWidth}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#1a1622] rounded-2xl p-5 border border-white/5 space-y-4">
        <h4 className="text-xs font-black text-white uppercase tracking-wider pb-2 border-b border-white/5 font-sans">联盟D+1分润发放记录（最近三期）</h4>
        <div className="space-y-3.5">
          {distributionLogs.map((log, index) => (
            <div key={index} className="flex justify-between items-center text-xs bg-[#211c2b]/50 p-3 rounded-xl border border-white/2 font-sans">
              <div className="space-y-1">
                <p className="font-bold text-white">{log.period}</p>
                <p className="text-[10px] text-[#cbc4d2]/50 font-mono">D+1大盘账面流转量：{log.total} ({log.count})</p>
              </div>
              <div className="text-right">
                <p className="font-extrabold text-emerald-400 font-mono">{log.profit}</p>
                <span className="text-[9px] text-[#cfbcff] font-bold">{log.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
