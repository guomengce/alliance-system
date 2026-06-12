import { useState } from 'react';
import PageView from '../../../components/PageView';
import DownlineLedger from './components/DownlineLedger';
import Header from './components/Header';
import NetworkGraph from './components/NetworkGraph';
import PromoCard from './components/PromoCard';
import StatsGrid from './components/StatsGrid';
import type { TeamViewProps } from './types';
import { filterDownlines } from './utils';

export default function TeamView({ downlines }: TeamViewProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [copiedUid, setCopiedUid] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [exporting, setExporting] = useState<boolean>(false);

  // Filter list
  const filteredDownlines = filterDownlines(downlines, levelFilter, searchQuery);

  const handleCopyUid = (uid: string) => {
    navigator.clipboard?.writeText(uid);
    setCopiedUid(uid);
    setTimeout(() => setCopiedUid(null), 2000);
  };

  const handleCopyInviteLink = () => {
    navigator.clipboard?.writeText('https://alliance-system.console/register?ref=8898218-X');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleExportData = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      alert('团队数据报表已生成并准备导出 (Downline_Ledger_Export.csv)');
    }, 1500);
  };

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
