import './antd-overrides.css';
import '../shared/antd-overrides.css';
import AntdHeaderTabs from './components/AntdHeaderTabs';
import AntdLedgerPanel from './components/AntdLedgerPanel';
import AntdReservesPanel from './components/AntdReservesPanel';
import AntdWalletsPanel from './components/AntdWalletsPanel';
import LedgerDetailsModal from './components/LedgerDetailsModal';
import WalletDetailsModal from './components/WalletDetailsModal';
import WithdrawalAuditModal from './components/WithdrawalAuditModal';
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
    <div id="admin_finance_module" className="space-y-6 animate-fadeIn select-none flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-4">
      <div className="glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-6 flex-grow flex flex-col">
        <AntdHeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'reserves' && (
          <AntdReservesPanel
            pendingWithdrawals={pendingWithdrawals}
            withdrawalFee={WITHDRAWAL_FEE}
            companyUSDT={COMPANY_USDT}
            companyTROO={COMPANY_TROO}
            totalUserUSDT={totalUserUSDT}
            totalUserTROO={totalUserTROO}
            totalUserLocked={totalUserLocked}
            setSelectedWithdrawal={setSelectedWithdrawal}
            onApproveWithdrawal={onApproveWithdrawal}
            onRejectWithdrawal={onRejectWithdrawal}
          />
        )}

        {activeTab === 'wallets' && (
          <AntdWalletsPanel
            downlines={downlines}
            searchMemberQuery={searchMemberQuery}
            setSearchMemberQuery={setSearchMemberQuery}
            handleOpenWalletDetails={handleOpenWalletDetails}
          />
        )}

        {activeTab === 'ledger' && (
          <AntdLedgerPanel
            fullLedger={fullLedger}
            ledgerTypeFilter={ledgerTypeFilter}
            setLedgerTypeFilter={setLedgerTypeFilter}
            setSelectedLedgerItem={setSelectedLedgerItem}
            exportLedgerCSV={exportLedgerCSV}
          />
        )}
      </div>

      <LedgerDetailsModal
        selectedLedgerItem={selectedLedgerItem}
        setSelectedLedgerItem={setSelectedLedgerItem}
      />

      <WalletDetailsModal
        selectedWalletMember={selectedWalletMember}
        setSelectedWalletMember={setSelectedWalletMember}
        adjustUsdt={adjustUsdt}
        setAdjustUsdt={setAdjustUsdt}
        adjustTroo={adjustTroo}
        setAdjustTroo={setAdjustTroo}
        adjustFrozen={adjustFrozen}
        setAdjustFrozen={setAdjustFrozen}
        adjustStatus={adjustStatus}
        setAdjustStatus={setAdjustStatus}
        handleSaveWalletAdjustment={handleSaveWalletAdjustment}
      />

      <WithdrawalAuditModal
        selectedWithdrawal={selectedWithdrawal}
        setSelectedWithdrawal={setSelectedWithdrawal}
        withdrawalFee={WITHDRAWAL_FEE}
        onApproveWithdrawal={onApproveWithdrawal}
        onRejectWithdrawal={onRejectWithdrawal}
      />
    </div>
  );
}
