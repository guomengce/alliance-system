import type { Dispatch, SetStateAction } from 'react';
import type { NotificationItem } from '@/src/types';

export interface AdminBroadcastViewProps {
  onAddNotification: (notification: NotificationItem) => void;
}

export interface BroadcastFormProps {
  broadcastTarget: string;
  setBroadcastTarget: Dispatch<SetStateAction<string>>;
  broadcastTitle: string;
  setBroadcastTitle: Dispatch<SetStateAction<string>>;
  broadcastBody: string;
  setBroadcastBody: Dispatch<SetStateAction<string>>;
  onSendBroadcast: () => void;
}

export interface TemplatePanelProps {
  notificationTemplate: string;
  setNotificationTemplate: Dispatch<SetStateAction<string>>;
  onSaveTemplate: () => void;
}
