import DetailsPanel from './components/DetailsPanel';
import List from './components/List';
import SummaryCards from './components/SummaryCards';
import { useCommissionsState } from './hooks/useCommissionsState';

export default function AdminCommissionsView() {
  const {
    abnormalAuditCount,
    activeTab,
    commissionSearch,
    filteredCommissions,
    handleForcePayout,
    handleSubmitCommissionAdjustment,
    selectedCommission,
    setActiveTab,
    setCommissionSearch,
    setSelectedCommission,
    totalCreditedAmount,
    totalOverflowAmount
  } = useCommissionsState();

  return (
    <div id="admin_commissions_view" className="space-y-4 animate-fadeIn select-none flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-3">
      <SummaryCards
        totalCreditedAmount={totalCreditedAmount}
        abnormalAuditCount={abnormalAuditCount}
        totalOverflowAmount={totalOverflowAmount}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">
        <List
          filteredCommissions={filteredCommissions}
          commissionSearch={commissionSearch}
          onCommissionSearchChange={setCommissionSearch}
          onClearSearch={() => setCommissionSearch('')}
          activeTab={activeTab}
          onActiveTabChange={setActiveTab}
          onSelectCommission={setSelectedCommission}
        />
      </div>

      {selectedCommission && (
        <DetailsPanel
          selectedCommission={selectedCommission}
          onClose={() => setSelectedCommission(null)}
          onForcePayout={handleForcePayout}
          onSubmitCommissionAdjustment={handleSubmitCommissionAdjustment}
        />
      )}
    </div>
  );
}
