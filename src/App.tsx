import React from 'react';
import { AnimatePresence } from 'motion/react';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import LoginView from './features/auth';
import MainLayout from './layouts/MainLayout';
import { getDefaultRouteForPortal, getRouteByPath, getRouteByTab } from './router/routes';

function AppContent() {
  const state = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    activeTab,
    isAuthenticated,
    portalMode,
    setActiveTab,
    setPortalMode
  } = state;

  React.useEffect(() => {
    const route = getRouteByPath(location.pathname);
    if (!route) return;

    if (portalMode !== route.portalMode) {
      setPortalMode(route.portalMode);
    }

    if (activeTab !== route.tab) {
      setActiveTab(route.tab);
    }
  }, [activeTab, location.pathname, portalMode, setActiveTab, setPortalMode]);

  React.useEffect(() => {
    if (!isAuthenticated) return;

    const activeRoute = getRouteByTab(activeTab) || getDefaultRouteForPortal(portalMode);
    if (location.pathname !== activeRoute.path) {
      navigate(activeRoute.path);
    }
  }, [activeTab, isAuthenticated, location.pathname, navigate, portalMode]);

  return (
    <div id="app_root" className="min-h-screen bg-[#0c0a0f] text-[#e6e0e9] antialiased">
      <AnimatePresence mode="wait">
        {!state.isAuthenticated ? (
          <LoginView 
            portalMode={state.portalMode}
            setPortalMode={state.setPortalMode}
            loginEmail={state.loginEmail}
            setLoginEmail={state.setLoginEmail}
            loginPassword={state.loginPassword}
            setLoginPassword={state.setLoginPassword}
            setNickname={state.setNickname}
            setEmail={state.setEmail}
            onSuccess={(mode) => {
              state.setIsAuthenticated(true);
              if (mode === 'admin') {
                state.setActiveTab('admin-dashboard');
              } else {
                state.setActiveTab('home');
              }
            }}
          />
        ) : (
          <MainLayout />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
}
