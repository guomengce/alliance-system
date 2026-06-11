import { useState } from 'react';
import { Transaction, DownlineMember, NotificationItem } from '../types';
import { 
  initialTransactions, 
  initialDownlines, 
  initialNotifications 
} from '../data';
import { calculateDirectSimulation } from '../utils/simulation';

export function useAppState() {
  // Login Authentication State
  const [portalMode, setPortalMode] = useState<'client' | 'admin'>('client');
  const [adminRole, setAdminRole] = useState<'SUPER_ADMIN' | 'FINANCE_DIR' | 'RISK_OFFICER' | 'OPERATOR' | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>('client@alliance.com');
  const [loginPassword, setLoginPassword] = useState<string>('password123');
  const [nickname, setNickname] = useState<string>('Alliance Super Agent');
  const [email, setEmail] = useState<string>('ppyybb888@gmail.com');

  // Preseeded accounts list (dynamic users database to verify actual registrations and forgot password resets)
  const [registeredUsers, setRegisteredUsers] = useState<Array<{
    email: string;
    password: string;
    nickname: string;
    portalMode: 'client' | 'admin';
    role: 'SUPER_ADMIN' | 'FINANCE_DIR' | 'RISK_OFFICER' | 'OPERATOR' | null;
  }>>([
    { email: 'ppyybb888@gmail.com', password: 'admin1234', nickname: 'Alliance Super Agent', portalMode: 'admin', role: 'SUPER_ADMIN' },
    { email: 'admin_center@alliance.com', password: 'admin1234', nickname: 'Alliance Senior Admin', portalMode: 'admin', role: 'SUPER_ADMIN' },
    { email: 'jack@alliance.system', password: 'admin1234', nickname: '联盟架构师 (Jack)', portalMode: 'admin', role: 'SUPER_ADMIN' },
    { email: 'linda@alliance.system', password: 'admin1234', nickname: '首席财务官 (Linda)', portalMode: 'admin', role: 'FINANCE_DIR' },
    { email: 'garry@alliance.system', password: 'admin1234', nickname: '高级风控专员 (Garry)', portalMode: 'admin', role: 'RISK_OFFICER' },
    { email: 'test@alliance.system', password: 'admin1234', nickname: '临时运营试用 (Tester)', portalMode: 'admin', role: 'OPERATOR' },
    { email: 'client@alliance.com', password: 'password123', nickname: 'Alliance Partner Client', portalMode: 'client', role: null },
    { email: 'jack_fly@alliance.com', password: 'password123', nickname: '飞跃极客 (Jack)', portalMode: 'client', role: null },
    { email: 'amanda_star@alliance.com', password: 'password123', nickname: '星空行者 (Amanda)', portalMode: 'client', role: null }
  ]);

  // Sidebar mobile drawer status
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Language state
  const [currentLang, setCurrentLang] = useState<'zh' | 'en' | 'zht'>('zh');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState<boolean>(false);

  // Core Balances/Assets State
  const [usdtBalance, setUsdtBalance] = useState<number>(128450.00);
  const [trooBalance, setTrooBalance] = useState<number>(452190.22);
  const [lockedQueueAmount, setLockedQueueAmount] = useState<number>(3100.00); // Default remaining locked: 3,100.00 USDT
  const [originalLockedQueue, setOriginalLockedQueue] = useState<number>(10000.00); // Default original queue: 10,000.00 USDT
  const [releasedQueueAmount, setReleasedQueueAmount] = useState<number>(6900.00); // Default released: 6,900.00 USDT
  
  // Commission Pool Capacity
  const [commissionPoolLimit, setCommissionPoolLimit] = useState<number>(40000.00);
  const [commissionPoolRemaining, setCommissionPoolRemaining] = useState<number>(2000.00); // Default pool capacity: 2,000.00 USDT

  // Commissions stats state
  const [pendingBalance, setPendingBalance] = useState<number>(12340.50);
  const [cumulativeCommissions, setCumulativeCommissions] = useState<number>(842500.00);
  const [arrivedCommissions, setArrivedCommissions] = useState<number>(830159.50);
  const [failedCommissions, setFailedCommissions] = useState<number>(480.00);

  // Yesterday revenue indicator
  const [yesterdayRevenue, setYesterdayRevenue] = useState<number>(842.12);

  // Credit pool metrics state (legacy credit variables mapped to commission pool)
  const [totalCredit, setTotalCredit] = useState<number>(50000.00);
  const [remainingCredit, setRemainingCredit] = useState<number>(17500.00);

  // Verification standard
  const [twoFAEnabled, setTwoFAEnabled] = useState<boolean>(true);

  // Applet active tab selector
  const [activeTab, setActiveTab ] = useState<string>('home');

  // Transaction Ledger, User downlines, notification items list states
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [downlines, setDownlines] = useState<DownlineMember[]>(initialDownlines);

  // Admin Pending withdrawals queue list
  const [pendingWithdrawals, setPendingWithdrawals] = useState<Transaction[]>([
    {
      id: 'TXN-8812903120',
      type: 'withdraw',
      typeLabel: '提现申请',
      desc: '提现至外部钱包 (TRC-20: TXX938aLskj9238fjKdk)',
      amount: -12000.00,
      currency: 'USDT',
      time: '2026-05-29 07:15:11',
      status: 'pending',
      statusLabel: '待审核出账',
      blockchainProof: {
        txid: 'TWe8a9b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b001',
        network: 'TRON Network (TRC-20)',
        gasFee: 1.5,
        fromAddress: 'TJDyZ8f1jUka8Jska271Kshq19Kshq9Kws',
        toAddress: 'TXX938aLskj9238fjKdk',
        timestamp: '2026-05-29 07:15:11',
        consensusStatus: 'Pending Admin Verification'
      }
    },
    {
      id: 'TXN-8812903125',
      type: 'withdraw',
      typeLabel: '提现申请',
      desc: '提现至外部钱包 (ERC-20: 0x923Fjk0293asdf92398)',
      amount: -45000.00,
      currency: 'USDT',
      time: '2026-05-29 08:34:02',
      status: 'pending',
      statusLabel: '待审核出账',
      blockchainProof: {
        txid: '0x923fe8a9b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6789a',
        network: 'Ethereum Mainnet (ERC-20)',
        gasFee: 15.0,
        fromAddress: '0x999001f3014B298CD2abD2110cE45c9288e2231A',
        toAddress: '0x923Fjk0293asdf92398',
        timestamp: '2026-05-29 08:34:02',
        consensusStatus: 'Pending Admin Verification'
      }
    }
  ]);

  const currentUid = portalMode === 'client' ? '889425' : '999001';
  const creditUsedPercent = Math.round(((commissionPoolLimit - commissionPoolRemaining) / commissionPoolLimit) * 100);
  const unreadNotificationsCount = notifications.filter(n => n.isUnread).length;

  const handleApproveWithdrawal = (id: string) => {
    const cashout = pendingWithdrawals.find(w => w.id === id);
    if (cashout) {
      const newRecord: Transaction = {
        ...cashout,
        status: 'success',
        statusLabel: '出账成功'
      };
      setTransactions(prev => [newRecord, ...prev]);
      setPendingWithdrawals(prev => prev.filter(w => w.id !== id));
      alert(`出款委托流水 ${id} 已审核划付！USDT 已从储备准备金划出至目标公链网络。`);
    }
  };

  const handleRejectWithdrawal = (id: string) => {
    const cashout = pendingWithdrawals.find(w => w.id === id);
    if (cashout) {
      const refundAmt = Math.abs(cashout.amount);
      setUsdtBalance(prev => parseFloat((prev + refundAmt).toFixed(2)));
      
      const newRecord: Transaction = {
        ...cashout,
        status: 'failed',
        statusLabel: '退回驳回'
      };
      setTransactions(prev => [newRecord, ...prev]);
      setPendingWithdrawals(prev => prev.filter(w => w.id !== id));
      alert(`出账委托 ${id} 已执行拒绝驳回！提现资金 ${refundAmt} USDT 已全额解冻并退回至超级代理可用余额。`);
    }
  };

  const handleAddNotification = (notif: NotificationItem) => {
    setNotifications(prev => [notif, ...prev]);
  };

  const handleAddTransaction = (newTxn: Transaction) => {
    setTransactions(prev => [newTxn, ...prev]);
    if (newTxn.type === 'withdraw' && newTxn.status === 'pending') {
      setPendingWithdrawals(prev => [newTxn, ...prev]);
    }
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
    alert('已成功申请提升您的佣金池最高额度 poolLimit + ¥10,000 USDT！');
  };

  const onUpdateNickname = (newName: string) => {
    setNickname(newName);
  };

  const onUpdateEmail = (newEmail: string) => {
    setEmail(newEmail);
  };

  const onToggle2FA = () => {
    setTwoFAEnabled(!twoFAEnabled);
  };

  const onLogout = () => {
    setIsAuthenticated(false);
  };

  const handleQuickAction = (actionType: string) => {
    if (actionType === 'recharge') {
      setActiveTab('wallet');
    } else if (actionType === 'orders' || actionType === 'queue') {
      setActiveTab('queue');
    }
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

  // Global custom iframe-safe alert overlay state
  const [globalAlert, setGlobalAlert] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }>({ show: false, message: '', type: 'success' });

  const triggerGlobalAlert = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    setGlobalAlert({ show: true, message, type });
  };

  const closeGlobalAlert = () => {
    setGlobalAlert(prev => ({ ...prev, show: false }));
  };

  return {
    globalAlert,
    triggerGlobalAlert,
    closeGlobalAlert,
    portalMode,
    setPortalMode,
    adminRole,
    setAdminRole,
    registeredUsers,
    setRegisteredUsers,
    isAuthenticated,
    setIsAuthenticated,
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    nickname,
    setNickname,
    email,
    setEmail,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    currentLang,
    setCurrentLang,
    isLangDropdownOpen,
    setIsLangDropdownOpen,
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
    twoFAEnabled,
    setTwoFAEnabled,
    activeTab,
    setActiveTab,
    transactions,
    setTransactions,
    notifications,
    setNotifications,
    downlines,
    setDownlines,
    pendingWithdrawals,
    setPendingWithdrawals,
    currentUid,
    creditUsedPercent,
    unreadNotificationsCount,
    handleApproveWithdrawal,
    handleRejectWithdrawal,
    handleAddNotification,
    handleAddTransaction,
    handleUpdateBalances,
    handleDirectSimulation,
    handleWithdrawCommissions,
    handleRaiseCredit,
    onUpdateNickname,
    onUpdateEmail,
    onToggle2FA,
    onLogout,
    handleQuickAction,
    onMarkAllRead,
    onClearNotifications,
    onToggleRead
  };
}
