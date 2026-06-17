import { useState } from 'react';
import type { GlobalAlertState, GlobalAlertType } from './types';

export function useGlobalAlertState() {
  const [globalAlert, setGlobalAlert] = useState<GlobalAlertState>({
    show: false,
    message: '',
    type: 'success'
  });

  const triggerGlobalAlert = (message: string, type: GlobalAlertType = 'success') => {
    setGlobalAlert({ show: true, message, type });
  };

  const closeGlobalAlert = () => {
    setGlobalAlert(prev => ({ ...prev, show: false }));
  };

  return {
    globalAlert,
    triggerGlobalAlert,
    closeGlobalAlert
  };
}
