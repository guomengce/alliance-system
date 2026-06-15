import PageView from '../../../components/PageView';
import DownlineLedger from './components/DownlineLedger';
import Header from './components/Header';
import NetworkGraph from './components/NetworkGraph';
import PromoCard from './components/PromoCard';
import StatsGrid from './components/StatsGrid';
import { useTeamState } from './hooks/useTeamState';
import type { TeamViewProps } from './types';

export default function TeamView({ downlines }: TeamViewProps) {
  const {
    copiedLink,
    exporting,
    filteredDownlines,
    handleCopyInviteLink,
    handleExportData,
    levelFilter,
    searchQuery,
    setLevelFilter,
    setSearchQuery,
    setViewMode,
    viewMode
  } = useTeamState({ downlines });
  return (
    <PageView>
      {/* Page Title Header Section */}
      <Header />

      {/* Top row cards (4 columns overview) */}
      <StatsGrid />

      {/* Promo Center Full-width Card */}
      <PromoCard
        copiedLink={copiedLink}
        onCopyInviteLink={handleCopyInviteLink}
      />

      {/* Team Path and Graphical User Flow Node */}
      <NetworkGraph
        downlines={filteredDownlines}
        levelFilter={levelFilter}
        viewMode={viewMode}
        setLevelFilter={setLevelFilter}
        setViewMode={setViewMode}
      />

      {/* Downlines interactive structured ledger table */}
      <DownlineLedger
        downlines={filteredDownlines}
        searchQuery={searchQuery}
        exporting={exporting}
        setSearchQuery={setSearchQuery}
        onExportData={handleExportData}
      />
    </PageView>
  );
}
