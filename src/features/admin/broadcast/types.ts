import type { NotificationItem } from '@/src/types';

export interface AdminBroadcastViewProps {
  onAddNotification: (notification: NotificationItem) => void;
}

export interface BroadcastFormValues {
  target: string;
  title: string;
  body: string;
}

export interface TemplateFormValues {
  notificationTemplate: string;
}

export interface BroadcastFormProps {
  broadcastTarget: string;
  broadcastTitle: string;
  broadcastBody: string;
  onSendBroadcast: (values: BroadcastFormValues) => void;
}

export interface TemplatePanelProps {
  notificationTemplate: string;
  onSaveTemplate: (values: TemplateFormValues) => void;
}
