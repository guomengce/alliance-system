import type { RouteObject } from 'react-router-dom';
import { ADMIN_ROUTE_ENTRIES } from './routes';
import { AdminRouteElement } from './adminRouteElements';

export const adminRouteObjects: RouteObject[] = ADMIN_ROUTE_ENTRIES.map((entry) => ({
  path: entry.path,
  element: <AdminRouteElement tab={entry.tab} />
}));

export const appRouteObjects: RouteObject[] = [
  ...adminRouteObjects
];