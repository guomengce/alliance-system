import { Activity, Clock, Database, Globe } from 'lucide-react';
import type { WorkspaceProps } from '../types';

type MetricsGridProps = Pick<
  WorkspaceProps,
  | 'logs'
>;

export default function MetricsGrid({
  logs
}: MetricsGridProps) {
  return (
    <>
      {/* Central Quick Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-[#16121c] p-4 rounded-2xl border border-white/5">
          <div className="text-[10px] text-[#cbc4d2]/50 font-black uppercase tracking-wider">当前日志总数</div>
          <div className="text-lg sm:text-2xl font-mono font-black text-white mt-1.5 flex items-center gap-2">
            <Database className="w-5 h-5 text-[#cfbcff]/70" />
            {logs.length} 条
          </div>
        </div>

        <div className="bg-[#16121c] p-4 rounded-2xl border border-white/5">
          <div className="text-[10px] text-[#cbc4d2]/50 font-black uppercase tracking-wider">今日安全拦截</div>
          <div className="text-lg sm:text-2xl font-mono font-black text-amber-400 mt-1.5 flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-500/70 animate-pulse" />
            {logs.filter(l => l.severity === 'critical' || l.category === 'security').length} 次
          </div>
        </div>

        <div className="bg-[#16121c] p-4 rounded-2xl border border-white/5">
          <div className="text-[10px] text-[#cbc4d2]/50 font-black uppercase tracking-wider">异地管理员IP</div>
          <div className="text-lg sm:text-2xl font-mono font-black text-emerald-400 mt-1.5 flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-500/70" />
            {new Set(logs.map(l => l.ipAddress)).size} 个
          </div>
        </div>

        <div className="bg-[#16121c] p-4 rounded-2xl border border-white/5">
          <div className="text-[10px] text-[#cbc4d2]/50 font-black uppercase tracking-wider">日志更新心跳</div>
          <div className="text-lg sm:text-2xl font-mono font-black text-sky-400 mt-1.5 flex items-center gap-2">
            <Clock className="w-5 h-5 text-sky-500/70" />
            正常 (LIVE)
          </div>
        </div>
      </div>
    </>
  );
}
