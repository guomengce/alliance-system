import { Button } from 'antd';
import { ArrowDownLeft, ArrowUpRight, Info, RefreshCcw } from 'lucide-react';
import type { ReactNode } from 'react';
import type { ActionTabsProps, ActionType } from '../types';

const actions: Array<{
  key: Exclude<ActionType, 'none'>;
  label: string;
  icon: ReactNode;
}> = [
  { key: 'recharge', label: '充值', icon: <ArrowDownLeft className="w-4 sm:w-4.5 h-4 sm:h-4.5" /> },
  { key: 'withdraw', label: '提现', icon: <ArrowUpRight className="w-4 sm:w-4.5 h-4 sm:h-4.5" /> },
  { key: 'transfer', label: '划转', icon: <RefreshCcw className="w-4 sm:w-4.5 h-4 sm:h-4.5" /> }
];

export default function ActionTabs({ activeAction, onToggleAction }: ActionTabsProps) {
  const getButtonState = (action: Exclude<ActionType, 'none'>) => {
    if (activeAction === action) return 'is-active';
    if (activeAction === 'none') return 'is-idle';
    return 'is-muted';
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
      {actions.map((action) => (
        <Button
          key={action.key}
          className={`alliance-antd-wallet-action-button ${getButtonState(action.key)}`}
          icon={action.icon}
          onClick={() => onToggleAction(activeAction === action.key ? 'none' : action.key)}
        >
          {action.label}
        </Button>
      ))}

      <div className="w-full sm:w-auto sm:ml-auto flex items-center gap-1 text-[10px] sm:text-xs text-[#cbc4d2] opacity-60 font-medium">
        <Info className="w-3.5 h-3.5 text-[#cfbcff]" />
        <span>交易流程均经多重安全链上校验</span>
      </div>
    </div>
  );
}
