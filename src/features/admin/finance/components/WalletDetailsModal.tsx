import { Button, InputNumber, Select } from 'antd';
import { PenTool, Wallet, X } from 'lucide-react';
import type { WorkspaceProps } from '../types';

type WalletDetailsModalProps = Pick<
  WorkspaceProps,
  | 'selectedWalletMember'
  | 'setSelectedWalletMember'
  | 'adjustUsdt'
  | 'setAdjustUsdt'
  | 'adjustTroo'
  | 'setAdjustTroo'
  | 'adjustFrozen'
  | 'setAdjustFrozen'
  | 'adjustStatus'
  | 'setAdjustStatus'
  | 'handleSaveWalletAdjustment'
>;

const statusOptions = [
  { value: 'normal', label: 'NORMAL (活跃可用状态)' },
  { value: 'frozen', label: 'FROZEN (可提限制/冻结限制)' },
  { value: 'disabled', label: 'REBUFF (锁定隔离)' }
];

export default function WalletDetailsModal({
  selectedWalletMember,
  setSelectedWalletMember,
  adjustUsdt,
  setAdjustUsdt,
  adjustTroo,
  setAdjustTroo,
  adjustFrozen,
  setAdjustFrozen,
  adjustStatus,
  setAdjustStatus,
  handleSaveWalletAdjustment
}: WalletDetailsModalProps) {
  if (!selectedWalletMember) return null;

  return (
    <div id="member_wallet_overlay" className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn p-4 overflow-y-auto font-sans">
      <div className="bg-[#181421] border border-white/10 rounded-3xl max-w-xl w-full p-6 md:p-8 relative shadow-2xl shadow-black animate-slideUp space-y-6 max-h-[92vh] overflow-y-auto custom-scrollbar">
        <Button
          type="text"
          onClick={() => setSelectedWalletMember(null)}
          icon={<X className="w-5 h-5" />}
          className="absolute right-4 top-4 text-[#cbc4d2]/60 hover:text-white transition-colors"
        />

        <div className="space-y-1 pb-2 border-b border-white/5 text-left">
          <h4 className="text-base font-black text-white flex items-center gap-2">
            <Wallet className="w-5 h-5 text-[#cfbcff]" />
            <span>加盟商个人金库审计及资金硬调</span>
          </h4>
          <p className="text-xs text-[#cbc4d2]/40 font-mono">
            OWNER ACCOUNT UID: {selectedWalletMember.uid} / Nickname: {selectedWalletMember.nickname || '新同盟代表'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 text-xs font-mono">
          <div className="bg-[#110e16] p-3 rounded-xl border border-white/5 text-center">
            <span className="text-xs text-[#cbc4d2]/45 font-sans block">可用资产 (U)</span>
            <span className="text-xs font-bold text-emerald-400">{(selectedWalletMember.usdtBalance || 0).toLocaleString()}</span>
          </div>
          <div className="bg-[#110e16] p-3 rounded-xl border border-white/5 text-center">
            <span className="text-xs text-cyan-400 font-sans block">冻结资金 (U)</span>
            <span className="text-xs font-bold text-cyan-400">{(selectedWalletMember.frozenBalance || 0).toLocaleString()}</span>
          </div>
          <div className="bg-[#110e16] p-3 rounded-xl border border-white/5 text-center">
            <span className="text-xs text-[#cfbcff] font-sans block">TROO 股票股数</span>
            <span className="text-xs font-bold text-[#cfbcff]">{(selectedWalletMember.trooBalance || 0).toLocaleString()}</span>
          </div>
          <div className="bg-[#110e16] p-3 rounded-xl border border-white/5 text-center">
            <span className="text-xs text-amber-500 font-sans block">在途待核 U</span>
            <span className="text-xs font-bold text-amber-500">{(selectedWalletMember.pendingBalance || 0).toLocaleString()}</span>
          </div>
          <div className="bg-[#110e16] p-3 rounded-xl border border-[#e7c365]/20 text-center relative overflow-hidden">
            <span className="text-xs text-[#e7c365]/80 font-sans block font-bold">排队待解锁 (U)</span>
            <span className="text-xs font-black text-[#e7c365]">
              {((selectedWalletMember.pendingBalance || 1500) * 1.5).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <div className="bg-white/2 border border-white/5 p-5 rounded-2xl space-y-4 text-left font-sans">
          <div className="flex items-center gap-2 text-xs text-amber-300 pb-2 border-b border-white/5">
            <PenTool className="w-4 h-4 shrink-0" />
            <p className="font-bold">手动财务资金纠偏对调工具 (Manual Correction Form)</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] uppercase font-bold text-[#cbc4d2]/50">可用余额 (USDT)</label>
              <InputNumber className="w-full" value={adjustUsdt} onChange={(value) => setAdjustUsdt(Number(value) || 0)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] uppercase font-bold text-[#cbc4d2]/50">冻结资产 (USDT)</label>
              <InputNumber className="w-full" value={adjustFrozen} onChange={(value) => setAdjustFrozen(Number(value) || 0)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] uppercase font-bold text-[#cbc4d2]/50">TROO 股票量 (股)</label>
              <InputNumber className="w-full" value={adjustTroo} onChange={(value) => setAdjustTroo(Number(value) || 0)} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] uppercase font-bold text-[#cbc4d2]/50">运营风控状态</label>
              <Select value={adjustStatus} onChange={setAdjustStatus} options={statusOptions} />
            </div>

            <div className="flex flex-col justify-end">
              <p className="text-xs text-[#cbc4d2]/30 italic leading-tight">
                * 调整可用或冻结金额后，保存操作将直接改写对应会员的中心财务底单结构。
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 flex justify-end gap-3 text-xs">
            <Button
              type="default"
              onClick={() => setSelectedWalletMember(null)}
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold"
            >
              放弃修改
            </Button>
            <Button
              type="primary"
              onClick={handleSaveWalletAdjustment}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:brightness-110 text-slate-900 font-black rounded-xl shadow-md shadow-emerald-500/10"
            >
              确认资金安全存证
            </Button>
          </div>
        </div>

        <div className="p-3.5 bg-red-950/20 border border-red-500/10 rounded-2xl text-xs text-red-200/80 leading-normal text-left">
          合规和安全提示：人工财务调整为高级后台操作，任何改写行为都会被平台写入审计日志。
        </div>
      </div>
    </div>
  );
}
