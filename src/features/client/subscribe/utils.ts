import type { Transaction } from '../../../types';
import type { Plan, Purchase } from './types';

interface DateIdOptions {
  createId?: () => string;
  now?: () => Date;
}

export const calculateSubscriptionEffects = (plan: Plan, amount: number) => ({
  expectedTroo: amount * 0.7,
  queueLockAmount: amount * 0.31,
  calculatedLimit: plan.poolLimit * (amount / plan.price)
});

const formatDate = (date: Date, length: number) => (
  date.toISOString().replace('T', ' ').slice(0, length)
);

export const createPurchasePreview = (
  plan: Plan,
  amount: number,
  {
    createId = () => `SUB-${Math.floor(10000 + Math.random() * 90000)}-${plan.name.split(' ')[1]}`,
    now = () => new Date()
  }: DateIdOptions = {}
): Purchase => {
  const { expectedTroo, queueLockAmount } = calculateSubscriptionEffects(plan, amount);

  return {
    id: createId(),
    name: plan.name,
    amount,
    troo: expectedTroo * 10,
    giftRatio: plan.giftRatio,
    lockAmount: queueLockAmount,
    progress: 0,
    date: formatDate(now(), 16),
    status: '待确认签署',
    statusType: 'pending',
    isConfirmation: true
  };
};

export const finalizePurchase = (purchase: Purchase): Purchase => ({
  ...purchase,
  status: '进行中',
  isConfirmation: false
});

export const buildSubscribeTransaction = (
  plan: Plan,
  amount: number,
  {
    now = () => new Date()
  }: Pick<DateIdOptions, 'now'> = {}
): Transaction => {
  const { queueLockAmount, calculatedLimit } = calculateSubscriptionEffects(plan, amount);

  return {
    id: `TXN-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    type: 'subscribe',
    typeLabel: '认购',
    desc: `参与并认购 ${plan.name} 理财计划 (排队锁定 31% = ${queueLockAmount.toFixed(2)} USDT, 佣金池额度增加 +¥ ${calculatedLimit.toLocaleString()})`,
    amount: -amount,
    currency: 'USDT',
    time: formatDate(now(), 19),
    status: 'success',
    statusLabel: '进行中'
  };
};
