import { useEffect, useState } from 'react';
import { getAdminBroadcastConfig, sendAdminBroadcast } from '../../../../api/admin/broadcast';
import { useAppContext } from '../../../../context/AppContext';
import type { NotificationItem } from '../../../../types';
import type { BroadcastFormValues, TemplateFormValues } from '../types';
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
  const [notificationTemplate, setNotificationTemplate] = useState('');
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastBody, setBroadcastBody] = useState('');
  const [broadcastTarget, setBroadcastTarget] = useState('all');
  const notifySuccess = (message: string) => triggerGlobalAlert(message, 'success');
  const notifyError = (message: string) => triggerGlobalAlert(message, 'error');

  useEffect(() => {
    let mounted = true;

    getAdminBroadcastConfig().then((config) => {
      if (!mounted) return;
      setNotificationTemplate(config.notificationTemplate);
      setBroadcastTitle(config.broadcastTitle);
      setBroadcastBody(config.broadcastBody);
      setBroadcastTarget(config.broadcastTarget);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const handleSendBroadcast = async ({ target, title, body }: BroadcastFormValues) => {
    const validationError = validateBroadcastForm(title, body);
    if (validationError) {
      notifyError(validationError);
      return;
    }

    await sendAdminBroadcast({ target, title, body });
    const newNotif = createBroadcastNotification(title, body);
    onAddNotification(newNotif);
    notifySuccess(`系统广播成功，已向 ${getBroadcastTargetLabel(target)} 发送推送消息。`);

    setBroadcastTarget(target);
    setBroadcastTitle('');
    setBroadcastBody('');
  };

  const handleSaveTemplate = ({ notificationTemplate: nextTemplate }: TemplateFormValues) => {
    setNotificationTemplate(nextTemplate);
    notifySuccess('池告警文案模板配置保存成功。');
  };

  return {
    broadcastBody,
    broadcastTarget,
    broadcastTitle,
    handleSaveTemplate,
    handleSendBroadcast,
    notificationTemplate
  };
}
