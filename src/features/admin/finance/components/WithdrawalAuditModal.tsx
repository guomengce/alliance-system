import { Button } from 'antd';
import { Activity, Languages, ShieldCheck, X } from 'lucide-react';
import type { WorkspaceProps } from '../types';

type WithdrawalAuditModalProps = Pick<
  WorkspaceProps,
  | 'selectedWithdrawal'
  | 'setSelectedWithdrawal'
  | 'withdrawalFee'
  | 'onApproveWithdrawal'
  | 'onRejectWithdrawal'
>;

export default function WithdrawalAuditModal({
  selectedWithdrawal,
  setSelectedWithdrawal,
  withdrawalFee,
  onApproveWithdrawal,
  onRejectWithdrawal
}: WithdrawalAuditModalProps) {
  if (!selectedWithdrawal) return null;

  const netAmount = Math.abs(selectedWithdrawal.amount) - withdrawalFee;
  const applicantUid = selectedWithdrawal.id.slice(-6);

  return (
    <div id="withdrawal_detail_overlay" className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn p-4 overflow-y-auto font-sans">
      <div className="bg-[#181421] border border-white/10 rounded-3xl max-w-lg w-full p-6 md:p-8 relative shadow-2xl shadow-black animate-slideUp space-y-6 max-h-[92vh] overflow-y-auto custom-scrollbar">
        <Button
          type="text"
          onClick={() => setSelectedWithdrawal(null)}
          icon={<X className="w-5 h-5" />}
          className="absolute right-4 top-4 text-[#cbc4d2]/60 hover:text-white transition-colors"
        />

        <div className="space-y-1 pb-2 border-b border-white/5 text-left">
          <h4 className="text-base font-black text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-400" />
            <span>提币出金委托安全决策审计报告</span>
          </h4>
          <p className="text-xs text-[#cbc4d2]/40 font-mono">TICKET: {selectedWithdrawal.id} / Status: {selectedWithdrawal.statusLabel || '待终核'}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 text-left font-mono">
          <div className="bg-[#110e16] p-3 rounded-xl border border-white/5 col-span-2 md:col-span-1">
            <span className="text-xs text-[#cbc4d2]/40 font-sans block">申请提现毛额</span>
            <span className="text-sm font-extrabold text-[#ffb4ab]">
              -{Math.abs(selectedWithdrawal.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })} U
            </span>
          </div>
          <div className="bg-[#110e16] p-3 rounded-xl border border-white/5">
            <span className="text-xs text-[#cbc4d2]/40 font-sans block">划转 Gas 手续费</span>
            <span className="text-sm font-bold text-white/70">
              {withdrawalFee.toLocaleString(undefined, { minimumFractionDigits: 2 })} U
            </span>
          </div>
          <div className="bg-[#110e16] p-3 rounded-xl border border-emerald-500/20 text-emerald-400">
            <span className="text-xs text-emerald-400/60 font-sans block font-bold">最终实拨出金</span>
            <span className="text-sm font-black">
              {netAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} U
            </span>
          </div>
        </div>

        <div className="bg-white/2 border border-white/5 p-4.5 rounded-2xl text-left space-y-3.5">
          <div className="flex items-center gap-2 text-xs text-[#cfbcff] font-bold border-b border-white/5 pb-2">
            <ShieldCheck className="w-4 h-4 text-[#cfbcff]" />
            <span>用户信息 (User Info)</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-[#cbc4d2]/45 text-xs block leading-none">申请账户 UID:</span>
              <span className="font-mono font-bold text-white">UID {applicantUid}</span>
            </div>
            <div className="space-y-1">
              <span className="text-[#cbc4d2]/45 text-xs block leading-none">会员 KYC 级别:</span>
              <span className="text-emerald-400 font-bold">已实名 L1 / L2 级别</span>
            </div>
            <div className="space-y-1">
              <span className="text-[#cbc4d2]/45 text-xs block leading-none">团队直属 Sponsor:</span>
              <span className="font-mono font-bold text-white">999001 (SYS)</span>
            </div>
            <div className="space-y-1">
              <span className="text-[#cbc4d2]/45 text-xs block leading-none">申请发起时分:</span>
              <span className="font-mono text-white/80">{selectedWithdrawal.time}</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-950/10 to-indigo-950/10 border border-indigo-500/10 p-4.5 rounded-2xl text-left space-y-3.5">
          <div className="flex items-center gap-2 text-xs text-indigo-300 font-bold border-b border-white/5 pb-2">
            <Languages className="w-4 h-4" />
            <span>到账通道及下发目标公网地址 (Blockchain Delivery Destination)</span>
          </div>

          <div className="space-y-2.5 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-[#cbc4d2]/50">下发承载协议公链:</span>
              <span className="text-white font-bold">{selectedWithdrawal.blockchainProof?.network || 'Tether USD - TRON Network (TRC-20)'}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#cbc4d2]/50">外部收款目标节点地址:</span>
              <span className="bg-black/30 p-2.5 font-mono text-[13px] text-[#cfbcff] border border-white/5 rounded-xl break-all select-all leading-normal text-left">
                {selectedWithdrawal.blockchainProof?.toAddress || `Tx78HqsmB82K1Hshq82Ksh918Ksw${applicantUid}`}
              </span>
            </div>
            <div className="flex justify-between pt-1 border-t border-white/5 text-[11.5px]">
              <span className="text-[#cbc4d2]/50">当前预判区块对账状态</span>
              <span className="text-amber-400 font-bold animate-pulse">待核放 (Await Dispatch Authorization)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/5 gap-3 text-xs">
          <Button
            type="default"
            onClick={() => setSelectedWithdrawal(null)}
            className="px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold font-sans"
          >
            放弃审计
          </Button>
          <div className="flex items-center gap-2">
            <Button
              danger
              type="default"
              onClick={() => {
                onRejectWithdrawal(selectedWithdrawal.id);
                setSelectedWithdrawal(null);
              }}
              className="px-4 py-3 rounded-xl font-bold font-sans"
            >
              拒绝驳回
            </Button>
            <Button
              type="primary"
              onClick={() => {
                onApproveWithdrawal(selectedWithdrawal.id);
                setSelectedWithdrawal(null);
              }}
              className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-400 hover:brightness-110 text-slate-950 font-black rounded-xl shadow-md shadow-emerald-500/10 font-sans"
            >
              通过并打款
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
