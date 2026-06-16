import type { Transaction } from '../types';
import { useAdminBusinessState } from './useAdminBusinessState';
import { useAppShellState } from './useAppShellState';
import { useAuthState } from './useAuthState';
import { useClientBusinessState } from './useClientBusinessState';
import { useGlobalAlertState } from './useGlobalAlertState';

export function useAppState() {
  const globalAlertState = useGlobalAlertState();
  const appShellState = useAppShellState();
  const authState = useAuthState(appShellState.portalMode);
  const clientBusinessState = useClientBusinessState();
  const {
    addTransactionRecord,
    refundUsdtBalance,
    ...clientBusiness
  } = clientBusinessState;
  const adminBusinessState = useAdminBusinessState({
    addTransactionRecord,
    refundUsdtBalance
  });
  const {
    addPendingWithdrawal,
    ...adminBusiness
  } = adminBusinessState;

  const handleAddTransaction = (newTxn: Transaction) => {
    addTransactionRecord(newTxn);
    if (newTxn.type === 'withdraw' && newTxn.status === 'pending') {
      addPendingWithdrawal(newTxn);
    }
  };

  return {
    ...globalAlertState,
    ...appShellState,
    ...authState,
    ...clientBusiness,
    ...adminBusiness,
    handleAddTransaction
  };
}
