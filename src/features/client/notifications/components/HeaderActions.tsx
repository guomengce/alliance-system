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
          澶勭悊鍏ㄩ儴鏉ヨ嚜鍚岀洘绯荤粺鍐呯殑閲嶈鍏憡涓庤处鎴锋祦姘存尝鍔?        </p>
      </div>

      <div className="flex gap-2">
        {notifications.length > 0 && (
          <>
            <button 
              onClick={onMarkAllRead}
              className="px-4 py-2 border border-white/10 text-xs font-bold text-[#cfbcff] rounded-xl hover:bg-white/5 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <CheckCheck className="w-4 h-4" /> 鍏ㄩ儴鏍囪宸茶
            </button>
            
            <button 
              onClick={onClearNotifications}
              className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-bold rounded-xl active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" /> 娓呴€€绾綍
            </button>
          </>
        )}
      </div>
    </div>
  );
}
