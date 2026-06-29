import { Navigate, type RouteObject } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import ClientLayout from '../layouts/ClientLayout';
import RouteShell from '../layouts/RouteShell';
import { AdminRouteElement } from './adminRouteElements';
import { ClientRouteElement } from './clientRouteElements';
import AuthGuard from './guards/AuthGuard';
import PortalGuard from './guards/PortalGuard';
import { ADMIN_ROUTE_ENTRIES, CLIENT_ROUTE_ENTRIES } from './routes';
import { LoginRoute, NotFoundRedirect, PortalIndexRedirect, RootRedirect } from './routeElements';

const stripPortalPrefix = (path: string, prefix: '/admin' | '/client'): string => (
  path.replace(`${prefix}/`, '')
);

export const adminRouteObjects: RouteObject[] = ADMIN_ROUTE_ENTRIES.map((entry) => ({
  path: stripPortalPrefix(entry.path, '/admin'),
  element: <AdminRouteElement routeId={entry.routeId} />
}));

export const clientRouteObjects: RouteObject[] = CLIENT_ROUTE_ENTRIES.map((entry) => ({
  path: stripPortalPrefix(entry.path, '/client'),
  element: <ClientRouteElement routeId={entry.routeId} />
}));

export const appRouteObjects: RouteObject[] = [
  {
    path: '/login',
    element: <LoginRoute />
  },
  {
    path: '/',
    element: <RootRedirect />
  },
  {
    element: <AuthGuard />,
    children: [
      {
        element: <RouteShell />,
        children: [
          {
            path: '/client',
            element: (
              <PortalGuard portalMode="client">
                <ClientLayout />
              </PortalGuard>
            ),
            children: [
              { index: true, element: <PortalIndexRedirect portalMode="client" /> },
              ...clientRouteObjects
            ]
          },
          {
            path: '/admin',
            element: (
              <PortalGuard portalMode="admin">
                <AdminLayout />
              </PortalGuard>
            ),
            children: [
              { index: true, element: <PortalIndexRedirect portalMode="admin" /> },
              ...adminRouteObjects
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundRedirect />
  },
  {
    path: '/404',
    element: <Navigate to="/" replace />
  }
];
