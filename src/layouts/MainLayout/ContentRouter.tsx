import { AnimatePresence } from 'motion/react';
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

interface ContentRouterProps {
  state: AppStateContext;
}

export default function ContentRouter({ state }: ContentRouterProps) {
  const {
    activeTab,
    setActiveTab,
    currentUid,
    nickname,
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
    handleQuickAction,
    handleRaiseCredit,
    onUpdateNickname,
    handleAddTransaction,
    handleUpdateBalances,
    handleAddNotification,
    pendingBalance,
    handleWithdrawCommissions,
    downlines,
    setDownlines,
    originalLockedQueue,
    releasedQueueAmount,
    handleDirectSimulation,
    notifications,
    onMarkAllRead,
    onClearNotifications,
    onToggleRead,
    email,
    onUpdateEmail,
    onLogout,
    loginPassword,
    pendingWithdrawals,
    handleApproveWithdrawal,
    handleRejectWithdrawal
  } = state;

  return (
    <AnimatePresence mode="wait">
      {activeTab === 'home' && (
        <div key="home" className="flex flex-col flex-grow w-full">
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
        </div>
      )}

      {activeTab === 'member' && (
        <div key="member" className="flex flex-col flex-grow w-full">
          <MemberView
            uid={currentUid}
            nickname={nickname}
            joinDate="2023-10-24"
            onUpdateNickname={onUpdateNickname}
            onRaiseCredit={handleRaiseCredit}
            remainingCredit={commissionPoolRemaining}
            totalCredit={commissionPoolLimit}
          />
        </div>
      )}

      {activeTab === 'wallet' && (
        <div key="wallet" className="flex flex-col flex-grow w-full">
          <WalletView
            usdtBalance={usdtBalance}
            trooBalance={trooBalance}
            lockedQueueAmount={lockedQueueAmount}
            transactions={transactions}
            onAddTransaction={handleAddTransaction}
            onUpdateBalances={handleUpdateBalances}
          />
        </div>
      )}

      {activeTab === 'subscribe' && (
        <div key="subscribe" className="flex flex-col flex-grow w-full">
          <SubscribeView
            usdtBalance={usdtBalance}
            commissionPoolLimit={commissionPoolLimit}
            commissionPoolRemaining={commissionPoolRemaining}
            onUpdateCommissionPool={(limitDiff: number, remainingDiff: number) => {
              if (limitDiff !== 0) state.setCommissionPoolLimit((prev: number) => prev + limitDiff);
              if (remainingDiff !== 0) state.setCommissionPoolRemaining((prev: number) => prev + remainingDiff);
            }}
            onUpdateBalances={handleUpdateBalances}
            onAddTransaction={handleAddTransaction}
          />
        </div>
      )}

      {activeTab === 'commission' && (
        <div key="commission" className="flex flex-col flex-grow w-full">
          <CommissionView
            cumulativeCommissions={cumulativeCommissions}
            pendingBalance={pendingBalance}
            arrivedCommissions={arrivedCommissions}
            failedCommissions={failedCommissions}
            commissionPoolLimit={commissionPoolLimit}
            commissionPoolRemaining={commissionPoolRemaining}
            onWithdrawCommissions={handleWithdrawCommissions}
            onAddTransaction={handleAddTransaction}
            onIncreaseLimit={(amount: number) => {
              state.setCommissionPoolLimit((prev: number) => prev + amount);
              state.setCommissionPoolRemaining((prev: number) => prev + amount);
            }}
            setActiveTab={setActiveTab}
          />
        </div>
      )}

      {activeTab === 'team' && (
        <div key="team" className="flex flex-col flex-grow w-full">
          <TeamView downlines={downlines} />
        </div>
      )}

      {activeTab === 'queue' && (
        <div key="queue" className="flex flex-col flex-grow w-full">
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
        </div>
      )}

      {activeTab === 'notifications' && (
        <div key="notifications" className="flex flex-col flex-grow w-full">
          <NotificationsView
            notifications={notifications}
            onMarkAllRead={onMarkAllRead}
            onClearNotifications={onClearNotifications}
            onToggleRead={onToggleRead}
          />
        </div>
      )}

      {activeTab === 'settings' && (
        <div key="settings" className="flex flex-col flex-grow w-full">
          <SettingsView
            nickname={nickname}
            email={email}
            onUpdateNickname={onUpdateNickname}
            onUpdateEmail={onUpdateEmail}
            onLogout={onLogout}
          />
        </div>
      )}

      {activeTab === 'admin-dashboard' && (
        <div key="admin-dashboard" className="flex flex-col flex-grow w-full">
          <AdminDashboardView usdtBalance={usdtBalance} lockedQueueAmount={lockedQueueAmount} />
        </div>
      )}

      {activeTab === 'admin-users' && (
        <div key="admin-users" className="flex flex-col flex-grow w-full">
          <AdminUsersView downlines={downlines} onUpdateDownlines={setDownlines} />
        </div>
      )}

      {activeTab === 'admin-plans' && (
        <div key="admin-plans" className="flex flex-col flex-grow w-full">
          <AdminPlansView />
        </div>
      )}

      {activeTab === 'admin-orders' && (
        <div key="admin-orders" className="flex flex-col flex-grow w-full">
          <AdminOrdersView />
        </div>
      )}

      {activeTab === 'admin-commissions' && (
        <div key="admin-commissions" className="flex flex-col flex-grow w-full">
          <AdminCommissionsView />
        </div>
      )}

      {activeTab === 'admin-queue' && (
        <div key="admin-queue" className="flex flex-col flex-grow w-full">
          <AdminQueueView />
        </div>
      )}

      {activeTab === 'admin-settlement' && (
        <div key="admin-settlement" className="flex flex-col flex-grow w-full">
          <AdminSettlementView onUpdateBalances={handleUpdateBalances} />
        </div>
      )}

      {activeTab === 'admin-finance' && (
        <div key="admin-finance" className="flex flex-col flex-grow w-full">
          <AdminFinanceView
            pendingWithdrawals={pendingWithdrawals}
            onApproveWithdrawal={handleApproveWithdrawal}
            onRejectWithdrawal={handleRejectWithdrawal}
            downlines={downlines}
            transactions={transactions}
          />
        </div>
      )}

      {activeTab === 'admin-parameters' && (
        <div key="admin-parameters" className="flex flex-col flex-grow w-full">
          <AdminParametersView />
        </div>
      )}

      {activeTab === 'admin-broadcast' && (
        <div key="admin-broadcast" className="flex flex-col flex-grow w-full">
          <AdminBroadcastView onAddNotification={handleAddNotification} />
        </div>
      )}

      {activeTab === 'admin-rbac' && (
        <div key="admin-rbac" className="flex flex-col flex-grow w-full">
          <AdminRbacView />
        </div>
      )}

      {activeTab === 'admin-reports' && (
        <div key="admin-reports" className="flex flex-col flex-grow w-full">
          <AdminReportsView />
        </div>
      )}

      {activeTab === 'admin-logs' && (
        <div key="admin-logs" className="flex flex-col flex-grow w-full">
          <AdminLogsView transactions={transactions} downlines={downlines} />
        </div>
      )}

      {activeTab === 'admin-profile' && (
        <div key="admin-profile" className="flex flex-col flex-grow w-full">
          <AdminProfileView
            uid={currentUid}
            nickname={nickname}
            email={email}
            loginPasswordVal={loginPassword}
            onUpdateNickname={(newName: string) => state.setNickname(newName)}
            onUpdateEmail={(newEmail: string) => state.setEmail(newEmail)}
            onUpdatePassword={(newPw: string) => state.setLoginPassword(newPw)}
            onLogout={onLogout}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
