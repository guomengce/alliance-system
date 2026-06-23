import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

interface EChartPanelProps {
  className?: string;
  option: EChartsOption;
  onHoverIndexChange?: (index: number | null) => void;
}

export default function EChartPanel({
  className,
  option,
  onHoverIndexChange
}: EChartPanelProps) {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current, undefined, { renderer: 'canvas' });
    chart.setOption(option);

    const handleMouseOver = (params: { dataIndex?: number }) => {
      if (typeof params.dataIndex === 'number') {
        onHoverIndexChange?.(params.dataIndex);
      }
    };
    const handleMouseOut = () => {
      onHoverIndexChange?.(null);
    };
    const handleResize = () => chart.resize();

    chart.on('mouseover', handleMouseOver);
    chart.on('mouseout', handleMouseOut);
    window.addEventListener('resize', handleResize);

    return () => {
      chart.off('mouseover', handleMouseOver);
      chart.off('mouseout', handleMouseOut);
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [onHoverIndexChange, option]);

  return <div ref={chartRef} className={className} />;
}
