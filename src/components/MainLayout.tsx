import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { 
  ShieldCheck, 
  Menu, 
  X, 
  Languages, 
  Bell, 
  Settings, 
  BarChart2, 
  Users, 
  Sliders, 
  FileText, 
  Coins, 
  Lock, 
  Calendar, 
  DollarSign, 
  Terminal, 
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info
} from 'lucide-react';

import Sidebar from './Sidebar';
import HomeView from './HomeView';
import MemberView from './MemberView';
import WalletView from './WalletView';
import SubscribeView from './SubscribeView';
import CommissionView from './CommissionView';
import TeamView from './TeamView';
import QueueView from './QueueView';
import NotificationsView from './NotificationsView';
import SettingsView from './SettingsView';

import AdminDashboardView from './AdminDashboardView';
import AdminUsersView from '../features/admin/users';
import AdminPlansView from './AdminPlansView';
import AdminOrdersView from './AdminOrdersView';
import AdminCommissionsView from './AdminCommissionsView';
import AdminQueueView from './AdminQueueView';
import AdminSettlementView from './AdminSettlementView';
import AdminFinanceView from './AdminFinanceView';
import AdminParametersView from './AdminParametersView';
import AdminBroadcastView from './AdminBroadcastView';
import AdminRbacView from './AdminRbacView';
import AdminReportsView from './AdminReportsView';
import AdminLogsView from './AdminLogsView';
import AdminProfileView from './AdminProfileView';

import { useAppContext } from '../context/AppContext';

