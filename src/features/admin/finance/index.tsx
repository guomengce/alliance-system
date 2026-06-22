import Workspace from './components/Workspace';
import { useFinanceState } from './hooks/useFinanceState';
import type { AdminFinanceViewProps } from './types';
import {
  COMPANY_TROO,
  COMPANY_USDT,
  WITHDRAWAL_FEE
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
    exportLedgerCSV,
    fullLedger,
    handleOpenWalletDetails,
    handleSaveWalletAdjustment,
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
    setLedgerTypeFilter,
    setSearchLedgerQuery,
    setSearchMemberQuery,
    setSelectedLedgerItem,
    setSelectedWalletMember,
    setSelectedWithdrawal,
    totalUserLocked,
    totalUserTROO,
    totalUserUSDT
  } = useFinanceState(downlines, transactions, onUpdateDownlines);

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
