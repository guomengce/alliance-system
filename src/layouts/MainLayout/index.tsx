import React from 'react';
import Sidebar from './Sidebar';
import { useAppContext } from '../../context/AppContext';
import AdminMobileDrawer from './AdminMobileDrawer';
import ContentRouter from './ContentRouter';
import DesktopHeader from './DesktopHeader';
import GlobalAlertDialog from './GlobalAlertDialog';
import MobileHeader from './MobileHeader';

export default function MainLayout() {
  const state = useAppContext();
  const {
    triggerGlobalAlert,
    portalMode,
    nickname,
    currentUid,
    activeTab,
    setActiveTab,
    unreadNotificationsCount,
    onLogout
  } = state;

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

      <MobileHeader state={state} />
      <AdminMobileDrawer state={state} />

      <div className="flex-1 flex flex-col min-w-0 md:pl-[280px]">
        <DesktopHeader state={state} />

        <main className="p-6 pt-24 md:pt-6 min-h-[calc(100vh-4rem)] pb-24 md:pb-8 max-w-7xl xl:max-w-[1500px] 2xl:max-w-[1720px] mx-auto w-full flex flex-col justify-start">
          <ContentRouter state={state} />
        </main>
      </div>

      <GlobalAlertDialog state={state} />
    </div>
  );
}
