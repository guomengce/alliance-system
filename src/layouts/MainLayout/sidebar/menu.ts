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
import type { MenuItem } from './types';

export const getAllowedAdminTabs = (adminRole: string | null): string[] => {
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

export const ADMIN_MENU_ITEMS: MenuItem[] = [
  { id: 'admin-dashboard', label: '仪表盘', icon: BarChart2, path: '/admin/dashboard' },
  { id: 'admin-users', label: '用户管理', icon: Users, path: '/admin/users' },
  { id: 'admin-plans', label: '套餐管理', icon: Sliders, path: '/admin/plans' },
  { id: 'admin-orders', label: '订单管理', icon: FileText, path: '/admin/orders' },
  { id: 'admin-commissions', label: '佣金管理', icon: Coins, path: '/admin/commissions' },
  { id: 'admin-queue', label: '排队管理', icon: Lock, path: '/admin/queue' },
  { id: 'admin-settlement', label: '结算管理', icon: Calendar, path: '/admin/settlement' },
  { id: 'admin-finance', label: '财务管理', icon: DollarSign, path: '/admin/finance' },
  { id: 'admin-parameters', label: '参数配置', icon: Settings, path: '/admin/parameters' },
  { id: 'admin-broadcast', label: '通知管理', icon: Bell, path: '/admin/broadcast' },
  { id: 'admin-rbac', label: '权限管理', icon: ShieldCheck, path: '/admin/rbac' },
  { id: 'admin-reports', label: '数据报表', icon: TrendingUp, path: '/admin/reports' },
  { id: 'admin-logs', label: '日志管理', icon: Terminal, path: '/admin/logs' }
];

export const CLIENT_MENU_ITEMS: MenuItem[] = [
  { id: 'home', label: '首页', icon: Home, path: '/client/home' },
  { id: 'wallet', label: '钱包', icon: Wallet, path: '/client/wallet' },
  { id: 'subscribe', label: '认购', icon: Compass, path: '/client/subscribe' },
  { id: 'commission', label: '佣金', icon: Coins, path: '/client/commission' },
  { id: 'team', label: '团队', icon: Users, path: '/client/team' },
  { id: 'queue', label: '队列', icon: Layers, path: '/client/queue' }
];
