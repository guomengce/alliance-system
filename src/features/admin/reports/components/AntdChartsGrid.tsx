import { Progress } from 'antd';

import { AntdCard } from '../../../../shared/antd/AntdCard';
import type { ChartsGridProps, PackageSegment } from '../types';

const TEXT = {
  packageTitle: '\u5957\u9910\u5927\u5b97\u8ba4\u8d2d\u6bd4\u4f8b\u997c\u56fe\u5206\u6790',
  logTitle: '\u8054\u76dfD+1\u5206\u6da6\u53d1\u653e\u8bb0\u5f55\uff08\u6700\u8fd1\u4e09\u6708\uff09',
  total: 'D+1\u5927\u76d8\u8d26\u9762\u6d41\u8f6c\u91cf',
};

function getProgressPercent(segment: PackageSegment) {
  const match = segment.barWidth.match(/w-\[(\d+)%\]/);
  if (match) return Number(match[1]);
  const value = Number.parseFloat(segment.val);
  return Number.isNaN(value) ? 0 : value;
}

function getProgressStrokeColor(segment: PackageSegment) {
  if (segment.color.includes('emerald')) return '#34d399';
  if (segment.color.includes('amber')) return '#f59e0b';
  if (segment.color.includes('purple') || segment.color.includes('cfbcff')) return '#cfbcff';
  return '#60a5fa';
}

export function AntdChartsGrid({ distributionLogs, packageSegments }: ChartsGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <AntdCard className="alliance-antd-report-chart-card">
        <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4 pb-2 border-b border-white/5 font-sans">{TEXT.packageTitle}</h4>
        <div className="space-y-3">
          {packageSegments.map((item) => (
            <div key={item.label} className="text-xs space-y-1 font-sans">
              <div className="flex justify-between font-bold text-[#cbc4d2]/85">
                <span>{item.label}</span>
                <span className="font-mono text-white">{item.val}</span>
              </div>
              <Progress
                className="alliance-antd-report-progress"
                percent={getProgressPercent(item)}
                showInfo={false}
                strokeColor={getProgressStrokeColor(item)}
                trailColor="#110e16"
                size={['100%', 10]}
              />
            </div>
          ))}
        </div>
      </AntdCard>

      <AntdCard className="alliance-antd-report-chart-card">
        <h4 className="text-xs font-black text-white uppercase tracking-wider pb-2 border-b border-white/5 font-sans">{TEXT.logTitle}</h4>
        <div className="space-y-3.5 pt-4">
          {distributionLogs.map((log) => (
            <div key={log.period} className="flex justify-between items-center text-xs bg-[#211c2b]/50 p-3 rounded-xl border border-white/2 font-sans">
              <div className="space-y-1">
                <p className="font-bold text-white">{log.period}</p>
                <p className="text-[10px] text-[#cbc4d2]/50 font-mono">
                  {TEXT.total}: {log.total} ({log.count})
                </p>
              </div>
              <div className="text-right">
                <p className="font-extrabold text-emerald-400 font-mono">{log.profit}</p>
                <span className="text-[9px] text-[#cfbcff] font-bold">{log.status}</span>
              </div>
            </div>
          ))}
        </div>
      </AntdCard>
    </div>
  );
}
