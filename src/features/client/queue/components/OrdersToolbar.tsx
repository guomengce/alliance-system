import { Button, Input, Segmented } from 'antd';
import { Search, X } from 'lucide-react';
import type { OrderStatusFilter, OrdersToolbarProps } from '../types';

const STATUS_FILTERS: Array<{ value: OrderStatusFilter; label: string }> = [
  { value: 'all', label: '全部' },
  { value: 'queueing', label: '排队中' },
  { value: 'partially_released', label: '部分解锁' },
  { value: 'released', label: '已完成' }
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
          排队订单列表 <span className="text-xs font-mono text-[#cbc4d2]/40 font-normal">({filteredOrdersCount} 个订单)</span>
        </h4>

        <Input
          className="alliance-antd-queue-search w-full sm:w-64"
          prefix={<Search className="w-3.5 h-3.5" />}
          suffix={
            orderSearchQuery ? (
              <Button
                type="text"
                icon={<X className="w-3.5 h-3.5" />}
                onClick={onClearSearch}
                className="!h-auto !w-auto !p-0 !text-[#cbc4d2]/40 hover:!text-white"
              />
            ) : null
          }
          placeholder="按订单号或理财套餐搜索..."
          value={orderSearchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <Segmented<OrderStatusFilter>
        className="alliance-antd-queue-filter"
        options={STATUS_FILTERS}
        value={orderStatusFilter}
        onChange={onStatusFilterChange}
      />
    </div>
  );
}
