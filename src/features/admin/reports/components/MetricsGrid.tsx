import type { MetricsGridProps } from '../types';

export function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-[#1c1824] border border-white/5 p-4 rounded-xl">
          <span className="text-[10px] uppercase font-bold text-[#cbc4d2]/40 tracking-wider font-sans">{metric.label}</span>
          <p className={`text-xl font-bold font-mono ${metric.valueClassName} mt-1`}>{metric.value}</p>
          {metric.hint && <p className={`text-[10px] ${metric.hintClassName} mt-1`}>{metric.hint}</p>}
        </div>
      ))}
    </div>
  );
}
