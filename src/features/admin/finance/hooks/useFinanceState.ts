import { useEffect, useState } from 'react';
import {
  approveAdminWithdrawal,
  getAdminFinanceLedger,
  getAdminFinanceMembers,
  getAdminFinanceWithdrawals,
  rejectAdminWithdrawal,
  updateAdminFinanceMember
} from '../../../../api/admin/finance';
import type { DownlineMember, Transaction } from '@/src/types';
import { useAppContext } from '../../../../context/AppContext';
import type { FinanceTab } from '../types';
import {
  applyWalletAdjustment,
  buildInitialLedger,
  buildLedgerCsvContent,
  createWalletAdjustmentTransaction,
  getTotalUserLocked,
  getTotalUserTROO,
  getTotalUserUSDT
} from '../utils';

export function useFinanceState(
  downlines: DownlineMember[],
  transactions: Transaction[],
  onUpdateDownlines?: (members: DownlineMember[]) => void
) {
  const { triggerGlobalAlert } = useAppContext();
  const [activeTab, setActiveTab] = useState<FinanceTab>('reserves');
  const [searchMemberQuery, setSearchMemberQuery] = useState('');
  const [ledgerTypeFilter, setLedgerTypeFilter] = useState<string>('all');
  const [searchLedgerQuery, setSearchLedgerQuery] = useState('');
  const [financeMembers, setFinanceMembers] = useState<DownlineMember[]>([]);
  const [fullLedger, setFullLedger] = useState<Transaction[]>([]);
  const [withdrawals, setWithdrawals] = useState<Transaction[]>([]);
  const [selectedLedgerItem, setSelectedLedgerItem] = useState<Transaction | null>(null);
  const [selectedWalletMember, setSelectedWalletMember] = useState<DownlineMember | null>(null);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<Transaction | null>(null);
  const [adjustUsdt, setAdjustUsdt] = useState<number>(0);
  const [adjustTroo, setAdjustTroo] = useState<number>(0);
  const [adjustFrozen, setAdjustFrozen] = useState<number>(0);
  const [adjustStatus, setAdjustStatus] = useState<string>('normal');

  useEffect(() => {
    let mounted = true;

    Promise.all([
      getAdminFinanceMembers(),
      getAdminFinanceLedger(),
      getAdminFinanceWithdrawals()
    ]).then(([members, ledger, withdrawalItems]) => {
      if (!mounted) return;
      setFinanceMembers(members);
      setFullLedger(buildInitialLedger(ledger));
      setWithdrawals(withdrawalItems);
      onUpdateDownlines?.(members);
    });

    return () => {
      mounted = false;
    };
  }, [onUpdateDownlines]);

  const sourceDownlines = financeMembers.length > 0 ? financeMembers : downlines;
  const totalUserUSDT = getTotalUserUSDT(sourceDownlines);
  const totalUserTROO = getTotalUserTROO(sourceDownlines);
  const totalUserLocked = getTotalUserLocked(sourceDownlines);

  const handleOpenWalletDetails = (member: DownlineMember) => {
    setSelectedWalletMember(member);
    setAdjustUsdt(member.usdtBalance || 0);
    setAdjustTroo(member.trooBalance || 0);
    setAdjustFrozen(member.frozenBalance || 0);
    setAdjustStatus(member.status || 'normal');
  };

  const handleSaveWalletAdjustment = async () => {
    if (!selectedWalletMember) return;

    await updateAdminFinanceMember(selectedWalletMember.uid, {
      usdtBalance: adjustUsdt,
      trooBalance: adjustTroo,
      frozenBalance: adjustFrozen,
      status: adjustStatus as DownlineMember['status']
    });

    const updated = applyWalletAdjustment(sourceDownlines, selectedWalletMember.uid, {
      usdtBalance: adjustUsdt,
      trooBalance: adjustTroo,
      frozenBalance: adjustFrozen,
      status: adjustStatus as DownlineMember['status']
    });

    setFinanceMembers(updated);
    onUpdateDownlines?.(updated);

    const newTx = createWalletAdjustmentTransaction(selectedWalletMember, adjustUsdt);

    setFullLedger(prev => [newTx, ...prev]);
    triggerGlobalAlert(`【人工财务纠偏对账成功】\n会员 ${selectedWalletMember.uid} 的资产池及状态已成功校对修改！余额更改记录已写至完整财务账簿日志中。`, 'success');
    setSelectedWalletMember(null);
  };

  const handleApproveWithdrawal = async (withdrawalId: string) => {
    const updatedWithdrawal = await approveAdminWithdrawal(withdrawalId);
    setWithdrawals(prev => prev.map(item => item.id === withdrawalId ? updatedWithdrawal : item));
    triggerGlobalAlert(`提现单 ${withdrawalId} 已审核通过`, 'success');
  };

  const handleRejectWithdrawal = async (withdrawalId: string) => {
    const updatedWithdrawal = await rejectAdminWithdrawal(withdrawalId);
    setWithdrawals(prev => prev.map(item => item.id === withdrawalId ? updatedWithdrawal : item));
    triggerGlobalAlert(`提现单 ${withdrawalId} 已驳回`, 'success');
  };

  const exportLedgerCSV = () => {
    const csvContent = `data:text/csv;charset=utf-8,${buildLedgerCsvContent(fullLedger)}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `comprehensive_finance_ledger_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    activeTab,
    adjustFrozen,
    adjustStatus,
    adjustTroo,
    adjustUsdt,
    fullLedger,
    handleOpenWalletDetails,
    handleApproveWithdrawal,
    handleRejectWithdrawal,
    handleSaveWalletAdjustment,
    ledgerTypeFilter,
    searchLedgerQuery,
    searchMemberQuery,
    selectedLedgerItem,
    selectedWalletMember,
    selectedWithdrawal,
    sourceDownlines,
    withdrawals,
    exportLedgerCSV,
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
