import { Activity, Clock, Database, Globe } from 'lucide-react';

import { AntdCard } from '@/src/shared/antd/AntdCard';
import type { WorkspaceProps } from '../types';

type MetricsGridProps = Pick<WorkspaceProps, 'logs'>;

const TEXT = {
  total: '\u5f53\u524d\u65e5\u5fd7\u603b\u6570',
  security: '\u4eca\u65e5\u5b89\u5168\u62e6\u622a',
  ips: '\u5f02\u5730\u7ba1\u7406\u5458IP',
  heartbeat: '\u65e5\u5fd7\u66f4\u65b0\u5fc3\u8df3',
  itemUnit: '\u6761',
  countUnit: '\u6b21',
  ipUnit: '\u4e2a',
  live: '\u6b63\u5e38 (LIVE)',
};

export default function AntdMetricsGrid({ logs }: MetricsGridProps) {
  const securityCount = logs.filter(log => log.severity === 'critical' || log.category === 'security').length;
  const ipCount = new Set(logs.map(log => log.ipAddress)).size;

  const metrics = [
    {
      label: TEXT.total,
      value: `${logs.length} ${TEXT.itemUnit}`,
      icon: <Database className="w-5 h-5 text-[#cfbcff]/70" />,
      valueClassName: 'text-white',
    },
    {
      label: TEXT.security,
      value: `${securityCount} ${TEXT.countUnit}`,
      icon: <Activity className="w-5 h-5 text-amber-500/70 animate-pulse" />,
      valueClassName: 'text-amber-400',
    },
    {
      label: TEXT.ips,
      value: `${ipCount} ${TEXT.ipUnit}`,
      icon: <Globe className="w-5 h-5 text-emerald-500/70" />,
      valueClassName: 'text-emerald-400',
    },
    {
      label: TEXT.heartbeat,
      value: TEXT.live,
      icon: <Clock className="w-5 h-5 text-sky-500/70" />,
      valueClassName: 'text-sky-400',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {metrics.map(metric => (
        <AntdCard key={metric.label} className="alliance-antd-logs-metric-card">
          <div className="text-xs text-[#cbc4d2]/50 font-black uppercase tracking-wider">
            {metric.label}
          </div>
          <div className={`text-lg sm:text-2xl font-mono font-black mt-1.5 flex items-center gap-2 ${metric.valueClassName}`}>
            {metric.icon}
            {metric.value}
          </div>
        </AntdCard>
      ))}
    </div>
  );
}
