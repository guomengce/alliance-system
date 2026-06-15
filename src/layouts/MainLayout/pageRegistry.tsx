import type { ReactElement, ReactNode } from 'react';
import HomeView from '../../features/client/home';
import MemberView from '../../features/client/member';
import WalletView from '../../features/client/wallet';
import SubscribeView from '../../features/client/subscribe';
import CommissionView from '../../features/client/commission';
import TeamView from '../../features/client/team';
import QueueView from '../../features/client/queue';
import NotificationsView from '../../features/client/notifications';
import SettingsView from '../../features/client/settings';
import AdminDashboardView from '../../features/admin/dashboard';
import AdminUsersView from '../../features/admin/users';
import AdminPlansView from '../../features/admin/plans';
import AdminOrdersView from '../../features/admin/orders';
import AdminCommissionsView from '../../features/admin/commissions';
import AdminQueueView from '../../features/admin/queue';
import AdminSettlementView from '../../features/admin/settlement';
import AdminFinanceView from '../../features/admin/finance';
import AdminParametersView from '../../features/admin/parameters';
import AdminBroadcastView from '../../features/admin/broadcast';
import AdminRbacView from '../../features/admin/rbac';
import AdminReportsView from '../../features/admin/reports';
import AdminLogsView from '../../features/admin/logs';
import AdminProfileView from '../../features/admin/profile';
import type { AppStateContext } from './types';

type PageRenderer = (state: AppStateContext) => ReactElement;

const renderPageFrame = (key: string, children: ReactNode): ReactElement => (
  <div key={key} className="flex flex-col flex-grow w-full">
    {children}
  </div>
);

export const clientPageRenderers: Record<string, PageRenderer> = {
  home: ({
    usdtBalance,
    trooBalance,
    lockedQueueAmount,
    cumulativeCommissions,
    arrivedCommissions,
    failedCommissions,
    yesterdayRevenue,
    commissionPoolRemaining,
    commissionPoolLimit,
    creditUsedPercent,
    transactions,
    setActiveTab,
    handleQuickAction,
    handleRaiseCredit
  }) => renderPageFrame(
    'home',
    <HomeView
      usdtBalance={usdtBalance}
      trooBalance={trooBalance}
      lockedQueueAmount={lockedQueueAmount}
      cumulativeCommissions={cumulativeCommissions}
      arrivedCommissions={arrivedCommissions}
      failedCommissions={failedCommissions}
      yesterdayRevenue={yesterdayRevenue}
      remainingCredit={commissionPoolRemaining}
      totalCredit={commissionPoolLimit}
      creditUsedPercent={creditUsedPercent}
      transactions={transactions}
      setActiveTab={setActiveTab}
      onQuickAction={handleQuickAction}
      onRaiseCredit={handleRaiseCredit}
    />
  ),
  member: ({
    currentUid,
    nickname,
    onUpdateNickname,
    handleRaiseCredit,
    commissionPoolRemaining,
    commissionPoolLimit
  }) => renderPageFrame(
    'member',
    <MemberView
      uid={currentUid}
      nickname={nickname}
      joinDate="2023-10-24"
      onUpdateNickname={onUpdateNickname}
      onRaiseCredit={handleRaiseCredit}
      remainingCredit={commissionPoolRemaining}
      totalCredit={commissionPoolLimit}
    />
  ),
  wallet: ({
    usdtBalance,
    trooBalance,
    lockedQueueAmount,
    transactions,
    handleAddTransaction,
    handleUpdateBalances
  }) => renderPageFrame(
    'wallet',
    <WalletView
      usdtBalance={usdtBalance}
      trooBalance={trooBalance}
      lockedQueueAmount={lockedQueueAmount}
      transactions={transactions}
      onAddTransaction={handleAddTransaction}
      onUpdateBalances={handleUpdateBalances}
    />
  ),
  subscribe: (state) => renderPageFrame(
    'subscribe',
    <SubscribeView
      usdtBalance={state.usdtBalance}
      commissionPoolLimit={state.commissionPoolLimit}
      commissionPoolRemaining={state.commissionPoolRemaining}
      onUpdateCommissionPool={(limitDiff: number, remainingDiff: number) => {
        if (limitDiff !== 0) state.setCommissionPoolLimit((prev: number) => prev + limitDiff);
        if (remainingDiff !== 0) state.setCommissionPoolRemaining((prev: number) => prev + remainingDiff);
      }}
      onUpdateBalances={state.handleUpdateBalances}
      onAddTransaction={state.handleAddTransaction}
    />
  ),
  commission: (state) => renderPageFrame(
    'commission',
    <CommissionView
      cumulativeCommissions={state.cumulativeCommissions}
      pendingBalance={state.pendingBalance}
      arrivedCommissions={state.arrivedCommissions}
      failedCommissions={state.failedCommissions}
      commissionPoolLimit={state.commissionPoolLimit}
      commissionPoolRemaining={state.commissionPoolRemaining}
      onWithdrawCommissions={state.handleWithdrawCommissions}
      onAddTransaction={state.handleAddTransaction}
      onIncreaseLimit={(amount: number) => {
        state.setCommissionPoolLimit((prev: number) => prev + amount);
        state.setCommissionPoolRemaining((prev: number) => prev + amount);
      }}
      setActiveTab={state.setActiveTab}
    />
  ),
  team: ({ downlines }) => renderPageFrame(
    'team',
    <TeamView downlines={downlines} />
  ),
  queue: ({
    usdtBalance,
    lockedQueueAmount,
    originalLockedQueue,
    releasedQueueAmount,
    commissionPoolLimit,
    commissionPoolRemaining,
    handleUpdateBalances,
    handleAddTransaction,
    handleDirectSimulation
  }) => renderPageFrame(
    'queue',
    <QueueView
      usdtBalance={usdtBalance}
      lockedQueueAmount={lockedQueueAmount}
      originalLockedQueue={originalLockedQueue}
      releasedQueueAmount={releasedQueueAmount}
      commissionPoolLimit={commissionPoolLimit}
      commissionPoolRemaining={commissionPoolRemaining}
      onUpdateBalances={handleUpdateBalances}
      onAddTransaction={handleAddTransaction}
      onExecuteSimulation={handleDirectSimulation}
    />
  ),
  notifications: ({
    notifications,
    onMarkAllRead,
    onClearNotifications,
    onToggleRead
  }) => renderPageFrame(
    'notifications',
    <NotificationsView
      notifications={notifications}
      onMarkAllRead={onMarkAllRead}
      onClearNotifications={onClearNotifications}
      onToggleRead={onToggleRead}
    />
  ),
  settings: ({
    nickname,
    email,
    onUpdateNickname,
    onUpdateEmail,
    onLogout
  }) => renderPageFrame(
    'settings',
    <SettingsView
      nickname={nickname}
      email={email}
      onUpdateNickname={onUpdateNickname}
      onUpdateEmail={onUpdateEmail}
      onLogout={onLogout}
    />
  )
};

