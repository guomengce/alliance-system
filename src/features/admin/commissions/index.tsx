import DetailsPanel from './components/DetailsPanel';
import List from './components/List';
import SummaryCards from './components/SummaryCards';
import { useCommissionsState } from './hooks/useCommissionsState';

export default function AdminCommissionsView() {
  const {
    abnormalAuditCount,
    activeTab,
    commissionSearch,
    commissions,
    filteredCommissions,
    overflowLogs,
    selectedCommission,
    setActiveTab,
    setCommissionSearch,
    setCommissions,
    setOverflowLogs,
    setSelectedCommission,
    totalCreditedAmount,
    totalOverflowAmount
  } = useCommissionsState();

  // Manual Intervention to resolve errors / force payout bypass
  const handleForcePayout = (payoutId: string) => {
    setCommissions(prev => prev.map(c => {
      if (c.id === payoutId) {
        return { ...c, status: 'credited', errorMessage: undefined };
      }
      return c;
    }));
    // Remove from overflow tracker if active
    const targetComp = commissions.find(c => c.id === payoutId);
    if (targetComp) {
      setOverflowLogs(prev => prev.filter(l => !(l.memberUid === targetComp.uid && l.orderId === targetComp.orderId)));
    }
    alert(`【系统异常人工处理成功】\n已强制 bypass 对应上线代理的佣金限额池拦截，强写该条收益划账业务！\n\n已划归金额: ${targetComp?.amount} USDT\n交割渠道已成功变更为「平台内置账户钱包余额」并增加存池！`);
    setSelectedCommission(null);
  };

  // Adjusting commission parameters / retry under pool limit bypass
  const handleAdjustCommissionAmount = (payoutId: string, secureNewAmount: number) => {
    setCommissions(prev => prev.map(c => {
      if (c.id === payoutId) {
        return { ...c, amount: secureNewAmount, status: 'credited', errorMessage: undefined };
      }
      return c;
    }));
    alert(`【人工参数修正对算成功】\n已成功将佣金实发金额修正降低为 ${secureNewAmount} USDT (刚好不突破该代理人的额度限制)。状态已自动恢复为“已入账划账”。`);
    setSelectedCommission(null);
  };


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
          onAdjustCommissionAmount={handleAdjustCommissionAmount}
        />
      )}
    </div>
  );
}
