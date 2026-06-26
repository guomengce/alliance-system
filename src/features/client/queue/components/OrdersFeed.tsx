import { Fragment } from 'react';
import { Filter } from 'lucide-react';
import type { OrdersFeedProps } from '../types';
import OrderCard from './OrderCard';

export default function OrdersFeed({
  filteredOrders,
  visibleOrdersCount,
  loadingMoreOrders,
  onOrdersScroll,
  onSelectDetailOrder,
  onLoadMoreOrders
}: OrdersFeedProps) {
  return (
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
            {filteredOrders.slice(0, visibleOrdersCount).map((item) => (
              <Fragment key={item.id}>
                <OrderCard item={item} onSelectDetailOrder={onSelectDetailOrder} />
              </Fragment>
            ))}
          </div>

          {loadingMoreOrders && (
            <div className="flex items-center justify-center py-4 gap-2">
              <span className="w-2 h-2 rounded-full bg-[#cfbcff] animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-[#cfbcff] animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-[#cfbcff] animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-xs text-[#cbc4d2]/45 font-mono font-bold uppercase tracking-wider ml-1">链上计算同步中...</span>
            </div>
          )}

          {!loadingMoreOrders && visibleOrdersCount < filteredOrders.length && (
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={onLoadMoreOrders}
                className="text-xs font-bold text-[#cfbcff]/50 hover:text-[#cfbcff] font-mono tracking-wider transition-colors cursor-pointer py-2 px-4 rounded-xl border border-white/5 bg-white/[0.01]"
              >
                向下滚动或点击加载更多 (LOAD MORE)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
