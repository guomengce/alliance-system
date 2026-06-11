import { 
  Home, 
  User, 
  Wallet, 
  Compass, 
  Coins, 
  Users, 
  Layers, 
  Bell, 
  Settings, 
  LogOut,
  ShieldCheck,
  BarChart2,
  Sliders,
  FileText,
  Lock,
  Calendar,
  DollarSign,
  TrendingUp,
  Terminal
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  uid: string;
  nickname: string;
  unreadCount: number;
  onLogout: () => void;
  portalMode: 'client' | 'admin';
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  uid, 
  nickname,
  unreadCount,
  onLogout,
  portalMode
}: SidebarProps) {
  const { adminRole } = useAppContext();

  const allowedTabs = portalMode === 'admin'
    ? (adminRole === 'SUPER_ADMIN'
      ? [
          'admin-dashboard', 'admin-users', 'admin-plans', 'admin-orders',
          'admin-commissions', 'admin-queue', 'admin-settlement', 'admin-finance',
          'admin-parameters', 'admin-broadcast', 'admin-rbac', 'admin-reports', 'admin-logs', 'admin-profile'
        ]
      : adminRole === 'FINANCE_DIR'
      ? ['admin-dashboard', 'admin-orders', 'admin-commissions', 'admin-settlement', 'admin-finance', 'admin-reports', 'admin-profile']
      : adminRole === 'RISK_OFFICER'
      ? ['admin-dashboard', 'admin-orders', 'admin-queue', 'admin-profile']
      : adminRole === 'OPERATOR'
      ? ['admin-dashboard', 'admin-users', 'admin-plans', 'admin-broadcast', 'admin-profile']
      : ['admin-dashboard', 'admin-profile']
    )
    : [];

  const rawMenuItems = portalMode === 'admin'
    ? [
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
        { id: 'admin-logs', label: '日志管理', icon: Terminal },
      ]
    : [
        { id: 'home', label: '首页', icon: Home },
        { id: 'wallet', label: '钱包', icon: Wallet },
        { id: 'subscribe', label: '认购', icon: Compass },
        { id: 'commission', label: '佣金', icon: Coins },
        { id: 'team', label: '团队', icon: Users },
        { id: 'queue', label: '队列', icon: Layers },
      ];

  // Remove possible exact duplicates or unwanted items
  const menuItems = portalMode === 'admin'
    ? rawMenuItems.filter(item => item.id && allowedTabs.includes(item.id))
    : rawMenuItems;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-[280px] hidden md:flex flex-col bg-[#110e16]/80 backdrop-blur-3xl border-r border-white/5 shadow-2xl py-6 px-4 gap-4 z-50">
        
        {/* Logo Header */}
        <div className="flex items-center gap-3 px-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6750a4] to-[#cfbcff] flex items-center justify-center shadow-lg shadow-[#6750a4]/20">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-sans text-xl font-black text-[#cfbcff] tracking-tight leading-none">
              Alliance System
            </h1>
            <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest mt-1">
              Institutional Grade
            </p>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all duration-300 group ${
                  isActive 
                    ? 'bg-[#6750a4] text-white font-bold shadow-lg shadow-[#6750a4]/15' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconComponent className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-[#cbc4d2]'
                  }`} />
                  <span className="text-sm tracking-wide">{item.label}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Bottom Nav on Mobile - Only for client */}
      {portalMode === 'client' && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#110e16]/95 backdrop-blur-xl border-t border-white/5 flex items-center z-50 px-3 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.4)] justify-around">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="flex flex-col items-center justify-center gap-1 py-1 transition-all shrink-0 flex-1 text-[#cbc4d2]/60 hover:text-[#cbc4d2]"
              >
                <IconComponent className={`w-4.5 h-4.5 transition-transform ${isActive ? 'scale-110 text-[#cfbcff]' : ''}`} />
                <span className="text-[9px] tracking-tight whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </nav>
      )}
    </>
  );
}
