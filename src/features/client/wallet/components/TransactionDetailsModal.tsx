import { AnimatePresence, motion } from 'motion/react';
import { Copy, Info, X } from 'lucide-react';
import type { TransactionDetailsModalProps } from '../types';
import { getNormalizedTypeLabel } from '../utils';

export default function TransactionDetailsModal({
  selectedTxn,
  copySuccessId,
  onClose,
  onCopyTransactionId
}: TransactionDetailsModalProps) {
  return (
    <AnimatePresence>
      {selectedTxn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 w-full max-w-md bg-[#16131c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-5 sm:p-6 text-left"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-white/50 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-sm sm:text-base font-bold text-white mb-5 sm:mb-6 uppercase tracking-wider flex items-center gap-2 font-sans">
              <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#cfbcff]" />
              交易详单 (Transaction Details)
            </h3>

            <div className="space-y-4">
              <div className="bg-[#100d14] rounded-xl p-3 border border-white/5">
                <span className="text-xs sm:text-xs text-[#cbc4d2]/40 font-bold uppercase tracking-wide block">交易订单编号 (Order ID)</span>
                <div className="flex items-center justify-between gap-1 mt-1">
                  <span className="font-mono text-xs sm:text-xs text-[#cfbcff] font-bold select-all break-all mr-2">
                    {selectedTxn.id}
                  </span>
                  <button
                    onClick={() => onCopyTransactionId(selectedTxn.id, 2000)}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-black uppercase bg-[#cfbcff]/15 hover:bg-[#cfbcff]/25 text-[#cfbcff] rounded border border-[#cfbcff]/15 transition-all cursor-pointer"
                  >
                    <Copy className="w-2.5 h-2.5" />
                    {copySuccessId === selectedTxn.id ? '已复制' : '复制'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs sm:text-xs text-[#cbc4d2]/40 font-bold uppercase tracking-wide block">账单类型</span>
                  <span className="text-xs sm:text-sm font-bold text-white block mt-1">{getNormalizedTypeLabel(selectedTxn.type, selectedTxn.typeLabel)}</span>
                </div>
                <div>
                  <span className="text-xs sm:text-xs text-[#cbc4d2]/40 font-bold uppercase tracking-wide block">交易状态</span>
                  <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs sm:text-xs font-extrabold capitalize ${
                    selectedTxn.status === 'success' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/30' :
                    selectedTxn.status === 'pending' ? 'bg-[#cfbcff]/10 text-[#cfbcff] border border-[#cfbcff]/20' :
                    selectedTxn.status === 'locked' ? 'bg-amber-950/40 text-amber-400 border border-amber-800/30' :
                    'bg-rose-950/40 text-rose-400 border border-rose-800/30'
                  }`}>
                    {selectedTxn.statusLabel || selectedTxn.status}
                  </span>
                </div>
                <div>
                  <span className="text-xs sm:text-xs text-[#cbc4d2]/40 font-bold uppercase tracking-wide block">资金变动金额</span>
                  <span className={`text-sm sm:text-base font-mono font-black block mt-1 ${selectedTxn.amount > 0 ? 'text-[#00e676]' : 'text-[#ffb4ab]'}`}>
                    {selectedTxn.amount > 0 ? '+' : ''}{selectedTxn.amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })} {selectedTxn.currency}
                  </span>
                </div>
                <div>
                  <span className="text-xs sm:text-xs text-[#cbc4d2]/40 font-bold uppercase tracking-wide block">创建时间</span>
                  <span className="text-xs sm:text-xs font-mono text-white/70 block mt-1">{selectedTxn.time}</span>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4">
                <span className="text-xs sm:text-xs text-[#cbc4d2]/40 font-bold uppercase tracking-wide block">业务日志详情 (Log Notes)</span>
                <p className="text-xs sm:text-xs text-white/80 leading-relaxed mt-1 bg-white/2 p-2.5 rounded-lg border border-white/5">{selectedTxn.desc}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="bg-[#211f24] hover:bg-white/5 text-white border border-white/10 hover:border-white/20 px-5 py-2 rounded-xl text-xs font-semibold tracking-wider transition-colors"
              >
                我知道了
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
