import React from 'react';
import { AnimatePresence } from 'motion/react';
import { AppProvider, useAppContext } from './context/AppContext';
import LoginView from './features/auth';
import MainLayout from './layouts/MainLayout';

function AppContent() {
  const state = useAppContext();

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
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
