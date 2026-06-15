import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

export default function AuthGuard() {
  const { isAuthenticated } = useAppContext();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}