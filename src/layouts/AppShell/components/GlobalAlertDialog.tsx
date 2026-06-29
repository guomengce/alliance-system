import { AnimatePresence, motion } from 'motion/react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { Button } from 'antd';
import type { AppStateContext } from '../types';

interface GlobalAlertDialogProps {
  state: AppStateContext;
}

export default function GlobalAlertDialog({ state }: GlobalAlertDialogProps) {
  const { globalAlert, closeGlobalAlert } = state;

  return (
    <AnimatePresence>
      {globalAlert.show && (
        <div className="app-shell__alert">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGlobalAlert}
            className="app-shell__alert-backdrop"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="app-shell__alert-panel"
          >
            <div className={`app-shell__alert-strip is-${globalAlert.type}`} />

            <div className="app-shell__alert-body">
              <div className="app-shell__alert-content">
                <span className={`app-shell__alert-icon is-${globalAlert.type}`}>
                  {globalAlert.type === 'error' ? <AlertCircle className="w-5 h-5" /> :
                   globalAlert.type === 'warning' ? <AlertTriangle className="w-5 h-5" /> :
                   globalAlert.type === 'info' ? <Info className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                </span>

                <div className="app-shell__alert-copy">
                  <h4 className="app-shell__alert-title">
                    {globalAlert.type === 'error' ? '安全管控 / WARNING' :
                     globalAlert.type === 'warning' ? '动作提醒 / NOTICE' :
                     globalAlert.type === 'info' ? '信息同步 / INFO' : '交付成功 / SUCCESS'}
                  </h4>
                  <p className="app-shell__alert-message">
                    {globalAlert.message}
                  </p>
                </div>
              </div>

              <div className="app-shell__alert-actions">
                <Button type="primary" onClick={closeGlobalAlert} className="app-shell__alert-button">
                  我知道了 (CONFIRM)
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
