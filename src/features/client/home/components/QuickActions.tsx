import { Button } from 'antd';
import { ListTodo, PlusCircle, ShoppingCart, Users } from 'lucide-react';
import type { ReactNode } from 'react';
import type { QuickActionsProps } from '../types';

const quickActions: Array<{
  label: string;
  icon: ReactNode;
  action: (props: QuickActionsProps) => void;
}> = [
  {
    label: '账户充值',
    icon: <PlusCircle className="w-7 h-7 text-[#cfbcff]" />,
    action: ({ onQuickAction }) => onQuickAction('recharge'),
  },
  {
    label: '项目认购',
    icon: <ShoppingCart className="w-7 h-7 text-[#e7c365]" />,
    action: ({ onNavigateToRoute }) => onNavigateToRoute('subscribe'),
  },
  {
    label: '团队管理',
    icon: <Users className="w-7 h-7 text-[#cdc0e9]" />,
    action: ({ onNavigateToRoute }) => onNavigateToRoute('team'),
  },
  {
    label: '订单记录',
    icon: <ListTodo className="w-7 h-7 text-[#cbc4d2]" />,
    action: ({ onQuickAction }) => onQuickAction('orders'),
  },
];

const iconBg = ['bg-[#cfbcff]/10', 'bg-[#e7c365]/10', 'bg-[#cdc0e9]/10', 'bg-white/5'];

export default function QuickActions(props: QuickActionsProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-base font-bold text-white uppercase tracking-wider">快捷操作 (Quick Actions)</h4>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((item, index) => (
          <Button
            key={item.label}
            className="alliance-antd-home-quick-button group"
            icon={(
              <div className={`w-14 h-14 rounded-2xl ${iconBg[index]} flex items-center justify-center group-hover:scale-110 duration-200 transition-transform`}>
                {item.icon}
              </div>
            )}
            onClick={() => item.action(props)}
          >
            <span className="text-xs font-bold text-white tracking-wide">{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
