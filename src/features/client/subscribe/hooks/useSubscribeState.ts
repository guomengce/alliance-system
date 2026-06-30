import { useEffect, useState, type FormEvent } from 'react';
import {
  getInitialClientPlans,
  getInitialClientSubscribeOrders
} from '../../../../api/client/subscribe';
import type { Transaction } from '../../../../types';
import type { Plan, Purchase } from '../types';
import {
  buildSubscribeTransaction,
  calculateSubscriptionEffects,
  createPurchasePreview,
  finalizePurchase
} from '../utils';

interface UseSubscribeStateOptions {
  usdtBalance: number;
  onUpdateCommissionPool: (limitDiff: number, remainingDiff: number) => void;
  onUpdateBalances: (usdtDiff: number, trooDiff: number, lockedDiff?: number) => void;
  onAddTransaction: (txn: Transaction) => void;
}

export function useSubscribeState({
  usdtBalance,
  onUpdateCommissionPool,
  onUpdateBalances,
  onAddTransaction
}: UseSubscribeStateOptions) {
  const plans = getInitialClientPlans();
  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[4]);
  const [amountInput, setAmountInput] = useState<number>(50000);
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string>('');
  const [detailModalItem, setDetailModalItem] = useState<Purchase | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>(() => getInitialClientSubscribeOrders());

  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(''), 6000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setAmountInput(plan.price);
    setErrorMsg('');
  };

  const handleDropdownChange = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      handleSelectPlan(plan);
    }
  };

  const handleSubscriptionSubmit = (e: FormEvent) => {
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

    onUpdateBalances(-amount, expectedTroo * 10, queueLockAmount);
    onUpdateCommissionPool(calculatedLimit, calculatedLimit);

    const newPurchase: Purchase = finalizePurchase(detailModalItem);

    setPurchases([newPurchase, ...purchases]);
    setDetailModalItem(null);
    onAddTransaction(buildSubscribeTransaction(selectedPlan, amount));

    setSuccessMsg(`您已成功认购 ${selectedPlan.name}，成功自您的钱包支付并扣除了 ${amount} USDT。获得立即买入 70% 对应 TROO 和 31% 排队锁定，增加佣金下线限额 +¥ ${calculatedLimit.toLocaleString()} 元！`);
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(''), 2000);
  };

  return {
    amountInput,
    copiedId,
    detailModalItem,
    errorMsg,
    plans,
    purchases,
    selectedPlan,
    handleConfirmPurchase,
    handleCopyText,
    handleDropdownChange,
    handleSelectPlan,
    handleSubscriptionSubmit,
    setAmountInput,
    setCopiedId,
    setDetailModalItem,
    setErrorMsg,
    setPurchases,
    setSelectedPlan,
    setSuccessMsg,
    successMsg
  };
}
