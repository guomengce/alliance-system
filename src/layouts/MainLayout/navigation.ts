import {
  BarChart2,
  Bell,
  Calendar,
  Coins,
  DollarSign,
  FileText,
  Lock,
  Settings,
  ShieldCheck,
  Sliders,
  Terminal,
  TrendingUp,
  Users
} from 'lucide-react';

export const ADMIN_MOBILE_MENU_ITEMS = [
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


export const MOBILE_LANG_OPTIONS = [
  { code: 'zh', label: '绠€浣撲腑鏂?' },
  { code: 'en', label: 'English' },
  { code: 'zht', label: '绻侀珨涓枃' }
];

export const DESKTOP_LANG_OPTIONS = [
  { code: 'zh', label: '简体中文' },
  { code: 'en', label: 'English' },
  { code: 'zht', label: '繁體中文' }
];

