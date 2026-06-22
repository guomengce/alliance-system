import { useState } from 'react';
import { getInitialAdminBroadcastConfig } from '../../../../api/admin/broadcast';

export function useBroadcastState() {
  const initialConfig = getInitialAdminBroadcastConfig();
  const [notificationTemplate, setNotificationTemplate] = useState<string>(initialConfig.notificationTemplate);
  const [broadcastTitle, setBroadcastTitle] = useState<string>(initialConfig.broadcastTitle);
  const [broadcastBody, setBroadcastBody] = useState<string>(initialConfig.broadcastBody);
  const [broadcastTarget, setBroadcastTarget] = useState<string>(initialConfig.broadcastTarget);

  return {
    broadcastBody,
    broadcastTarget,
    broadcastTitle,
    notificationTemplate,
    setBroadcastBody,
    setBroadcastTarget,
    setBroadcastTitle,
    setNotificationTemplate
  };
}
