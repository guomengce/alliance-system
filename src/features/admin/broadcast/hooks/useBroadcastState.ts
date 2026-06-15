import { useState } from 'react';
import {
  INITIAL_BROADCAST_BODY,
  INITIAL_BROADCAST_TITLE,
  INITIAL_NOTIFICATION_TEMPLATE
} from '../utils';

export function useBroadcastState() {
  const [notificationTemplate, setNotificationTemplate] = useState<string>(INITIAL_NOTIFICATION_TEMPLATE);
  const [broadcastTitle, setBroadcastTitle] = useState<string>(INITIAL_BROADCAST_TITLE);
  const [broadcastBody, setBroadcastBody] = useState<string>(INITIAL_BROADCAST_BODY);
  const [broadcastTarget, setBroadcastTarget] = useState<string>('all');

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