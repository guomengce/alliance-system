import { Button, Table, Tag, type TableColumnsType } from 'antd';
import { ChevronRight } from 'lucide-react';
import type { HomeOrder, OrdersTableProps } from '../types';

const getStatusClassName = (statusType: HomeOrder['statusType']) => (
  statusType === 'pending' ? 'is-pending' : 'is-active'
);

export default function OrdersTable({
  orders,
  onNavigateToRoute,
  onQuickAction
}: OrdersTableProps) {
  const columns: TableColumnsType<HomeOrder> = [
    {
      title: '订单编号',
      dataIndex: 'id',
      key: 'id',
      render: (id: HomeOrder['id']) => <span className="alliance-antd-table-fontSize font-mono font-medium text-white/90">{id}</span>,
    },
    {
      title: '产品名称',
      dataIndex: 'name',
      key: 'name',
      render: (name: HomeOrder['name']) => <span className="alliance-antd-table-fontSize text-white font-semibold">{name}</span>,
    },
    {
      title: '金额 (USDT)',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: (amount: HomeOrder['amount']) => <span className="alliance-antd-table-fontSize font-bold text-white font-mono">{amount}</span>,
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      align: 'center',
      render: (date: HomeOrder['date']) => <span className="text-[#cbc4d2]/75 font-mono text-xs">{date}</span>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status: HomeOrder['status'], order) => (
        <Tag className={`alliance-antd-home-status ${getStatusClassName(order.statusType)}`}>
          {status}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      align: 'right',
      render: () => (
        <Button className="alliance-antd-link-button" onClick={() => onNavigateToRoute('subscribe')}>
          详情
        </Button>
      ),
    },
  ];

  return (
    <div className="glass-card rounded-2xl overflow-hidden shadow-xl">
      <div className="px-6 py-4 flex items-center justify-between border-b border-white/5">
        <h4 className="text-base font-bold text-white uppercase tracking-wider">我的订单 (My Orders)</h4>
        <Button
          className="alliance-antd-link-button"
          icon={<ChevronRight className="w-4 h-4" />}
          iconPosition="end"
          onClick={() => onQuickAction('orders')}
        >
          查看全部
        </Button>
      </div>

      <div className="hidden md:block overflow-x-auto scrollbar-hide">
        <Table<HomeOrder>
          className="alliance-antd-home-orders-table"
          columns={columns}
          dataSource={orders}
          pagination={false}
          rowKey="id"
        />
      </div>

      <div className="md:hidden divide-y divide-white/5 space-y-4 p-4 bg-[#1a1722]/30">
        {orders.map((order, index) => (
          <div key={order.id} className={`space-y-3 ${index > 0 ? 'pt-4' : ''}`}>
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-white text-sm">{order.name}</div>
                <div className="text-xs text-[#cbc4d2]/50 font-mono">#{order.id}</div>
              </div>
              <Tag className={`alliance-antd-home-status ${getStatusClassName(order.statusType)}`}>
                {order.status}
              </Tag>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-[#cbc4d2]/40 text-xs font-semibold font-mono">购买时间</p>
                <p className="text-white/80 font-mono mt-0.5">{order.date}</p>
              </div>
              <div>
                <p className="text-[#cbc4d2]/40 text-xs font-semibold text-right font-sans">方案金额</p>
                <p className="text-[#cfbcff] font-bold font-mono text-right mt-0.5">{order.amount}</p>
              </div>
            </div>

            <div className="text-right pt-2 border-t border-white/5">
              <Button className="alliance-antd-link-button" onClick={() => onNavigateToRoute('subscribe')}>
                详情
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
