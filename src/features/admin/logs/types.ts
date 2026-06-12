import type { Dispatch, SetStateAction } from 'react';
import type { DownlineMember, Transaction } from '@/src/types';

export interface AdminLog {
  id: string;
  timestamp: string;
  operator: string;
  category: 'security' | 'finance' | 'operation' | 'system';
  severity: 'info' | 'warn' | 'error' | 'critical';
  ipAddress: string;
  moduleName: string;
  action: string;
  details: string;
  payload?: string;
}

export interface AdminLogsViewProps {
  transactions?: Transaction[];
  downlines?: DownlineMember[];
}

export interface WorkspaceProps {
  logs: AdminLog[];
  filteredLogs: AdminLog[];
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  selectedSeverity: string;
  setSelectedSeverity: Dispatch<SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  activeDetailLog: AdminLog | null;
  setActiveDetailLog: Dispatch<SetStateAction<AdminLog | null>>;
  isExporting: boolean;
  handleSimulateLog: () => void;
  handleClearAllLogs: () => void;
  handleExportLogs: () => void;
}
