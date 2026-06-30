import { Button, Table, Tag, type TableColumnsType } from 'antd';
import { Eye } from 'lucide-react';

import type { CommissionPayout, DesktopTableProps } from '../types';
import AntdStatusBadge from './AntdStatusBadge';

const COMMISSION_TEXT = {
  idColumn: '\u8fd4\u4f63\u53f7 / \u5173\u8054\u53f7',
  source: '\u6e90',
  levelColumn: '\u7ea7\u522b',
  generation: '\u4ee3',
  recipientColumn: '\u4ee3\u7406\u4eba / UID',
  amountColumn: '\u5206\u914d\u6570\u503c (USDT)',
  statusColumn: '\u5230\u8d26\u6838\u7b97\u72b6\u6001',
  actionColumn: '\u64cd\u4f5c',
  view: '\u67e5\u770b',
};

export default function AntdDesktopTable({ commissions, onSelectCommission }: DesktopTableProps) {
  const columns: TableColumnsType<CommissionPayout> = [
    {
      title: COMMISSION_TEXT.idColumn,
      dataIndex: 'id',
      key: 'id',
      render: (_, commission) => (
        <div className="flex flex-col font-mono font-bold text-white">
          <span>{commission.id}</span>
          <span className="text-xs text-[#cbc4d2]/30 font-normal">
            {COMMISSION_TEXT.source}: {commission.orderId}
          </span>
        </div>
      ),
    },
    {
      title: COMMISSION_TEXT.levelColumn,
      dataIndex: 'level',
      key: 'level',
      align: 'center',
      render: (level: CommissionPayout['level']) => (
        <Tag color="purple">
          {level}
          {COMMISSION_TEXT.generation}
        </Tag>
      ),
    },
    {
      title: COMMISSION_TEXT.recipientColumn,
      key: 'recipient',
      render: (_, commission) => (
        <div>
          <p className="text-[#cbc4d2] font-semibold">{commission.uid}</p>
          <p className="text-xs text-[#cbc4d2]/40 font-sans truncate max-w-[130px]">
            {commission.recipientNickname}
          </p>
        </div>
      ),
    },
    {
      title: COMMISSION_TEXT.amountColumn,
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: CommissionPayout['amount'], commission) => (
        <span
          className={`font-extrabold text-xs ${
            commission.status === 'intercepted' ? 'text-red-400' : 'text-emerald-400'
          }`}
        >
          USDT {amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      ),
    },
    {
      title: COMMISSION_TEXT.statusColumn,
      dataIndex: 'status',
      key: 'status',
      render: (status: CommissionPayout['status']) => <AntdStatusBadge status={status} variant="desktop" />,
    },
    {
      title: COMMISSION_TEXT.actionColumn,
      key: 'actions',
      align: 'right',
      render: (_, commission) => (
        <Button
          className="alliance-antd-commission-action-button"
          icon={<Eye className="w-3 h-3" />}
          size="small"
          onClick={() => onSelectCommission(commission)}
        >
          {COMMISSION_TEXT.view}
        </Button>
      ),
    },
  ];

  return (
    <div className="hidden md:block overflow-x-auto border border-white/5 bg-[#1d1925]/20 rounded-2xl p-1">
      <Table<CommissionPayout>
        className="alliance-antd-commission-table"
        columns={columns}
        dataSource={commissions}
        pagination={false}
        rowKey="id"
      />
    </div>
  );
}
