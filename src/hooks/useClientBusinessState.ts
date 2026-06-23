import { useState } from 'react';
import type { NotificationItem, Transaction } from '../types';
import { initialNotifications, initialTransactions } from '../mock/data';
import { calculateDirectSimulation } from '../shared/utils/simulation';
import type { GlobalAlertType } from './types';

interface ClientBusinessStateDeps {
  triggerGlobalAlert: (message: string, type?: GlobalAlertType) => void;
}

export function useClientBusinessState({ triggerGlobalAlert }: ClientBusinessStateDeps) {
  const [usdtBalance, setUsdtBalance] = useState<number>(128450.00);
  const [trooBalance, setTrooBalance] = useState<number>(452190.22);
  const [lockedQueueAmount, setLockedQueueAmount] = useState<number>(3100.00);
  const [originalLockedQueue, setOriginalLockedQueue] = useState<number>(10000.00);
  const [releasedQueueAmount, setReleasedQueueAmount] = useState<number>(6900.00);
  const [commissionPoolLimit, setCommissionPoolLimit] = useState<number>(40000.00);
  const [commissionPoolRemaining, setCommissionPoolRemaining] = useState<number>(2000.00);
  const [pendingBalance, setPendingBalance] = useState<number>(12340.50);
  const [cumulativeCommissions, setCumulativeCommissions] = useState<number>(842500.00);
  const [arrivedCommissions, setArrivedCommissions] = useState<number>(830159.50);
  const [failedCommissions, setFailedCommissions] = useState<number>(480.00);
  const [yesterdayRevenue, setYesterdayRevenue] = useState<number>(842.12);
  const [totalCredit, setTotalCredit] = useState<number>(50000.00);
  const [remainingCredit, setRemainingCredit] = useState<number>(17500.00);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  const creditUsedPercent = Math.round(((commissionPoolLimit - commissionPoolRemaining) / commissionPoolLimit) * 100);
  const unreadNotificationsCount = notifications.filter(n => n.isUnread).length;

  const addTransactionRecord = (newTxn: Transaction) => {
    setTransactions(prev => [newTxn, ...prev]);
  };

  const refundUsdtBalance = (amount: number) => {
    setUsdtBalance(prev => parseFloat((prev + amount).toFixed(2)));
  };

  const handleAddNotification = (notif: NotificationItem) => {
    setNotifications(prev => [notif, ...prev]);
  };

  const handleUpdateBalances = (usdtDiff: number, trooDiff: number, lockedDiff: number = 0) => {
    if (usdtDiff !== 0) setUsdtBalance(prev => parseFloat((prev + usdtDiff).toFixed(2)));
    if (trooDiff !== 0) setTrooBalance(prev => parseFloat((prev + trooDiff).toFixed(2)));
    if (lockedDiff !== 0) {
      if (lockedDiff > 0) {
        setLockedQueueAmount(prev => parseFloat((prev + lockedDiff).toFixed(2)));
        setOriginalLockedQueue(prev => parseFloat((prev + lockedDiff).toFixed(2)));
      } else {
        const amtUnlocked = Math.abs(lockedDiff);
        setLockedQueueAmount(prev => parseFloat(Math.max(0, prev - amtUnlocked).toFixed(2)));
        setReleasedQueueAmount(prev => parseFloat((prev + amtUnlocked).toFixed(2)));
      }
    }
  };

  const handleDirectSimulation = (purchaseAmt: number, commissionPercent: number, subUid: string, subPlanName: string) => {
    const result = calculateDirectSimulation(
      purchaseAmt,
      commissionPercent,
      lockedQueueAmount,
      commissionPoolRemaining
    );

    if (result.userAEarned > 0) {
      setUsdtBalance(prev => parseFloat((prev + result.userAEarned).toFixed(2)));
      setCommissionPoolRemaining(prev => parseFloat((prev - result.userAEarned).toFixed(2)));
      setPendingBalance(prev => parseFloat((prev + result.userAEarned).toFixed(2)));
      setCumulativeCommissions(prev => parseFloat((prev + result.userAEarned).toFixed(2)));
    }

    if (result.actualUnlocked > 0) {
      setLockedQueueAmount(prev => parseFloat(Math.max(0, prev - result.actualUnlocked).toFixed(2)));
      setReleasedQueueAmount(prev => parseFloat((prev + result.actualUnlocked).toFixed(2)));
      setTrooBalance(prev => parseFloat((prev + result.trooFromUnlock).toFixed(2)));
    }

    return result;
  };

  const handleWithdrawCommissions = () => {
    const earned = pendingBalance;
    if (earned <= 0) return;
    setPendingBalance(0);
    setArrivedCommissions(prev => parseFloat((prev + earned).toFixed(2)));
    setUsdtBalance(prev => parseFloat((prev + earned).toFixed(2)));
  };

  const handleRaiseCredit = () => {
    setCommissionPoolLimit(prev => prev + 10000);
    setCommissionPoolRemaining(prev => prev + 10000);
    triggerGlobalAlert('已成功申请提升您的佣金池最高额度 poolLimit + ¥10,000 USDT！', 'success');
  };

  const onMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
  };

  const onClearNotifications = () => {
    setNotifications([]);
  };

  const onToggleRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isUnread: false } : n));
  };

  return {
    usdtBalance,
    setUsdtBalance,
    trooBalance,
    setTrooBalance,
    lockedQueueAmount,
    setLockedQueueAmount,
    originalLockedQueue,
    setOriginalLockedQueue,
    releasedQueueAmount,
    setReleasedQueueAmount,
    commissionPoolLimit,
    setCommissionPoolLimit,
    commissionPoolRemaining,
    setCommissionPoolRemaining,
    pendingBalance,
    setPendingBalance,
    cumulativeCommissions,
    setCumulativeCommissions,
    arrivedCommissions,
    setArrivedCommissions,
    failedCommissions,
    setFailedCommissions,
    yesterdayRevenue,
    setYesterdayRevenue,
    totalCredit,
    setTotalCredit,
    remainingCredit,
    setRemainingCredit,
    transactions,
    setTransactions,
    notifications,
    setNotifications,
    creditUsedPercent,
    unreadNotificationsCount,
    addTransactionRecord,
    refundUsdtBalance,
    handleAddNotification,
    handleUpdateBalances,
    handleDirectSimulation,
    handleWithdrawCommissions,
    handleRaiseCredit,
    onMarkAllRead,
    onClearNotifications,
    onToggleRead
  };
}
