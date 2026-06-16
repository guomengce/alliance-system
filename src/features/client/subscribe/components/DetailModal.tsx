import { AnimatePresence, motion } from 'motion/react';
import { PlayCircle, X } from 'lucide-react';
import type { WorkspaceProps } from '../types';

type DetailModalProps = Pick<
  WorkspaceProps,
  | 'detailModalItem'
  | 'copiedId'
  | 'setDetailModalItem'
  | 'handleCopyText'
  | 'handleConfirmPurchase'
>;

export default function DetailModal({
  detailModalItem,
  copiedId,
  setDetailModalItem,
  handleCopyText,
  handleConfirmPurchase
}: DetailModalProps) {
  return (
    <>
      {/* Subscription Detail Modal Popup - UX interactive enhancement */}
      <AnimatePresence>
        {detailModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Background screen overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDetailModalItem(null)}
              className="absolute inset-0 bg-black/65 backdrop-blur-md"
            />

            {/* Modal Card content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[#211f24] border border-[#cfbcff]/20 rounded-2xl shadow-2xl p-5 sm:p-6 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <button 
                type="button" 
                onClick={() => setDetailModalItem(null)} 
                className="absolute right-4 top-4 text-white/50 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2.5 mb-5 select-none pb-2 border-b border-white/5">
                <PlayCircle className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#cfbcff]" />
                <h3 className="text-sm sm:text-base font-extrabold text-white tracking-wide uppercase">
                  {detailModalItem.isConfirmation ? '确认认购详情及协议' : '理财合约订单明细'}
                </h3>
              </div>

              <div className="space-y-4 text-[11px] sm:text-xs">
                {/* Visual Header Block */}
                <div className="bg-[#141218] p-3.5 sm:p-4 rounded-xl border border-white/5 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] sm:text-[10px] text-[#cbc4d2]/40 font-bold uppercase block">方案名称</span>
                    <span className="text-sm sm:text-base font-black text-white block mt-0.5">{detailModalItem.name} 专属合约</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] sm:text-[10px] text-[#cbc4d2]/40 font-bold uppercase block">当前状态</span>
                    <span className={`px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase mt-1 inline-block ${
                      detailModalItem.isConfirmation
                        ? 'bg-amber-950/40 text-amber-400 border border-amber-800/20'
                        : detailModalItem.statusType === 'success' || detailModalItem.status === '已完成'
                          ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/10' 
                          : detailModalItem.statusType === 'failed' || detailModalItem.status === '已取消'
                            ? 'bg-rose-950/40 text-rose-400 border border-rose-800/10'
                            : 'bg-[#6750a4]/30 text-[#cfbcff] border border-[#cfbcff]/20 animate-pulse'
                    }`}>
                      {detailModalItem.isConfirmation ? '待确认签署' : detailModalItem.status}
                    </span>
                  </div>
                </div>

                {/* Details Breakdown */}
                <div className="space-y-3 bg-white/3 p-3.5 sm:p-4 rounded-xl border border-white/5 text-[11px] sm:text-xs">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-[#cbc4d2]/70">交易订单识别号 (Order No.)</span>
                    <div className="flex items-center gap-1.5 font-mono text-white font-semibold flex-wrap justify-end">
                      <span className="text-[10px] sm:text-xs">{detailModalItem.id}</span>
                      <button
                        type="button"
                        onClick={() => handleCopyText(detailModalItem.id)}
                        className="p-1 bg-[#cfbcff]/15 hover:bg-[#cfbcff]/25 rounded text-[#cfbcff] cursor-pointer text-[9px] font-bold"
                      >
                        {copiedId === detailModalItem.id ? '已复制' : '复制'}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-white/5">
                    <span className="text-[#cbc4d2]/70">认购锁定金额</span>
                    <span className="text-xs sm:text-sm font-bold text-white font-mono">{detailModalItem.amount.toLocaleString()} USDT</span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-white/5">
                    <span className="text-[#cbc4d2]/70">充值方案赠送比</span>
                    <span className="text-xs sm:text-sm font-bold text-[#cfbcff] font-mono">{detailModalItem.giftRatio}%</span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-white/5">
                    <span className="text-[#cbc4d2]/70">买入TROO总数 (70%)</span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-400 font-mono">{(detailModalItem.troo).toLocaleString()} TROO</span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-white/5">
                    <span className="text-[#cbc4d2]/70">预计 31% 排队锁定款</span>
                    <span className="text-xs sm:text-sm font-bold text-[#e7c365] font-mono">{(detailModalItem.amount * 0.31).toLocaleString()} USDT</span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-white/5">
                    <span className="text-[#cbc4d2]/70">合约签署签署时间</span>
                    <span className="text-xs sm:text-sm text-white font-mono">{detailModalItem.date}</span>
                  </div>
                </div>

                {/* Progress Visual Release block */}
                <div className="bg-[#141218]/50 p-3.5 sm:p-4 rounded-xl border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-[9px] sm:text-[10px]">
                    <span className="text-[#cbc4d2]/60 uppercase font-bold">立即买入 TROO 比例</span>
                    <span className="font-bold font-mono text-[#cfbcff]">{detailModalItem.isConfirmation ? '100%' : `${detailModalItem.progress}%`}</span>
                  </div>
                  <div className="w-full bg-[#36343a] rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#6750a4] to-[#cfbcff] h-full" style={{ width: detailModalItem.isConfirmation ? '100%' : `${detailModalItem.progress}%` }}></div>
                  </div>
                  <p className="text-[9px] sm:text-[10px] text-[#cbc4d2]/50 italic leading-relaxed">
                    * 该理财参与协议通过系统进行订单买入操作。在30天投资锁定期后，全部收益与分红可随时提取。
                  </p>
                </div>
              </div>

              {/* Close or Action confirmation footer buttons */}
              <div className="mt-6 flex justify-end">
                {detailModalItem.isConfirmation ? (
                  <div className="flex gap-3 w-full">
                    <button 
                      type="button"
                      onClick={() => setDetailModalItem(null)}
                      className="flex-1 bg-white/5 hover:bg-white/10 text-[#cbc4d2] border border-white/5 py-2.5 sm:py-3 rounded-xl font-bold transition-all text-[11px] sm:text-xs cursor-pointer text-center"
                    >
                      取消返回
                    </button>
                    <button 
                      type="button"
                      onClick={handleConfirmPurchase}
                      className="flex-1 bg-gradient-to-r from-[#6750a4] to-[#cfbcff] text-white py-2.5 sm:py-3 rounded-xl font-black hover:brightness-110 active:scale-[0.98] transition-all text-[11px] sm:text-xs cursor-pointer shadow-lg shadow-black/20 text-center"
                    >
                      确认支付并认购
                    </button>
                  </div>
                ) : (
                  <button 
                    type="button"
                    onClick={() => setDetailModalItem(null)}
                    className="bg-[#cfbcff] text-[#381e72] px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold hover:brightness-110 active:scale-[0.98] transition-all text-[11px] sm:text-xs cursor-pointer shadow-md"
                  >
                    关闭窗口
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
