import { AntdCard } from '@/src/shared/antd/AntdCard';
import type { MetricCardProps } from '../types';

export default function AntdMetricCard({ title, value, sub, colorClass = 'text-white' }: MetricCardProps) {
  return (
    <AntdCard className="alliance-antd-dashboard-metric-card group">
      <div className="absolute right-3 top-3 w-8 h-8 rounded-full bg-white/2 flex items-center justify-center font-mono text-[9px] text-white/25">KPI</div>
      <p className="text-[10.5px] uppercase tracking-wider font-bold text-[#cbc4d2]/50">{title}</p>
      <p className={`text-xl font-bold font-mono mt-2 ${colorClass}`}>{value}</p>
      <p className="text-[10px] text-[#cbc4d2]/40 mt-1.5 leading-none">{sub}</p>
    </AntdCard>
  );
}
