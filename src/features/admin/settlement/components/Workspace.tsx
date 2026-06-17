import type { WorkspaceProps } from '../types';
import DetailModal from './DetailModal';
import HeaderActions from './HeaderActions';
import SettlementList from './SettlementList';
import WorkflowGuide from './WorkflowGuide';

export function Workspace({
  settlementTransactions,
  manualSettleLoading,
  selectedTx,
  setSelectedTx,
  handleResolveException,
  handleNotifyInsufficientCapacity,
  triggerManualSettlement
}: WorkspaceProps) {

  return (
    <div id="admin_settlement_view" className="space-y-6 animate-fadeIn select-none flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-4">
      <div className="glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-6 flex-grow flex flex-col">
        <HeaderActions
          manualSettleLoading={manualSettleLoading}
          triggerManualSettlement={triggerManualSettlement}
        />

        <WorkflowGuide />

        <SettlementList
          settlementTransactions={settlementTransactions}
          setSelectedTx={setSelectedTx}
        />
      </div>

      <DetailModal
        selectedTx={selectedTx}
        setSelectedTx={setSelectedTx}
        handleResolveException={handleResolveException}
        handleNotifyInsufficientCapacity={handleNotifyInsufficientCapacity}
      />

    </div>
  );
}
