import React, { createContext, useContext, ReactNode } from 'react';
import { useAppState } from '../hooks/useAppState';

type AppStateContextType = ReturnType<typeof useAppState>;

const AppContext = createContext<AppStateContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const state = useAppState();
  return (
    <AppContext.Provider value={state}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppStateContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
