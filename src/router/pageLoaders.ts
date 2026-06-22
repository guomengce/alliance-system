import { lazy } from 'react';

export const CLIENT_PAGE_COMPONENTS = {
  home: lazy(() => import('../features/client/home')),
  member: lazy(() => import('../features/client/member')),
  wallet: lazy(() => import('../features/client/wallet')),
  subscribe: lazy(() => import('../features/client/subscribe')),
  commission: lazy(() => import('../features/client/commission')),
  team: lazy(() => import('../features/client/team')),
  queue: lazy(() => import('../features/client/queue')),
  notifications: lazy(() => import('../features/client/notifications')),
  settings: lazy(() => import('../features/client/settings'))
};

export const ADMIN_PAGE_COMPONENTS = {
  'admin-dashboard': lazy(() => import('../features/admin/dashboard')),
  'admin-users': lazy(() => import('../features/admin/users')),
  'admin-plans': lazy(() => import('../features/admin/plans')),
  'admin-orders': lazy(() => import('../features/admin/orders')),
  'admin-commissions': lazy(() => import('../features/admin/commissions')),
  'admin-queue': lazy(() => import('../features/admin/queue')),
  'admin-settlement': lazy(() => import('../features/admin/settlement')),
  'admin-finance': lazy(() => import('../features/admin/finance')),
  'admin-parameters': lazy(() => import('../features/admin/parameters')),
  'admin-broadcast': lazy(() => import('../features/admin/broadcast')),
  'admin-rbac': lazy(() => import('../features/admin/rbac')),
  'admin-reports': lazy(() => import('../features/admin/reports')),
  'admin-logs': lazy(() => import('../features/admin/logs')),
  'admin-profile': lazy(() => import('../features/admin/profile'))
};
