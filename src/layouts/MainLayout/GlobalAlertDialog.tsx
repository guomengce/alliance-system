import { AnimatePresence, motion } from 'motion/react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import type { AppStateContext } from './types';

interface GlobalAlertDialogProps {
  state: AppStateContext;
}

export default function GlobalAlertDialog({ state }: GlobalAlertDialogProps) {
  const { globalAlert, closeGlobalAlert } = state;

  return (
    <AnimatePresence>
      {globalAlert.show && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGlobalAlert}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative bg-[#15121b] border border-white/10 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl flex flex-col z-[10000]"
          >
            <div className={`absolute top-0 left-0 right-0 h-1.5 ${
              globalAlert.type === 'error' ? 'bg-rose-500' :
              globalAlert.type === 'warning' ? 'bg-amber-500' :
              globalAlert.type === 'info' ? 'bg-[#cfbcff]' : 'bg-emerald-400'
            }`} />

            <div className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <span className={`p-2.5 rounded-xl mt-0.5 shrink-0 ${
                  globalAlert.type === 'error' ? 'bg-rose-500/10 text-rose-400' :
                  globalAlert.type === 'warning' ? 'bg-amber-500/10 text-amber-400' :
                  globalAlert.type === 'info' ? 'bg-[#cfbcff]/10 text-[#cfbcff]' : 'bg-emerald-500/10 text-emerald-400'
                }`}>
                  {globalAlert.type === 'error' ? <AlertCircle className="w-5 h-5" /> :
                   globalAlert.type === 'warning' ? <AlertTriangle className="w-5 h-5" /> :
                   globalAlert.type === 'info' ? <Info className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                </span>

                <div className="space-y-1">
                  <h4 className="text-white text-xs font-black tracking-widest uppercase font-mono">
                    {globalAlert.type === 'error' ? '安全管控 / WARNING' :
                     globalAlert.type === 'warning' ? '动作提醒 / NOTICE' :
                     globalAlert.type === 'info' ? '信息同步 / INFO' : '交付成功 / SUCCESS'}
                  </h4>
                  <p className="text-[#cbc4d2]/80 text-xs sm:text-[13px] leading-relaxed whitespace-pre-line font-semibold break-words pt-1">
                    {globalAlert.message}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={closeGlobalAlert}
                  className="px-5 py-2.5 bg-[#cfbcff] text-[#100d14] text-xs font-black rounded-xl hover:bg-white transition-all cursor-pointer shadow-lg active:scale-95 outline-none font-sans"
                >
                  我知道了 (CONFIRM)
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
