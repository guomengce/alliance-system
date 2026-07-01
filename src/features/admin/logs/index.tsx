import '../shared/antd-overrides.css';
import './antd-overrides.css';
import AntdDetailModal from './components/AntdDetailModal';
import AntdFiltersPanel from './components/AntdFiltersPanel';
import AntdHeaderActions from './components/AntdHeaderActions';
import AntdLogsList from './components/AntdLogsList';
import AntdMetricsGrid from './components/AntdMetricsGrid';
import { useLogsState } from './hooks/useLogsState';
import type { AdminLogsViewProps } from './types';

export default function AdminLogsView({ transactions = [], downlines = [] }: AdminLogsViewProps) {
  const {
    activeDetailLog,
    filteredLogs,
    handleClearAllLogs,
    handleExportLogs,
    handleSimulateLog,
    isExporting,
    logs,
    searchQuery,
    selectedCategory,
    selectedSeverity,
    setActiveDetailLog,
    setSearchQuery,
    setSelectedCategory,
    setSelectedSeverity
  } = useLogsState({ transactions, downlines });

  return (
    <div id="admin_logs_view" className="flex flex-col gap-6 animate-fadeIn">
      <AntdHeaderActions
        logs={logs}
        isExporting={isExporting}
        handleSimulateLog={handleSimulateLog}
        handleClearAllLogs={handleClearAllLogs}
        handleExportLogs={handleExportLogs}
      />

      <AntdMetricsGrid logs={logs} />

      <AntdFiltersPanel
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedSeverity={selectedSeverity}
        setSelectedSeverity={setSelectedSeverity}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <AntdLogsList
        logs={logs}
        filteredLogs={filteredLogs}
        setActiveDetailLog={setActiveDetailLog}
      />

      <AntdDetailModal
        activeDetailLog={activeDetailLog}
        setActiveDetailLog={setActiveDetailLog}
      />
    </div>
  );
}
