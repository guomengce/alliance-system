import { ReactNode, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import type { PortalMode } from '../routes';

interface PortalGuardProps {
  children: ReactNode;
  portalMode: PortalMode;
}

export default function PortalGuard({ children, portalMode }: PortalGuardProps) {
  const { portalMode: currentPortalMode, setPortalMode } = useAppContext();

  useEffect(() => {
    if (currentPortalMode !== portalMode) {
      setPortalMode(portalMode);
    }
  }, [currentPortalMode, portalMode, setPortalMode]);

  return children;
}
