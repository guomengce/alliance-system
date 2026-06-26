import { Button, Tag } from 'antd';
import { AnimatePresence, motion } from 'motion/react';
import { Copy, Info, X } from 'lucide-react';
import type { TransactionDetailsModalProps } from '../types';
import { getNormalizedTypeLabel } from '../utils';

const getStatusClassName = (status: string) => {
  if (status === 'success') return 'is-success';
  if (status === 'pending') return 'is-pending';
  if (status === 'locked') return 'is-warning';
  return 'is-danger';
};

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
            <Button
              type="text"
              icon={<X className="w-5 h-5" />}
              onClick={onClose}
              className="alliance-antd-wallet-modal-close absolute right-4 top-4"
            />

            <h3 className="text-sm sm:text-base font-bold text-white mb-5 sm:mb-6 uppercase tracking-wider flex items-center gap-2 font-sans">
              <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#cfbcff]" />
              交易详单 (Transaction Details)
            </h3>

            <div className="space-y-4">
              <div className="bg-[#100d14] rounded-xl p-3 border border-white/5">
                <span className="text-xs text-[#cbc4d2]/40 font-bold uppercase tracking-wide block">交易订单编号 (Order ID)</span>
                <div className="flex items-center justify-between gap-1 mt-1">
                  <span className="font-mono text-xs text-[#cfbcff] font-bold select-all break-all mr-2">
                    {selectedTxn.id}
                  </span>
                  <Button
                    icon={<Copy className="w-2.5 h-2.5" />}
                    onClick={() => onCopyTransactionId(selectedTxn.id, 2000)}
                    className="alliance-antd-wallet-copy-button"
                  >
                    {copySuccessId === selectedTxn.id ? '已复制' : '复制'}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-[#cbc4d2]/40 font-bold uppercase tracking-wide block">账单类型</span>
                  <span className="text-xs sm:text-sm font-bold text-white block mt-1">{getNormalizedTypeLabel(selectedTxn.type, selectedTxn.typeLabel)}</span>
                </div>
                <div>
                  <span className="text-xs text-[#cbc4d2]/40 font-bold uppercase tracking-wide block">交易状态</span>
                  <Tag className={`alliance-antd-wallet-status-tag mt-1 ${getStatusClassName(selectedTxn.status)}`}>
                    {selectedTxn.statusLabel || selectedTxn.status}
                  </Tag>
                </div>
                <div>
                  <span className="text-xs text-[#cbc4d2]/40 font-bold uppercase tracking-wide block">资金变动金额</span>
                  <span className={`text-sm sm:text-base font-mono font-black block mt-1 ${selectedTxn.amount > 0 ? 'text-[#00e676]' : 'text-[#ffb4ab]'}`}>
                    {selectedTxn.amount > 0 ? '+' : ''}{selectedTxn.amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })} {selectedTxn.currency}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[#cbc4d2]/40 font-bold uppercase tracking-wide block">创建时间</span>
                  <span className="text-xs font-mono text-white/70 block mt-1">{selectedTxn.time}</span>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4">
                <span className="text-xs text-[#cbc4d2]/40 font-bold uppercase tracking-wide block">业务日志详情 (Log Notes)</span>
                <p className="text-xs text-white/80 leading-relaxed mt-1 bg-white/2 p-2.5 rounded-lg border border-white/5">{selectedTxn.desc}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={onClose} className="alliance-antd-wallet-modal-secondary">
                我知道了
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
