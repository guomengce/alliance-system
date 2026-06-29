import { Suspense, type ReactElement, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import type { AppStateContext } from '../layouts/AppShell';
import { CLIENT_PAGE_COMPONENTS } from './pageLoaders';
import { getRouteByRouteId } from './routes';

type ClientRouteElementFactory = (state: AppStateContext, helpers: ClientRouteHelpers) => ReactElement;

interface ClientRouteHelpers {
  navigateToRoute: (routeId: string) => void;
  handleQuickAction: (actionType: string) => void;
}

const routePageFrame = (children: ReactNode): ReactElement => (
  <div className="flex flex-col flex-grow w-full">
    <Suspense fallback={null}>{children}</Suspense>
  </div>
);

const {
  commission: CommissionView,
  home: HomeView,
  member: MemberView,
  notifications: NotificationsView,
  queue: QueueView,
  settings: SettingsView,
  subscribe: SubscribeView,
  team: TeamView,
  wallet: WalletView
} = CLIENT_PAGE_COMPONENTS;

const clientRouteElementFactories: Record<string, ClientRouteElementFactory> = {
  home: (state, { navigateToRoute, handleQuickAction }) => routePageFrame(
    <HomeView
      usdtBalance={state.usdtBalance}
      trooBalance={state.trooBalance}
      lockedQueueAmount={state.lockedQueueAmount}
      cumulativeCommissions={state.cumulativeCommissions}
      arrivedCommissions={state.arrivedCommissions}
      failedCommissions={state.failedCommissions}
      yesterdayRevenue={state.yesterdayRevenue}
      remainingCredit={state.commissionPoolRemaining}
      totalCredit={state.commissionPoolLimit}
      creditUsedPercent={state.creditUsedPercent}
      transactions={state.transactions}
      onNavigateToRoute={navigateToRoute}
      onQuickAction={handleQuickAction}
      onRaiseCredit={state.handleRaiseCredit}
    />
  ),
  member: (state) => routePageFrame(
    <MemberView
      uid={state.currentUid}
      nickname={state.nickname}
      joinDate="2023-10-24"
      onUpdateNickname={state.onUpdateNickname}
      onRaiseCredit={state.handleRaiseCredit}
      remainingCredit={state.commissionPoolRemaining}
      totalCredit={state.commissionPoolLimit}
    />
  ),
  wallet: (state) => routePageFrame(
    <WalletView
      usdtBalance={state.usdtBalance}
      trooBalance={state.trooBalance}
      lockedQueueAmount={state.lockedQueueAmount}
      transactions={state.transactions}
      onAddTransaction={state.handleAddTransaction}
      onUpdateBalances={state.handleUpdateBalances}
    />
  ),
  subscribe: (state) => routePageFrame(
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
  commission: (state, { navigateToRoute }) => routePageFrame(
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
      onNavigateToSubscribe={() => navigateToRoute('subscribe')}
    />
  ),
  team: (state) => routePageFrame(
    <TeamView downlines={state.downlines} />
  ),
  queue: (state) => routePageFrame(
    <QueueView
      usdtBalance={state.usdtBalance}
      lockedQueueAmount={state.lockedQueueAmount}
      originalLockedQueue={state.originalLockedQueue}
      releasedQueueAmount={state.releasedQueueAmount}
      commissionPoolLimit={state.commissionPoolLimit}
      commissionPoolRemaining={state.commissionPoolRemaining}
      onUpdateBalances={state.handleUpdateBalances}
      onAddTransaction={state.handleAddTransaction}
      onExecuteSimulation={state.handleDirectSimulation}
    />
  ),
  notifications: (state) => routePageFrame(
    <NotificationsView
      notifications={state.notifications}
      onMarkAllRead={state.onMarkAllRead}
      onClearNotifications={state.onClearNotifications}
      onToggleRead={state.onToggleRead}
    />
  ),
  settings: (state) => routePageFrame(
    <SettingsView
      nickname={state.nickname}
      email={state.email}
      onUpdateNickname={state.onUpdateNickname}
      onUpdateEmail={state.onUpdateEmail}
      onLogout={state.onLogout}
    />
  )
};

interface ClientRouteElementProps {
  routeId: string;
}

export function ClientRouteElement({ routeId }: ClientRouteElementProps) {
  const state = useAppContext();
  const navigate = useNavigate();
  const renderRouteElement = clientRouteElementFactories[routeId];

  const navigateToRoute = (targetRouteId: string) => {
    const route = getRouteByRouteId(targetRouteId);
    if (route) {
      navigate(route.path);
    }
  };

  const handleQuickAction = (actionType: string) => {
    if (actionType === 'recharge') {
      navigateToRoute('wallet');
    } else if (actionType === 'orders' || actionType === 'queue') {
      navigateToRoute('queue');
    }
  };

  return renderRouteElement ? renderRouteElement(state, { navigateToRoute, handleQuickAction }) : null;
}
