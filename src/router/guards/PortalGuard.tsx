import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { getRouteByPath, type PortalMode } from '../routes';

interface PortalGuardProps {
  children: ReactNode;
  portalMode: PortalMode;
}

export default function PortalGuard({ children, portalMode }: PortalGuardProps) {
  const state = useAppContext();
  const location = useLocation();

  useEffect(() => {
    const route = getRouteByPath(location.pathname);

    if (state.portalMode !== portalMode) {
      state.setPortalMode(portalMode);
    }

    if (route && state.activeTab !== route.tab) {
      state.setActiveTab(route.tab);
    }
  }, [location.pathname, portalMode, state]);

  return children;
}