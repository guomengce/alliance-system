export type PortalMode = 'client' | 'admin';

export interface AppRouteEntry {
  tab: string;
  path: string;
  portalMode: PortalMode;
}

export const CLIENT_ROUTE_ENTRIES: AppRouteEntry[] = [
  { tab: 'home', path: '/client/home', portalMode: 'client' },
  { tab: 'member', path: '/client/member', portalMode: 'client' },
  { tab: 'wallet', path: '/client/wallet', portalMode: 'client' },
  { tab: 'subscribe', path: '/client/subscribe', portalMode: 'client' },
  { tab: 'commission', path: '/client/commission', portalMode: 'client' },
  { tab: 'team', path: '/client/team', portalMode: 'client' },
  { tab: 'queue', path: '/client/queue', portalMode: 'client' },
  { tab: 'notifications', path: '/client/notifications', portalMode: 'client' },
  { tab: 'settings', path: '/client/settings', portalMode: 'client' }
];

export const ADMIN_ROUTE_ENTRIES: AppRouteEntry[] = [
  { tab: 'admin-dashboard', path: '/admin/dashboard', portalMode: 'admin' },
  { tab: 'admin-users', path: '/admin/users', portalMode: 'admin' },
  { tab: 'admin-plans', path: '/admin/plans', portalMode: 'admin' },
  { tab: 'admin-orders', path: '/admin/orders', portalMode: 'admin' },
  { tab: 'admin-commissions', path: '/admin/commissions', portalMode: 'admin' },
  { tab: 'admin-queue', path: '/admin/queue', portalMode: 'admin' },
  { tab: 'admin-settlement', path: '/admin/settlement', portalMode: 'admin' },
  { tab: 'admin-finance', path: '/admin/finance', portalMode: 'admin' },
  { tab: 'admin-parameters', path: '/admin/parameters', portalMode: 'admin' },
  { tab: 'admin-broadcast', path: '/admin/broadcast', portalMode: 'admin' },
  { tab: 'admin-rbac', path: '/admin/rbac', portalMode: 'admin' },
  { tab: 'admin-reports', path: '/admin/reports', portalMode: 'admin' },
  { tab: 'admin-logs', path: '/admin/logs', portalMode: 'admin' },
  { tab: 'admin-profile', path: '/admin/profile', portalMode: 'admin' }
];

export const APP_ROUTE_ENTRIES: AppRouteEntry[] = [
  ...CLIENT_ROUTE_ENTRIES,
  ...ADMIN_ROUTE_ENTRIES
];

const normalizePath = (path: string): string => {
  const [pathname] = path.split(/[?#]/);
  const normalized = pathname.replace(/\/+$/, '');
  return normalized || '/';
};

export const getRouteByTab = (tab: string): AppRouteEntry | undefined => (
  APP_ROUTE_ENTRIES.find((entry) => entry.tab === tab)
);

export const getRouteByPath = (path: string): AppRouteEntry | undefined => {
  const normalizedPath = normalizePath(path);
  return APP_ROUTE_ENTRIES.find((entry) => entry.path === normalizedPath);
};

export const getDefaultRouteForPortal = (portalMode: PortalMode): AppRouteEntry => (
  portalMode === 'admin' ? ADMIN_ROUTE_ENTRIES[0] : CLIENT_ROUTE_ENTRIES[0]
);
