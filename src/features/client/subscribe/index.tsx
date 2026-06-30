import './antd-overrides.css';
import Workspace from './components/Workspace';
import { useSubscribeState } from './hooks/useSubscribeState';
import type { SubscribeViewProps } from './types';

export default function SubscribeView({
  usdtBalance,
  commissionPoolLimit,
  commissionPoolRemaining,
  onUpdateCommissionPool,
  onUpdateBalances,
  onAddTransaction
}: SubscribeViewProps) {
  const {
    amountInput,
    copiedId,
    detailModalItem,
    errorMsg,
    handleConfirmPurchase,
    handleCopyText,
    handleDropdownChange,
    handleSelectPlan,
    handleSubscriptionSubmit,
    plans,
    purchases,
    selectedPlan,
    setAmountInput,
    setDetailModalItem,
    setErrorMsg,
    setSuccessMsg,
    successMsg
  } = useSubscribeState({
    usdtBalance,
    onUpdateCommissionPool,
    onUpdateBalances,
    onAddTransaction
  });

  return (
    <Workspace
      usdtBalance={usdtBalance}
      commissionPoolLimit={commissionPoolLimit}
      commissionPoolRemaining={commissionPoolRemaining}
      plans={plans}
      selectedPlan={selectedPlan}
      amountInput={amountInput}
      successMsg={successMsg}
      errorMsg={errorMsg}
      copiedId={copiedId}
      detailModalItem={detailModalItem}
      purchases={purchases}
      setSuccessMsg={setSuccessMsg}
      setErrorMsg={setErrorMsg}
      setAmountInput={setAmountInput}
      setDetailModalItem={setDetailModalItem}
      handleSelectPlan={handleSelectPlan}
      handleDropdownChange={handleDropdownChange}
      handleSubscriptionSubmit={handleSubscriptionSubmit}
      handleConfirmPurchase={handleConfirmPurchase}
      handleCopyText={handleCopyText}
    />
  );
}
