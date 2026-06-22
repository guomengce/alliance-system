import { useState } from 'react';
import {
  getInitialAdminSettlementLogs,
  getInitialAdminSettlementTransactions
} from '../../../../api/admin/settlement';
import type { SettlementItem, SettleLog } from '../types';

export function useSettlementState() {
  const [settlementLogs, setSettlementLogs] = useState<SettleLog[]>(() => getInitialAdminSettlementLogs());
  const [settlementTransactions, setSettlementTransactions] = useState<SettlementItem[]>(
    () => getInitialAdminSettlementTransactions()
  );
  const [manualSettleLoading, setManualSettleLoading] = useState<boolean>(false);
  const [selectedTx, setSelectedTx] = useState<SettlementItem | null>(null);

  return {
    manualSettleLoading,
    selectedTx,
    setManualSettleLoading,
    setSelectedTx,
    setSettlementLogs,
    setSettlementTransactions,
    settlementLogs,
    settlementTransactions
  };
}
