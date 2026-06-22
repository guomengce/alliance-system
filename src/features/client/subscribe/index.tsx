import React from 'react';
import Workspace from './components/Workspace';
import { useSubscribeState } from './hooks/useSubscribeState';
import type { Plan, Purchase, SubscribeViewProps } from './types';
import {
  buildSubscribeTransaction,
  calculateSubscriptionEffects,
  createPurchasePreview,
  finalizePurchase
} from './utils';

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
    plans,
    purchases,
    selectedPlan,
    setAmountInput,
    setCopiedId,
    setDetailModalItem,
    setErrorMsg,
    setPurchases,
    setSelectedPlan,
    setSuccessMsg,
    successMsg
  } = useSubscribeState();

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setAmountInput(plan.price);
    setErrorMsg('');
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const plan = plans.find(p => p.id === e.target.value);
    if (plan) {
      handleSelectPlan(plan);
    }
  };

  const handleSubscriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (amountInput < selectedPlan.price) {
      setErrorMsg(`当前方案的最低参与起购额度为 ${selectedPlan.price} USDT`);
      return;
    }

    if (amountInput > usdtBalance) {
      setErrorMsg('USDT 钱包余额不足，请先在钱包模块充值资产再行认购！');
      return;
    }

    setDetailModalItem(createPurchasePreview(selectedPlan, amountInput));
  };

  const handleConfirmPurchase = () => {
    if (!detailModalItem) return;

    const amount = detailModalItem.amount;
    if (amount > usdtBalance) {
      setErrorMsg('USDT 钱包余额不足，请先在钱包模块充值资产再行认购！');
      setDetailModalItem(null);
      return;
    }

    const {
      calculatedLimit,
      expectedTroo,
      queueLockAmount
    } = calculateSubscriptionEffects(selectedPlan, amount);
    
    onUpdateBalances(-amount, expectedTroo * 10, queueLockAmount); // subtract usdt, add 70% converted to troo (x10), add lock allocation
    onUpdateCommissionPool(calculatedLimit, calculatedLimit);

    const newPurchase: Purchase = finalizePurchase(detailModalItem);

    setPurchases([newPurchase, ...purchases]);
    setDetailModalItem(null); // Close modal cleanly
    
    // Log as transaction record
    onAddTransaction(buildSubscribeTransaction(selectedPlan, amount));

    setSuccessMsg(`您已成功认购 ${selectedPlan.name}，成功自您的钱包支付并扣除了 ${amount} USDT。获得立即买入 70% 对应 TROO 和 31% 排队锁定，增加佣金下线限额 +¥ ${calculatedLimit.toLocaleString()} 元！`);
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(''), 2000);
  };

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
