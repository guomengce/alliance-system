import { Button, Table, Tag, type TableColumnsType } from 'antd';
import { Eye } from 'lucide-react';

import { AntdCard } from '@/src/shared/antd/AntdCard';
import type { SettlementItem, WorkspaceProps } from '../types';

type SettlementListProps = Pick<
  WorkspaceProps,
  | 'settlementTransactions'
  | 'setSelectedTx'
>;

const TEXT = {
  title: '\u5f53\u65e5\u5404\u52a0\u76df\u4f1a\u5458\u5177\u4f53\u7ed3\u7b97\u4e0e\u6263\u7a0e\u8d26\u7c3f (Settlement Logs)',
  uid: '\u5bf9\u8d26\u4ee3\u8868 (UID)',
  expected: '\u9884\u62e8\u5e94\u5f97 (U)',
  capacity: '\u5f53\u524d\u53ef\u7528\u4f63\u989d\u5ea6 (U)',
  actual: '\u5b9e\u5230\u8d26\u6d3e\u53d1 (U)',
  clipped: '\u6ea2\u6d41\u56de\u7b3c\u5927\u76d8 (U)',
  status: '\u72b6\u6001\u8bf4\u660e',
  audit: '\u6392\u8c03\u76d1\u7ba1',
  detail: '\u7cbe\u7b97\u5ba1\u6838\u6821\u51c6',
  calibrate: '\u6821\u51c6',
  fully: '\u5168\u989d\u6d3e\u53d1',
  clippedStatus: '\u8d85\u989d\u6ea2\u6d41\u622a\u65ad',
  stalled: '\u5f85\u4eba\u5de5\u5e72\u9884',
  notified: '\u5df2\u63a8\u8b66\u544a\u90ae\u4ef6',
};

const statusMeta: Record<SettlementItem['status'], { label: string; className: string }> = {
  fully_settled: {
    label: TEXT.fully,
    className: 'alliance-antd-settlement-status-tag is-success',
  },
  clipped: {
    label: TEXT.clippedStatus,
    className: 'alliance-antd-settlement-status-tag is-danger',
  },
  stalled_exception: {
    label: TEXT.stalled,
    className: 'alliance-antd-settlement-status-tag is-critical animate-pulse',
  },
  low_capacity_notified: {
    label: TEXT.notified,
    className: 'alliance-antd-settlement-status-tag is-purple',
  },
};

export default function AntdSettlementList({
  settlementTransactions,
  setSelectedTx
}: SettlementListProps) {
  const columns: TableColumnsType<SettlementItem> = [
    {
      title: TEXT.uid,
      dataIndex: 'memberUid',
      key: 'memberUid',
      render: (_, tx) => (
        <div className="flex flex-col">
          <span className="text-white text-xs font-sans font-bold">{tx.memberUid}</span>
          <span className="text-xs text-[#cbc4d2]/40 font-sans font-normal">{tx.nickname}</span>
        </div>
      ),
    },
    {
      title: TEXT.expected,
      dataIndex: 'expectedCommissions',
      key: 'expectedCommissions',
      render: (value: SettlementItem['expectedCommissions']) => <span className="text-white">USDT {value.toLocaleString()}</span>,
    },
    {
      title: TEXT.capacity,
      dataIndex: 'remainingPoolCapacity',
      key: 'remainingPoolCapacity',
      render: (value: SettlementItem['remainingPoolCapacity']) => (
        <span className={value < 1000 ? 'text-amber-400 font-extrabold' : 'text-[#cbc4d2]/85'}>
          {value.toLocaleString()} U
        </span>
      ),
    },
    {
      title: TEXT.actual,
      dataIndex: 'actualSettledAmount',
      key: 'actualSettledAmount',
      render: (value: SettlementItem['actualSettledAmount']) => <span className="text-emerald-400 font-extrabold">USDT {value.toLocaleString()}</span>,
    },
    {
      title: TEXT.clipped,
      dataIndex: 'spilloverClipped',
      key: 'spilloverClipped',
      render: (value: SettlementItem['spilloverClipped']) => <span className="text-red-500 font-extrabold">USDT {value.toLocaleString()}</span>,
    },
    {
      title: TEXT.status,
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status: SettlementItem['status']) => (
        <Tag className={statusMeta[status].className}>{statusMeta[status].label}</Tag>
      ),
    },
    {
      title: TEXT.audit,
      key: 'audit',
      align: 'center',
      render: (_, tx) => (
        <Button
          className="alliance-antd-settlement-action-button"
          icon={<Eye className="w-3 h-3" />}
          onClick={() => setSelectedTx(tx)}
        >
          {TEXT.calibrate}
        </Button>
      ),
    },
  ];

  return (
    <div className="text-left space-y-4 flex-grow">
      <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#cfbcff]">
        {TEXT.title}
      </h4>

      <div className="block md:hidden space-y-3">
        {settlementTransactions.map(tx => (
          <AntdCard key={tx.id} className="alliance-antd-settlement-mobile-card">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white text-xs font-bold leading-none">{tx.memberUid}</p>
                <p className="text-xs text-[#cbc4d2]/40 font-normal mt-0.5">{tx.nickname}</p>
              </div>
              <Tag className={statusMeta[tx.status].className}>
                {statusMeta[tx.status].label}
              </Tag>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[13px] border-t border-b border-white/5 py-2 font-mono">
              <div>
                <span className="text-[#cbc4d2]/40 text-xs block font-sans">{TEXT.expected}</span>
                <p className="text-white font-semibold mt-0.5">USDT {tx.expectedCommissions.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-[#cbc4d2]/40 text-xs block font-sans">{TEXT.capacity}</span>
                <p className={`font-semibold mt-0.5 ${tx.remainingPoolCapacity < 1000 ? 'text-amber-400 font-extrabold' : 'text-[#cbc4d2]/85'}`}>{tx.remainingPoolCapacity.toLocaleString()} U</p>
              </div>
              <div>
                <span className="text-[#cbc4d2]/40 text-xs block font-sans">{TEXT.actual}</span>
                <p className="text-emerald-400 font-bold mt-0.5">USDT {tx.actualSettledAmount.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-red-400/80 text-xs block font-sans">{TEXT.clipped}</span>
                <p className="text-red-400 font-bold mt-0.5">USDT {tx.spilloverClipped.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                className="alliance-antd-settlement-mobile-action-button"
                icon={<Eye className="w-3.5 h-3.5" />}
                onClick={() => setSelectedTx(tx)}
              >
                {TEXT.detail}
              </Button>
            </div>
          </AntdCard>
        ))}
      </div>

      <div className="hidden md:block overflow-x-auto border border-white/5 bg-[#1d1925]/20 rounded-2xl p-1">
        <Table<SettlementItem>
          className="alliance-antd-table alliance-antd-settlement-table"
          columns={columns}
          dataSource={settlementTransactions}
          pagination={false}
          rowKey="id"
        />
      </div>
    </div>
  );
}
