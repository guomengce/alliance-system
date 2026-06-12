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
  { id: 'admin-dashboard', label: '仪表盘', icon: BarChart2 },
  { id: 'admin-users', label: '用户管理', icon: Users },
  { id: 'admin-plans', label: '套餐管理', icon: Sliders },
  { id: 'admin-orders', label: '订单管理', icon: FileText },
  { id: 'admin-commissions', label: '佣金管理', icon: Coins },
  { id: 'admin-queue', label: '排队管理', icon: Lock },
  { id: 'admin-settlement', label: '结算管理', icon: Calendar },
  { id: 'admin-finance', label: '财务管理', icon: DollarSign },
  { id: 'admin-parameters', label: '参数配置', icon: Settings },
  { id: 'admin-broadcast', label: '通知管理', icon: Bell },
  { id: 'admin-rbac', label: '权限管理', icon: ShieldCheck },
  { id: 'admin-reports', label: '数据报表', icon: TrendingUp },
  { id: 'admin-logs', label: '日志管理', icon: Terminal }
];

export const CLIENT_TAB_LABELS: Record<string, string> = {
  home: '首页',
  member: '会员中心',
  wallet: '钱包',
  subscribe: '认购',
  commission: '佣金',
  team: '团队',
  queue: '队列',
  notifications: '通知中心',
  settings: '设定'
};

export const ADMIN_TAB_LABELS: Record<string, string> = {
  'admin-dashboard': '仪表盘',
  'admin-users': '用户管理',
  'admin-plans': '套餐管理',
  'admin-orders': '订单管理',
  'admin-commissions': '佣金管理',
  'admin-queue': '排队管理',
  'admin-settlement': '结算管理',
  'admin-finance': '财务管理',
  'admin-parameters': '参数配置',
  'admin-broadcast': '通知管理',
  'admin-rbac': '权限管理',
  'admin-reports': '数据报表',
  'admin-logs': '日志管理',
  'admin-profile': '个人安全中心'
};

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

