import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

export default function RouteShell() {
  const { triggerGlobalAlert } = useAppContext();

  React.useEffect(() => {
    const nativeAlert = window.alert;

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
        msgStr.includes('配置')
      ) {
        alertType = 'info';
      }

      triggerGlobalAlert(msgStr, alertType);
    };

    return () => {
      window.alert = nativeAlert;
    };
  }, [triggerGlobalAlert]);

  return <Outlet />;
}
