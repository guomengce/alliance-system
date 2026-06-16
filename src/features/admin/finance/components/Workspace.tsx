import HeaderTabs from './HeaderTabs';
import LedgerPanel from './LedgerPanel';
import LedgerDetailsModal from './LedgerDetailsModal';
import ReservesPanel from './ReservesPanel';
import WalletDetailsModal from './WalletDetailsModal';
import WithdrawalAuditModal from './WithdrawalAuditModal';
import WalletsPanel from './WalletsPanel';
import type { WorkspaceProps } from '../types';

export default function Workspace({
  pendingWithdrawals,
  onApproveWithdrawal,
  onRejectWithdrawal,
  downlines,
  activeTab,
  setActiveTab,
  searchMemberQuery,
  setSearchMemberQuery,
  ledgerTypeFilter,
  setLedgerTypeFilter,
  searchLedgerQuery,
  setSearchLedgerQuery,
  companyUSDT,
  companyTROO,
  withdrawalFee,
  totalUserUSDT,
  totalUserTROO,
  totalUserLocked,
  fullLedger,
  selectedLedgerItem,
  setSelectedLedgerItem,
  selectedWalletMember,
  setSelectedWalletMember,
  selectedWithdrawal,
  setSelectedWithdrawal,
  adjustUsdt,
  setAdjustUsdt,
  adjustTroo,
  setAdjustTroo,
  adjustFrozen,
  setAdjustFrozen,
  adjustStatus,
  setAdjustStatus,
  handleOpenWalletDetails,
  handleSaveWalletAdjustment,
  exportLedgerCSV
}: WorkspaceProps) {
  return (
    <div id="admin_finance_module" className="space-y-6 animate-fadeIn select-none flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-4">
      <div className="glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-6 flex-grow flex flex-col">
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'reserves' && (
          <ReservesPanel
            pendingWithdrawals={pendingWithdrawals}
            withdrawalFee={withdrawalFee}
            companyUSDT={companyUSDT}
            companyTROO={companyTROO}
            totalUserUSDT={totalUserUSDT}
            totalUserTROO={totalUserTROO}
            totalUserLocked={totalUserLocked}
            setSelectedWithdrawal={setSelectedWithdrawal}
            onApproveWithdrawal={onApproveWithdrawal}
            onRejectWithdrawal={onRejectWithdrawal}
          />
        )}

        {activeTab === 'wallets' && (
          <WalletsPanel
            downlines={downlines}
            searchMemberQuery={searchMemberQuery}
            setSearchMemberQuery={setSearchMemberQuery}
            handleOpenWalletDetails={handleOpenWalletDetails}
          />
        )}

        {activeTab === 'ledger' && (
          <LedgerPanel
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
        withdrawalFee={withdrawalFee}
        onApproveWithdrawal={onApproveWithdrawal}
        onRejectWithdrawal={onRejectWithdrawal}
      />

    </div>
  );
}
