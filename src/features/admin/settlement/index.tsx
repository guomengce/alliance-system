import '../shared/antd-overrides.css';
import './antd-overrides.css';
import AntdDetailModal from './components/AntdDetailModal';
import AntdHeaderActions from './components/AntdHeaderActions';
import AntdSettlementList from './components/AntdSettlementList';
import AntdWorkflowGuide from './components/AntdWorkflowGuide';
import { useSettlementState } from './hooks/useSettlementState';
import type { AdminSettlementViewProps } from './types';

export default function AdminSettlementView({ onUpdateBalances }: AdminSettlementViewProps) {
  const {
    manualSettleLoading,
    selectedTx,
    setSelectedTx,
    settlementTransactions,
    handleNotifyInsufficientCapacity,
    handleResolveException,
    triggerManualSettlement
  } = useSettlementState({ onUpdateBalances });

  return (
    <div id="admin_settlement_view" className="space-y-6 animate-fadeIn select-none flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-4">
      <div className="glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-6 flex-grow flex flex-col">
        <AntdHeaderActions
          manualSettleLoading={manualSettleLoading}
          triggerManualSettlement={triggerManualSettlement}
        />

        <AntdWorkflowGuide />

        <AntdSettlementList
          settlementTransactions={settlementTransactions}
          setSelectedTx={setSelectedTx}
        />
      </div>

      <AntdDetailModal
        selectedTx={selectedTx}
        setSelectedTx={setSelectedTx}
        handleResolveException={handleResolveException}
        handleNotifyInsufficientCapacity={handleNotifyInsufficientCapacity}
      />
    </div>
  );
}
