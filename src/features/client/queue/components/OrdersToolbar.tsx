import type { OrderStatusFilter } from '../types';
import { Search, X } from 'lucide-react';
import type { OrdersToolbarProps } from '../types';

const STATUS_FILTERS: Array<{ id: OrderStatusFilter; label: string }> = [
  { id: 'all', label: '全部' },
  { id: 'queueing', label: '排队�? },
  { id: 'partially_released', label: '部分解锁' },
  { id: 'released', label: '已完�? }
];

export default function OrdersToolbar({
  filteredOrdersCount,
  orderSearchQuery,
  orderStatusFilter,
  onSearchChange,
  onClearSearch,
  onStatusFilterChange
}: OrdersToolbarProps) {
  return (
    <div className="p-5 border-b border-white/5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h4 className="text-sm font-semibold text-white tracking-wider flex items-center gap-2">
          排队订单列表 <span className="text-[11px] font-mono text-[#cbc4d2]/40 font-normal">({filteredOrdersCount} 个订�?</span>
        </h4>

        <div className="relative w-full sm:w-64">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#cbc4d2]/40">
            <Search className="w-3.5 h-3.5" />
          </span>
          <input
            type="text"
            placeholder="按订单号或理财套餐搜�?.."
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
  );
}
