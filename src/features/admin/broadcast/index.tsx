import React, { useState } from 'react';
import BroadcastForm from './components/BroadcastForm';
import TemplatePanel from './components/TemplatePanel';
import type { AdminBroadcastViewProps } from './types';
import {
  INITIAL_BROADCAST_BODY,
  INITIAL_BROADCAST_TITLE,
  INITIAL_NOTIFICATION_TEMPLATE,
  createBroadcastNotification,
  getBroadcastTargetLabel
} from './utils';

export default function AdminBroadcastView({ onAddNotification }: AdminBroadcastViewProps) {
  const [notificationTemplate, setNotificationTemplate] = useState<string>(INITIAL_NOTIFICATION_TEMPLATE);
  const [broadcastTitle, setBroadcastTitle] = useState<string>(INITIAL_BROADCAST_TITLE);
  const [broadcastBody, setBroadcastBody] = useState<string>(INITIAL_BROADCAST_BODY);
  const [broadcastTarget, setBroadcastTarget] = useState<string>('all');

  const handleSendBroadcast = () => {
    if (!broadcastTitle || !broadcastBody) return alert('标题和内容不能为空');

    const newNotif = createBroadcastNotification(broadcastTitle, broadcastBody);
    onAddNotification(newNotif);
    alert(`系统广播成功！已成功向“${getBroadcastTargetLabel(broadcastTarget)}”发送推达消息。`);
    
    // Clear inputs
    setBroadcastTitle('');
    setBroadcastBody('');
  };

  const handleSaveTemplate = () => {
    alert('池限额补额推达文案模配置保存成功！');
  };

  return (
    <div id="admin_broadcast_view" className="glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-6 animate-fadeIn flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <BroadcastForm
          broadcastTarget={broadcastTarget}
          setBroadcastTarget={setBroadcastTarget}
          broadcastTitle={broadcastTitle}
          setBroadcastTitle={setBroadcastTitle}
          broadcastBody={broadcastBody}
          setBroadcastBody={setBroadcastBody}
          onSendBroadcast={handleSendBroadcast}
        />
        <TemplatePanel
          notificationTemplate={notificationTemplate}
          setNotificationTemplate={setNotificationTemplate}
          onSaveTemplate={handleSaveTemplate}
        />
      </div>
    </div>
  );
}
