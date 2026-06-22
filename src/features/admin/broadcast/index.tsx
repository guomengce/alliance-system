import BroadcastForm from './components/BroadcastForm';
import TemplatePanel from './components/TemplatePanel';
import { useBroadcastState } from './hooks/useBroadcastState';
import type { AdminBroadcastViewProps } from './types';

export default function AdminBroadcastView({ onAddNotification }: AdminBroadcastViewProps) {
  const {
    broadcastBody,
    broadcastTarget,
    broadcastTitle,
    handleSaveTemplate,
    handleSendBroadcast,
    notificationTemplate,
    setBroadcastBody,
    setBroadcastTarget,
    setBroadcastTitle,
    setNotificationTemplate
  } = useBroadcastState({ onAddNotification });

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
