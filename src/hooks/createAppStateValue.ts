import type { Transaction } from '../types';
import type { useAdminBusinessState } from './useAdminBusinessState';
import type { useAppShellState } from './useAppShellState';
import type { useAuthState } from './useAuthState';
import type { useClientBusinessState } from './useClientBusinessState';
import type { useGlobalAlertState } from './useGlobalAlertState';

type GlobalAlertState = ReturnType<typeof useGlobalAlertState>;
type AppShellState = ReturnType<typeof useAppShellState>;
type AuthState = ReturnType<typeof useAuthState>;
type ClientBusinessState = ReturnType<typeof useClientBusinessState>;
type AdminBusinessState = ReturnType<typeof useAdminBusinessState>;

interface CreateAppStateValueParams {
  globalAlertState: GlobalAlertState;
  appShellState: AppShellState;
  authState: AuthState;
  clientBusinessState: ClientBusinessState;
  adminBusinessState: AdminBusinessState;
}

export function createAppStateValue({
  globalAlertState,
  appShellState,
  authState,
  clientBusinessState,
  adminBusinessState
}: CreateAppStateValueParams) {
  const {
    addTransactionRecord,
    refundUsdtBalance,
    ...clientBusiness
  } = clientBusinessState;
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
