import { Button, Modal } from 'antd';
import { AlertTriangle, Bell, RefreshCw, Sparkles } from 'lucide-react';

import type { WorkspaceProps } from '../types';

type DetailModalProps = Pick<
  WorkspaceProps,
  | 'selectedTx'
  | 'setSelectedTx'
  | 'handleResolveException'
  | 'handleNotifyInsufficientCapacity'
>;

const TEXT = {
  title: '\u52a0\u76df\u5546\u4f63\u91d1\u5c5e\u9650\u7ed3\u7b97\u6570\u636e\u7a7f\u900f\u6821\u5bf9\u7c3f',
  ticket: 'STL ACCOUNT TICKET ID:',
  uid: '\u62df\u6d3e\u53d1\u7ed3\u7b97\u4ee3\u7406 UID\uff1a',
  date: '\u9884\u63d0\u62a5\u7ed3\u7b97\u7ed3\u7b97\u671f\uff1a',
  expected: '\u4e0b\u4ee3\u4e0b\u5c5e\u7d2f\u79ef\u603b\u8fd4\u672c\u6536\u76ca\uff1a',
  capacity: '\u8be5\u8d26\u53f7\u5f53\u524d\u4ecd\u53ef\u7528\u989d\u5ea6\u6c60\uff1a',
  actual: '\u5b9e\u9645\u6838\u53d1\u5230\u8d26\u7f8e\u91d1\uff1a',
  clipped: '\u8d85\u53d1\u90e8\u5206\u5927\u76d8\u622a\u6263\u6ea2\u6d41\u989d\uff1a',
  warningTitle: '\u989d\u5ea6\u6c60\u4e25\u91cd\u900f\u652f\u8b66\u62a5 (Capacity Exhausted)',
  warningPrefix: '\u8be5\u4e0a\u7ebf\u4ee3\u7406\u4eba\u7684[\u4f63\u91d1\u989d\u5ea6]\u4ec5\u5269\u4f59',
  warningMiddle: '\uff0c\u56e0\u6b64\u8d85\u51fa\u4e86\u7cfb\u7edf\u8bbe\u9650\u5236\u3002\u5df2\u89e6\u53d1\u5f3a\u884c\u6ea2\u51fa\u56de\u7b3c\u5927\u4ed3\u673a\u5236\u5171',
  warningEnd: '\u88ab\u76f4\u63a5\u7f5a\u6ca1\u622a\u7559\u3002',
  warningNote: '* \u5982\u679c\u8be5\u4f1a\u5458\u5df2\u901a\u8fc7\u5176\u4ed6\u6e20\u9053\u8ba4\u8d2d\u6269\u5c55\u8865\u9f50\u989d\u5ea6\uff0c\u7ba1\u7406\u5458\u4e0d\u4ec5\u53ef\u4ee5\u53d1\u9001\u8b66\u544a\u63a8\u9001\uff0c\u4ea6\u53ef\u6267\u884c\u201c\u89e3\u51b3\u5e76\u91cd\u7f6e\u5f02\u5e38\u201d\u5c06\u5176\u5f3a\u884c\u4fee\u6b63\u53d1\u653e\u3002',
  command: '\u5e73\u53f0\u51b3\u7b56\u7ba1\u7406\u5458\u547d\u4ee4 (Bypass & Notification Workflow)',
  notify: '\u901a\u77e5\u4f1a\u5458\u4f63\u91d1\u989d\u5ea6\u6c60\u67af\u7aed',
  resolve: '\u4eba\u5de5\u8865\u53d1\u5e76\u5f3a\u5236\u8c03\u8d26',
  note: '* \u7cbe\u7b97\u64cd\u4f5c\u5907\u67e5\uff1a\u53d1\u51fa\u201c\u4f63\u989d\u5ea6\u4e0d\u8db3\u62e6\u622a\u8b66\u544a\u201d\u4f1a\u81ea\u52a8\u4e0b\u5411\u7528\u6237\u53d1\u9001\u7cfb\u7edf\u5f39\u7a97\u901a\u77e5\u534f\u52a9\u5176\u81ea\u52a8\u8865\u8db3\u3002',
  close: '\u5173\u95ed\u5bf9\u8d26\u8be6\u60c5',
};

