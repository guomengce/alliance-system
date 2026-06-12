import type { Dispatch, SetStateAction } from 'react';
import type { DownlineMember, Transaction } from '@/src/types';

export interface AdminFinanceViewProps {
  pendingWithdrawals: Transaction[];
  onApproveWithdrawal: (id: string) => void;
  onRejectWithdrawal: (id: string) => void;
  downlines: DownlineMember[];
  transactions: Transaction[];
  onUpdateDownlines?: (updatedList: DownlineMember[]) => void;
}

export type FinanceTab = 'reserves' | 'wallets' | 'ledger';

export interface WorkspaceProps {
  pendingWithdrawals: Transaction[];
  onApproveWithdrawal: (id: string) => void;
  onRejectWithdrawal: (id: string) => void;
  downlines: DownlineMember[];
  activeTab: FinanceTab;
  setActiveTab: Dispatch<SetStateAction<FinanceTab>>;
  searchMemberQuery: string;
  setSearchMemberQuery: Dispatch<SetStateAction<string>>;
  ledgerTypeFilter: string;
  setLedgerTypeFilter: Dispatch<SetStateAction<string>>;
  searchLedgerQuery: string;
  setSearchLedgerQuery: Dispatch<SetStateAction<string>>;
  companyUSDT: number;
  companyTROO: number;
  withdrawalFee: number;
  totalUserUSDT: number;
  totalUserTROO: number;
  totalUserLocked: number;
  fullLedger: Transaction[];
  selectedLedgerItem: Transaction | null;
  setSelectedLedgerItem: Dispatch<SetStateAction<Transaction | null>>;
  selectedWalletMember: DownlineMember | null;
  setSelectedWalletMember: Dispatch<SetStateAction<DownlineMember | null>>;
  selectedWithdrawal: Transaction | null;
  setSelectedWithdrawal: Dispatch<SetStateAction<Transaction | null>>;
  adjustUsdt: number;
  setAdjustUsdt: Dispatch<SetStateAction<number>>;
  adjustTroo: number;
  setAdjustTroo: Dispatch<SetStateAction<number>>;
  adjustFrozen: number;
  setAdjustFrozen: Dispatch<SetStateAction<number>>;
  adjustStatus: string;
  setAdjustStatus: Dispatch<SetStateAction<string>>;
  handleOpenWalletDetails: (member: DownlineMember) => void;
  handleSaveWalletAdjustment: () => void;
  exportLedgerCSV: () => void;
}
