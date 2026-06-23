import { useState } from 'react';
import { getInitialAdminBroadcastConfig } from '../../../../api/admin/broadcast';
import { useAppContext } from '../../../../context/AppContext';
import type { NotificationItem } from '../../../../types';
import {
  createBroadcastNotification,
  getBroadcastTargetLabel,
  validateBroadcastForm
} from '../utils';

interface UseBroadcastStateOptions {
  onAddNotification: (notification: NotificationItem) => void;
}

export function useBroadcastState({ onAddNotification }: UseBroadcastStateOptions) {
  const { triggerGlobalAlert } = useAppContext();
  const initialConfig = getInitialAdminBroadcastConfig();
  const [notificationTemplate, setNotificationTemplate] = useState<string>(initialConfig.notificationTemplate);
  const [broadcastTitle, setBroadcastTitle] = useState<string>(initialConfig.broadcastTitle);
  const [broadcastBody, setBroadcastBody] = useState<string>(initialConfig.broadcastBody);
  const [broadcastTarget, setBroadcastTarget] = useState<string>(initialConfig.broadcastTarget);
  const notifySuccess = (message: string) => triggerGlobalAlert(message, 'success');
  const notifyError = (message: string) => triggerGlobalAlert(message, 'error');

  const handleSendBroadcast = () => {
    const validationError = validateBroadcastForm(broadcastTitle, broadcastBody);
    if (validationError) return notifyError(validationError);

    const newNotif = createBroadcastNotification(broadcastTitle, broadcastBody);
    onAddNotification(newNotif);
    notifySuccess(`系统广播成功！已成功向“${getBroadcastTargetLabel(broadcastTarget)}”发送推达消息。`);

    setBroadcastTitle('');
    setBroadcastBody('');
  };

  const handleSaveTemplate = () => {
    notifySuccess('池限额补额推达文案模配置保存成功！');
  };

  return {
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
  };
}
