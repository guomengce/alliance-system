import { ChartsGrid } from './components/ChartsGrid';
import { Header } from './components/Header';
import { MetricsGrid } from './components/MetricsGrid';
import { buildSettlementCsv } from './utils';

export default function AdminReportsView() {
  const exportMockCSV = () => {
    const csvContent = buildSettlementCsv();
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `settlement_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
