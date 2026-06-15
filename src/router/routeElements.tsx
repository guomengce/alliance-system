import { Navigate, useNavigate } from 'react-router-dom';
import LoginView from '../features/auth';
import { useAppContext } from '../context/AppContext';
import { getDefaultRouteForPortal, type PortalMode } from './routes';

const getDefaultPath = (portalMode: PortalMode): string => getDefaultRouteForPortal(portalMode).path;

export function LoginRoute() {
  const state = useAppContext();
  const navigate = useNavigate();

  if (state.isAuthenticated) {
    return <Navigate to={getDefaultPath(state.portalMode)} replace />;
  }

  return (
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
        navigate(getDefaultPath(mode), { replace: true });
      }}
    />
  );
}

export function RootRedirect() {
  const { isAuthenticated, portalMode } = useAppContext();
  return <Navigate to={isAuthenticated ? getDefaultPath(portalMode) : '/login'} replace />;
}

interface PortalIndexRedirectProps {
  portalMode: PortalMode;
}

export function PortalIndexRedirect({ portalMode }: PortalIndexRedirectProps) {
  return <Navigate to={getDefaultPath(portalMode).split('/').pop() || ''} replace />;
}

export function NotFoundRedirect() {
  const { isAuthenticated, portalMode } = useAppContext();
  return <Navigate to={isAuthenticated ? getDefaultPath(portalMode) : '/login'} replace />;
}