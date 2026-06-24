import { Button, InputNumber, Modal } from 'antd';
import { AlertTriangle, CheckCircle, Coins, RefreshCw, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';

import type { CommissionPayout, DetailsPanelProps } from '../types';

const DETAIL_TEXT = {
  title: '\u5206\u9500\u4f63\u91d1\u7cbe\u7b97\u6d3e\u53d1\u5ba1\u8ba1\u65e5\u5fd7\u8be6\u60c5',
  transaction: 'TRANSACTION ID',
  uid: '\u62df\u53d1\u653e\u4ee3\u7406 UID\uff1a',
  level: '\u5206\u9500\u63a8\u8350\u4ee3\u6570\u5c42\u7ea7\uff1a',
  order: '\u8ba2\u5355\u6536\u5165\u5173\u8054\u6e90\uff1a',
  amount: '\u9884\u4f30\u5206\u62e8\u91d1\u989d\uff1a',
  target: '\u4ea4\u5272\u76ee\u6807\u63a5\u6536\u8d26\u6237\uff1a',
  wallet: '\u5e73\u53f0\u7528\u6237\u5185\u7f6e\u94b1\u5305\u4f59\u989d',
  time: '\u4ea4\u6613\u8ba1\u5165\u65f6\u95f4\u70b9\uff1a',
  status: '\u7cbe\u7b97\u6d3e\u53d1\u7ec8\u5ba1\u72b6\u6001\uff1a',
  originTitle: '\u5206\u6da6\u63d0\u4f9b\u6e90\u5934\u8ffd\u8e2a (Origin Commission Flow)',
  originPrefix: '\u672c\u7b14\u5206\u9500\u6536\u76ca\u7531\u60a8\u7684\u56e2\u961f\u7b2c',
  originMiddle: '\u4ee3\u4ee3\u7406\u6210\u5458',
  originSuffix: '\u6267\u884c\u5145\u503c\u64cd\u4f5c\u6240\u89e6\u53d1\u63d0\u4f9b\u3002',
  rechargeLabel: '\u5bf9\u5e94\u4f1e\u4e0b\u5b9e\u9645\u5145\u503c\u6570\u989d',
  recycleTitle: '\u8d44\u91d1\u6ea2\u51fa\u62e6\u622a\u56de\u7b3c\u5bf9\u8d26\u62a5\u544a (System Recycle Log)',
  recycleNote:
    '* \u672c\u7b14\u5206\u9500\u6ea2\u4ef7\u6536\u76ca\u5df2\u7531\u7cfb\u7edf\u667a\u80fd\u5408\u7ea6\u673a\u5236\u81ea\u52a8\u6267\u884c\u62e6\u622a\u5e76\u5f52\u96c6\u81f3\u5e73\u53f0\u50a8\u5907\u91d1\u8d26\u6237\u4e2d\uff0c\u5b9e\u73b0\u5b8c\u6574\u5165\u5e93\u3002',
  alertTitle: '\u7cfb\u7edf\u5bf9\u8d26\u5f02\u5e38\u68c0\u6d4b\u62a5\u544a (Critical Alert)',
  alertNote:
    '* \u9488\u5bf9\u8be5\u6302\u8d26\u72b6\u6001\uff0c\u9664\u975e\u4eba\u5de5\u5f3a\u5236\u8df3\u8fc7\u989d\u5ea6\u9650\u5236\uff0c\u5426\u5219\u8be5\u6b3e\u9879\u5c06\u59cb\u7ec8\u5904\u4e8e\u5f85\u4ed8\u963b\u585e\u961f\u5217\u4e2d\u3002',
  recycleActionTitle: '\u56de\u7b3c\u673a\u5236\u5e72\u9884\u5904\u7406',
  workflowTitle: '\u5f02\u5e38\u5904\u7406\u4e0e\u624b\u52a8\u7ea0\u504f\u5de5\u4f5c\u6d41 (Exception Intervention Workflow)',
  force: '\u624b\u52a8\u5f3a\u884c\u53d1\u653e (Bypass Pool)',
  adjust: '\u624b\u52a8\u5fae\u8c03\u989d\u5ea6\u540e\u91cd\u8bd5',
  close: '\u5173\u95ed\u8be6\u60c5',
  adjustTitle: '\u624b\u52a8\u5fae\u8c03\u4f63\u91d1\u989d\u5ea6',
  adjustLabel: '\u65b0\u7684\u6d3e\u53d1\u4f63\u91d1\u989d\u5ea6 (USDT)',
  cancel: '\u53d6\u6d88',
  submit: '\u786e\u8ba4\u91cd\u8bd5',
};

function getStatusText(status: CommissionPayout['status']) {
  if (status === 'credited') return '\u5ba1\u6838\u5df2\u901a\u8fc7\u5230\u8d26';
  if (status === 'pending') return '\u5f85\u7ed3\u7b97\u8f6e\u8be2';
  if (status === 'intercepted') return '\u62e6\u622a\u56de\u7b3c\u5165\u5e93 (Recycled)';
  return '\u6302\u8d26\u963b\u585e/\u53d1\u751f\u8d26\u76ee\u8d64\u5b57';
}

export default function AntdDetailsPanel({
  selectedCommission,
  onClose,
  onForcePayout,
  onSubmitCommissionAdjustment,
}: DetailsPanelProps) {
  const [isAdjustOpen, setIsAdjustOpen] = useState(false);
  const [adjustAmount, setAdjustAmount] = useState<number | null>(380);

  const submitAdjustment = () => {
    if (adjustAmount === null) return;
    onSubmitCommissionAdjustment(selectedCommission.id, String(adjustAmount));
    setIsAdjustOpen(false);
  };

  return (
    <>
      <Modal
        className="alliance-antd-commission-modal"
        rootClassName="alliance-antd-commission-modal-root"
        open
        centered
        width={512}
        footer={null}
        onCancel={onClose}
        destroyOnHidden
      >
        <div className="space-y-1 pb-3 border-b border-white/5 shrink-0 pr-8">
          <h4 className="text-sm font-black text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#cfbcff]" />
            <span>{DETAIL_TEXT.title}</span>
          </h4>
          <p className="text-[10px] text-[#cbc4d2]/45 font-mono">
            {DETAIL_TEXT.transaction}: {selectedCommission.id}
          </p>
        </div>

        <div className="overflow-y-auto py-4 pr-1 flex-grow space-y-5 scrollbar-thin scrollbar-thumb-white/10 text-left max-h-[64vh]">
          <div className="space-y-3 bg-[#110e16] p-4 rounded-xl border border-white/5 font-mono text-xs text-[#cbc4d2]">
            <div className="flex justify-between gap-4">
              <span className="text-[#cbc4d2]/40 font-bold font-sans">{DETAIL_TEXT.uid}</span>
              <span className="text-white font-extrabold text-right">
                {selectedCommission.uid} ({selectedCommission.recipientNickname})
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[#cbc4d2]/40 font-bold font-sans">{DETAIL_TEXT.level}</span>
              <span className="text-[#cfbcff] font-bold font-sans">{selectedCommission.level}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[#cbc4d2]/40 font-bold font-sans">{DETAIL_TEXT.order}</span>
              <span className="text-white">{selectedCommission.orderId}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[#cbc4d2]/40 font-bold font-sans">{DETAIL_TEXT.amount}</span>
              <span className="text-emerald-400 font-extrabold text-sm">
                USDT {selectedCommission.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[#cbc4d2]/40 font-bold font-sans">{DETAIL_TEXT.target}</span>
              <span className="text-emerald-400 font-bold text-[11px] text-right">{DETAIL_TEXT.wallet}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[#cbc4d2]/40 font-bold font-sans">{DETAIL_TEXT.time}</span>
              <span>{selectedCommission.time}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[#cbc4d2]/40 font-bold font-sans">{DETAIL_TEXT.status}</span>
              <span
                className={
                  selectedCommission.status === 'credited'
                    ? 'text-emerald-400'
                    : selectedCommission.status === 'intercepted'
                      ? 'text-red-400 font-bold'
                      : 'text-amber-500 animate-pulse'
                }
              >
                {getStatusText(selectedCommission.status)}
              </span>
            </div>
          </div>

          <div className="p-4 bg-[#1e1329]/55 border border-[#cfbcff]/15 rounded-2xl text-xs space-y-2.5">
            <p className="font-extrabold flex items-center gap-1.5 uppercase font-sans text-[#cfbcff]">
              <Coins className="w-4 h-4 shrink-0 text-[#cfbcff]" />
              <span>{DETAIL_TEXT.originTitle}</span>
            </p>
            <div className="space-y-1.5 font-sans leading-relaxed text-[#cbc4d2]/90">
              <p>
                {DETAIL_TEXT.originPrefix}
                <span className="text-[#cfbcff] font-extrabold font-mono text-sm">
                  {selectedCommission.triggerMemberLevel || selectedCommission.level}
                </span>
                {DETAIL_TEXT.originMiddle}
                <span className="text-white font-mono font-bold bg-[#110e16] px-1.5 py-0.5 rounded ml-1 text-xs select-all">
                  UID:{' '}
                  {selectedCommission.triggerMemberUid || (selectedCommission.status === 'intercepted' ? '891099' : '895002')}
                </span>
                {' '}
                {DETAIL_TEXT.originSuffix}
              </p>
              <div className="flex justify-between items-center bg-black/25 px-3 py-2 rounded-xl mt-1 text-[11px] font-mono">
                <span className="text-[#cbc4d2]/45">{DETAIL_TEXT.rechargeLabel}</span>
                <span className="text-emerald-400 font-extrabold">
                  USDT {(selectedCommission.triggerRechargeAmount || selectedCommission.amount * 10).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>

          {selectedCommission.errorMessage && (
            selectedCommission.status === 'intercepted' ? (
              <div className="p-4 bg-indigo-950/40 border border-[#cfbcff]/20 rounded-2xl text-xs text-[#cbc4d2] space-y-2">
                <p className="font-extrabold flex items-center gap-1.5 uppercase font-sans text-[#cfbcff]">
                  <CheckCircle className="w-4 h-4 shrink-0 text-[#cfbcff]" />
                  <span>{DETAIL_TEXT.recycleTitle}</span>
                </p>
                <p className="leading-relaxed opacity-90 text-[11px] font-mono text-left">{selectedCommission.errorMessage}</p>
                <p className="text-[10px] text-white/30 italic font-sans leading-normal">
                  {DETAIL_TEXT.recycleNote}
                </p>
              </div>
            ) : (
              <div className="p-4 bg-red-950/40 border border-red-500/20 rounded-2xl text-xs text-red-200 space-y-2">
                <p className="font-extrabold flex items-center gap-1.5 uppercase font-sans text-red-400">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{DETAIL_TEXT.alertTitle}</span>
                </p>
                <p className="leading-relaxed opacity-90 text-[11px] font-mono text-left">{selectedCommission.errorMessage}</p>
                <p className="text-[10px] text-white/30 italic font-sans leading-normal">
                  {DETAIL_TEXT.alertNote}
                </p>
              </div>
            )
          )}

          {selectedCommission.status === 'intercepted' ? (
            <div className="p-4 bg-[#1a1523]/60 border border-white/5 rounded-2xl space-y-2">
              <span className="text-[10px] text-[#cbc4d2]/40 uppercase font-black tracking-wider block">
                {DETAIL_TEXT.recycleActionTitle}
              </span>
              <p className="text-xs text-[#cbc4d2]/80 leading-normal text-left">
                \u8be5\u4ea4\u6613\u4e3a\u7cfb\u7edf\u673a\u5236\u81ea\u52a8\u56de\u7b3c\u5f52\u96c6\uff0c\u4e0d\u9700\u8981\u4eba\u5de5\u5fae\u8c03\u6216\u4e8c\u6b21\u5f3a\u5236\u5212\u62e8\u3002
              </p>
            </div>
          ) : (
            <div className="space-y-3.5 pt-2 border-t border-white/5">
              <span className="text-[10px] text-[#cbc4d2]/40 uppercase font-black tracking-wider block">
                {DETAIL_TEXT.workflowTitle}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <Button
                  className="alliance-antd-commission-force-button"
                  icon={<Send className="w-3.5 h-3.5" />}
                  onClick={() => onForcePayout(selectedCommission.id)}
                >
                  {DETAIL_TEXT.force}
                </Button>

                <Button
                  className="alliance-antd-commission-adjust-button"
                  icon={<RefreshCw className="w-3.5 h-3.5 text-[#cfbcff]" />}
                  onClick={() => setIsAdjustOpen(true)}
                >
                  {DETAIL_TEXT.adjust}
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-white/5 flex justify-end text-xs shrink-0">
          <Button className="alliance-antd-commission-close-button" onClick={onClose}>
            {DETAIL_TEXT.close}
          </Button>
        </div>
      </Modal>

      <Modal
        className="alliance-antd-commission-modal alliance-antd-commission-adjust-modal"
        rootClassName="alliance-antd-commission-modal-root"
        open={isAdjustOpen}
        centered
        width={420}
        title={DETAIL_TEXT.adjustTitle}
        onCancel={() => setIsAdjustOpen(false)}
        footer={[
          <Button key="cancel" className="alliance-antd-commission-close-button" onClick={() => setIsAdjustOpen(false)}>
            {DETAIL_TEXT.cancel}
          </Button>,
          <Button key="submit" className="alliance-antd-commission-force-button" onClick={submitAdjustment}>
            {DETAIL_TEXT.submit}
          </Button>,
        ]}
        destroyOnHidden
      >
        <div className="pt-2">
          <label className="text-[10px] text-[#cbc4d2]/50 font-black block mb-2">{DETAIL_TEXT.adjustLabel}</label>
          <InputNumber
            className="alliance-antd-commission-adjust-input"
            value={adjustAmount}
            min={0}
            precision={2}
            onChange={(value) => setAdjustAmount(typeof value === 'number' ? value : null)}
          />
        </div>
      </Modal>
    </>
  );
}
