import { createAppStateValue } from './createAppStateValue';
import { useAdminBusinessState } from './useAdminBusinessState';
import { useAppShellState } from './useAppShellState';
import { useAuthState } from './useAuthState';
import { useClientBusinessState } from './useClientBusinessState';
import { useGlobalAlertState } from './useGlobalAlertState';

export function useAppState() {
  const globalAlertState = useGlobalAlertState();
  const appShellState = useAppShellState();
  const authState = useAuthState(appShellState.portalMode);
  const clientBusinessState = useClientBusinessState({
    triggerGlobalAlert: globalAlertState.triggerGlobalAlert
  });
  const adminBusinessState = useAdminBusinessState({
    addTransactionRecord: clientBusinessState.addTransactionRecord,
    refundUsdtBalance: clientBusinessState.refundUsdtBalance,
    triggerGlobalAlert: globalAlertState.triggerGlobalAlert
  });

  return createAppStateValue({
    globalAlertState,
    appShellState,
    authState,
    clientBusinessState,
    adminBusinessState
  });
}
