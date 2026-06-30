import '../../shared/antd/commission-overrides.css';
import '../shared/antd-overrides.css';
import AntdDetailsPanel from './components/AntdDetailsPanel';
import AntdList from './components/AntdList';
import AntdSummaryCards from './components/AntdSummaryCards';
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
      <AntdSummaryCards
        totalCreditedAmount={totalCreditedAmount}
        abnormalAuditCount={abnormalAuditCount}
        totalOverflowAmount={totalOverflowAmount}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">
        <AntdList
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
        <AntdDetailsPanel
          selectedCommission={selectedCommission}
          onClose={() => setSelectedCommission(null)}
          onForcePayout={handleForcePayout}
          onSubmitCommissionAdjustment={handleSubmitCommissionAdjustment}
        />
      )}
    </div>
  );
}
