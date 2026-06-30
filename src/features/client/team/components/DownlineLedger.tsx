import { Avatar, Button, Input, Table, Tag, type TableColumnsType } from 'antd';
import { Download, Search } from 'lucide-react';
import type { DownlineMember } from '../../../../types';
import type { DownlineLedgerProps } from '../types';
import { LedgerMobileRow } from './LedgerRows';

export default function DownlineLedger({
  downlines,
  searchQuery,
  exporting,
  setSearchQuery,
  onExportData
}: DownlineLedgerProps) {
  const columns: TableColumnsType<DownlineMember> = [
    {
      title: '用户 ID',
      dataIndex: 'uid',
      key: 'uid',
      render: (uid: string, member) => (
        <div className="flex items-center gap-3">
          <Avatar className="alliance-antd-team-avatar" size={32}>
            {member.avatarLetter}
          </Avatar>
          <span className="font-bold text-white font-mono text-xs">{uid}</span>
        </div>
      ),
    },
    {
      title: '注册时间',
      dataIndex: 'registrationDate',
      key: 'registrationDate',
      align: 'center',
      render: (date: string) => <span className="text-xs text-[#cbc4d2]/70 font-mono whitespace-nowrap">{date}</span>,
    },
    {
      title: '节点层级',
      dataIndex: 'level',
      key: 'level',
      align: 'center',
      render: (level: string) => <Tag className="alliance-antd-team-level-tag">{level} 级</Tag>,
    },
    {
      title: '累计业绩 (USDT)',
      dataIndex: 'volume',
      key: 'volume',
      align: 'right',
      render: (volume: number) => (
        <span className="font-bold text-white font-mono whitespace-nowrap">USDT {volume.toLocaleString()}</span>
      ),
    },
  ];

  return (
    <section className="glass-card rounded-2xl overflow-hidden shadow-xl border border-white/5">
      <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold tracking-tight text-white text-base">下属成员详情表</h3>
          <p className="text-xs text-[#cbc4d2]/40">实时展示直属、二代及网络裂变用户的业绩质押明细列表</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <Input
            className="alliance-antd-queue-search"
            placeholder="搜索用户ID..."
            prefix={<Search className="w-4 h-4 text-[#cbc4d2]/60" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Button
            className="alliance-antd-team-copy-button is-export"
            disabled={exporting}
            icon={<Download className="w-3.5 h-3.5" />}
            loading={exporting}
            onClick={onExportData}
          >
            {exporting ? '导出中...' : '导出报表'}
          </Button>
        </div>
      </div>

      <div className="hidden md:block overflow-x-auto scrollbar-hide">
        <Table<DownlineMember>
          columns={columns}
          dataSource={downlines}
          pagination={false}
          rowKey="uid"
          locale={{ emptyText: '没有查找到符合条件的裂变下属节点账单' }}
        />
      </div>

      <div className="md:hidden divide-y divide-white/5 space-y-4 p-4">
        {downlines.length > 0 ? (
          downlines.map((m, index) => (
            <LedgerMobileRow key={m.uid} member={m} index={index} />
          ))
        ) : (
          <div className="text-center py-10 text-xs text-[#cbc4d2]/40 font-medium">
            没有查找到符合条件的裂变下属节点账单
          </div>
        )}
      </div>
    </section>
  );
}