export default function MainLayout() {
  const state = useAppContext();
  const {
    globalAlert,
    triggerGlobalAlert,
    closeGlobalAlert,
    portalMode,
    nickname,
    currentUid,
    activeTab,
    setActiveTab,
    unreadNotificationsCount,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isLangDropdownOpen,
    setIsLangDropdownOpen,
    currentLang,
    setCurrentLang,
    onLogout,
    usdtBalance,
    trooBalance,
    lockedQueueAmount,
    cumulativeCommissions,
    arrivedCommissions,
    failedCommissions,
    yesterdayRevenue,
    commissionPoolRemaining,
    commissionPoolLimit,
    creditUsedPercent,
    transactions,
    handleQuickAction,
    handleRaiseCredit,
    onUpdateNickname,
    handleAddTransaction,
    handleUpdateBalances,
    handleAddNotification,
    pendingBalance,
    handleWithdrawCommissions,
    downlines,
    setDownlines,
    originalLockedQueue,
    releasedQueueAmount,
    handleDirectSimulation,
    notifications,
    onMarkAllRead,
    onClearNotifications,
    onToggleRead,
    email,
    onUpdateEmail,
    loginPassword,
    setLoginPassword,
    pendingWithdrawals,
    handleApproveWithdrawal,
    handleRejectWithdrawal,
  } = state;

  // Global browser dialog bridge override ensuring zero native standard blocks in Sandbox layout
  React.useEffect(() => {
    window.alert = (msg: string) => {
      const msgStr = String(msg);
      let alertType: 'success' | 'error' | 'warning' | 'info' = 'success';
      if (
        msgStr.includes('失败') || 
        msgStr.includes('错误') || 
        msgStr.includes('警告') || 
        msgStr.includes('异常') || 
        msgStr.includes('不能为空') || 
        msgStr.includes('不能为负') || 
        msgStr.includes('禁止') ||
        msgStr.includes('拒绝') ||
        msgStr.includes('有效')
      ) {
        alertType = 'error';
      } else if (
        msgStr.includes('提示') || 
        msgStr.includes('预计') || 
        msgStr.includes('测试') ||
        msgStr.includes('配')
      ) {
        alertType = 'info';
      }
      triggerGlobalAlert(msgStr, alertType);
    };
  }, [triggerGlobalAlert]);

  return (
    <div key="portal" className="flex min-h-screen">
      {/* Left Desktop Sidebar Navigation Drawer */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
        }}
        uid={currentUid}
        nickname={nickname}
        unreadCount={unreadNotificationsCount}
        onLogout={onLogout}
        portalMode={portalMode}
      />

      {/* Mobile Header / Top Bar with Notifications, Settings, and Avatar */}
      <div className="flex md:hidden fixed top-0 left-0 right-0 h-16 bg-[#110e16]/80 backdrop-blur-3xl border-b border-b-white/5 z-50 justify-between items-center px-4 shadow-md select-none">
        <div className="flex items-center gap-2">
          {portalMode === 'admin' && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 focus:bg-white/5 rounded-xl hover:text-[#cfbcff] text-white transition-colors cursor-pointer mr-0.5 outline-none"
              title="系统管理菜单"
            >
              {isMobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
          )}
          <ShieldCheck className="w-5.5 h-5.5 text-[#cfbcff]" />
          <span className="font-sans text-sm font-black text-white tracking-widest uppercase">Alliance</span>
        </div>
        
        <div className="flex items-center gap-2.5">
          {/* Mobile Language Selector */}
          <div className="relative">
            <button 
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="p-2 bg-[#211f24]/50 hover:bg-[#2d2a30]/80 transition-colors rounded-xl text-[#cbc4d2] border border-white/5 flex items-center justify-center cursor-pointer"
              title="选择语言 Language"
            >
              <Languages className="w-4 h-4" />
            </button>
            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-[#1a1722] border border-white/10 rounded-xl shadow-2xl py-1 z-[110] animate-fadeIn text-xs">
                {[
                  { code: 'zh', label: '简体中文' },
                  { code: 'en', label: 'English' },
                  { code: 'zht', label: '繁體中文' }
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang.code as 'zh' | 'en' | 'zht');
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-white/5 transition-colors font-semibold flex items-center justify-between ${
                      currentLang === lang.code ? 'text-[#cfbcff]' : 'text-[#cbc4d2]'
                    }`}
                  >
                    <span>{lang.label}</span>
                    {currentLang === lang.code && <span className="w-1.5 h-1.5 rounded-full bg-[#cfbcff]"></span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {portalMode === 'client' && (
            <>
              {/* Mobile Notification Bell */}
              <button 
                onClick={() => setActiveTab('notifications')}
                className="relative p-2 bg-[#211f24]/50 hover:bg-[#2d2a30]/80 transition-colors rounded-xl text-[#cbc4d2] border border-white/5 flex items-center justify-center cursor-pointer"
                title="通知中心"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[14px] h-3.5 rounded-full bg-[#ffb4ab] text-[#690005] font-extrabold text-[8px] flex items-center justify-center px-0.5 border border-[#110e16]">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* Mobile Settings Shortcut */}
              <button 
                onClick={() => setActiveTab('settings')}
                className="p-2 bg-[#211f24]/50 hover:bg-[#2d2a30]/80 transition-colors rounded-xl text-[#cbc4d2] border border-white/5 flex items-center justify-center cursor-pointer"
                title="系统设定"
              >
                <Settings className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Mobile Profile Icon with Initial */}
          {portalMode === 'client' ? (
            <button 
              onClick={() => setActiveTab('member')}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6750a4] to-[#cfbcff] flex items-center justify-center shadow-md relative overflow-hidden text-center active:scale-95 transition-all shrink-0 cursor-pointer border border-white/10"
              title="会员中心"
            >
              <span className="text-white text-xs font-black">
                {nickname ? nickname.charAt(0).toUpperCase() : 'A'}
              </span>
            </button>
          ) : (
            <button 
              onClick={() => setActiveTab('admin-profile')}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6750a4] to-[#cfbcff] flex items-center justify-center shadow-md relative overflow-hidden text-center shrink-0 border border-[#cfbcff]/45 cursor-pointer active:scale-95 transition-all outline-none"
              title="管理账户资料 ＆ 安全"
            >
              <span className="text-white text-xs font-black">
                {nickname ? nickname.charAt(0).toUpperCase() : 'A'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Admin Mobile Menu Backdrop */}
      <AnimatePresence>
        {portalMode === 'admin' && isMobileMenuOpen && (
          <div
            key="admin-mobile-backdrop"
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-[95] animate-fadeIn"
          />
        )}
      </AnimatePresence>

      {/* Admin Mobile Hamburger Slide-over Sidebar Menu */}
      <AnimatePresence>
        {portalMode === 'admin' && isMobileMenuOpen && (
          <div
            key="admin-mobile-menu"
            className="md:hidden fixed inset-y-0 left-0 w-[280px] bg-[#110e16]/95 backdrop-blur-3xl border-r border-white/10 z-[100] shadow-2xl p-6 flex flex-col justify-between"
          >
            <div className="flex flex-col flex-grow overflow-hidden">
              {/* Drawer Logo Header with Close Button */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6750a4] to-[#cfbcff] flex items-center justify-center shadow-lg shadow-[#6750a4]/20">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="font-sans text-lg font-black text-[#cfbcff] tracking-tight leading-none">
                      Alliance System
                    </h1>
                    <p className="text-[9px] text-white/50 font-bold uppercase tracking-widest mt-1">
                      Institutional Grade
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 focus:bg-white/5 rounded-lg text-white/60 hover:text-white transition-colors cursor-pointer outline-none"
                  title="关闭菜单"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items List - identical to PC desktop sidebar */}
              <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
                {[
                  { id: 'admin-dashboard', label: '仪表盘', icon: BarChart2 },
                  { id: 'admin-users', label: '用户管理', icon: Users },
                  { id: 'admin-plans', label: '套餐管理', icon: Sliders },
                  { id: 'admin-orders', label: '订单管理', icon: FileText },
                  { id: 'admin-commissions', label: '佣金管理', icon: Coins },
                  { id: 'admin-queue', label: '排队管理', icon: Lock },
                  { id: 'admin-settlement', label: '结算管理', icon: Calendar },
                  { id: 'admin-finance', label: '财务管理', icon: DollarSign },
                  { id: 'admin-parameters', label: '参数配置', icon: Settings },
                  { id: 'admin-broadcast', label: '通知管理', icon: Bell },
                  { id: 'admin-rbac', label: '权限管理', icon: ShieldCheck },
                  { id: 'admin-reports', label: '数据报表', icon: TrendingUp },
                  { id: 'admin-logs', label: '日志管理', icon: Terminal },
                ].map((item) => {
                  const IconComponent = item.icon;
                  const isActive = activeTab === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all group cursor-pointer text-left ${
                        isActive 
                          ? 'bg-[#6750a4] text-white font-bold shadow-lg shadow-[#6750a4]/15' 
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                          isActive ? 'text-white' : 'text-[#cbc4d2]'
                        }`} />
                        <span className="text-sm tracking-wide">{item.label}</span>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Central Main Panel Window Layout */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-[280px]">
        {/* Desktop Top Header Bar */}
        <div className="hidden md:flex sticky top-0 bg-[#0c0a0f]/80 backdrop-blur-3xl z-30 h-16 border-b border-white/5 select-none animate-fadeIn items-center justify-between px-8 w-full">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-[#1c1822] rounded-full border border-white/5 text-xs text-[#cbc4d2]/70 tracking-wide flex items-center gap-1.5 font-sans font-extrabold shadow-sm">
              {activeTab === 'home' && <span className="text-[#cfbcff]">首页</span>}
              {activeTab === 'member' && <span className="text-[#cfbcff]">会员中心</span>}
              {activeTab === 'wallet' && <span className="text-[#cfbcff]">钱包</span>}
              {activeTab === 'subscribe' && <span className="text-[#cfbcff]">认购</span>}
              {activeTab === 'commission' && <span className="text-[#cfbcff]">佣金</span>}
              {activeTab === 'team' && <span className="text-[#cfbcff]">团队</span>}
              {activeTab === 'queue' && <span className="text-[#cfbcff]">队列</span>}
              {activeTab === 'notifications' && <span className="text-[#cfbcff]">通知中心</span>}
              {activeTab === 'settings' && <span className="text-[#cfbcff]">设定</span>}
              {activeTab.startsWith('admin-') && (
                <span className="text-[#cfbcff] font-black flex items-center gap-1.5 uppercase text-[11px]">
                  <ShieldCheck className="w-4 h-4 text-[#cfbcff]" />
                  管理后台 ▸ {
                    activeTab === 'admin-dashboard' ? '仪表盘' :
                    activeTab === 'admin-users' ? '用户管理' :
                    activeTab === 'admin-plans' ? '套餐管理' :
                    activeTab === 'admin-orders' ? '订单管理' :
                    activeTab === 'admin-commissions' ? '佣金管理' :
                    activeTab === 'admin-queue' ? '排队管理' :
                    activeTab === 'admin-settlement' ? '结算管理' :
                    activeTab === 'admin-finance' ? '财务管理' :
                    activeTab === 'admin-parameters' ? '参数配置' :
                    activeTab === 'admin-broadcast' ? '通知管理' :
                    activeTab === 'admin-rbac' ? '权限管理' :
                    activeTab === 'admin-reports' ? '数据报表' : 
                    activeTab === 'admin-logs' ? '日志管理' :
                    activeTab === 'admin-profile' ? '个人安全中心' : '系统管理控制台'
                  }
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Language Selector Desktop */}
            <div className="relative">
              <button 
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="p-2 bg-[#211f24] hover:bg-[#2d2a30] transition-colors rounded-xl text-[#cbc4d2] border border-white/5 flex items-center justify-center cursor-pointer gap-1.5 px-3 min-w-[76px]"
                title="选择语言 Language"
              >
                <Languages className="w-4 h-4 text-[#cbc4d2]" />
                <span className="text-[11.5px] font-bold leading-none select-none text-[#cbc4d2]/90">
                  {currentLang === 'zh' ? '中文' : currentLang === 'zht' ? '繁體' : 'EN'}
                </span>
              </button>
              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-[#18161c] border border-white/10 rounded-xl shadow-2xl py-1.5 z-50 animate-fadeIn text-xs">
                  {[
                     { code: 'zh', label: '简体中文' },
                     { code: 'en', label: 'English' },
                     { code: 'zht', label: '繁體中文' }
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang.code as 'zh' | 'en' | 'zht');
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 hover:bg-white/5 transition-colors font-semibold flex items-center justify-between ${
                        currentLang === lang.code ? 'text-[#cfbcff]' : 'text-[#cbc4d2]'
                      }`}
                    >
                      <span>{lang.label}</span>
                      {currentLang === lang.code && <span className="w-1.5 h-1.5 rounded-full bg-[#cfbcff]"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {portalMode === 'client' && (
              <>
                {/* Top Bar Notification Bell Button */}
                <button 
                  onClick={() => setActiveTab('notifications')}
                  className="relative p-2 bg-[#211f24] hover:bg-[#2d2a30] transition-colors rounded-xl text-[#cbc4d2] border border-white/5 flex items-center justify-center cursor-pointer"
                >
                  <Bell className="w-4.5 h-4.5" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute -top-1 -right-1.5 min-w-[16px] h-4 rounded-full bg-[#ffb4ab] text-[#690005] font-black text-[9px] flex items-center justify-center px-1 border border-[#0c0a0f]">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </button>

                {/* Settings Shortcut Button */}
                <button 
                  onClick={() => setActiveTab('settings')}
                  className="p-2 bg-[#211f24] hover:bg-[#2d2a30] transition-colors rounded-xl text-[#cbc4d2] border border-white/5 flex items-center justify-center cursor-pointer"
                >
                  <Settings className="w-4.5 h-4.5" />
                </button>
              </>
            )}

            {/* Profile Indicator with Avatar and Name */}
            {portalMode === 'client' ? (
              <button 
                onClick={() => setActiveTab('member')}
                className="flex items-center gap-3 px-3 py-1 bg-[#211f24]/30 hover:bg-[#2d2a30]/50 transition-all rounded-full border border-white/5 cursor-pointer text-left select-none group"
              >
                <div className="text-right">
                  <p className="text-xs font-bold text-white leading-tight font-sans group-hover:text-[#cfbcff] transition-colors">{nickname}</p>
                  <p className="text-[10px] text-[#cbc4d2]/50 font-mono leading-none mt-0.5">UID: {currentUid}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6750a4] to-[#cfbcff] flex items-center justify-center shadow-md relative overflow-hidden group-hover:shadow-[#6750a4]/30 group-hover:scale-105 transition-all shrink-0">
                  <span className="text-white text-xs font-black">
                    {nickname ? nickname.charAt(0).toUpperCase() : 'A'}
                  </span>
                </div>
              </button>
            ) : (
              <button 
                onClick={() => setActiveTab('admin-profile')}
                className="flex items-center gap-3 px-3 py-1 bg-[#211f24]/30 hover:bg-[#cfbcff]/15 border border-[#cfbcff]/20 hover:border-[#cfbcff]/40 rounded-full text-left cursor-pointer select-none group active:scale-[0.98] transition-all outline-none"
                title="点击进入安全中心 / 修改密码"
              >
                <div className="text-right">
                  <p className="text-xs font-bold text-white leading-tight font-sans group-hover:text-[#cfbcff] transition-colors">{nickname}</p>
                  <p className="text-[10px] text-[#cbc4d2]/50 font-mono leading-none mt-0.5">UID: {currentUid}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6750a4] to-[#cfbcff] flex items-center justify-center shadow-md relative overflow-hidden group-hover:shadow-[#6750a4]/30 group-hover:scale-105 transition-all shrink-0 border border-[#cfbcff]/30">
                  <span className="text-white text-xs font-black">
                    {nickname ? nickname.charAt(0).toUpperCase() : 'A'}
                  </span>
                </div>
              </button>
            )}
          </div>
        </div>

        <main className="p-6 pt-24 md:pt-6 min-h-[calc(100vh-4rem)] pb-24 md:pb-8 max-w-7xl xl:max-w-[1500px] 2xl:max-w-[1720px] mx-auto w-full flex flex-col justify-start">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <div key="home" className="flex flex-col flex-grow w-full">
                <HomeView 
                  usdtBalance={usdtBalance}
                  trooBalance={trooBalance}
                  lockedQueueAmount={lockedQueueAmount}
                  cumulativeCommissions={cumulativeCommissions}
                  arrivedCommissions={arrivedCommissions}
                  failedCommissions={failedCommissions}
                  yesterdayRevenue={yesterdayRevenue}
                  remainingCredit={commissionPoolRemaining}
                  totalCredit={commissionPoolLimit}
                  creditUsedPercent={creditUsedPercent}
                  transactions={transactions}
                  setActiveTab={setActiveTab}
                  onQuickAction={handleQuickAction}
                  onRaiseCredit={handleRaiseCredit}
                />
              </div>
            )}

            {activeTab === 'member' && (
              <div key="member" className="flex flex-col flex-grow w-full">
                <MemberView 
                  uid={currentUid}
                  nickname={nickname}
                  joinDate="2023-10-24"
                  onUpdateNickname={onUpdateNickname}
                  onRaiseCredit={handleRaiseCredit}
                  remainingCredit={commissionPoolRemaining}
                  totalCredit={commissionPoolLimit}
                />
              </div>
            )}

            {activeTab === 'wallet' && (
              <div key="wallet" className="flex flex-col flex-grow w-full">
                <WalletView 
                  usdtBalance={usdtBalance}
                  trooBalance={trooBalance}
                  lockedQueueAmount={lockedQueueAmount}
                  transactions={transactions}
                  onAddTransaction={handleAddTransaction}
                  onUpdateBalances={handleUpdateBalances}
                />
              </div>
            )}

            {activeTab === 'subscribe' && (
              <div key="subscribe" className="flex flex-col flex-grow w-full">
                <SubscribeView 
                  usdtBalance={usdtBalance}
                  commissionPoolLimit={commissionPoolLimit}
                  commissionPoolRemaining={commissionPoolRemaining}
                  onUpdateCommissionPool={(limitDiff: number, remainingDiff: number) => {
                    if (limitDiff !== 0) state.setCommissionPoolLimit((prev: number) => prev + limitDiff);
                    if (remainingDiff !== 0) state.setCommissionPoolRemaining((prev: number) => prev + remainingDiff);
                  }}
                  onUpdateBalances={handleUpdateBalances}
                  onAddTransaction={handleAddTransaction}
                />
              </div>
            )}

            {activeTab === 'commission' && (
              <div key="commission" className="flex flex-col flex-grow w-full">
                <CommissionView 
                  cumulativeCommissions={cumulativeCommissions}
                  pendingBalance={pendingBalance}
                  arrivedCommissions={arrivedCommissions}
                  failedCommissions={failedCommissions}
                  commissionPoolLimit={commissionPoolLimit}
                  commissionPoolRemaining={commissionPoolRemaining}
                  onWithdrawCommissions={handleWithdrawCommissions}
                  onAddTransaction={handleAddTransaction}
                  onIncreaseLimit={(amount: number) => {
                    state.setCommissionPoolLimit((prev: number) => prev + amount);
                    state.setCommissionPoolRemaining((prev: number) => prev + amount);
                  }}
                  setActiveTab={setActiveTab}
                />
              </div>
            )}

            {activeTab === 'team' && (
              <div key="team" className="flex flex-col flex-grow w-full">
                <TeamView 
                  downlines={downlines}
                />
              </div>
            )}

            {activeTab === 'queue' && (
              <div key="queue" className="flex flex-col flex-grow w-full">
                <QueueView 
                  usdtBalance={usdtBalance}
                  lockedQueueAmount={lockedQueueAmount}
                  originalLockedQueue={originalLockedQueue}
                  releasedQueueAmount={releasedQueueAmount}
                  commissionPoolLimit={commissionPoolLimit}
                  commissionPoolRemaining={commissionPoolRemaining}
                  onUpdateBalances={handleUpdateBalances}
                  onAddTransaction={handleAddTransaction}
                  onExecuteSimulation={handleDirectSimulation}
                />
              </div>
            )}

            {activeTab === 'notifications' && (
              <div key="notifications" className="flex flex-col flex-grow w-full">
                <NotificationsView 
                  notifications={notifications}
                  onMarkAllRead={onMarkAllRead}
                  onClearNotifications={onClearNotifications}
                  onToggleRead={onToggleRead}
                />
              </div>
            )}

            {activeTab === 'settings' && (
              <div key="settings" className="flex flex-col flex-grow w-full">
                <SettingsView 
                  nickname={nickname}
                  email={email}
                  onUpdateNickname={onUpdateNickname}
                  onUpdateEmail={onUpdateEmail}
                  onLogout={onLogout}
                />
              </div>
            )}

            {activeTab === 'admin-dashboard' && (
              <div key="admin-dashboard" className="flex flex-col flex-grow w-full">
                <AdminDashboardView 
                  usdtBalance={usdtBalance}
                  lockedQueueAmount={lockedQueueAmount}
                />
              </div>
            )}

            {activeTab === 'admin-users' && (
              <div key="admin-users" className="flex flex-col flex-grow w-full">
                <AdminUsersView 
                  downlines={downlines}
                  onUpdateDownlines={setDownlines}
                />
              </div>
            )}

            {activeTab === 'admin-plans' && (
              <div key="admin-plans" className="flex flex-col flex-grow w-full">
                <AdminPlansView />
              </div>
            )}

            {activeTab === 'admin-orders' && (
              <div key="admin-orders" className="flex flex-col flex-grow w-full">
                <AdminOrdersView />
              </div>
            )}

            {activeTab === 'admin-commissions' && (
              <div key="admin-commissions" className="flex flex-col flex-grow w-full">
                <AdminCommissionsView />
              </div>
            )}

            {activeTab === 'admin-queue' && (
              <div key="admin-queue" className="flex flex-col flex-grow w-full">
                <AdminQueueView />
              </div>
            )}

            {activeTab === 'admin-settlement' && (
              <div key="admin-settlement" className="flex flex-col flex-grow w-full">
                <AdminSettlementView 
                  onUpdateBalances={handleUpdateBalances}
                />
              </div>
            )}

            {activeTab === 'admin-finance' && (
              <div key="admin-finance" className="flex flex-col flex-grow w-full">
                <AdminFinanceView 
                  pendingWithdrawals={pendingWithdrawals}
                  onApproveWithdrawal={handleApproveWithdrawal}
                  onRejectWithdrawal={handleRejectWithdrawal}
                  downlines={downlines}
                  transactions={transactions}
                />
              </div>
            )}

            {activeTab === 'admin-parameters' && (
              <div key="admin-parameters" className="flex flex-col flex-grow w-full">
                <AdminParametersView />
              </div>
            )}

            {activeTab === 'admin-broadcast' && (
              <div key="admin-broadcast" className="flex flex-col flex-grow w-full">
                <AdminBroadcastView 
                  onAddNotification={handleAddNotification}
                />
              </div>
            )}

            {activeTab === 'admin-rbac' && (
              <div key="admin-rbac" className="flex flex-col flex-grow w-full">
                <AdminRbacView />
              </div>
            )}

            {activeTab === 'admin-reports' && (
              <div key="admin-reports" className="flex flex-col flex-grow w-full">
                <AdminReportsView />
              </div>
            )}

            {activeTab === 'admin-logs' && (
              <div key="admin-logs" className="flex flex-col flex-grow w-full">
                <AdminLogsView 
                  transactions={transactions} 
                  downlines={downlines} 
                />
              </div>
            )}

            {activeTab === 'admin-profile' && (
              <div key="admin-profile" className="flex flex-col flex-grow w-full">
                <AdminProfileView 
                  uid={currentUid}
                  nickname={nickname}
                  email={email}
                  loginPasswordVal={loginPassword}
                  onUpdateNickname={(newName: string) => state.setNickname(newName)}
                  onUpdateEmail={(newEmail: string) => state.setEmail(newEmail)}
                  onUpdatePassword={(newPw: string) => state.setLoginPassword(newPw)}
                  onLogout={onLogout}
                />
              </div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* 🔮 GLOBAL CUSTOM OVERRIDE DIALOG OVERLAY */}
      <AnimatePresence>
        {globalAlert.show && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeGlobalAlert}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-[#15121b] border border-white/10 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl flex flex-col z-[10000]"
            >
              {/* Highlight accent bar based on notice type */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 ${
                globalAlert.type === 'error' ? 'bg-rose-500' :
                globalAlert.type === 'warning' ? 'bg-amber-500' :
                globalAlert.type === 'info' ? 'bg-[#cfbcff]' : 'bg-emerald-400'
              }`} />

              <div className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <span className={`p-2.5 rounded-xl mt-0.5 shrink-0 ${
                    globalAlert.type === 'error' ? 'bg-rose-500/10 text-rose-400' :
                    globalAlert.type === 'warning' ? 'bg-amber-500/10 text-amber-400' :
                    globalAlert.type === 'info' ? 'bg-[#cfbcff]/10 text-[#cfbcff]' : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {globalAlert.type === 'error' ? <AlertCircle className="w-5 h-5" /> :
                     globalAlert.type === 'warning' ? <AlertTriangle className="w-5 h-5" /> : 
                     globalAlert.type === 'info' ? <Info className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                  </span>
                  
                  <div className="space-y-1">
                    <h4 className="text-white text-xs font-black tracking-widest uppercase font-mono">
                      {globalAlert.type === 'error' ? '安全管控 / WARNING' :
                       globalAlert.type === 'warning' ? '动作提醒 / NOTICE' :
                       globalAlert.type === 'info' ? '信息同步 / INFO' : '交付成功 / SUCCESS'}
                    </h4>
                    <p className="text-[#cbc4d2]/80 text-xs sm:text-[13px] leading-relaxed whitespace-pre-line font-semibold break-words pt-1">
                      {globalAlert.message}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={closeGlobalAlert}
                    className="px-5 py-2.5 bg-[#cfbcff] text-[#100d14] text-xs font-black rounded-xl hover:bg-white transition-all cursor-pointer shadow-lg active:scale-95 outline-none font-sans"
                  >
                    我知道了 (CONFIRM)
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