export const adminPageRenderers: Record<string, PageRenderer> = {
  'admin-dashboard': ({ usdtBalance, lockedQueueAmount }) => renderPageFrame(
    'admin-dashboard',
    <AdminDashboardView usdtBalance={usdtBalance} lockedQueueAmount={lockedQueueAmount} />
  ),
  'admin-users': ({ downlines, setDownlines }) => renderPageFrame(
    'admin-users',
    <AdminUsersView downlines={downlines} onUpdateDownlines={setDownlines} />
  ),
  'admin-plans': () => renderPageFrame(
    'admin-plans',
    <AdminPlansView />
  ),
  'admin-orders': () => renderPageFrame(
    'admin-orders',
    <AdminOrdersView />
  ),
  'admin-commissions': () => renderPageFrame(
    'admin-commissions',
    <AdminCommissionsView />
  ),
  'admin-queue': () => renderPageFrame(
    'admin-queue',
    <AdminQueueView />
  ),
  'admin-settlement': ({ handleUpdateBalances }) => renderPageFrame(
    'admin-settlement',
    <AdminSettlementView onUpdateBalances={handleUpdateBalances} />
  ),
  'admin-finance': ({
    pendingWithdrawals,
    handleApproveWithdrawal,
    handleRejectWithdrawal,
    downlines,
    transactions
  }) => renderPageFrame(
    'admin-finance',
    <AdminFinanceView
      pendingWithdrawals={pendingWithdrawals}
      onApproveWithdrawal={handleApproveWithdrawal}
      onRejectWithdrawal={handleRejectWithdrawal}
      downlines={downlines}
      transactions={transactions}
    />
  ),
  'admin-parameters': () => renderPageFrame(
    'admin-parameters',
    <AdminParametersView />
  ),
  'admin-broadcast': ({ handleAddNotification }) => renderPageFrame(
    'admin-broadcast',
    <AdminBroadcastView onAddNotification={handleAddNotification} />
  ),
  'admin-rbac': () => renderPageFrame(
    'admin-rbac',
    <AdminRbacView />
  ),
  'admin-reports': () => renderPageFrame(
    'admin-reports',
    <AdminReportsView />
  ),
  'admin-logs': ({ transactions, downlines }) => renderPageFrame(
    'admin-logs',
    <AdminLogsView transactions={transactions} downlines={downlines} />
  ),
  'admin-profile': (state) => renderPageFrame(
    'admin-profile',
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

export const pageRenderers: Record<string, PageRenderer> = {
  ...clientPageRenderers,
  ...adminPageRenderers
};

export const renderActivePage = (state: AppStateContext): ReactElement | null => {
  const renderPage = pageRenderers[state.activeTab];
  return renderPage ? renderPage(state) : null;
};
