import { AnimatePresence, motion } from 'motion/react';
import { ChevronRight, Filter, Lock, Search, X } from 'lucide-react';
import type { OrdersPanelProps, OrderStatusFilter } from '../types';

const STATUS_FILTERS: Array<{ id: OrderStatusFilter; label: string }> = [
  { id: 'all', label: '全部' },
  { id: 'queueing', label: '排队中' },
  { id: 'partially_released', label: '部分解锁' },
  { id: 'released', label: '已完成' }
];

export default function OrdersList({
  filteredOrders,
  orderSearchQuery,
  orderStatusFilter,
  visibleOrdersCount,
  loadingMoreOrders,
  selectedDetailOrder,
  onOrdersScroll,
  onSearchChange,
  onClearSearch,
  onStatusFilterChange,
  onSelectDetailOrder,
  onCloseDetailOrder,
  onLoadMoreOrders
}: OrdersPanelProps) {
  return (
    <div className="lg:col-span-2 space-y-4">
      <div className="glass-card rounded-2xl overflow-hidden bg-[#16131c]">
        <div className="p-5 border-b border-white/5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h4 className="text-sm font-semibold text-white tracking-wider flex items-center gap-2">
              排队订单列表 <span className="text-[11px] font-mono text-[#cbc4d2]/40 font-normal">({filteredOrders.length} 个订单)</span>
            </h4>

            <div className="relative w-full sm:w-64">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#cbc4d2]/40">
                <Search className="w-3.5 h-3.5" />
              </span>
              <input
                type="text"
                placeholder="按订单号或理财套餐搜索..."
                value={orderSearchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-[#100d14] border border-white/5 rounded-xl pl-8 pr-7 py-2 text-[11px] text-white placeholder-[#cbc4d2]/30 focus:outline-none focus:border-[#cfbcff]/50 transition-colors"
              />
              {orderSearchQuery && (
                <button
                  onClick={onClearSearch}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#cbc4d2]/40 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap bg-[#100d14] p-1 rounded-xl border border-white/5 gap-1 self-start">
            {STATUS_FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => onStatusFilterChange(filter.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${orderStatusFilter === filter.id ? 'bg-[#cfbcff] text-[#100d14]' : 'text-[#cbc4d2]/60 hover:text-white'}`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div
          onScroll={onOrdersScroll}
          className="p-5 max-h-[660px] overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-white/10 space-y-4"
        >
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 space-y-2">
              <Filter className="w-8 h-8 text-[#cbc4d2]/20 mx-auto" strokeWidth={1.5} />
              <p className="text-[#cbc4d2]/40 text-xs">没有匹配到符合筛选条件的订单记录</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredOrders.slice(0, visibleOrdersCount).map((item) => {
                  const percentComplete = item.originalLock > 0 ? Math.round((item.released / item.originalLock) * 100) : 0;
                  return (
                    <div
                      key={item.id}
                      className="relative bg-[#1c1924]/60 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-lg group overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/[0.02] to-transparent pointer-events-none rounded-tr-2xl"></div>

                      <div className="flex items-start justify-between gap-3 relative z-10">
                        <div className="min-w-0">
                          <h5 className="font-extrabold text-sm text-white tracking-wide group-hover:text-[#cfbcff] transition-colors truncate">
                            {item.name}
                          </h5>
                          <p className="text-[10px] text-[#cbc4d2]/30 font-mono mt-1">
                            订单编号 ID: <span className="text-[#cbc4d2]/50">{item.id}</span>
                          </p>
                        </div>
                        <div className="shrink-0">
                          {item.status === 'released' && (
                            <span className="inline-flex items-center px-2.5 py-0.5 bg-emerald-950/50 text-emerald-400 border border-emerald-500/25 rounded-full text-[10px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5"></span>
                              {item.statusLabel}
                            </span>
                          )}
                          {item.status === 'partially_released' && (
                            <span className="inline-flex items-center px-2.5 py-0.5 bg-[#cfbcff]/15 text-[#cfbcff] border border-[#cfbcff]/30 rounded-full text-[10px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#cfbcff] animate-pulse mr-1.5"></span>
                              {item.statusLabel}
                            </span>
                          )}
                          {item.status === 'queueing' && (
                            <span className="inline-flex items-center px-2.5 py-0.5 bg-amber-950/50 text-amber-400 border border-amber-500/25 rounded-full text-[10px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse mr-1.5"></span>
                              {item.statusLabel}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-2 border-t border-b border-white/5 py-3 relative z-10">
                        <div>
                          <span className="text-[#cbc4d2]/40 text-[9px] font-bold uppercase tracking-wider block">认购方案金额</span>
                          <span className="text-white font-mono font-black text-sm block mt-0.5">
                            ¥ {item.amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#cbc4d2]/40 text-[9px] font-bold uppercase tracking-wider block">排队锁定金额 (31%)</span>
                          <span className="text-[#cbc4d2]/80 font-mono font-semibold text-sm block mt-0.5">
                            ¥ {item.originalLock.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#cbc4d2]/40 text-[9px] font-bold uppercase tracking-wider block">已解锁并买入</span>
                          <span className="text-[#cfbcff] font-mono font-black text-sm block mt-0.5">
                            ¥ {item.released.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div>
                          <span className="text-amber-400/60 text-[9px] font-bold uppercase tracking-wider block">剩余锁定中</span>
                          <span className="text-amber-400 font-mono font-black text-sm block mt-0.5">
                            ¥ {item.remainingLock.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5 relative z-10">
                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span className="text-[#cbc4d2]/50">解锁买入进度 (Unlock Ratio)</span>
                          <span className="text-white font-mono">{percentComplete}%</span>
                        </div>
                        <div className="w-full bg-[#100d14] rounded-full h-2 overflow-hidden border border-white/[0.02]">
                          <div
                            className="bg-gradient-to-r from-[#8a6eff] to-[#cfbcff] h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${percentComplete}%` }}
                          />
                        </div>
                      </div>

                      <div className="pt-2.5 border-t border-white/5 flex justify-between items-center relative z-10">
                        <span className="text-[10px] text-[#cbc4d2]/30 font-bold uppercase font-mono">
                          UNLOCK HISTORY ({item.unlockHistory?.length || 0})
                        </span>
                        <button
                          type="button"
                          onClick={() => onSelectDetailOrder(item)}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#cfbcff] hover:text-[#e5d5ff] hover:underline transition-colors cursor-pointer"
                        >
                          查看明细
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {loadingMoreOrders && (
                <div className="flex items-center justify-center py-4 gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#cfbcff] animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-[#cfbcff] animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#cfbcff] animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-[10px] text-[#cbc4d2]/45 font-mono font-bold uppercase tracking-wider ml-1">链上计算同步中...</span>
                </div>
              )}

              {!loadingMoreOrders && visibleOrdersCount < filteredOrders.length && (
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={onLoadMoreOrders}
                    className="text-[10px] font-bold text-[#cfbcff]/50 hover:text-[#cfbcff] font-mono tracking-wider transition-colors cursor-pointer py-2 px-4 rounded-xl border border-white/5 bg-white/[0.01]"
                  >
                    向下滚动或点击加载更多 (LOAD MORE)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedDetailOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseDetailOrder}
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
                  <span className="text-[10px] font-bold text-[#cfbcff] uppercase tracking-widest font-mono">
                    ORDER DETAIL BREAKDOWN
                  </span>
                  <h3 className="text-white text-[15px] font-black tracking-tight leading-relaxed">
                    {selectedDetailOrder.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-[#cbc4d2]/40 font-mono">
                      订单ID: {selectedDetailOrder.id}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    {selectedDetailOrder.status === 'released' && (
                      <span className="text-[10px] font-bold text-emerald-400">已全部解锁并买入</span>
                    )}
                    {selectedDetailOrder.status === 'partially_released' && (
                      <span className="text-[10px] font-bold text-[#cfbcff]">部分解锁中</span>
                    )}
                    {selectedDetailOrder.status === 'queueing' && (
                      <span className="text-[10px] font-bold text-amber-400">排队等待解锁</span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onCloseDetailOrder}
                  className="p-1 px-1.5 rounded-lg bg-white/5 text-[#cbc4d2]/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 overflow-y-auto space-y-5 scrollbar-thin">
                <div className="grid grid-cols-2 gap-3 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-[#cbc4d2]/40 uppercase tracking-widest block">认购方案金额</span>
                    <span className="text-white font-mono font-black text-sm">
                      ¥ {selectedDetailOrder.amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-[#cbc4d2]/40 uppercase tracking-widest block font-mono">排队锁定金额 (31%)</span>
                    <span className="text-[#cbc4d2]/80 font-mono font-bold text-sm">
                      ¥ {selectedDetailOrder.originalLock.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="space-y-0.5 pt-1.5 border-t border-white/[0.03]">
                    <span className="text-[9px] font-bold text-[#cbc4d2]/40 uppercase tracking-widest block">已解锁并买入额</span>
                    <span className="text-[#cfbcff] font-mono font-black text-sm">
                      ¥ {selectedDetailOrder.released.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="space-y-0.5 pt-1.5 border-t border-white/[0.03]">
                    <span className="text-[9px] font-bold text-amber-400/60 uppercase tracking-widest block">剩余排队锁定中</span>
                    <span className="text-amber-400 font-mono font-black text-sm">
                      ¥ {selectedDetailOrder.remainingLock.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-[#cbc4d2]/50">解锁买入比例 (UNLOCK RATIO)</span>
                    <span className="text-[#cfbcff] font-mono">
                      {selectedDetailOrder.originalLock > 0
                        ? Math.round((selectedDetailOrder.released / selectedDetailOrder.originalLock) * 100)
                        : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-[#100d14] rounded-full h-2 overflow-hidden border border-white/[0.02]">
                    <div
                      className="bg-gradient-to-r from-[#8a6eff] to-[#cfbcff] h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${selectedDetailOrder.originalLock > 0
                          ? Math.round((selectedDetailOrder.released / selectedDetailOrder.originalLock) * 100)
                          : 0}%`
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <h4 className="text-[11px] font-bold text-[#cbc4d2]/50 uppercase tracking-widest block border-b border-white/5 pb-1.5 font-mono">
                    每一笔解锁明细 10% 锁定额度解套流水 (UNLOCKED LOGS)
                  </h4>

                  {selectedDetailOrder.unlockHistory && selectedDetailOrder.unlockHistory.length > 0 ? (
                    <div className="space-y-3">
                      {selectedDetailOrder.unlockHistory.map((subLog) => (
                        <div
                          key={subLog.id}
                          className="bg-[#120f18]/90 p-3 rounded-xl border border-white/5 space-y-2 relative overflow-hidden group hover:border-[#cfbcff]/20 transition-all"
                        >
                          <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#cfbcff]/40 animate-pulse group-hover:bg-[#cfbcff]" />

                          <div className="flex justify-between items-center text-[10px] text-[#cbc4d2]/40 font-mono pr-4">
                            <span className="font-semibold text-white/50">流水流水号 ID: {subLog.id}</span>
                            <span>{subLog.time}</span>
                          </div>

                          <p className="text-white/80 text-[11px] leading-relaxed">
                            {subLog.triggerSource}
                          </p>

                          <div className="flex justify-between items-center mt-1 text-[10px] bg-white/[0.03] px-2.5 py-1 rounded-lg font-mono">
                            <span className="text-emerald-400 font-bold">已解锁: ¥{subLog.unlockedAmount.toFixed(2)}</span>
                            <span className="text-[#cfbcff] font-bold">买入增持: +{subLog.trooBought.toLocaleString()} TROO</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-[#100d14]/50 border border-dashed border-white/5 rounded-xl text-[#cbc4d2]/30 text-xs font-medium space-y-1">
                      <Lock className="w-5 h-5 mx-auto text-[#cbc4d2]/20" />
                      <p>暂无解锁动作明细</p>
                      <p className="text-[10px] text-[#cbc4d2]/20 scale-95 font-mono">WAITING L1 REFERRALS DISPATCH EVENT...</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-white/[0.01] border-t border-white/5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onCloseDetailOrder}
                  className="px-4 py-2 bg-[#cfbcff] text-[#100d14] text-[11px] font-black rounded-lg hover:bg-white transition-all cursor-pointer shadow-lg font-bold"
                >
                  关闭详情窗口 (CLOSE)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
