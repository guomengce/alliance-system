import { Button, Modal, Tag } from 'antd';
import { Terminal } from 'lucide-react';

import { getSeverityBadge } from '../utils';
import type { WorkspaceProps } from '../types';

type DetailModalProps = Pick<
  WorkspaceProps,
  | 'activeDetailLog'
  | 'setActiveDetailLog'
>;

const TEXT = {
  title: '\u5ba1\u8ba1\u5e95\u518c\u6df1\u5ea6\u900f\u89c6',
  time: '\u4e8b\u4ef6\u65f6\u95f4\u6233',
  severity: '\u5ba1\u8ba1\u7ea7\u522b / Severity',
  operator: '\u64cd\u4f5c\u89e6\u53d1\u4eba (Operator)',
  ip: '\u53d1\u8d77\u7aef IP \u7b7e\u540d',
  action: '\u64cd\u4f5c\u57fa\u672c\u4e8b\u9879',
  details: '\u900f\u89c6\u4e8b\u4ef6\u8be6\u7ec6\u53d9\u8ff0 (Details)',
  payload: '\u5e95\u5c42\u8282\u70b9 JSON \u52a0\u5bc6\u62a5\u6587\u4e3b\u4f53',
  data: 'SECURE_BLOCK_DATA',
  close: '\u6211\u77e5\u9053\u4e86',
};

export default function AntdDetailModal({
  activeDetailLog,
  setActiveDetailLog
}: DetailModalProps) {
  return (
    <Modal
      centered
      className="alliance-antd-logs-modal"
      destroyOnHidden
      footer={null}
      getContainer={false}
      onCancel={() => setActiveDetailLog(null)}
      open={Boolean(activeDetailLog)}
      rootClassName="alliance-antd-logs-modal-root"
      width={576}
    >
      {activeDetailLog && (
        <div className="flex flex-col gap-4 max-h-[82vh]">
          <div className="flex items-center justify-between pb-3 border-b border-white/5 shrink-0 pr-8">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#cfbcff]/10 border border-[#cfbcff]/20 flex items-center justify-center text-[#cfbcff]">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight uppercase">
                  {TEXT.title}
                </h3>
                <p className="text-[10px] font-mono text-[#cfbcff]/60 font-bold tracking-widest mt-0.5">
                  ID: {activeDetailLog.id}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto space-y-4 pr-1.5 custom-scrollbar pb-1 text-left">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] text-[#cbc4d2]/45 font-bold uppercase tracking-wider block">{TEXT.time}</span>
                <span className="font-mono text-white tracking-tight block break-all">{activeDetailLog.timestamp}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-[#cbc4d2]/45 font-bold uppercase tracking-wider block">{TEXT.severity}</span>
                <span className="block mt-0.5">
                  <Tag className={`alliance-antd-logs-severity-tag px-2 py-0.5 text-[9.5px] uppercase font-black tracking-wider rounded-md leading-none ${getSeverityBadge(activeDetailLog.severity)}`}>
                    {activeDetailLog.severity}
                  </Tag>
                </span>
              </div>
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-[#cbc4d2]/45 font-bold uppercase tracking-wider block">{TEXT.operator}</span>
                <span className="font-black text-white tracking-tight block truncate max-w-full" title={activeDetailLog.operator}>
                  {activeDetailLog.operator}
                </span>
              </div>
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-[#cbc4d2]/45 font-bold uppercase tracking-wider block">{TEXT.ip}</span>
                <span className="font-mono text-white tracking-tight block">{activeDetailLog.ipAddress}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-[#cbc4d2]/45 font-bold uppercase tracking-wider block">{TEXT.action}</span>
              <p className="text-sm font-black text-white leading-tight">
                {activeDetailLog.action}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-[#cbc4d2]/45 font-bold uppercase tracking-wider block">{TEXT.details}</span>
              <p className="text-xs sm:text-[13px] text-[#cbc4d2]/85 leading-relaxed font-semibold whitespace-pre-wrap break-all">
                {activeDetailLog.details}
              </p>
            </div>

            {activeDetailLog.payload && (
              <div className="space-y-1.5 animate-fadeIn">
                <span className="text-[10px] text-[#cbc4d2]/45 font-bold uppercase tracking-wider block">{TEXT.payload}</span>
                <div className="bg-[#0b080f] rounded-xl border border-white/5 p-3.5 font-mono text-[11px] text-emerald-400 overflow-x-auto max-h-44 custom-scrollbar relative leading-relaxed tab-size-2">
                  <pre className="whitespace-pre text-left">{activeDetailLog.payload}</pre>
                  <span className="absolute top-2 right-2 text-[9px] font-bold text-white/20 select-none">{TEXT.data}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 justify-end pt-3 border-t border-white/5 mt-0.5 shrink-0 select-none">
            <Button
              className="alliance-antd-logs-modal-confirm"
              onClick={() => setActiveDetailLog(null)}
            >
              {TEXT.close}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
