import PageView from '../../../shared/components/PageView';
import AlertBanner from '../../../shared/components/AlertBanner';
import Header from './components/Header';
import HistoryLedger from './components/HistoryLedger';
import RatiosTable from './components/RatiosTable';
import RulesNotice from './components/RulesNotice';
import StatsAndPool from './components/StatsAndPool';
import { useCommissionState } from './hooks/useCommissionState';
import type { CommissionViewProps } from './types';

export default function CommissionView({
  cumulativeCommissions,
  pendingBalance,
  arrivedCommissions,
  failedCommissions,
  commissionPoolLimit,
  commissionPoolRemaining,
  onWithdrawCommissions,
  onAddTransaction,
  onIncreaseLimit,
  onNavigateToSubscribe
}: CommissionViewProps) {
  const {
    activeFilter,
    filteredHistory,
    handleExport,
    handleIncreaseLimit,
    ratios,
    setActiveFilter,
    setSuccessMsg,
    successMsg
  } = useCommissionState({
    onAddTransaction,
    onIncreaseLimit,
    onNavigateToSubscribe,
    onWithdrawCommissions,
    pendingBalance
  });

  return (
    <PageView>
      {/* Header section with titles and primary action hooks */}
      <Header
        onIncreaseLimit={handleIncreaseLimit}
        onExport={handleExport}
      />

      {/* Grid boxes representing standard commission boxes & the new Graphic Pool Monitor */}
      <StatsAndPool
        cumulativeCommissions={cumulativeCommissions}
        pendingBalance={pendingBalance}
        arrivedCommissions={arrivedCommissions}
        failedCommissions={failedCommissions}
        commissionPoolLimit={commissionPoolLimit}
        commissionPoolRemaining={commissionPoolRemaining}
      />

      {/* Ratios Table / Proportion */}
      <RatiosTable ratios={ratios} />

      {/* Rules Notice */}
      <RulesNotice />

      {/* History Ledger List */}
      <HistoryLedger
        filteredHistory={filteredHistory}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
    </PageView>
  );
}
