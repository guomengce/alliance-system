import { AnimatePresence, motion } from 'motion/react';
import { Lock, X } from 'lucide-react';
import type { DetailModalProps } from '../types';

export default function OrderDetailModal({ selectedDetailOrder, onClose }: DetailModalProps) {
  if (!selectedDetailOrder) return null;

  const detailProgressPercent =
    selectedDetailOrder.originalLock > 0
      ? Math.round((selectedDetailOrder.released / selectedDetailOrder.originalLock) * 100)
      : 0;

  return (
    <AnimatePresence>
      {selectedDetailOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative bg-[#15121b] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[85vh] z-10"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8a6eff] via-[#cfbcff] to-[#e8ddff]" />

            <div className="p-5 border-b border-white/5 flex justify-between items-start">
              <div className="space-y-1 pr-6">
                <span className="text-xs font-bold text-[#cfbcff] uppercase tracking-widest font-mono">
                  ORDER DETAIL BREAKDOWN
                </span>
                <h3 className="text-white text-[15px] font-black tracking-tight leading-relaxed">
                  {selectedDetailOrder.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-[#cbc4d2]/40 font-mono">
                    订单ID: {selectedDetailOrder.id}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  {selectedDetailOrder.status === 'released' && (
                    <span className="text-xs font-bold text-emerald-400">已全部解锁并买入</span>
                  )}
                  {selectedDetailOrder.status === 'partially_released' && (
                    <span className="text-xs font-bold text-[#cfbcff]">部分解锁</span>
                  )}
                  {selectedDetailOrder.status === 'queueing' && (
                    <span className="text-xs font-bold text-amber-400">排队等待解锁</span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1 px-1.5 rounded-lg bg-white/5 text-[#cbc4d2]/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-5 scrollbar-thin">
              <div className="grid grid-cols-2 gap-3 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-[#cbc4d2]/40 uppercase tracking-widest block">认购方案金额</span>
                  <span className="text-white font-mono font-black text-sm">
                    ¥ {selectedDetailOrder.amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-[#cbc4d2]/40 uppercase tracking-widest block font-mono">排队锁定金额 (31%)</span>
                  <span className="text-[#cbc4d2]/80 font-mono font-bold text-sm">
                    ¥ {selectedDetailOrder.originalLock.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="space-y-0.5 pt-1.5 border-t border-white/[0.03]">
                  <span className="text-xs font-bold text-[#cbc4d2]/40 uppercase tracking-widest block">已解锁并买入额</span>
                  <span className="text-[#cfbcff] font-mono font-black text-sm">
                    ¥ {selectedDetailOrder.released.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="space-y-0.5 pt-1.5 border-t border-white/[0.03]">
                  <span className="text-xs font-bold text-amber-400/60 uppercase tracking-widest block">剩余排队锁定中</span>
                  <span className="text-amber-400 font-mono font-black text-sm">
                    ¥ {selectedDetailOrder.remainingLock.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[#cbc4d2]/50">解锁买入比例 (UNLOCK RATIO)</span>
                  <span className="text-[#cfbcff] font-mono">{detailProgressPercent}%</span>
                </div>
                <div className="w-full bg-[#100d14] rounded-full h-2 overflow-hidden border border-white/[0.02]">
                  <div
                    className="bg-gradient-to-r from-[#8a6eff] to-[#cfbcff] h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${detailProgressPercent}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-[#cbc4d2]/50 uppercase tracking-widest block border-b border-white/5 pb-1.5 font-mono">
                  每一笔解锁流水：10% 锁定额度解套流水 (UNLOCKED LOGS)
                </h4>

                {selectedDetailOrder.unlockHistory && selectedDetailOrder.unlockHistory.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDetailOrder.unlockHistory.map((subLog) => (
                      <div
                        key={subLog.id}
                        className="bg-[#120f18]/90 p-3 rounded-xl border border-white/5 space-y-2 relative overflow-hidden group hover:border-[#cfbcff]/20 transition-all"
                      >
                        <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#cfbcff]/40 animate-pulse group-hover:bg-[#cfbcff]" />

                        <div className="flex justify-between items-center text-xs text-[#cbc4d2]/40 font-mono pr-4">
                          <span className="font-semibold text-white/50">流水记录 ID: {subLog.id}</span>
                          <span>{subLog.time}</span>
                        </div>

                        <p className="text-white/80 text-xs leading-relaxed">
                          {subLog.triggerSource}
                        </p>

                        <div className="flex justify-between items-center mt-1 text-xs bg-white/[0.03] px-2.5 py-1 rounded-lg font-mono">
                          <span className="text-emerald-400 font-bold">已解锁 ¥{subLog.unlockedAmount.toFixed(2)}</span>
                          <span className="text-[#cfbcff] font-bold">买入增持: +{subLog.trooBought.toLocaleString()} TROO</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-[#100d14]/50 border border-dashed border-white/5 rounded-xl text-[#cbc4d2]/30 text-xs font-medium space-y-1">
                    <Lock className="w-5 h-5 mx-auto text-[#cbc4d2]/20" />
                    <p>暂无解锁动作明细</p>
                    <p className="text-xs text-[#cbc4d2]/20 scale-95 font-mono">WAITING L1 REFERRALS DISPATCH EVENT...</p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-white/[0.01] border-t border-white/5 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-[#cfbcff] text-[#100d14] text-xs font-black rounded-lg hover:bg-white transition-all cursor-pointer shadow-lg font-bold"
              >
                关闭详情窗口 (CLOSE)
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
