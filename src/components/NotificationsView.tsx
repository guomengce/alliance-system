import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  Coins, 
  ShoppingCart, 
  Info, 
  Search, 
  BellRing,
  CheckCircle,
  MoreHorizontal
} from 'lucide-react';
import { NotificationItem } from '../types';
import PageView from './PageView';

interface NotificationsViewProps {
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onClearNotifications: () => void;
  onToggleRead: (id: string) => void;
}

export default function NotificationsView({
  notifications,
  onMarkAllRead,
  onClearNotifications,
  onToggleRead
}: NotificationsViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: '全部消息' },
    { id: 'commission', label: '佣金分红' },
    { id: 'order', label: '订单执行' },
    { id: 'system', label: '系统公告' },
  ];

  const filteredNotifications = notifications.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <PageView>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs text-[#cbc4d2] opacity-75 flex items-center gap-1.5">
            <Bell className="w-3.5 h-3.5 text-[#cfbcff] shrink-0" />
            处理全部来自同盟系统内的重要公告与账户流水波动
          </p>
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
                <Trash2 className="w-4 h-4" /> 清退纪录
              </button>
            </>
          )}
        </div>
      </div>

      {/* Tabs list categorizing */}
      <div className="flex border-b border-white/5 pb-1 gap-2 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
              activeCategory === cat.id 
                ? 'bg-white/5 text-[#cfbcff] font-extrabold' 
                : 'text-[#cbc4d2]/80 hover:text-white'
            }`}
          >
            {cat.label}
            {cat.id !== 'all' && notifications.filter(n => n.category === cat.id && n.isUnread).length > 0 && (
              <span className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-[#ffb4ab]"></span>
            )}
          </button>
        ))}
      </div>

      {/* Main notifications history panel */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((noti) => (
              <motion.div
                key={noti.id}
                layout
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2 }}
                onClick={() => onToggleRead(noti.id)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex gap-4 ${
                  noti.isUnread 
                    ? 'bg-[#6750a4]/10 border-[#cfbcff]/20 shadow-md hover:border-[#cfbcff]/40 shadow-[#6750a4]/5' 
                    : 'bg-[#1a1620]/60 border-white/5 opacity-80'
                }`}
              >
                {/* Visual Category symbol */}
                <div className="shrink-0 pt-0.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    noti.category === 'commission' ? 'bg-[#ffeb3b]/10 text-[#fbc02d]' :
                    noti.category === 'order' ? 'bg-[#cfbcff]/10 text-[#cfbcff]' :
                    'bg-white/5 text-white/70'
                  }`}>
                    {noti.category === 'commission' && <Coins className="w-5 h-5" />}
                    {noti.category === 'order' && <ShoppingCart className="w-5 h-5" />}
                    {noti.category === 'system' && <Bell className="w-5 h-5" />}
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-white/5 text-[#cbc4d2] px-2 py-0.5 rounded font-black text-[10px] uppercase">
                        {noti.categoryLabel}
                      </span>
                      {noti.isUnread && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab]" />
                      )}
                    </div>
                    <span className="text-[10px] text-[#cbc4d2]/60 font-mono font-bold">{noti.time}</span>
                  </div>

                  <h3 className="text-sm font-black text-white leading-snug">{noti.title}</h3>
                  <p className="text-xs text-[#cbc4d2]/85 leading-relaxed font-medium">{noti.desc}</p>
                </div>

                <div className="shrink-0 flex items-center justify-center">
                  <button className="p-1 hover:bg-white/5 rounded">
                    <CheckCircle className={`w-4 h-4 ${noti.isUnread ? 'text-white/40' : 'text-[#00e676]'}`} />
                  </button>
                </div>
              </motion.div>
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
    </PageView>
  );
}