export default function AntdDetailModal({
  selectedTx,
  setSelectedTx,
  handleResolveException,
  handleNotifyInsufficientCapacity
}: DetailModalProps) {
  return (
    <Modal
      centered
      className="alliance-antd-settlement-modal"
      destroyOnHidden
      footer={null}
      getContainer={false}
      onCancel={() => setSelectedTx(null)}
      open={Boolean(selectedTx)}
      rootClassName="alliance-antd-settlement-modal-root"
      width={512}
    >
      {selectedTx && (
        <div className="space-y-6">
          <div className="space-y-1 pb-2 border-b border-white/5 pr-8">
            <h4 className="text-sm font-black text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#cfbcff]" />
              <span>{TEXT.title}</span>
            </h4>
            <p className="text-xs text-[#cbc4d2]/45 font-mono">{TEXT.ticket} {selectedTx.id}</p>
          </div>

          <div className="space-y-3 bg-[#110e16] p-4.5 rounded-2xl border border-white/5 font-mono text-xs text-[#cbc4d2]/80">
            <div className="flex justify-between gap-4">
              <span className="text-[#cbc4d2]/50 font-sans">{TEXT.uid}</span>
              <span className="text-white font-bold text-right">{selectedTx.memberUid} ({selectedTx.nickname})</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[#cbc4d2]/50 font-sans">{TEXT.date}</span>
              <span>{selectedTx.date}\u65e5\u7ed3 (D+1)</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[#cbc4d2]/50 font-sans">{TEXT.expected}</span>
              <span className="text-white font-bold font-mono">USDT {selectedTx.expectedCommissions.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4 pb-1.5 border-b border-white/5">
              <span className="text-[#cbc4d2]/50 font-sans">{TEXT.capacity}</span>
              <span className="text-amber-300 font-extrabold font-mono">{selectedTx.remainingPoolCapacity.toLocaleString()} USDT</span>
            </div>
            <div className="flex justify-between gap-4 pt-1 text-xs">
              <span className="text-emerald-400 font-sans font-bold">{TEXT.actual}</span>
              <span className="text-emerald-400 font-black font-mono">USDT {selectedTx.actualSettledAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4 text-xs text-red-400">
              <span className="font-sans font-bold">{TEXT.clipped}</span>
              <span className="font-black font-mono">USDT {selectedTx.spilloverClipped.toLocaleString()}</span>
            </div>
          </div>

          {selectedTx.remainingPoolCapacity < selectedTx.expectedCommissions && (
            <div className="p-4 bg-red-950/40 border border-red-500/20 rounded-2xl text-xs text-red-200/90 space-y-2 text-left">
              <p className="font-bold text-red-400 flex items-center gap-1.5 uppercase">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{TEXT.warningTitle}</span>
              </p>
              <p className="leading-relaxed text-[13px] font-sans">
                {TEXT.warningPrefix} <strong>{selectedTx.remainingPoolCapacity} USDT</strong>{TEXT.warningMiddle} <strong>{selectedTx.spilloverClipped} USDT</strong> {TEXT.warningEnd}
              </p>
              <p className="text-xs text-white/30 font-sans italic">
                {TEXT.warningNote}
              </p>
            </div>
          )}

          <div className="pt-2 space-y-3 text-left">
            <span className="text-xs text-[#cbc4d2]/40 font-black uppercase tracking-wider block font-sans">{TEXT.command}</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-sans">
              <Button
                className="alliance-antd-settlement-warn-button"
                icon={<Bell className="w-4 h-4 text-amber-300 animate-bounce" />}
                onClick={() => handleNotifyInsufficientCapacity(selectedTx)}
              >
                {TEXT.notify}
              </Button>

              <Button
                className="alliance-antd-settlement-resolve-button"
                icon={<RefreshCw className="w-4 h-4" />}
                onClick={() => handleResolveException(selectedTx.id)}
              >
                {TEXT.resolve}
              </Button>
            </div>

            <p className="text-xs text-[#cbc4d2]/30 text-center leading-normal font-sans">
              {TEXT.note}
            </p>
          </div>

          <div className="pt-2 flex justify-end text-xs font-sans">
            <Button
              className="alliance-antd-settlement-close-button"
              onClick={() => setSelectedTx(null)}
            >
              {TEXT.close}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
