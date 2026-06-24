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
  const chartInstanceRef = useRef<ReturnType<typeof echarts.init> | null>(null);
  const hoverHandlerRef = useRef(onHoverIndexChange);

  useEffect(() => {
    hoverHandlerRef.current = onHoverIndexChange;
  }, [onHoverIndexChange]);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current, undefined, { renderer: 'canvas' });
    chartInstanceRef.current = chart;

    const handleMouseOver = (params: { dataIndex?: number }) => {
      if (typeof params.dataIndex === 'number') {
        hoverHandlerRef.current?.(params.dataIndex);
      }
    };
    const handleMouseOut = () => {
      hoverHandlerRef.current?.(null);
    };
    const handleResize = () => chart.resize();

    chart.on('mouseover', handleMouseOver);
    chart.on('mouseout', handleMouseOut);
    window.addEventListener('resize', handleResize);

    return () => {
      chart.off('mouseover', handleMouseOver);
      chart.off('mouseout', handleMouseOut);
      window.removeEventListener('resize', handleResize);
      chartInstanceRef.current = null;
      chart.dispose();
    };
  }, []);

  useEffect(() => {
    chartInstanceRef.current?.setOption(option, {
      lazyUpdate: true,
      notMerge: true
    });
  }, [option]);

  return <div ref={chartRef} className={className} />;
}
