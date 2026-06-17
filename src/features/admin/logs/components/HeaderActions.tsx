import { Download, Plus, Terminal, Trash2 } from 'lucide-react';
import type { WorkspaceProps } from '../types';

type HeaderActionsProps = Pick<
  WorkspaceProps,
  | 'logs'
  | 'isExporting'
  | 'handleSimulateLog'
  | 'handleClearAllLogs'
  | 'handleExportLogs'
>;

export default function HeaderActions({
  logs,
  isExporting,
  handleSimulateLog,
  handleClearAllLogs,
  handleExportLogs
}: HeaderActionsProps) {
  return (
    <>
      {/* Top Welcome Title Grid */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Terminal className="w-6 h-6 text-[#cfbcff]" />
            操作日志与审计底册
          </h2>
          <p className="text-xs text-[#cbc4d2]/60 mt-1 font-semibold">
            安全守护级底层节点运维通道、多级管理员登录活动、核心分成及出账操作审计底册记录
          </p>
        </div>

        {/* Floating Quick Stats Indicators */}
        <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
          <button
            type="button"
            onClick={handleSimulateLog}
            className="px-4 py-2 bg-[#6750a4]/30 text-[#cfbcff] border border-[#cfbcff]/20 hover:bg-[#6750a4]/50 transition-all rounded-xl text-xs font-bold inline-flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            模拟产生动态事件
          </button>

          <button
            type="button"
            onClick={handleExportLogs}
            disabled={isExporting || logs.length === 0}
            className="px-4 py-2 bg-[#cfbcff]/10 text-[#cfbcff] hover:bg-[#cfbcff]/20 border border-[#cfbcff]/20 transition-all rounded-xl text-xs font-bold inline-flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            {isExporting ? '生成加密包...' : '导出审计底册'}
          </button>

          <button
            type="button"
            onClick={handleClearAllLogs}
            disabled={logs.length === 0}
            className="p-2 bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 transition-all rounded-xl border border-rose-500/20 flex items-center justify-center cursor-pointer active:scale-95 disabled:opacity-40 select-none"
            title="清空审计日志"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
