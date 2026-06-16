import { Database } from 'lucide-react';
import { getCategoryBadge, getSeverityBadge } from '../utils';
import type { WorkspaceProps } from '../types';

type LogsListProps = Pick<
  WorkspaceProps,
  | 'logs'
  | 'filteredLogs'
  | 'setActiveDetailLog'
>;

export default function LogsList({
  logs,
  filteredLogs,
  setActiveDetailLog
}: LogsListProps) {
  return (
    <>
      {/* Main Logs Table / Card Grid container */}
      <div className="bg-[#16121c]/90 border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        {/* 1. Desktop structured table layout (visible only at screen >= lg) */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="border-b border-white/5 bg-[#201b2a]/30 text-[10px] text-[#cbc4d2]/50 uppercase tracking-wider font-extrabold select-none">
                <th className="py-4 px-5 w-[14%]">流水ID</th>
                <th className="py-4 px-4 w-[16%]">时间戳</th>
                <th className="py-4 px-4 w-[15%]">审计模块</th>
                <th className="py-4 px-4 w-[18%]">操作人 (Operator)</th>
                <th className="py-4 px-4 w-[27%]">操作事项 (Action Event)</th>
                <th className="py-4 px-4 w-[10%] text-center">状态底册</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 bg-white/2 rounded-2xl border border-white/5 flex items-center justify-center text-[#cbc4d2]/30">
                        <Database className="w-6 h-6" />
                      </div>
                      <p className="text-[#cbc4d2]/40 text-xs font-semibold">没有检索到任何符合条件的联盟审计日志记录</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr 
                    key={log.id}
                    onClick={() => setActiveDetailLog(log)}
                    className="border-b border-white/2 hover:bg-white/[0.02] cursor-pointer transition-colors group"
                  >
                    <td className="py-3.5 px-5 select-all font-mono text-xs font-black text-[#cfbcff] group-hover:underline truncate" title={log.id}>
                      {log.id}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-[#cbc4d2]/60 whitespace-nowrap">
                      {log.timestamp.replace(/^\d{4}-/, '')}
                    </td>
                    <td className="py-3.5 px-4 truncate">
                      <span className={`px-2 py-0.5 border rounded-lg text-[11px] font-black tracking-wide leading-0 whitespace-nowrap ${getCategoryBadge(log.category)}`}>
                        {log.moduleName}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-black text-white truncate" title={log.operator}>
                      {log.operator}
                    </td>
                    <td className="py-3.5 px-4 text-xs">
                      <p className="font-extrabold text-white text-[13px] leading-tight group-hover:text-[#cfbcff] transition-colors truncate" title={log.action}>
                        {log.action}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className={`px-2.5 py-1 text-[9.5px] uppercase font-black tracking-wider rounded-md inline-flex items-center justify-center min-w-[72px] leading-none ${getSeverityBadge(log.severity)}`}>
                        {log.severity}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 2. Responsive Cards layout stack (visible only on screen < lg) */}
        <div className="block lg:hidden divide-y divide-white/5">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 bg-white/2 rounded-2xl border border-white/5 flex items-center justify-center text-[#cbc4d2]/30 animate-pulse">
                  <Database className="w-6 h-6" />
                </div>
                <p className="text-[#cbc4d2]/40 text-xs font-semibold">没有检索到任何符合条件的联盟审计日志记录</p>
              </div>
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div 
                key={log.id}
                onClick={() => setActiveDetailLog(log)}
                className="p-4 sm:p-5 hover:bg-white/[0.02] cursor-pointer transition-colors flex flex-col gap-3 group active:bg-white/[0.04]"
              >
                {/* ID badge and Categories Header Row */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-[#cfbcff] lg:group-hover:underline">
                      {log.id}
                    </span>
                    <span className="h-3 w-px bg-white/10" />
                    <span className="text-[10px] text-[#cbc4d2]/45 font-mono">{log.timestamp.replace(/^\d{4}-/, '')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`px-1.5 py-0.5 border rounded text-[9px] font-black tracking-wide leading-none whitespace-nowrap ${getCategoryBadge(log.category)}`}>
                      {log.moduleName}
                    </span>
                    <span className={`px-1.5 py-0.5 text-[8.5px] uppercase font-black tracking-wider rounded inline-flex leading-none ${getSeverityBadge(log.severity)}`}>
                      {log.severity}
                    </span>
                  </div>
                </div>

                {/* Brief description column */}
                <div className="space-y-1 text-left">
                  <h4 className="font-extrabold text-white text-[13px] sm:text-sm group-hover:text-[#cfbcff] transition-colors leading-snug truncate">
                    {log.action}
                  </h4>
                </div>

                {/* Footer specs metadata */}
                <div className="flex items-center justify-between text-[10.5px] text-[#cbc4d2]/40 font-semibold border-t border-white/5 pt-2 mt-0.5 flex-wrap gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-white/45">Operator:</span>
                    <span className="text-[#cfbcff] font-bold font-mono truncate max-w-[150px] sm:max-w-none">{log.operator}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Statistics bottom footer */}
        <div className="p-4 bg-[#201b2a]/20 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#cbc4d2]/40 select-none">
          <div className="font-semibold text-center sm:text-left">
            展示 {filteredLogs.length} 条过滤审计项 （当前数据库池驻留：{logs.length} 个事件）
          </div>
          <div className="font-mono text-[10px]">
            Node Signature: SECURE_WAF_LOGGER_V3B
          </div>
        </div>
      </div>
    </>
  );
}
