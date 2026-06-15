import { useState } from 'react';
import type { DownlineMember, Transaction } from '@/src/types';
import type { FinanceTab } from '../types';
import {
  buildInitialLedger,
  getTotalUserLocked,
  getTotalUserTROO,
  getTotalUserUSDT
} from '../utils';

export function useFinanceState(downlines: DownlineMember[], transactions: Transaction[]) {
  const [activeTab, setActiveTab] = useState<FinanceTab>('reserves');
  const [searchMemberQuery, setSearchMemberQuery] = useState('');
  const [ledgerTypeFilter, setLedgerTypeFilter] = useState<string>('all');
  const [searchLedgerQuery, setSearchLedgerQuery] = useState('');
  const [fullLedger, setFullLedger] = useState<Transaction[]>(buildInitialLedger(transactions));
  const [selectedLedgerItem, setSelectedLedgerItem] = useState<Transaction | null>(null);
  const [selectedWalletMember, setSelectedWalletMember] = useState<DownlineMember | null>(null);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<Transaction | null>(null);
  const [adjustUsdt, setAdjustUsdt] = useState<number>(0);
  const [adjustTroo, setAdjustTroo] = useState<number>(0);
  const [adjustFrozen, setAdjustFrozen] = useState<number>(0);
  const [adjustStatus, setAdjustStatus] = useState<string>('normal');

  const totalUserUSDT = getTotalUserUSDT(downlines);
  const totalUserTROO = getTotalUserTROO(downlines);
  const totalUserLocked = getTotalUserLocked(downlines);

  return {
    activeTab,
    adjustFrozen,
    adjustStatus,
    adjustTroo,
    adjustUsdt,
    fullLedger,
    ledgerTypeFilter,
    searchLedgerQuery,
    searchMemberQuery,
    selectedLedgerItem,
    selectedWalletMember,
    selectedWithdrawal,
    setActiveTab,
    setAdjustFrozen,
    setAdjustStatus,
    setAdjustTroo,
    setAdjustUsdt,
    setFullLedger,
    setLedgerTypeFilter,
    setSearchLedgerQuery,
    setSearchMemberQuery,
    setSelectedLedgerItem,
    setSelectedWalletMember,
    setSelectedWithdrawal,
    totalUserLocked,
    totalUserTROO,
    totalUserUSDT
  };
}