import type { ReactNode } from 'react';
import { AnimatePresence } from 'motion/react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import DesktopHeader from './DesktopHeader';
import GlobalAlertDialog from './GlobalAlertDialog';
import MobileHeader from './MobileHeader';
import type { AppStateContext } from './types';

interface LayoutFrameProps {
  state: AppStateContext;
  children?: ReactNode;
}

export default function LayoutFrame({ state, children }: LayoutFrameProps) {
  const location = useLocation();
  const {
    portalMode,
    nickname,
    currentUid,
    unreadNotificationsCount,
    onLogout
  } = state;

  return (
    <div key="portal" className="flex min-h-screen">
      <Sidebar
        uid={currentUid}
        nickname={nickname}
        unreadCount={unreadNotificationsCount}
        onLogout={onLogout}
        portalMode={portalMode}
      />

      <MobileHeader state={state} />
      {children}

      <div className="flex-1 flex flex-col min-w-0 md:pl-[280px]">
        <DesktopHeader state={state} />

        <main className="p-6 pt-24 md:pt-6 min-h-[calc(100vh-4rem)] pb-24 md:pb-8 max-w-7xl xl:max-w-[1500px] 2xl:max-w-[1720px] mx-auto w-full flex flex-col justify-start">
          <AnimatePresence mode="wait">
            <div key={location.pathname} className="flex flex-col flex-grow w-full">
              <Outlet />
            </div>
          </AnimatePresence>
        </main>
      </div>

      <GlobalAlertDialog state={state} />
    </div>
  );
}