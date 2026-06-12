import { AnimatePresence, motion } from 'motion/react';
import { Bell } from 'lucide-react';
import type { NotificationListProps } from '../types';
import NotificationCard from './NotificationCard';

export default function NotificationList({
  notifications,
  onToggleRead
}: NotificationListProps) {
  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {notifications.length > 0 ? (
          notifications.map((noti) => (
            <NotificationCard
              key={noti.id}
              notification={noti}
              onToggleRead={onToggleRead}
            />
          ))
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-[#1a1620]/60 rounded-2xl border border-white/5 text-[#cbc4d2]/50 font-medium text-xs flex flex-col items-center justify-center gap-2"
          >
            <Bell className="w-8 h-8 opacity-30 text-[#cfbcff]" />
            暂无符合该分类的系统通知消息历史
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

