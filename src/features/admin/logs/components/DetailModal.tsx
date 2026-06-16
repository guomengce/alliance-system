import { Terminal, X } from 'lucide-react';
import { getSeverityBadge } from '../utils';
import type { WorkspaceProps } from '../types';

type DetailModalProps = Pick<
  WorkspaceProps,
  | 'activeDetailLog'
  | 'setActiveDetailLog'
>;

export default function DetailModal({
  activeDetailLog,
  setActiveDetailLog
}: DetailModalProps) {
  return (
    <>
      {/* Audit Detail Inspector Drawer / Modal */}
      {activeDetailLog && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          {/* Backdrop screen filter lock */}
          <div 
            onClick={() => setActiveDetailLog(null)}
            className="absolute inset-0 bg-black/75 backdrop-blur-md transition-all"
          />
          
          {/* Modal dialog core card content with adaptive heights and custom scrollbars */}
          <div className="bg-[#120f18] rounded-3xl border border-[#cfbcff]/20 max-w-xl w-full p-5 sm:p-7 relative shadow-2xl overflow-hidden animate-scaleUp z-10 flex flex-col gap-4 max-h-[92vh]">
            
            {/* Header: Log Identification Title and Close lock */}
            <div className="flex items-center justify-between pb-3 border-b border-white/5 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#cfbcff]/10 border border-[#cfbcff]/20 flex items-center justify-center text-[#cfbcff]">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white tracking-tight uppercase">
                    审计底册深度透视
                  </h3>
                  <p className="text-[10px] font-mono text-[#cfbcff]/60 font-bold tracking-widest mt-0.5">
                    ID: {activeDetailLog.id}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveDetailLog(null)}
                className="p-1.5 bg-white/5 hover:bg-white/10 transition-colors text-[#cbc4d2] hover:text-white rounded-lg cursor-pointer outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable central content wrapper */}
            <div className="flex-grow overflow-y-auto space-y-4 pr-1.5 custom-scrollbar pb-1 text-left">
              {/* Structured Specifications Matrix */}
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] text-[#cbc4d2]/45 font-bold uppercase tracking-wider block">事件时间戳</span>
                  <span className="font-mono text-white tracking-tight block break-all">{activeDetailLog.timestamp}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-[#cbc4d2]/45 font-bold uppercase tracking-wider block">审计级别 / Severity</span>
                  <span className="block mt-0.5">
                    <span className={`px-2 py-0.5 text-[9.5px] uppercase font-black tracking-wider rounded-md leading-none ${getSeverityBadge(activeDetailLog.severity)}`}>
                      {activeDetailLog.severity}
                    </span>
                  </span>
                </div>
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-[#cbc4d2]/45 font-bold uppercase tracking-wider block">操作触发人 (Operator)</span>
                  <span className="font-black text-white tracking-tight block truncate max-w-full" title={activeDetailLog.operator}>
                    {activeDetailLog.operator}
                  </span>
                </div>
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-[#cbc4d2]/45 font-bold uppercase tracking-wider block">发起端 IP 签名</span>
                  <span className="font-mono text-white tracking-tight block">{activeDetailLog.ipAddress}</span>
                </div>
              </div>

              {/* Narrative text fields */}
              <div className="space-y-1">
                <span className="text-[10px] text-[#cbc4d2]/45 font-bold uppercase tracking-wider block">操作基本事项</span>
                <p className="text-sm font-black text-white leading-tight">
                  {activeDetailLog.action}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-[#cbc4d2]/45 font-bold uppercase tracking-wider block">透视事件详细叙述 (Details)</span>
                <p className="text-xs sm:text-[13px] text-[#cbc4d2]/85 leading-relaxed font-semibold whitespace-pre-wrap break-all">
                  {activeDetailLog.details}
                </p>
              </div>

              {/* Code Block Container for Event Payload Packet */}
              {activeDetailLog.payload && (
                <div className="space-y-1.5 animate-fadeIn">
                  <span className="text-[10px] text-[#cbc4d2]/45 font-bold uppercase tracking-wider block">底层节点 JSON 加密报文主体</span>
                  <div className="bg-[#0b080f] rounded-xl border border-white/5 p-3.5 font-mono text-[11px] text-emerald-400 overflow-x-auto max-h-44 custom-scrollbar relative leading-relaxed tab-size-2">
                    <pre className="whitespace-pre text-left">{activeDetailLog.payload}</pre>
                    <span className="absolute top-2 right-2 text-[9px] font-bold text-white/20 select-none">SECURE_BLOCK_DATA</span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer triggers */}
            <div className="flex gap-3 justify-end pt-3 border-t border-white/5 mt-0.5 shrink-0 select-none">
              <button
                type="button"
                onClick={() => setActiveDetailLog(null)}
                className="px-5 py-2 bg-[#cfbcff] text-[#24134c] hover:bg-[#ebdfff] active:scale-95 transition-all text-xs font-extrabold rounded-xl cursor-pointer"
              >
                我知道了
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
