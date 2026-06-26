import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

interface EChartPanelProps {
  className?: string;
  hoverDataLength?: number;
  option: EChartsOption;
  onHoverIndexChange?: (index: number | null) => void;
}

export default function EChartPanel({
  className,
  hoverDataLength,
  option,
  onHoverIndexChange
}: EChartPanelProps) {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = useRef<ReturnType<typeof echarts.init> | null>(null);
  const hoverHandlerRef = useRef(onHoverIndexChange);
  const hoverDataLengthRef = useRef(hoverDataLength);

  useEffect(() => {
    hoverHandlerRef.current = onHoverIndexChange;
  }, [onHoverIndexChange]);

  useEffect(() => {
    hoverDataLengthRef.current = hoverDataLength;
  }, [hoverDataLength]);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current, undefined, { renderer: 'canvas' });
    chartInstanceRef.current = chart;

    const handleChartMouseOver = (params: { dataIndex?: number }) => {
      if (typeof params.dataIndex === 'number') {
        hoverHandlerRef.current?.(params.dataIndex);
      }
    };
    const handleCanvasMouseMove = (event: { offsetX: number; offsetY: number }) => {
      const length = hoverDataLengthRef.current;
      if (!length || !chart.containPixel({ gridIndex: 0 }, [event.offsetX, event.offsetY])) {
        hoverHandlerRef.current?.(null);
        return;
      }

      const point = chart.convertFromPixel({ gridIndex: 0 }, [event.offsetX, event.offsetY]);
      const xValue = Array.isArray(point) ? Number(point[0]) : Number(point);
      if (!Number.isFinite(xValue)) return;

      const nextIndex = Math.min(Math.max(Math.round(xValue), 0), length - 1);
      hoverHandlerRef.current?.(nextIndex);
    };
    const handleMouseOut = () => {
      hoverHandlerRef.current?.(null);
    };
    const handleResize = () => chart.resize();

    chart.on('mouseover', handleChartMouseOver);
    chart.getZr().on('mousemove', handleCanvasMouseMove);
    chart.getZr().on('mouseout', handleMouseOut);
    window.addEventListener('resize', handleResize);

    return () => {
      chart.off('mouseover', handleChartMouseOver);
      chart.getZr().off('mousemove', handleCanvasMouseMove);
      chart.getZr().off('mouseout', handleMouseOut);
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
