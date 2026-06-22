import { ChartsGrid } from './components/ChartsGrid';
import { Header } from './components/Header';
import { MetricsGrid } from './components/MetricsGrid';
import { useReportsState } from './hooks/useReportsState';

export default function AdminReportsView() {
  const { exportMockCSV } = useReportsState();

  return (
    <div id="admin_reports_view" className="glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-6 animate-fadeIn flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-4">
      <Header onExportCSV={exportMockCSV} />

      {/* Metrics Section */}
      <MetricsGrid />

      {/* visual elements */}
      <ChartsGrid />
    </div>
  );
}
