import { Button, Space, Table, Tag, type TableColumnsType } from 'antd';
import { Eye } from 'lucide-react';

import type { ListViewProps, OrderDetail } from '../../types';

type AntdOrdersTableProps = Omit<ListViewProps, 'exportMockCSV'>;

function OrderStatusTag({ status }: { status: OrderDetail['status'] }) {
  if (status === 'confirmed') {
    return <Tag className="alliance-antd-tag alliance-antd-tag-success">完成/已交割</Tag>;
  }

  if (status === 'pending') {
    return <Tag className="alliance-antd-tag alliance-antd-tag-warning animate-pulse">待审核入账</Tag>;
  }

  return <Tag className="alliance-antd-tag alliance-antd-tag-danger">已中止作废</Tag>;
}

export default function AntdOrdersTable({
  orders,
  setSelectedOrder,
  setDetailSearchQuery,
  onConfirmOrderArrival,
  onCancelOrder,
}: AntdOrdersTableProps) {
  const openOrderDetail = (order: OrderDetail) => {
    setSelectedOrder(order);
    setDetailSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const columns: TableColumnsType<OrderDetail> = [
    {
      title: '订单编号 (Tx ID)',
      dataIndex: 'id',
      key: 'id',
      render: (id: OrderDetail['id']) => (
        <span className="font-bold text-white font-mono">{id}</span>
      ),
    },
    {
      title: '会员 UID',
      dataIndex: 'uid',
      key: 'uid',
      render: (uid: OrderDetail['uid']) => (
        <span className="text-[#cbc4d2]/80 font-mono">{uid}</span>
      ),
    },
    {
      title: '认购理财规格',
      dataIndex: 'planName',
      key: 'planName',
      render: (planName: OrderDetail['planName']) => (
        <span className="font-sans text-white font-bold">{planName}</span>
      ),
    },
    {
      title: '认购金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: OrderDetail['amount']) => (
        <span className="text-emerald-400 font-extrabold font-mono">
          USDT {amount.toLocaleString()}
        </span>
      ),
    },
    {
      title: '到账结算时间',
      dataIndex: 'time',
      key: 'time',
      render: (time: OrderDetail['time']) => (
        <span className="text-[#cbc4d2]/50 font-mono">{time}</span>
      ),
    },
    {
      title: '状态说明',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status: OrderDetail['status']) => <OrderStatusTag status={status} />,
    },
    {
      title: '操作',
      key: 'detail',
      align: 'center',
      render: (_, order) => (
        <Button
          className="alliance-antd-action-button"
          icon={<Eye className="w-3.5 h-3.5" />}
          size="small"
          onClick={() => openOrderDetail(order)}
        >
          查看详情
        </Button>
      ),
    },
    {
      title: '审核处理',
      key: 'actions',
      align: 'right',
      render: (_, order) => {
        if (order.status === 'pending') {
          return (
            <Space size={6}>
              <Button
                className="alliance-antd-mini-button alliance-antd-mini-button-success"
                size="small"
                onClick={() => onConfirmOrderArrival(order.id)}
              >
                确认到账
              </Button>
              <Button
                className="alliance-antd-mini-button alliance-antd-mini-button-danger"
                size="small"
                onClick={() => onCancelOrder(order.id)}
              >
                驳回
              </Button>
            </Space>
          );
        }

        if (order.status === 'confirmed') {
          return (
            <span className="text-xs text-emerald-400/60 font-bold font-sans">
              已交割锁证已存证
            </span>
          );
        }

        return <span className="text-xs text-white/30 font-sans">链上中断</span>;
      },
    },
  ];

  return (
    <div className="hidden md:block overflow-x-auto border border-white/5 rounded-2xl bg-[#1c1825]/40 p-1">
      <Table<OrderDetail>
        className="alliance-antd-table alliance-antd-orders-table"
        columns={columns}
        dataSource={orders}
        pagination={false}
        rowKey="id"
      />
    </div>
  );
}
