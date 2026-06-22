import PageView from '../../../shared/components/PageView';
import AlertBanner from '../../../shared/components/AlertBanner';
import Header from './components/Header';
import HistoryLedger from './components/HistoryLedger';
import RatiosTable from './components/RatiosTable';
import RulesNotice from './components/RulesNotice';
import StatsAndPool from './components/StatsAndPool';
import { useCommissionState } from './hooks/useCommissionState';
import { getInitialClientCommissionData } from '../../../mock/client/commission';
import type { CommissionViewProps } from './types';
import { buildCommissionWithdrawalTransaction } from './utils';

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
    setActiveFilter,
    setSuccessMsg,
    successMsg
  } = useCommissionState();
  const { ratios } = getInitialClientCommissionData();

  const handleWithdrawClick = () => {
    if (pendingBalance <= 0) {
      alert('模拟结算提示：当前没有待处理的代收佣金！等有下线产生新的认购返佣并计入“代收中”后，即可再次点击此按钮模拟本系统D+1日结划转。');
      return;
    }
    const sum = pendingBalance;
    onWithdrawCommissions();
    
    // Add transaction record
    onAddTransaction(buildCommissionWithdrawalTransaction(sum));

    setSuccessMsg(`[D+1 日结模拟系统] 已自动触发结算：系统成功汇算代收池，并将 ¥ ${sum.toLocaleString()} 自动划转至您的可用余额 (Wallet Balance)`);
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  const handleExport = () => {
    alert('正在自动读取后台，打包成 xlsx 收益流水文档下载中...');
  };

  const handleIncreaseLimit = () => {
    if (onNavigateToSubscribe) {
      onNavigateToSubscribe();
    } else {
      const amount = 50000;
      if (onIncreaseLimit) {
        onIncreaseLimit(amount);
        setSuccessMsg(`[额度提升成功] 通过专属大额绿色通道，系统已将您的可用佣金信用额度池上限成功提升 ¥ ${amount.toLocaleString()}！数据已自动上链同步。`);
        setTimeout(() => setSuccessMsg(''), 6000);
      } else {
        alert(`[额度提升申请] 系统检测到您的信用评级卓越，已自动为您提交审核，预计测评完成后自动追加额度 ¥ ${amount.toLocaleString()}`);
      }
    }
  };

  return (
    <PageView>
      {/* Header section with titles and primary action hooks */}
      <Header
        onIncreaseLimit={handleIncreaseLimit}
        onExport={handleExport}
      />

      {successMsg && (
        <AlertBanner message={successMsg} type="success" onClose={() => setSuccessMsg('')} />
      )}

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
