import { useState } from 'react';
import type { SettlementItem, SettleLog } from '../types';
import { INITIAL_SETTLEMENT_LOGS, INITIAL_SETTLEMENT_TRANSACTIONS } from '../utils';

export function useSettlementState() {
  const [settlementLogs, setSettlementLogs] = useState<SettleLog[]>(INITIAL_SETTLEMENT_LOGS);
  const [settlementTransactions, setSettlementTransactions] = useState<SettlementItem[]>(INITIAL_SETTLEMENT_TRANSACTIONS);
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