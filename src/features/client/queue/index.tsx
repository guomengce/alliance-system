import { useState } from 'react';
import { Unlock } from 'lucide-react';
import PageView from '../../../shared/components/PageView';
import AlertBanner from '../../../shared/components/AlertBanner';
import { AnimatePresence, motion } from 'motion/react';
import OrdersList from './components/OrdersList';
import ProgressVisualization from './components/ProgressVisualization';
import ReleaseLogList from './components/ReleaseLogList';
import UnlockMechanismNotice from './components/UnlockMechanismNotice';
import { useQueueState } from './hooks/useQueueState';
import { INITIAL_QUEUE_ORDERS, INITIAL_RELEASE_LOGS } from './utils';
import type { QueueOrderItem, QueueViewProps, ReleaseLogItem } from './types';

export default function QueueView({
  usdtBalance,
  lockedQueueAmount,
  originalLockedQueue,
  releasedQueueAmount,
  commissionPoolLimit,
  commissionPoolRemaining,
  onUpdateBalances,
  onAddTransaction,
  onExecuteSimulation
}: QueueViewProps) {
  
  // 1. Dynamic calculated totals mapped perfectly from top-level state
  const originalLocked = originalLockedQueue;
  const releasedAmount = releasedQueueAmount;
  const remainingLocked = lockedQueueAmount;

  // 2. High-fidelity Queue Orders containing all orders preloaded to allow transparent outside management
  const [orders, setOrders] = useState<QueueOrderItem[]>(INITIAL_QUEUE_ORDERS);

  // 3. Timeline Logs matching "买入/解锁记录" in screenshot
  const [releaseLogs, setReleaseLogs] = useState<ReleaseLogItem[]>(INITIAL_RELEASE_LOGS);

  const {
    alertSuccess,
    filteredOrders,
    handleClearOrderSearch,
    handleLoadMoreLogs,
    handleLoadMoreOrders,
    handleLogsScroll,
    handleOrderSearchChange,
    handleOrderStatusFilterChange,
    handleOrdersScroll,
    infoMessage,
    loadingMoreLogs,
    loadingMoreOrders,
    orderSearchQuery,
    orderStatusFilter,
    overallProgressPercent,
    selectedDetailOrder,
    setInfoMessage,
    setSelectedDetailOrder,
    visibleLogsCount,
    visibleOrdersCount
  } = useQueueState({
    orders,
    releaseLogs,
    originalLocked,
    releasedAmount
  });
  return (
    <PageView>
      <AnimatePresence>
        {infoMessage && (
          <div className="mb-4">
            <AlertBanner
              message={infoMessage}
              type="info"
              onClose={() => setInfoMessage('')}
            />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {alertSuccess.show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl text-emerald-400 text-xs font-bold leading-relaxed shadow-xl flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <span className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
                <Unlock className="w-5 h-5 animate-pulse" />
              </span>
              <div>
                <p className="text-white font-extrabold text-sm">?? 智能合约解套运算已广播完成！</p>
                <p className="text-emerald-400/80 font-mono mt-0.5">
                  成功从排队锁仓中解锁并买入了 <span className="underline decoration-dashed">{(alertSuccess.unlockedSum * 10).toLocaleString()} TROO</span>（等值 {alertSuccess.unlockedSum.toFixed(2)} USDT），已立即存入您的持股账户。
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ProgressVisualization
        originalLocked={originalLocked}
        releasedAmount={releasedAmount}
        remainingLocked={remainingLocked}
        overallProgressPercent={overallProgressPercent}
      />

      <UnlockMechanismNotice />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <OrdersList
          filteredOrders={filteredOrders}
          orderSearchQuery={orderSearchQuery}
          orderStatusFilter={orderStatusFilter}
          visibleOrdersCount={visibleOrdersCount}
          loadingMoreOrders={loadingMoreOrders}
          selectedDetailOrder={selectedDetailOrder}
          onOrdersScroll={handleOrdersScroll}
          onSearchChange={handleOrderSearchChange}
          onClearSearch={handleClearOrderSearch}
          onStatusFilterChange={handleOrderStatusFilterChange}
          onSelectDetailOrder={setSelectedDetailOrder}
          onCloseDetailOrder={() => setSelectedDetailOrder(null)}
          onLoadMoreOrders={handleLoadMoreOrders}
        />

        <ReleaseLogList
          releaseLogs={releaseLogs}
          visibleLogsCount={visibleLogsCount}
          loadingMoreLogs={loadingMoreLogs}
          onLogsScroll={handleLogsScroll}
          onLoadMoreLogs={handleLoadMoreLogs}
        />
      </div>
    </PageView>
  );
}
