import type { WorkspaceProps } from '../types';
import DetailModal from './DetailModal';
import FiltersPanel from './FiltersPanel';
import HeaderActions from './HeaderActions';
import LogsList from './LogsList';
import MetricsGrid from './MetricsGrid';

export default function Workspace({
  logs,
  filteredLogs,
  searchQuery,
  setSearchQuery,
  selectedSeverity,
  setSelectedSeverity,
  selectedCategory,
  setSelectedCategory,
  activeDetailLog,
  setActiveDetailLog,
  isExporting,
  handleSimulateLog,
  handleClearAllLogs,
  handleExportLogs
}: WorkspaceProps) {
  return (
    <div id="admin_logs_view" className="flex flex-col gap-6 animate-fadeIn">
      <HeaderActions
        logs={logs}
        isExporting={isExporting}
        handleSimulateLog={handleSimulateLog}
        handleClearAllLogs={handleClearAllLogs}
        handleExportLogs={handleExportLogs}
      />

      <MetricsGrid logs={logs} />

      <FiltersPanel
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedSeverity={selectedSeverity}
        setSelectedSeverity={setSelectedSeverity}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <LogsList
        logs={logs}
        filteredLogs={filteredLogs}
        setActiveDetailLog={setActiveDetailLog}
      />

      <DetailModal
        activeDetailLog={activeDetailLog}
        setActiveDetailLog={setActiveDetailLog}
      />
    </div>
  );
}
