import React from 'react';
import Workspace from './components/Workspace';
import { useSubscribeState } from './hooks/useSubscribeState';
import type { Plan, Purchase, SubscribeViewProps } from './types';

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

    const expectedTroo = amountInput * 0.7; // 70% expected release
    const queueLockAmount = amountInput * 0.31; // 31% enters lock queue allocation as per PRD
    const randomId = 'SUB-' + Math.floor(10000 + Math.random() * 90000) + '-' + selectedPlan.name.split(' ')[1];
    
    // Create a temporary preview object with isConfirmation set to true
    const previewPurchase: Purchase = {
      id: randomId,
      name: selectedPlan.name,
      amount: amountInput,
      troo: expectedTroo * 10,
      giftRatio: selectedPlan.giftRatio,
      lockAmount: queueLockAmount,
      progress: 0,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: '待确认签署',
      statusType: 'pending',
      isConfirmation: true
    };

    setDetailModalItem(previewPurchase);
  };

  const handleConfirmPurchase = () => {
    if (!detailModalItem) return;

    const amount = detailModalItem.amount;
    if (amount > usdtBalance) {
      setErrorMsg('USDT 钱包余额不足，请先在钱包模块充值资产再行认购！');
      setDetailModalItem(null);
      return;
    }

    const expectedTroo = amount * 0.7; // 70% expected release
    const queueLockAmount = amount * 0.31; // 31% enters lock queue allocation as per PRD
    
    // Add proportional poolLimit capacity
    const calculatedLimit = selectedPlan.poolLimit * (amount / selectedPlan.price);
    
    onUpdateBalances(-amount, expectedTroo * 10, queueLockAmount); // subtract usdt, add 70% converted to troo (x10), add lock allocation
    onUpdateCommissionPool(calculatedLimit, calculatedLimit);

    const newPurchase: Purchase = {
      ...detailModalItem,
      status: '进行中',
      isConfirmation: false
    };

    setPurchases([newPurchase, ...purchases]);
    setDetailModalItem(null); // Close modal cleanly
    
    // Log as transaction record
    onAddTransaction({
      id: 'TXN-' + Math.floor(1000000000 + Math.random() * 9000000000),
      type: 'subscribe',
      typeLabel: '认购',
      desc: `参与并认购 ${selectedPlan.name} 理财计划 (排队锁定 31% = ${queueLockAmount.toFixed(2)} USDT, 佣金池额度增加 +¥ ${calculatedLimit.toLocaleString()})`,
      amount: -amount,
      currency: 'USDT',
      time: new Date().toISOString().replace('T', ' ').slice(0, 19),
      status: 'success',
      statusLabel: '进行中'
    });

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
