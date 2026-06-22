import Workspace from './components/Workspace';
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
    <Workspace
      logs={logs}
      filteredLogs={filteredLogs}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      selectedSeverity={selectedSeverity}
      setSelectedSeverity={setSelectedSeverity}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      activeDetailLog={activeDetailLog}
      setActiveDetailLog={setActiveDetailLog}
      isExporting={isExporting}
      handleSimulateLog={handleSimulateLog}
      handleClearAllLogs={handleClearAllLogs}
      handleExportLogs={handleExportLogs}
    />
  );
}
