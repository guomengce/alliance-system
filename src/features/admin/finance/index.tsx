import type { DownlineMember, Transaction } from '@/src/types';
import Workspace from './components/Workspace';
import { useFinanceState } from './hooks/useFinanceState';
import type { AdminFinanceViewProps } from './types';
import {
  COMPANY_TROO,
  COMPANY_USDT,
  WITHDRAWAL_FEE,
  applyWalletAdjustment,
  buildLedgerCsvContent,
  createWalletAdjustmentTransaction
} from './utils';

export default function AdminFinanceView({
  pendingWithdrawals,
  onApproveWithdrawal,
  onRejectWithdrawal,
  downlines,
  transactions,
  onUpdateDownlines
}: AdminFinanceViewProps) {
  const {
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
  } = useFinanceState(downlines, transactions);

  const handleOpenWalletDetails = (member: DownlineMember) => {
    setSelectedWalletMember(member);
    setAdjustUsdt(member.usdtBalance || 0);
    setAdjustTroo(member.trooBalance || 0);
    setAdjustFrozen(member.frozenBalance || 0);
    setAdjustStatus(member.status || 'normal');
  };

  // Submit manual wallet changes to parents/local list
  const handleSaveWalletAdjustment = () => {
    if (!selectedWalletMember) return;
    
    const updated = applyWalletAdjustment(downlines, selectedWalletMember.uid, {
      usdtBalance: adjustUsdt,
      trooBalance: adjustTroo,
      frozenBalance: adjustFrozen,
      status: adjustStatus as DownlineMember['status']
    });

    if (onUpdateDownlines) {
      onUpdateDownlines(updated);
    }
    
    // Also log a transaction record to full ledger
    const newTx = createWalletAdjustmentTransaction(selectedWalletMember, adjustUsdt);
    
    setFullLedger(prev => [newTx, ...prev]);
    alert(`【人工财务纠偏对账成功】\n会员 ${selectedWalletMember.uid} 的资产池及状态已成功校对修改！余额更改记录已写至完整财务账簿日志中。`);
    setSelectedWalletMember(null);
  };

  // Export report as CSV
  const exportLedgerCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += buildLedgerCsvContent(fullLedger);
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `comprehensive_finance_ledger_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Workspace
      pendingWithdrawals={pendingWithdrawals}
      onApproveWithdrawal={onApproveWithdrawal}
      onRejectWithdrawal={onRejectWithdrawal}
      downlines={downlines}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      searchMemberQuery={searchMemberQuery}
      setSearchMemberQuery={setSearchMemberQuery}
      ledgerTypeFilter={ledgerTypeFilter}
      setLedgerTypeFilter={setLedgerTypeFilter}
      searchLedgerQuery={searchLedgerQuery}
      setSearchLedgerQuery={setSearchLedgerQuery}
      companyUSDT={COMPANY_USDT}
      companyTROO={COMPANY_TROO}
      withdrawalFee={WITHDRAWAL_FEE}
      totalUserUSDT={totalUserUSDT}
      totalUserTROO={totalUserTROO}
      totalUserLocked={totalUserLocked}
      fullLedger={fullLedger}
      selectedLedgerItem={selectedLedgerItem}
      setSelectedLedgerItem={setSelectedLedgerItem}
      selectedWalletMember={selectedWalletMember}
      setSelectedWalletMember={setSelectedWalletMember}
      selectedWithdrawal={selectedWithdrawal}
      setSelectedWithdrawal={setSelectedWithdrawal}
      adjustUsdt={adjustUsdt}
      setAdjustUsdt={setAdjustUsdt}
      adjustTroo={adjustTroo}
      setAdjustTroo={setAdjustTroo}
      adjustFrozen={adjustFrozen}
      setAdjustFrozen={setAdjustFrozen}
      adjustStatus={adjustStatus}
      setAdjustStatus={setAdjustStatus}
      handleOpenWalletDetails={handleOpenWalletDetails}
      handleSaveWalletAdjustment={handleSaveWalletAdjustment}
      exportLedgerCSV={exportLedgerCSV}
    />
  );
}
