import BroadcastForm from './components/BroadcastForm';
import TemplatePanel from './components/TemplatePanel';
import { useBroadcastState } from './hooks/useBroadcastState';
import type { AdminBroadcastViewProps } from './types';
import {
  createBroadcastNotification,
  getBroadcastTargetLabel,
  validateBroadcastForm
} from './utils';

export default function AdminBroadcastView({ onAddNotification }: AdminBroadcastViewProps) {
  const {
    broadcastBody,
    broadcastTarget,
    broadcastTitle,
    notificationTemplate,
    setBroadcastBody,
    setBroadcastTarget,
    setBroadcastTitle,
    setNotificationTemplate
  } = useBroadcastState();

  const handleSendBroadcast = () => {
    const validationError = validateBroadcastForm(broadcastTitle, broadcastBody);
    if (validationError) return alert(validationError);

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
