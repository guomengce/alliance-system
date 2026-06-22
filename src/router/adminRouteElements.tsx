import { Suspense, type ReactElement, type ReactNode } from 'react';
import { useAppContext } from '../context/AppContext';
import type { AppStateContext } from '../layouts/MainLayout/types';
import { ADMIN_PAGE_COMPONENTS } from './pageLoaders';

type AdminRouteElementFactory = (state: AppStateContext) => ReactElement;

const routePageFrame = (children: ReactNode): ReactElement => (
  <div className="flex flex-col flex-grow w-full">
    <Suspense fallback={null}>{children}</Suspense>
  </div>
);

const {
  'admin-broadcast': AdminBroadcastView,
  'admin-commissions': AdminCommissionsView,
  'admin-dashboard': AdminDashboardView,
  'admin-finance': AdminFinanceView,
  'admin-logs': AdminLogsView,
  'admin-orders': AdminOrdersView,
  'admin-parameters': AdminParametersView,
  'admin-plans': AdminPlansView,
  'admin-profile': AdminProfileView,
  'admin-queue': AdminQueueView,
  'admin-rbac': AdminRbacView,
  'admin-reports': AdminReportsView,
  'admin-settlement': AdminSettlementView,
  'admin-users': AdminUsersView
} = ADMIN_PAGE_COMPONENTS;

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
