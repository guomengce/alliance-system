import { Button, Tag } from 'antd';
import { motion } from 'motion/react';
import { Bell, CheckCircle, Coins, ShoppingCart, Trash2 } from 'lucide-react';
import type { NotificationCardProps } from '../types';

export default function NotificationCard({
  isUpdating,
  notification,
  onDeleteNotification,
  onToggleRead
}: NotificationCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.2 }}
      onClick={() => {
        if (notification.isUnread && !isUpdating) onToggleRead(notification.id);
      }}
      className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex gap-4 ${
        notification.isUnread
          ? 'bg-[#6750a4]/10 border-[#cfbcff]/20 shadow-md hover:border-[#cfbcff]/40 shadow-[#6750a4]/5'
          : 'bg-[#1a1620]/60 border-white/5 opacity-80'
      }`}
    >
      <div className="shrink-0 pt-0.5">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          notification.category === 'commission' ? 'bg-[#ffeb3b]/10 text-[#fbc02d]' :
          notification.category === 'order' ? 'bg-[#cfbcff]/10 text-[#cfbcff]' :
          'bg-white/5 text-white/70'
        }`}>
          {notification.category === 'commission' && <Coins className="w-5 h-5" />}
          {notification.category === 'order' && <ShoppingCart className="w-5 h-5" />}
          {notification.category === 'system' && <Bell className="w-5 h-5" />}
        </div>
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="alliance-antd-notification-category-tag">
              {notification.categoryLabel}
            </Tag>
            {notification.isUnread && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab]" />
            )}
          </div>
          <span className="text-xs text-[#cbc4d2]/60 font-mono font-bold">{notification.time}</span>
        </div>

        <h3 className="text-sm font-black text-white leading-snug">{notification.title}</h3>
        <p className="text-xs text-[#cbc4d2]/85 leading-relaxed font-medium">{notification.desc}</p>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-1">
        <Button
          type="text"
          icon={<CheckCircle className="w-4 h-4" />}
          loading={isUpdating}
          disabled={!notification.isUnread || isUpdating}
          className={`alliance-antd-notification-check-button ${notification.isUnread ? 'is-unread' : 'is-read'}`}
        />
        <Button
          type="text"
          icon={<Trash2 className="w-4 h-4" />}
          disabled={isUpdating}
          onClick={(event) => {
            event.stopPropagation();
            onDeleteNotification(notification.id);
          }}
          className="alliance-antd-notification-danger-action"
        />
      </div>
    </motion.div>
  );
}
