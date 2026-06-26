import { Button } from 'antd';
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
          处理全部来自同盟系统内的重要公告与账户流水变动
        </p>
      </div>

      <div className="flex gap-2">
        {notifications.length > 0 && (
          <>
            <Button
              icon={<CheckCheck className="w-4 h-4" />}
              onClick={onMarkAllRead}
              className="alliance-antd-notification-action"
            >
              全部标记已读
            </Button>

            <Button
              icon={<Trash2 className="w-4 h-4" />}
              onClick={onClearNotifications}
              className="alliance-antd-notification-danger-action"
            >
              清空记录
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
