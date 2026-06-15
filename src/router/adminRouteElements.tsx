import type { ReactElement, ReactNode } from 'react';
import AdminBroadcastView from '../features/admin/broadcast';
import AdminCommissionsView from '../features/admin/commissions';
import AdminDashboardView from '../features/admin/dashboard';
import AdminFinanceView from '../features/admin/finance';
import AdminLogsView from '../features/admin/logs';
import AdminOrdersView from '../features/admin/orders';
import AdminParametersView from '../features/admin/parameters';
import AdminPlansView from '../features/admin/plans';
import AdminProfileView from '../features/admin/profile';
import AdminQueueView from '../features/admin/queue';
import AdminRbacView from '../features/admin/rbac';
import AdminReportsView from '../features/admin/reports';
import AdminSettlementView from '../features/admin/settlement';
import AdminUsersView from '../features/admin/users';
import { useAppContext } from '../context/AppContext';
import type { AppStateContext } from '../layouts/MainLayout/types';

type AdminRouteElementFactory = (state: AppStateContext) => ReactElement;

const routePageFrame = (children: ReactNode): ReactElement => (
  <div className="flex flex-col flex-grow w-full">
    {children}
  </div>
);

const adminRouteElementFactories: Record<string, AdminRouteElementFactory> = {
  'admin-dashboard': ({ usdtBalance, lockedQueueAmount }) => routePageFrame(
    <AdminDashboardView usdtBalance={usdtBalance} lockedQueueAmount={lockedQueueAmount} />
  ),
  'admin-users': ({ downlines, setDownlines }) => routePageFrame(
    <AdminUsersView downlines={downlines} onUpdateDownlines={setDownlines} />
  ),
  'admin-plans': () => routePageFrame(
    <AdminPlansView />
  ),
  'admin-orders': () => routePageFrame(
    <AdminOrdersView />
  ),
  'admin-commissions': () => routePageFrame(
    <AdminCommissionsView />
  ),
  'admin-queue': () => routePageFrame(
    <AdminQueueView />
  ),
  'admin-settlement': ({ handleUpdateBalances }) => routePageFrame(
    <AdminSettlementView onUpdateBalances={handleUpdateBalances} />
  ),
  'admin-finance': ({
    pendingWithdrawals,
    handleApproveWithdrawal,
    handleRejectWithdrawal,
    downlines,
    transactions
  }) => routePageFrame(
    <AdminFinanceView
      pendingWithdrawals={pendingWithdrawals}
      onApproveWithdrawal={handleApproveWithdrawal}
      onRejectWithdrawal={handleRejectWithdrawal}
      downlines={downlines}
      transactions={transactions}
    />
  ),
  'admin-parameters': () => routePageFrame(
    <AdminParametersView />
  ),
  'admin-broadcast': ({ handleAddNotification }) => routePageFrame(
    <AdminBroadcastView onAddNotification={handleAddNotification} />
  ),
  'admin-rbac': () => routePageFrame(
    <AdminRbacView />
  ),
  'admin-reports': () => routePageFrame(
    <AdminReportsView />
  ),
  'admin-logs': ({ transactions, downlines }) => routePageFrame(
    <AdminLogsView transactions={transactions} downlines={downlines} />
  ),
  'admin-profile': (state) => routePageFrame(
    <AdminProfileView
      uid={state.currentUid}
      nickname={state.nickname}
      email={state.email}
      loginPasswordVal={state.loginPassword}
      onUpdateNickname={(newName: string) => state.setNickname(newName)}
      onUpdateEmail={(newEmail: string) => state.setEmail(newEmail)}
      onUpdatePassword={(newPw: string) => state.setLoginPassword(newPw)}
      onLogout={state.onLogout}
    />
  )
};

interface AdminRouteElementProps {
  routeId: string;
}

export function AdminRouteElement({ routeId }: AdminRouteElementProps) {
  const state = useAppContext();
  const renderRouteElement = adminRouteElementFactories[routeId];

  return renderRouteElement ? renderRouteElement(state) : null;
}