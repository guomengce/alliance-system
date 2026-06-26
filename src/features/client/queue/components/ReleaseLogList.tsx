import { Clock } from 'lucide-react';
import type { ReleaseLogPanelProps } from '../types';

export default function ReleaseLogList({
  releaseLogs,
  visibleLogsCount,
  loadingMoreLogs,
  onLogsScroll,
  onLoadMoreLogs
}: ReleaseLogPanelProps) {
  return (
    <div className="lg:col-span-1 space-y-4 h-full">
      <div className="glass-card rounded-2xl p-5 bg-[#16131c] flex flex-col justify-between min-h-[400px] lg:min-h-[500px]">
        <div>
          <div className="flex items-center justify-between pb-3.5 border-b border-white/5 mb-5">
            <h4 className="text-sm font-semibold text-white tracking-wider flex items-center gap-2">
              买入/解锁记录 <span className="text-xs font-mono text-[#cbc4d2]/40 font-normal">({releaseLogs.length})</span>
            </h4>
            <Clock className="w-4 h-4 text-[#cbc4d2]/40" />
          </div>

          <div
            onScroll={onLogsScroll}
            className="max-h-[570px] overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-white/5 relative select-none space-y-6"
          >
            <div className="absolute top-2 bottom-6 left-[15.5px] w-px border-l border-dashed border-white/10 z-0"></div>

            <div className="space-y-6 relative z-10 pl-3">
              {releaseLogs.slice(0, visibleLogsCount).map((log) => (
                <div key={log.id} className="relative pl-5 flex flex-col gap-1">
                  <span className="absolute left-[0.2px] top-1.5 w-1.5 h-1.5 rounded-full border border-[#cfbcff]/60 bg-[#16131c]"></span>

                  <div className="flex justify-between items-center text-xs font-mono text-[#cbc4d2]/40 tracking-wide">
                    <span>{log.date}</span>
                    <span className="text-[#cfbcff]/50 font-bold">{log.id}</span>
                  </div>
                  <p className="text-xs text-[#cbc4d2] font-semibold leading-relaxed">
                    {log.desc}
                  </p>
                </div>
              ))}
            </div>

            {loadingMoreLogs && (
              <div className="flex items-center justify-center py-2 gap-1 ml-4 text-xs text-[#cbc4d2]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cfbcff] animate-pulse"></span>
                <span>载入更早记录中...</span>
              </div>
            )}

            {!loadingMoreLogs && visibleLogsCount < releaseLogs.length && (
              <div className="text-center pt-2 pl-4">
                <button
                  type="button"
                  onClick={onLoadMoreLogs}
                  className="text-xs font-bold text-[#cfbcff]/40 hover:text-[#cfbcff] font-mono tracking-wider transition-colors cursor-pointer py-1 px-3 rounded-lg border border-white/5 bg-white/[0.01]"
                >
                  滚动/点击加载更多
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
