import { ListTodo, PlusCircle, ShoppingCart, Users } from 'lucide-react';
import type { QuickActionsProps } from '../types';

export default function QuickActions({
  onNavigateToRoute,
  onQuickAction
}: QuickActionsProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-base font-bold text-white uppercase tracking-wider">快捷操作 (Quick Actions)</h4>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button 
          onClick={() => onQuickAction('recharge')}
          className="glass-card p-5 rounded-2xl flex flex-col items-center gap-3 group"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#cfbcff]/10 flex items-center justify-center group-hover:scale-110 duration-200 transition-transform">
            <PlusCircle className="w-7 h-7 text-[#cfbcff]" />
          </div>
          <span className="text-xs font-bold text-white tracking-wide">账户充值</span>
        </button>

        <button 
          onClick={() => onNavigateToRoute('subscribe')}
          className="glass-card p-5 rounded-2xl flex flex-col items-center gap-3 group"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#e7c365]/10 flex items-center justify-center group-hover:scale-110 duration-200 transition-transform">
            <ShoppingCart className="w-7 h-7 text-[#e7c365]" />
          </div>
          <span className="text-xs font-bold text-white tracking-wide">项目认购</span>
        </button>

        <button 
          onClick={() => onNavigateToRoute('team')}
          className="glass-card p-5 rounded-2xl flex flex-col items-center gap-3 group"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#cdc0e9]/10 flex items-center justify-center group-hover:scale-110 duration-200 transition-transform">
            <Users className="w-7 h-7 text-[#cdc0e9]" />
          </div>
          <span className="text-xs font-bold text-white tracking-wide">团队管理</span>
        </button>

        <button 
          onClick={() => onQuickAction('orders')}
          className="glass-card p-5 rounded-2xl flex flex-col items-center gap-3 group"
        >
          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 duration-200 transition-transform">
            <ListTodo className="w-7 h-7 text-[#cbc4d2]" />
          </div>
          <span className="text-xs font-bold text-white tracking-wide">订单记录</span>
        </button>
      </div>
    </div>
  );
}
