import type { NotificationItem } from '@/src/types';
import type {
  AdminBroadcastDraftDto,
  AdminBroadcastTemplateDto,
} from '@/src/api/admin/broadcast';

export interface AdminBroadcastViewProps {
  onAddNotification: (notification: NotificationItem) => void;
}

export type BroadcastDraft = AdminBroadcastDraftDto;
export type BroadcastTemplate = AdminBroadcastTemplateDto;
export type BroadcastDraftField = keyof BroadcastDraft;
export type BroadcastTemplateField = keyof BroadcastTemplate;

export interface BroadcastFormProps {
  value: BroadcastDraft;
  isLoading: boolean;
  isSubmitting: boolean;
  onChange: <Key extends BroadcastDraftField>(field: Key, value: BroadcastDraft[Key]) => void;
  onSendBroadcast: () => void;
}

export interface TemplatePanelProps {
  value: BroadcastTemplate;
  isLoading: boolean;
  isSaving: boolean;
  onChange: <Key extends BroadcastTemplateField>(field: Key, value: BroadcastTemplate[Key]) => void;
  onSaveTemplate: () => void;
}
