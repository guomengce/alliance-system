import { Input, Segmented } from 'antd';
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
  onStatusFilterChange
}: OrdersToolbarProps) {
  return (
    <div className="p-5 border-b border-white/5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
        <h4 className="text-sm font-semibold text-white tracking-wider flex items-center gap-2 shrink-0">
          排队订单列表 <span className="text-xs font-mono text-[#cbc4d2]/40 font-normal">({filteredOrdersCount} 个订单)</span>
        </h4>

        <div className="flex flex-col gap-3 md:flex-row md:items-center xl:flex-1 xl:justify-end">
          <Input.Search
            allowClear
            className="alliance-antd-queue-search w-full md:w-[420px] xl:w-[520px] xl:max-w-[520px]"
            onChange={(event) => onSearchChange(event.target.value)}
            onSearch={onSearchChange}
            placeholder="按订单号或理财套餐搜索..."
            value={orderSearchQuery}
          />

          <Segmented<OrderStatusFilter>
            className="alliance-antd-queue-filter shrink-0"
            options={STATUS_FILTERS}
            value={orderStatusFilter}
            onChange={onStatusFilterChange}
          />
        </div>
      </div>
    </div>
  );
}
