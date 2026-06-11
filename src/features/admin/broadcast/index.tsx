import React, { useState } from 'react';
import { MessageSquare, Sliders } from 'lucide-react';
import { NotificationItem } from '../../../types';

interface AdminBroadcastViewProps {
  onAddNotification: (notification: NotificationItem) => void;
}

export default function AdminBroadcastView({ onAddNotification }: AdminBroadcastViewProps) {
  const [notificationTemplate, setNotificationTemplate] = useState<string>('【补额提醒】尊敬的会员 {uid}，您当前的信用度池已严重不足，请及时认购新代收方案。');
  const [broadcastTitle, setBroadcastTitle] = useState<string>('系统升级与安全保障提示');
  const [broadcastBody, setBroadcastBody] = useState<string>('全联盟结算通道已完成例行维护，所有充值、解锁、认购在链上秒级同步确认，安心畅享有保障。');
  const [broadcastTarget, setBroadcastTarget] = useState<string>('all');

  const handleSendBroadcast = () => {
    if (!broadcastTitle || !broadcastBody) return alert('标题和内容不能为空');
    
    const newNotif: NotificationItem = {
      id: `NOT-${Math.floor(100 + Math.random() * 900)}`,
      category: 'system',
      categoryLabel: '官方公告',
      title: broadcastTitle,
      desc: broadcastBody,
      time: '刚刚',
      isUnread: true
    };

    onAddNotification(newNotif);
    alert(`系统广播成功！已成功向“${broadcastTarget === 'all' ? '全联盟会员' : `UID: ${broadcastTarget}`}”发送推达消息。`);
    
    // Clear inputs
    setBroadcastTitle('');
    setBroadcastBody('');
  };

  return (
    <div id="admin_broadcast_view" className="glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-6 animate-fadeIn flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Custom message broadcast creator - col-7 */}
        <div className="lg:col-span-7 bg-[#1c1822]/40 rounded-2xl p-5 border border-white/5 space-y-4">
          <h4 className="text-xs font-black uppercase text-white tracking-widest pb-3 border-b border-white/5 flex items-center gap-1.5 mb-2">
            <MessageSquare className="w-4 h-4 text-[#cfbcff]" />
            向全联盟注册激活用户代表手动广播推送通知
          </h4>

          <div className="space-y-4 font-sans text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="font-semibold text-white">指定投送对象</span>
                <select 
                  value={broadcastTarget}
                  onChange={(e) => setBroadcastTarget(e.target.value)}
                  className="bg-[#110e16] border border-white/5 rounded-xl px-3.5 py-2 text-xs text-white uppercase font-bold cursor-pointer"
                >
                  <option value="all">向全同盟所有会员公开广播</option>
                  <option value="889421">直投至 UID: 889421代表</option>
                  <option value="889425">直投至 UID: 889425代表</option>
                  <option value="890112">直投至 UID: 890112代表</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-semibold text-white">广播通知类别</span>
                <span className="bg-[#110e16] text-[#cfbcff] border border-white/5 px-3.5 py-2 rounded-xl text-xs font-bold text-left block">
                  📢 官方通知公告与安全维护大盘提醒
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="font-semibold text-white">通知主标题</span>
              <input 
                type="text"
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                placeholder="比如：系统升级大盘核对日志完成提醒"
                className="bg-[#110e16] border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white focus:ring-1 focus:ring-[#cfbcff] outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="font-semibold text-white">推送正文详情内容 (支持通配标签替换)</span>
              <textarea 
                rows={4}
                value={broadcastBody}
                onChange={(e) => setBroadcastBody(e.target.value)}
                placeholder="编写详细的同盟安全声明、维护或到账提醒..."
                className="bg-[#110e16] border border-[#cfbcff]/15 rounded-xl p-3 text-xs text-white leading-relaxed focus:ring-1 focus:ring-[#cfbcff] outline-none"
              />
            </div>

            <button 
              onClick={handleSendBroadcast}
              className="w-full mt-3 py-3 bg-gradient-to-r from-[#6750a4] to-[#cfbcff] text-white rounded-xl font-bold active:scale-95 transition-all text-xs text-center cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5" /> 确认向会员一键下发官方系统广播
            </button>
          </div>
        </div>

        {/* Parameter templates configuration - col-5 */}
        <div className="lg:col-span-5 bg-[#17131e] p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider pb-2 border-b border-white/5">
              池枯竭额度补缴警告通配模板配置
            </h4>
            <p className="text-[11px] text-[#cbc4d2]/50 mt-1.5 leading-relaxed font-sans">
              配置当出现 D0 发生买单但超级上线佣金代付信用限额剩余容量不足时的即时警告补款模板：
            </p>

            <div className="mt-4 flex flex-col gap-2 font-mono text-xs">
              <span className="text-white font-sans text-xs font-bold block">池红线即将枯竭警告通配富文本</span>
              <textarea 
                rows={4}
                value={notificationTemplate}
                onChange={(e) => setNotificationTemplate(e.target.value)}
                className="bg-[#110e16] border border-white/5 rounded-xl p-3 text-[11px] text-white leading-relaxed focus:ring-1 focus:ring-[#cfbcff] outline-none"
              />
            </div>
          </div>

          <div className="mt-6">
            <button 
              onClick={() => {
                alert('池限额补额推达文案模配置保存成功！');
              }}
              className="w-full py-2 bg-[#36343a] text-white rounded-xl text-xs font-bold hover:brightness-115 active:scale-95 transition-all cursor-pointer border border-white/5"
            >
              保存池告警文案模板
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

