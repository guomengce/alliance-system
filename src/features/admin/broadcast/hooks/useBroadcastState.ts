import { useCallback, useEffect, useState } from 'react';
import { adminBroadcastApi } from '../../../../api/admin/broadcast';
import { useAppContext } from '../../../../context/AppContext';
import type { NotificationItem } from '../../../../types';
import type { BroadcastDraft, BroadcastDraftField, BroadcastTemplate, BroadcastTemplateField } from '../types';
import {
  createBroadcastNotification,
  getBroadcastTargetLabel,
  validateBroadcastForm
} from '../utils';

interface UseBroadcastStateOptions {
  onAddNotification: (notification: NotificationItem) => void;
}

const emptyDraft: BroadcastDraft = {
  title: '',
  body: '',
  target: 'all',
  category: 'official_notice',
  categoryLabel: '',
};

const emptyTemplate: BroadcastTemplate = {
  content: '',
  updatedAt: '',
};

export function useBroadcastState({ onAddNotification }: UseBroadcastStateOptions) {
  const { triggerGlobalAlert } = useAppContext();
  const [broadcastDraft, setBroadcastDraft] = useState<BroadcastDraft>(emptyDraft);
  const [broadcastTemplate, setBroadcastTemplate] = useState<BroadcastTemplate>(emptyTemplate);
  const [isLoading, setIsLoading] = useState(true);
  const [isSendingBroadcast, setIsSendingBroadcast] = useState(false);
  const [isSavingTemplate, setIsSavingTemplate] = useState(false);

  const notifySuccess = useCallback(
    (message: string) => triggerGlobalAlert(message, 'success'),
    [triggerGlobalAlert]
  );
  const notifyError = useCallback(
    (message: string) => triggerGlobalAlert(message, 'error'),
    [triggerGlobalAlert]
  );

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      adminBroadcastApi.getDraft(),
      adminBroadcastApi.getTemplate(),
    ])
      .then(([draft, template]) => {
        if (!isMounted) return;
        setBroadcastDraft(draft);
        setBroadcastTemplate(template);
      })
      .catch(() => {
        if (!isMounted) return;
        notifyError('广播配置加载失败，请稍后重试。');
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [notifyError]);

  const updateBroadcastDraft = <Key extends BroadcastDraftField>(
    field: Key,
    value: BroadcastDraft[Key]
  ) => {
    setBroadcastDraft((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const updateBroadcastTemplate = <Key extends BroadcastTemplateField>(
    field: Key,
    value: BroadcastTemplate[Key]
  ) => {
    setBroadcastTemplate((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSendBroadcast = async () => {
    const validationError = validateBroadcastForm(broadcastDraft.title, broadcastDraft.body);
    if (validationError) return notifyError(validationError);

    setIsSendingBroadcast(true);
    try {
      const sentBroadcast = await adminBroadcastApi.send({
        title: broadcastDraft.title,
        body: broadcastDraft.body,
        target: broadcastDraft.target,
        category: broadcastDraft.category,
      });
      const newNotif = createBroadcastNotification(sentBroadcast.title, sentBroadcast.body);
      onAddNotification(newNotif);
      notifySuccess(`系统广播成功！已成功向“${getBroadcastTargetLabel(sentBroadcast.target)}”发送推达消息。`);
      setBroadcastDraft((current) => ({
        ...current,
        title: '',
        body: '',
      }));
    } catch {
      notifyError('广播发送失败，请稍后重试。');
    } finally {
      setIsSendingBroadcast(false);
    }
  };

  const handleSaveTemplate = async () => {
    setIsSavingTemplate(true);
    try {
      const nextTemplate = await adminBroadcastApi.updateTemplate({
        content: broadcastTemplate.content,
      });
      setBroadcastTemplate(nextTemplate);
      notifySuccess('池限额补额推达文案模配置保存成功！');
    } catch {
      notifyError('模板保存失败，请稍后重试。');
    } finally {
      setIsSavingTemplate(false);
    }
  };

  return {
    broadcastDraft,
    broadcastTemplate,
    handleSaveTemplate,
    handleSendBroadcast,
    isLoading,
    isSavingTemplate,
    isSendingBroadcast,
    updateBroadcastDraft,
    updateBroadcastTemplate,
  };
}
