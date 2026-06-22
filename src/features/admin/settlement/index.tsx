import { Workspace } from './components/Workspace';
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
    <Workspace
      settlementTransactions={settlementTransactions}
      manualSettleLoading={manualSettleLoading}
      selectedTx={selectedTx}
      setSelectedTx={setSelectedTx}
      handleResolveException={handleResolveException}
      handleNotifyInsufficientCapacity={handleNotifyInsufficientCapacity}
      triggerManualSettlement={triggerManualSettlement}
    />
  );
}
