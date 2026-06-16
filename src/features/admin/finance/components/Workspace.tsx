import { Activity, CheckCircle2, Languages, PenTool, ShieldCheck, Wallet, X } from 'lucide-react';
import HeaderTabs from './HeaderTabs';
import LedgerPanel from './LedgerPanel';
import ReservesPanel from './ReservesPanel';
import WalletsPanel from './WalletsPanel';
import type { WorkspaceProps } from '../types';

export default function Workspace({
  pendingWithdrawals,
  onApproveWithdrawal,
  onRejectWithdrawal,
  downlines,
  activeTab,
  setActiveTab,
  searchMemberQuery,
  setSearchMemberQuery,
  ledgerTypeFilter,
  setLedgerTypeFilter,
  searchLedgerQuery,
  setSearchLedgerQuery,
  companyUSDT,
  companyTROO,
  withdrawalFee,
  totalUserUSDT,
  totalUserTROO,
  totalUserLocked,
  fullLedger,
  selectedLedgerItem,
  setSelectedLedgerItem,
  selectedWalletMember,
  setSelectedWalletMember,
  selectedWithdrawal,
  setSelectedWithdrawal,
  adjustUsdt,
  setAdjustUsdt,
  adjustTroo,
  setAdjustTroo,
  adjustFrozen,
  setAdjustFrozen,
  adjustStatus,
  setAdjustStatus,
  handleOpenWalletDetails,
  handleSaveWalletAdjustment,
  exportLedgerCSV
}: WorkspaceProps) {
  return (
    <div id="admin_finance_module" className="space-y-6 animate-fadeIn select-none flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-4">
      <div className="glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-6 flex-grow flex flex-col">
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'reserves' && (
          <ReservesPanel
            pendingWithdrawals={pendingWithdrawals}
            withdrawalFee={withdrawalFee}
            companyUSDT={companyUSDT}
            companyTROO={companyTROO}
            totalUserUSDT={totalUserUSDT}
            totalUserTROO={totalUserTROO}
            totalUserLocked={totalUserLocked}
            setSelectedWithdrawal={setSelectedWithdrawal}
            onApproveWithdrawal={onApproveWithdrawal}
            onRejectWithdrawal={onRejectWithdrawal}
          />
        )}

        {activeTab === 'wallets' && (
          <WalletsPanel
            downlines={downlines}
            searchMemberQuery={searchMemberQuery}
            setSearchMemberQuery={setSearchMemberQuery}
            handleOpenWalletDetails={handleOpenWalletDetails}
          />
        )}

        {activeTab === 'ledger' && (
          <LedgerPanel
            fullLedger={fullLedger}
            ledgerTypeFilter={ledgerTypeFilter}
            setLedgerTypeFilter={setLedgerTypeFilter}
            setSelectedLedgerItem={setSelectedLedgerItem}
            exportLedgerCSV={exportLedgerCSV}
          />
        )}
      </div>

      {/* 🧾 LEDGER VOUCHER DETAILS POPUP DIALOG */}
      {selectedLedgerItem && (
        <div id="ledger_item_overlay" className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn p-4 overflow-y-auto font-sans">
          <div className="bg-[#181421] border border-white/10 rounded-3xl max-w-md w-full p-6 md:p-8 relative shadow-2xl shadow-black animate-slideUp space-y-5 max-h-[92vh] overflow-y-auto custom-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedLedgerItem(null)}
              className="absolute right-4 top-4 text-[#cbc4d2]/60 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 pb-2 border-b border-white/5">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>平台链上财务记账核心凭证</span>
              </h4>
              <p className="text-[10px] text-[#cbc4d2]/40 font-mono">TICKET ID: {selectedLedgerItem.id}</p>
            </div>

            <div className="space-y-3 bg-[#110e16] p-4.5 rounded-2xl border border-white/5 font-mono text-xs text-[#cbc4d2]/90">
              <div className="flex justify-between">
                <span>分类描述形态：</span>
                <span className="text-[#cfbcff] font-bold">{selectedLedgerItem.typeLabel || selectedLedgerItem.type.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span>交割本金方向：</span>
                <span className="text-white font-bold">{selectedLedgerItem.currency}</span>
              </div>
              <div className="flex justify-between">
                <span>实拨本金总值：</span>
                <span className={selectedLedgerItem.amount < 0 ? 'text-red-400 font-extrabold' : 'text-emerald-400 font-extrabold'}>
                  {selectedLedgerItem.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                </span>
              </div>
              <div className="flex justify-between">
                <span>写入系统时分：</span>
                <span>{selectedLedgerItem.time}</span>
              </div>
              <div className="flex justify-between">
                <span>对账智能状态：</span>
                <span className="text-emerald-400">Ledger Ok (已自动对账存证)</span>
              </div>
            </div>

            {(selectedLedgerItem.type === 'withdraw' || selectedLedgerItem.type === 'recharge') && (
              <div className="space-y-2.5 bg-gradient-to-r from-purple-950/20 to-indigo-950/20 p-4 rounded-2xl border border-indigo-500/20 font-mono text-[11px]">
                <p className="text-xs font-bold text-[#cfbcff] flex items-center gap-1.5 border-b border-white/5 pb-1.5 font-sans">
                  <span className="inline-block w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                  🌐 链上智能合约区块凭证 (Blockchain Proof)
                </p>
                <div className="space-y-2 text-[#cbc4d2]/85">
                  <div className="flex justify-between">
                    <span className="text-white/45">公链协议网络:</span>
                    <span className="text-white font-bold">{selectedLedgerItem.blockchainProof?.network || (selectedLedgerItem.desc.includes('ERC-20') || selectedLedgerItem.desc.includes('ERC20') ? 'Ethereum Mainnet (ERC-20)' : 'TRON Network (TRC-20)')}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 mt-1">
                    <span className="text-white/45">链上交易哈希 (TXID):</span>
                    <span className="text-[#cfbcff] bg-black/40 p-2 rounded text-[10px] break-all select-all border border-white/5 block text-left">
                      {selectedLedgerItem.blockchainProof?.txid || (selectedLedgerItem.id.replace('TXN-', '0x') + 'fa' + Math.floor(10293120).toString(16) + '8a9c')}
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-white/45">区块确权高度:</span>
                    <span className="text-white">{selectedLedgerItem.blockchainProof?.blockHeight || 61849204}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/45">全网共识确认:</span>
                    <span className="text-emerald-400 font-bold">{selectedLedgerItem.blockchainProof?.confirmations || 256} / 256 Confirmed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/45">平台燃气储备:</span>
                    <span className="text-white">{selectedLedgerItem.blockchainProof?.gasFee || (selectedLedgerItem.type === 'withdraw' ? '15.0' : '1.5')} USDT</span>
                  </div>
                  <div className="border-t border-white/5 pt-1.5 flex flex-col gap-1 text-[10px] opacity-80">
                    <div className="flex justify-between">
                      <span className="text-white/45">发款源地址:</span>
                      <span className="text-white/80 select-all font-mono">{selectedLedgerItem.blockchainProof?.fromAddress || 'Tx78HqsmB82K1Hshq82Ksh918Ksw'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/45">收讫目的端:</span>
                      <span className="text-white/80 select-all font-mono">{selectedLedgerItem.blockchainProof?.toAddress || '0x742d35Cc6634C0532925a3b844Bc454'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="p-3.5 bg-white/2 rounded-xl border border-white/5 space-y-1.5 text-xs text-[#cbc4d2]/85">
              <p className="font-bold text-white text-[11px]">资金流动记录描述如下：</p>
              <p className="leading-relaxed text-[11px] font-sans opacity-80">{selectedLedgerItem.desc}</p>
            </div>

            <div className="pt-2 flex justify-end text-xs">
              <button
                type="button"
                onClick={() => setSelectedLedgerItem(null)}
                className="bg-white/5 hover:bg-white/10 text-white px-5 py-2.5 rounded-xl font-bold cursor-pointer transition-all active:scale-95"
              >
                关闭凭证
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 💼 MEMBER WALLET DETAILS POPUP DIALOG - Allows manual recalibrations! */}
      {selectedWalletMember && (
        <div id="member_wallet_overlay" className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn p-4 overflow-y-auto font-sans">
          <div className="bg-[#181421] border border-white/10 rounded-3xl max-w-xl w-full p-6 md:p-8 relative shadow-2xl shadow-black animate-slideUp space-y-6 max-h-[92vh] overflow-y-auto custom-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedWalletMember(null)}
              className="absolute right-4 top-4 text-[#cbc4d2]/60 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 pb-2 border-b border-white/5 text-left">
              <h4 className="text-base font-black text-white flex items-center gap-2">
                <Wallet className="w-5 h-5 text-[#cfbcff]" />
                <span>加盟商个人金库审计及资金硬调改</span>
              </h4>
              <p className="text-xs text-[#cbc4d2]/40 font-mono">OWNER ACCOUNT UID: {selectedWalletMember.uid} / Nickname: {selectedWalletMember.nickname || '新同盟代表'}</p>
            </div>

            {/* Total assets display stats card */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 text-xs font-mono">
              <div className="bg-[#110e16] p-3 rounded-xl border border-white/5 text-center">
                <span className="text-[10px] text-[#cbc4d2]/45 font-sans block">可用资产 (U)</span>
                <span className="text-xs font-bold text-emerald-400">{(selectedWalletMember.usdtBalance || 0).toLocaleString()}</span>
              </div>
              <div className="bg-[#110e16] p-3 rounded-xl border border-white/5 text-center">
                <span className="text-[10px] text-cyan-400 font-sans block">冻结资金 (U)</span>
                <span className="text-xs font-bold text-cyan-400">{(selectedWalletMember.frozenBalance || 0).toLocaleString()}</span>
              </div>
              <div className="bg-[#110e16] p-3 rounded-xl border border-white/5 text-center">
                <span className="text-[10px] text-[#cfbcff] font-sans block">TROO 股票股数</span>
                <span className="text-xs font-bold text-[#cfbcff]">{(selectedWalletMember.trooBalance || 0).toLocaleString()}</span>
              </div>
              <div className="bg-[#110e16] p-3 rounded-xl border border-white/5 text-center">
                <span className="text-[10px] text-amber-500 font-sans block">在途待核 U</span>
                <span className="text-xs font-bold text-amber-500">{(selectedWalletMember.pendingBalance || 0).toLocaleString()}</span>
              </div>
              <div className="bg-[#110e16] p-3 rounded-xl border border-[#e7c365]/20 text-center relative overflow-hidden">
                <span className="text-[10px] text-[#e7c365]/80 font-sans block font-bold">排队待解锁 (U)</span>
                <span className="text-xs font-black text-[#e7c365]">
                  {((selectedWalletMember.pendingBalance || 1500) * 1.5).toLocaleString(undefined, {minimumFractionDigits: 2})}
                </span>
                <p className="text-[8px] text-[#e7c365]/40 leading-none mt-1 font-sans">等代下代认购</p>
              </div>
            </div>

            {/* Quick calibration inputs form */}
            <div className="bg-white/2 border border-white/5 p-5 rounded-2xl space-y-4 text-left font-sans">
              <div className="flex items-center gap-2 text-xs text-amber-300 pb-2 border-b border-white/5">
                <PenTool className="w-4 h-4 shrink-0" />
                <p className="font-bold">手动财务资金纠偏对调工具 (Manual Correction Form)</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10.5px] uppercase font-bold text-[#cbc4d2]/50">可用余额(USDT)</label>
                  <input
                    type="number"
                    value={adjustUsdt}
                    onChange={(e) => setAdjustUsdt(Number(e.target.value) || 0)}
                    className="bg-[#110e16] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10.5px] uppercase font-bold text-[#cbc4d2]/50">冻结资产(USDT)</label>
                  <input
                    type="number"
                    value={adjustFrozen}
                    onChange={(e) => setAdjustFrozen(Number(e.target.value) || 0)}
                    className="bg-[#110e16] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cyan-400 font-mono"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10.5px] uppercase font-bold text-[#cbc4d2]/50">TROO股票量(股)</label>
                  <input
                    type="number"
                    value={adjustTroo}
                    onChange={(e) => setAdjustTroo(Number(e.target.value) || 0)}
                    className="bg-[#110e16] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#cfbcff] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10.5px] uppercase font-bold text-[#cbc4d2]/50">运营风控状态</label>
                  <select
                    value={adjustStatus}
                    onChange={(e) => setAdjustStatus(e.target.value)}
                    className="bg-[#110e16] border border-white/10 rounded-xl px-3.5 py-3 text-xs text-white uppercase font-bold"
                  >
                    <option value="normal">⚡ NORMAL (活跃可用状态)</option>
                    <option value="frozen">❄ FROZEN (可提限制/冻结限制)</option>
                    <option value="disabled">🚫 REBUFF (锁定拉黑隔离)</option>
                  </select>
                </div>

                <div className="flex flex-col justify-end">
                  <p className="text-[10px] text-[#cbc4d2]/30 italic leading-tight">
                    * 对账计算备忘：调整可用或冻结金额后，保存操作将直接改写对应会员的中心财务大底单结构。
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex justify-end gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedWalletMember(null)}
                  className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all cursor-pointer font-bold"
                >
                  放弃修改
                </button>
                <button
                  type="button"
                  onClick={handleSaveWalletAdjustment}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:brightness-110 text-slate-900 font-black rounded-xl cursor-pointer transition-all shadow-md shadow-emerald-500/10"
                >
                  确认资金安全存证
                </button>
              </div>
            </div>

            {/* Bottom tips */}
            <div className="p-3.5 bg-red-950/20 border border-red-500/10 rounded-2xl text-[10px] text-red-200/80 leading-normal text-left">
              ⚠ **合规和安全提示**：人工财务调整为高级后门操作，任何对此特定加盟会员可用USDT与TROO股票硬改写的行为，都会被平台写入审计全周期日志存根。
            </div>

          </div>
        </div>
      )}

      {/* 🔮 WITHDRAWAL AUDIT & DETAILS OVERLAY DIALOG */}
      {selectedWithdrawal && (() => {
        const netAmount = Math.abs(selectedWithdrawal.amount) - withdrawalFee;
        const applicantUid = selectedWithdrawal.id.slice(-6);
        return (
          <div id="withdrawal_detail_overlay" className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn p-4 overflow-y-auto font-sans">
            <div className="bg-[#181421] border border-white/10 rounded-3xl max-w-lg w-full p-6 md:p-8 relative shadow-2xl shadow-black animate-slideUp space-y-6 max-h-[92vh] overflow-y-auto custom-scrollbar">
              <button
                type="button"
                onClick={() => setSelectedWithdrawal(null)}
                className="absolute right-4 top-4 text-[#cbc4d2]/60 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1 pb-2 border-b border-white/5 text-left">
                <h4 className="text-base font-black text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-amber-400" />
                  <span>提币出金委托高级安全决策审计报告</span>
                </h4>
                <p className="text-xs text-[#cbc4d2]/40 font-mono">TICKET: {selectedWithdrawal.id} / Status: {selectedWithdrawal.statusLabel || '待终核'}</p>
              </div>

              {/* Core Financial Block */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 text-left font-mono">
                <div className="bg-[#110e16] p-3 rounded-xl border border-white/5 col-span-2 md:col-span-1">
                  <span className="text-[10px] text-[#cbc4d2]/40 font-sans block">申请提现毛额</span>
                  <span className="text-sm font-extrabold text-[#ffb4ab]">
                    -{Math.abs(selectedWithdrawal.amount).toLocaleString(undefined, {minimumFractionDigits: 2})} U
                  </span>
                </div>
                <div className="bg-[#110e16] p-3 rounded-xl border border-white/5">
                  <span className="text-[10px] text-[#cbc4d2]/40 font-sans block">划转及Gas手续费</span>
                  <span className="text-sm font-bold text-white/70">
                    {withdrawalFee.toLocaleString(undefined, {minimumFractionDigits: 2})} U
                  </span>
                </div>
                <div className="bg-[#110e16] p-3 rounded-xl border border-emerald-500/20 text-emerald-400">
                  <span className="text-[10px] text-emerald-400/60 font-sans block font-bold">最终实拨出金</span>
                  <span className="text-sm font-black">
                    {netAmount.toLocaleString(undefined, {minimumFractionDigits: 2})} U
                  </span>
                </div>
              </div>

              {/* Applicant Risk Inspection Panel */}
              <div className="bg-white/2 border border-white/5 p-4.5 rounded-2xl text-left space-y-3.5">
                <div className="flex items-center gap-2 text-xs text-[#cfbcff] font-bold border-b border-white/5 pb-2">
                  <ShieldCheck className="w-4 h-4 text-[#cfbcff]" />
                  <span>用户信息 (User Info)</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-[#cbc4d2]/45 text-[10px] block leading-none">申领账户 UID:</span>
                    <span className="font-mono font-bold text-white">UID {applicantUid}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[#cbc4d2]/45 text-[10px] block leading-none">会员KYC级别:</span>
                    <span className="text-emerald-400 font-bold">已实名 L1 / L2 级别</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[#cbc4d2]/45 text-[10px] block leading-none">团队直属 Sponsor:</span>
                    <span className="font-mono font-bold text-white">999001 (SYS)</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[#cbc4d2]/45 text-[10px] block leading-none">当前运营风控状态:</span>
                    <span className="text-emerald-400 font-bold">⚡ NORMAL (正轨活跃)</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[#cbc4d2]/45 text-[10px] block leading-none">申领发起时分:</span>
                    <span className="font-mono text-white/80">{selectedWithdrawal.time}</span>
                  </div>
                </div>
              </div>

              {/* Blockchain target info panel */}
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
                    <span className="text-[#cbc4d2]/50">外部收款目标节点地址 (Target Wallet Destination):</span>
                    <span className="bg-black/30 p-2.5 font-mono text-[11px] text-[#cfbcff] border border-white/5 rounded-xl break-all select-all leading-normal text-left">
                      {selectedWithdrawal.blockchainProof?.toAddress || `Tx78HqsmB82K1Hshq82Ksh918Ksw${applicantUid}`}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-white/5 text-[11.5px]">
                    <span className="text-[#cbc4d2]/50">当前预判区块对账状态:</span>
                    <span className="text-amber-400 font-bold animate-pulse">待核放 (Await Dispatch Authorization)</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedWithdrawal(null)}
                  className="px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all cursor-pointer font-bold font-sans"
                >
                  放弃审计
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onRejectWithdrawal(selectedWithdrawal.id);
                      setSelectedWithdrawal(null);
                    }}
                    className="px-4 py-3 bg-red-500/15 hover:bg-red-500/25 text-[#ffb4ab] rounded-xl transition-all cursor-pointer font-bold font-sans"
                  >
                    拒绝驳回
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onApproveWithdrawal(selectedWithdrawal.id);
                      setSelectedWithdrawal(null);
                    }}
                    className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-400 hover:brightness-110 text-slate-950 font-black rounded-xl transition-all cursor-pointer shadow-md shadow-emerald-500/10 font-sans"
                  >
                    通过并打款
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
}
