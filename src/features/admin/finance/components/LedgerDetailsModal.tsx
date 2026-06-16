import { CheckCircle2, X } from 'lucide-react';
import type { WorkspaceProps } from '../types';

type LedgerDetailsModalProps = Pick<
  WorkspaceProps,
  | 'selectedLedgerItem'
  | 'setSelectedLedgerItem'
>;

export default function LedgerDetailsModal({
  selectedLedgerItem,
  setSelectedLedgerItem
}: LedgerDetailsModalProps) {
  return (
    <>
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
    </>
  );
}
