import React from 'react';
import { useAppContext } from '../../context/AppContext';
import AdminLayout from '../AdminLayout';
import ClientLayout from '../ClientLayout';

export default function MainLayout() {
  const state = useAppContext();
  const {
    triggerGlobalAlert,
    portalMode
  } = state;

  React.useEffect(() => {
    window.alert = (msg: string) => {
      const msgStr = String(msg);
      let alertType: 'success' | 'error' | 'warning' | 'info' = 'success';
      if (
        msgStr.includes('失败') ||
        msgStr.includes('错误') ||
        msgStr.includes('警告') ||
        msgStr.includes('异常') ||
        msgStr.includes('不能为空') ||
        msgStr.includes('不能为负') ||
        msgStr.includes('禁止') ||
        msgStr.includes('拒绝') ||
        msgStr.includes('有效')
      ) {
        alertType = 'error';
      } else if (
        msgStr.includes('提示') ||
        msgStr.includes('预计') ||
        msgStr.includes('测试') ||
        msgStr.includes('配')
      ) {
        alertType = 'info';
      }
      triggerGlobalAlert(msgStr, alertType);
    };
  }, [triggerGlobalAlert]);

  return portalMode === 'admin' ? <AdminLayout state={state} /> : <ClientLayout state={state} />;
}
