export type PortalMode = 'client' | 'admin';

export interface AppRouteEntry {
  routeId: string;
  menuId: string;
  label: string;
  path: string;
  portalMode: PortalMode;
}

export const CLIENT_ROUTE_ENTRIES: AppRouteEntry[] = [
  { routeId: 'home', menuId: 'home', label: '首页', path: '/client/home', portalMode: 'client' },
  { routeId: 'member', menuId: 'member', label: '会员中心', path: '/client/member', portalMode: 'client' },
  { routeId: 'wallet', menuId: 'wallet', label: '钱包', path: '/client/wallet', portalMode: 'client' },
  { routeId: 'subscribe', menuId: 'subscribe', label: '认购', path: '/client/subscribe', portalMode: 'client' },
  { routeId: 'commission', menuId: 'commission', label: '佣金', path: '/client/commission', portalMode: 'client' },
  { routeId: 'team', menuId: 'team', label: '团队', path: '/client/team', portalMode: 'client' },
  { routeId: 'queue', menuId: 'queue', label: '队列', path: '/client/queue', portalMode: 'client' },
  { routeId: 'notifications', menuId: 'notifications', label: '通知中心', path: '/client/notifications', portalMode: 'client' },
  { routeId: 'settings', menuId: 'settings', label: '设定', path: '/client/settings', portalMode: 'client' }
];

export const ADMIN_ROUTE_ENTRIES: AppRouteEntry[] = [
  { routeId: 'admin-dashboard', menuId: 'admin-dashboard', label: '仪表盘', path: '/admin/dashboard', portalMode: 'admin' },
  { routeId: 'admin-users', menuId: 'admin-users', label: '用户管理', path: '/admin/users', portalMode: 'admin' },
  { routeId: 'admin-plans', menuId: 'admin-plans', label: '套餐管理', path: '/admin/plans', portalMode: 'admin' },
  { routeId: 'admin-orders', menuId: 'admin-orders', label: '订单管理', path: '/admin/orders', portalMode: 'admin' },
  { routeId: 'admin-commissions', menuId: 'admin-commissions', label: '佣金管理', path: '/admin/commissions', portalMode: 'admin' },
  { routeId: 'admin-queue', menuId: 'admin-queue', label: '排队管理', path: '/admin/queue', portalMode: 'admin' },
  { routeId: 'admin-settlement', menuId: 'admin-settlement', label: '结算管理', path: '/admin/settlement', portalMode: 'admin' },
  { routeId: 'admin-finance', menuId: 'admin-finance', label: '财务管理', path: '/admin/finance', portalMode: 'admin' },
  { routeId: 'admin-parameters', menuId: 'admin-parameters', label: '参数配置', path: '/admin/parameters', portalMode: 'admin' },
  { routeId: 'admin-broadcast', menuId: 'admin-broadcast', label: '通知管理', path: '/admin/broadcast', portalMode: 'admin' },
  { routeId: 'admin-rbac', menuId: 'admin-rbac', label: '权限管理', path: '/admin/rbac', portalMode: 'admin' },
  { routeId: 'admin-reports', menuId: 'admin-reports', label: '数据报表', path: '/admin/reports', portalMode: 'admin' },
  { routeId: 'admin-logs', menuId: 'admin-logs', label: '日志管理', path: '/admin/logs', portalMode: 'admin' },
  { routeId: 'admin-profile', menuId: 'admin-profile', label: '个人安全中心', path: '/admin/profile', portalMode: 'admin' }
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

export const getRouteByRouteId = (routeId: string): AppRouteEntry | undefined => (
  APP_ROUTE_ENTRIES.find((entry) => entry.routeId === routeId)
);

export const getRouteByMenuId = (menuId: string): AppRouteEntry | undefined => (
  APP_ROUTE_ENTRIES.find((entry) => entry.menuId === menuId)
);

export const getRouteByPath = (path: string): AppRouteEntry | undefined => {
  const normalizedPath = normalizePath(path);
  return APP_ROUTE_ENTRIES.find((entry) => entry.path === normalizedPath);
};

export const getDefaultRouteForPortal = (portalMode: PortalMode): AppRouteEntry => (
  portalMode === 'admin' ? ADMIN_ROUTE_ENTRIES[0] : CLIENT_ROUTE_ENTRIES[0]
);
