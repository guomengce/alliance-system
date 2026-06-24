import { AntdCard } from '../../../../shared/antd/AntdCard';
import type { MetricsGridProps } from '../types';

export function AntdMetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <AntdCard key={metric.label} className="alliance-antd-report-metric-card">
          <span className="text-[10px] uppercase font-bold text-[#cbc4d2]/40 tracking-wider font-sans">{metric.label}</span>
          <p className={`text-xl font-bold font-mono ${metric.valueClassName} mt-1`}>{metric.value}</p>
          {metric.hint && <p className={`text-[10px] ${metric.hintClassName} mt-1`}>{metric.hint}</p>}
        </AntdCard>
      ))}
    </div>
  );
}
