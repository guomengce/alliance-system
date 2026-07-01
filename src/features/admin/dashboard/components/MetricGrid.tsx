import AntdMetricCard from './AntdMetricCard';
import type { MetricGridProps } from '../types';

export default function MetricGrid({ cards }: MetricGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map(({ key, ...card }) => (
        <AntdMetricCard key={key} {...card} />
      ))}
    </div>
  );
}
