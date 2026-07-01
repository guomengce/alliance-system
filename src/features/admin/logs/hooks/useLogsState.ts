import { useEffect, useMemo, useState } from 'react';
import type { DownlineMember, Transaction } from '@/src/types';
import { createAdminLog, getAdminLogs } from '../../../../api/admin/logs';
import { useAppContext } from '../../../../context/AppContext';
import type { AdminLog } from '../types';
import { buildAdminLogs, filterAdminLogs } from '../utils';

interface UseLogsStateOptions {
  transactions: Transaction[];
  downlines: DownlineMember[];
}

export function useLogsState({ transactions, downlines }: UseLogsStateOptions) {
  const { triggerGlobalAlert } = useAppContext();
  const [initialLogs, setInitialLogs] = useState<AdminLog[]>([]);
  const [extraLogs, setExtraLogs] = useState<AdminLog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeDetailLog, setActiveDetailLog] = useState<AdminLog | null>(null);
  const [createdLogCount, setCreatedLogCount] = useState<number>(0);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    let mounted = true;

    getAdminLogs().then((logs) => {
      if (mounted) {
        setInitialLogs(logs);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const logs = useMemo(() => {
    return buildAdminLogs({
      initialLogs,
      extraLogs,
      transactions,
      downlines
    });
  }, [initialLogs, transactions, downlines, extraLogs]);

  const filteredLogs = useMemo(() => {
    return filterAdminLogs(logs, {
      searchQuery,
      selectedSeverity,
      selectedCategory
    });
  }, [logs, searchQuery, selectedSeverity, selectedCategory]);

  const handleSimulateLog = async () => {
    const log = await createAdminLog({ index: createdLogCount });
    setExtraLogs(prev => [log, ...prev]);
    setCreatedLogCount(prev => prev + 1);
  };

  const handleClearAllLogs = () => {
    if (window.confirm('确认清空当前内存中的审计日志吗？')) {
      setExtraLogs([]);
    }
  };

  const handleExportLogs = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      triggerGlobalAlert(`后台日志导出成功，本次共 ${filteredLogs.length} 条记录。`, 'success');
    }, 1500);
  };

  return {
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
  };
}
