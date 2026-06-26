import { Button, Table, Tag, type TableColumnsType } from 'antd';
import { Eye } from 'lucide-react';

import type { DesktopTableProps, QueueRoster } from '../../types';

const TEXT = {
  uid: '\u9501\u4ed3\u5f52\u5c5e\u4ee3\u8868 UID',
  original: '\u521d\u59cb\u603b\u9501\u5b9a (U)',
  current: '\u4ecd\u6392\u961f\u9501\u5b9a\u91d1 (U)',
  unlocked: '\u5df2\u81ea\u52a8\u89e3\u9501 (U)',
  count: '\u7d2f\u8ba1\u89e6\u53d1\u6b21\u6570',
  detail: '\u7a7f\u900f\u8be6\u60c5\u8bb0\u5f55',
  triggerCount: '\u6b21\u89e6\u53d1',
  view: '\u8bb0\u5f55\u8be6\u60c5',
};

export function AntdDesktopTable({ lockedRoster, onOpenDetails }: DesktopTableProps) {
  const columns: TableColumnsType<QueueRoster> = [
    {
      title: TEXT.uid,
      dataIndex: 'uid',
      key: 'uid',
      render: (_, roster) => (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          <div>
            <p className="text-white leading-none font-bold text-xs">{roster.uid}</p>
            <p className="text-xs text-[#cbc4d2]/40 font-normal mt-1">{roster.nickname}</p>
          </div>
        </div>
      ),
    },
    {
      title: TEXT.original,
      dataIndex: 'original',
      key: 'original',
      align: 'right',
      render: (original: QueueRoster['original']) => <span className="text-[#cbc4d2]/80">USDT {original.toLocaleString()}</span>,
    },
    {
      title: TEXT.current,
      dataIndex: 'current',
      key: 'current',
      align: 'right',
      render: (current: QueueRoster['current']) => <span className="font-extrabold text-amber-300">USDT {current.toLocaleString()}</span>,
    },
    {
      title: TEXT.unlocked,
      dataIndex: 'unlocked',
      key: 'unlocked',
      align: 'right',
      render: (unlocked: QueueRoster['unlocked']) => <span className="font-extrabold text-emerald-400">USDT {unlocked.toLocaleString()}</span>,
    },
    {
      title: TEXT.count,
      dataIndex: 'count',
      key: 'count',
      align: 'center',
      render: (count: QueueRoster['count']) => (
        <Tag className="alliance-antd-queue-count-tag">
          {count} {TEXT.triggerCount}
        </Tag>
      ),
    },
    {
      title: TEXT.detail,
      key: 'actions',
      align: 'center',
      render: (_, roster) => (
        <Button
          className="alliance-antd-queue-action-button"
          icon={<Eye className="w-3.5 h-3.5" />}
          size="small"
          onClick={() => onOpenDetails(roster)}
        >
          {TEXT.view}
        </Button>
      ),
    },
  ];

  return (
    <div className="hidden md:block overflow-x-auto border border-white/5 bg-[#1d1925]/20 rounded-2xl p-1">
      <Table<QueueRoster>
        className="alliance-antd-table alliance-antd-queue-table"
        columns={columns}
        dataSource={lockedRoster}
        pagination={false}
        rowKey="uid"
      />
    </div>
  );
}
