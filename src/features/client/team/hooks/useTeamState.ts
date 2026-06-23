import { useState } from 'react';
import { useAppContext } from '../../../../context/AppContext';
import type { DownlineMember } from '../../../../types';
import { filterDownlines } from '../utils';

interface UseTeamStateParams {
  downlines: DownlineMember[];
}

export const useTeamState = ({ downlines }: UseTeamStateParams) => {
  const { triggerGlobalAlert } = useAppContext();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [copiedUid, setCopiedUid] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [exporting, setExporting] = useState<boolean>(false);
  const notifyInfo = (message: string) => triggerGlobalAlert(message, 'info');

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
      notifyInfo('鍥㈤槦鏁版嵁鎶ヨ〃宸茬敓鎴愬苟鍑嗗瀵煎嚭 (Downline_Ledger_Export.csv)');
    }, 1500);
  };

  return {
    copiedLink,
    copiedUid,
    exporting,
    filteredDownlines,
    handleCopyInviteLink,
    handleCopyUid,
    handleExportData,
    levelFilter,
    searchQuery,
    setLevelFilter,
    setSearchQuery,
    setViewMode,
    viewMode
  };
};
