import {
  BarChart2,
  Bell,
  Calendar,
  Coins,
  Compass,
  DollarSign,
  FileText,
  Home,
  Layers,
  Lock,
  Settings,
  ShieldCheck,
  Sliders,
  Terminal,
  TrendingUp,
  Users,
  Wallet
} from 'lucide-react';
import { getRouteByMenuId } from '../../../router/routes';
import type { LayoutMenuItem } from '../types';

const getMenuRoute = (menuId: string): Pick<LayoutMenuItem, 'label' | 'path'> => {
  const route = getRouteByMenuId(menuId);
  if (!route) {
    throw new Error(`Missing route meta for menu item: ${menuId}`);
  }
  return {
    label: route.label,
    path: route.path
  };
};

export const getAllowedAdminMenuIds = (adminRole: string | null): string[] => {
  if (adminRole === 'SUPER_ADMIN') {
    return [
      'admin-dashboard', 'admin-users', 'admin-plans', 'admin-orders',
      'admin-commissions', 'admin-queue', 'admin-settlement', 'admin-finance',
      'admin-parameters', 'admin-broadcast', 'admin-rbac', 'admin-reports', 'admin-logs', 'admin-profile'
    ];
  }
  if (adminRole === 'FINANCE_DIR') {
    return ['admin-dashboard', 'admin-orders', 'admin-commissions', 'admin-settlement', 'admin-finance', 'admin-reports', 'admin-profile'];
  }
  if (adminRole === 'RISK_OFFICER') {
    return ['admin-dashboard', 'admin-orders', 'admin-queue', 'admin-profile'];
  }
  if (adminRole === 'OPERATOR') {
    return ['admin-dashboard', 'admin-users', 'admin-plans', 'admin-broadcast', 'admin-profile'];
  }
  return ['admin-dashboard', 'admin-profile'];
};

export const ADMIN_MENU_ITEMS: LayoutMenuItem[] = [
  { id: 'admin-dashboard', ...getMenuRoute('admin-dashboard'), icon: BarChart2 },
  { id: 'admin-users', ...getMenuRoute('admin-users'), icon: Users },
  { id: 'admin-plans', ...getMenuRoute('admin-plans'), icon: Sliders },
  { id: 'admin-orders', ...getMenuRoute('admin-orders'), icon: FileText },
  { id: 'admin-commissions', ...getMenuRoute('admin-commissions'), icon: Coins },
  { id: 'admin-queue', ...getMenuRoute('admin-queue'), icon: Lock },
  { id: 'admin-settlement', ...getMenuRoute('admin-settlement'), icon: Calendar },
  { id: 'admin-finance', ...getMenuRoute('admin-finance'), icon: DollarSign },
  { id: 'admin-parameters', ...getMenuRoute('admin-parameters'), icon: Settings },
  { id: 'admin-broadcast', ...getMenuRoute('admin-broadcast'), icon: Bell },
  { id: 'admin-rbac', ...getMenuRoute('admin-rbac'), icon: ShieldCheck },
  { id: 'admin-reports', ...getMenuRoute('admin-reports'), icon: TrendingUp },
  { id: 'admin-logs', ...getMenuRoute('admin-logs'), icon: Terminal }
];

export const CLIENT_MENU_ITEMS: LayoutMenuItem[] = [
  { id: 'home', ...getMenuRoute('home'), icon: Home },
  { id: 'wallet', ...getMenuRoute('wallet'), icon: Wallet },
  { id: 'subscribe', ...getMenuRoute('subscribe'), icon: Compass },
  { id: 'commission', ...getMenuRoute('commission'), icon: Coins },
  { id: 'team', ...getMenuRoute('team'), icon: Users },
  { id: 'queue', ...getMenuRoute('queue'), icon: Layers }
];
