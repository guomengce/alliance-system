import '../shared/antd-overrides.css';
import './antd-overrides.css';
import { AntdChartsGrid } from './components/AntdChartsGrid';
import { AntdHeader } from './components/AntdHeader';
import { AntdMetricsGrid } from './components/AntdMetricsGrid';
import { useReportsState } from './hooks/useReportsState';

export default function AdminReportsView() {
  const { exportMockCSV, reportData } = useReportsState();

  return (
    <div id="admin_reports_view" className="glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-6 animate-fadeIn flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-4">
      <AntdHeader onExportCSV={exportMockCSV} />

      {/* Metrics Section */}
      <AntdMetricsGrid metrics={reportData.metrics} />

      {/* visual elements */}
      <AntdChartsGrid
        distributionLogs={reportData.distributionLogs}
        packageSegments={reportData.packageSegments}
      />
    </div>
  );
}
