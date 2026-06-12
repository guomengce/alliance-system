import { Bell, CheckCheck, Trash2 } from 'lucide-react';
import type { HeaderActionsProps } from '../types';

export default function HeaderActions({
  notifications,
  onMarkAllRead,
  onClearNotifications
}: HeaderActionsProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <p className="text-xs text-[#cbc4d2] opacity-75 flex items-center gap-1.5">
          <Bell className="w-3.5 h-3.5 text-[#cfbcff] shrink-0" />
          处理全部来自同盟系统内的重要公告与账户流水变动        </p>
      </div>

      <div className="flex gap-2">
        {notifications.length > 0 && (
          <>
            <button 
              onClick={onMarkAllRead}
              className="px-4 py-2 border border-white/10 text-xs font-bold text-[#cfbcff] rounded-xl hover:bg-white/5 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <CheckCheck className="w-4 h-4" /> 全部标记已读
            </button>
            
            <button 
              onClick={onClearNotifications}
              className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-bold rounded-xl active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" /> 清空记录
            </button>
          </>
        )}
      </div>
    </div>
  );
}

