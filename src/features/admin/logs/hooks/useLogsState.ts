import { useState } from 'react';
import type { AdminLog } from '../types';

export function useLogsState() {
  const [extraLogs, setExtraLogs] = useState<AdminLog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeDetailLog, setActiveDetailLog] = useState<AdminLog | null>(null);
  const [simulatedCount, setSimulatedCount] = useState<number>(0);
  const [isExporting, setIsExporting] = useState(false);

  return {
    activeDetailLog,
    extraLogs,
    isExporting,
    searchQuery,
    selectedCategory,
    selectedSeverity,
    setActiveDetailLog,
    setExtraLogs,
    setIsExporting,
    setSearchQuery,
    setSelectedCategory,
    setSelectedSeverity,
    setSimulatedCount,
    simulatedCount
  };
}