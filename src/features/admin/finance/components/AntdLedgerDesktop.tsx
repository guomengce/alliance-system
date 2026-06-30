import { Button, Table, Tag, type TableColumnsType } from 'antd';
import { Eye } from 'lucide-react';

import type { Transaction } from '@/src/types';
import { getLedgerTypeClassName, LEDGER_TEXT } from './AntdLedgerPanel';

interface AntdLedgerDesktopProps {
  ledger: Transaction[];
  setSelectedLedgerItem: (item: Transaction) => void;
}

export default function AntdLedgerDesktop({ ledger, setSelectedLedgerItem }: AntdLedgerDesktopProps) {
  const columns: TableColumnsType<Transaction> = [
    {
      title: LEDGER_TEXT.id,
      dataIndex: 'id',
      key: 'id',
      render: (id: Transaction['id']) => <span className="font-mono font-bold text-white">{id}</span>,
    },
    {
      title: LEDGER_TEXT.type,
      dataIndex: 'type',
      key: 'type',
      render: (_, item) => (
        <Tag className={`alliance-antd-finance-status-tag ${getLedgerTypeClassName(item.type)}`}>
          {item.typeLabel || item.type.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: LEDGER_TEXT.descCol,
      dataIndex: 'desc',
      key: 'desc',
      render: (desc: Transaction['desc']) => <span className="text-[#cbc4d2] font-sans truncate max-w-[280px] block" title={desc}>{desc}</span>,
    },
    {
      title: LEDGER_TEXT.amount,
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: Transaction['amount']) => (
        <span className={`font-mono font-black ${amount < 0 ? 'text-[#ffb4ab]' : 'text-emerald-400'}`}>
          {amount < 0 ? '' : '+'}{amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      ),
    },
    {
      title: LEDGER_TEXT.currency,
      dataIndex: 'currency',
      key: 'currency',
      render: (currency: Transaction['currency']) => <span className="font-mono text-[#cbc4d2]/60 font-bold">{currency}</span>,
    },
    {
      title: LEDGER_TEXT.time,
      dataIndex: 'time',
      key: 'time',
      render: (time: Transaction['time']) => <span className="font-mono text-[#cbc4d2]/40">{time}</span>,
    },
    {
      title: LEDGER_TEXT.detail,
      key: 'detail',
      align: 'center',
      render: (_, item) => (
        <Button
          className="alliance-antd-finance-action-button"
          icon={<Eye className="w-3 h-3 text-[#cfbcff]" />}
          onClick={() => setSelectedLedgerItem(item)}
        >
          {LEDGER_TEXT.voucher}
        </Button>
      ),
    },
  ];

  return (
    <div className="hidden md:block overflow-x-auto border border-white/5 bg-[#1d1925]/20 rounded-2xl pr-1">
      <Table<Transaction>
        className="alliance-antd-finance-table"
        columns={columns}
        dataSource={ledger}
        pagination={false}
        rowKey="id"
      />
    </div>
  );
}
