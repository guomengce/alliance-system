import { Input, Table, Tag, type TableColumnsType } from 'antd';
import { Search, Users } from 'lucide-react';

import { AntdCard } from '@/src/shared/antd/AntdCard';
import type { TeamMember, TeamPanelProps } from '../../types';

const TEXT = {
  title: '\u65d7\u4e0b\u76f4\u63a8\u4e0e\u95f4\u63a8\u88c2\u53d8\u62d3\u6251\u8d26\u7c3f',
  search: '\u67e5\u627e\u4e0b\u7ea7(UID / \u6635\u79f0 / \u7ea7\u522b)...',
  depth: 'TOTAL ASSOCIATIVE DEPTH',
  volume: 'AGGREGATE VOLUME',
  member: '\u4e0b\u7ea7\u53ca\u88c2\u53d8\u4ee3\u8868',
  level: '\u5c42\u7ea7\u5f52\u5c5e',
  nodes: '\u76f4\u5c5e\u63a8\u8350\u4eba\u6570',
  amount: '\u7d2f\u8ba1\u4e1a\u7ee9\u989d (USDT)',
};

export default function AntdTeamPanel({
  teamSearchText,
  setTeamSearchText,
  formNodes,
  formVolume,
  filteredTeamMembers
}: TeamPanelProps) {
  const columns: TableColumnsType<TeamMember> = [
    {
      title: TEXT.member,
      dataIndex: 'uid',
      key: 'uid',
      render: (_, member) => (
        <div>
          <p className="font-extrabold text-white text-xs">{member.uid}</p>
          <p className="text-[9px] text-[#cbc4d2]/40 mt-0.5 font-sans truncate">{member.name}</p>
        </div>
      ),
    },
    {
      title: TEXT.level,
      dataIndex: 'level',
      key: 'level',
      render: (level: TeamMember['level']) => <Tag className="alliance-antd-user-detail-tier-tag">{level}</Tag>,
    },
    { title: TEXT.nodes, dataIndex: 'nodes', key: 'nodes', align: 'right' },
    {
      title: TEXT.amount,
      dataIndex: 'volume',
      key: 'volume',
      align: 'right',
      render: (volume: TeamMember['volume']) => <span className="text-[#cfbcff] font-extrabold">USDT {volume}</span>,
    },
  ];

  return (
    <AntdCard className="alliance-antd-user-detail-panel-card">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 pb-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[#cfbcff]" />
          <h2 className="text-sm font-bold text-white tracking-wider">{TEXT.title}</h2>
        </div>
        <Input
          className="alliance-antd-user-detail-search"
          prefix={<Search className="w-3.5 h-3.5 text-white/40" />}
          value={teamSearchText}
          onChange={(event) => setTeamSearchText(event.target.value)}
          placeholder={TEXT.search}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AntdCard className="alliance-antd-user-detail-readonly-card">
          <span className="text-[10px] text-[#cbc4d2]/40 font-bold block uppercase font-mono">{TEXT.depth}</span>
          <span className="text-base font-black text-white block mt-1">{formNodes} \u4e2a\u76f4\u5c5e\u4e0e\u5173\u8054\u88c2\u53d8\u540c\u76df</span>
        </AntdCard>
        <AntdCard className="alliance-antd-user-detail-readonly-card">
          <span className="text-[10px] text-[#cbc4d2]/40 font-bold block uppercase font-mono">{TEXT.volume}</span>
          <span className="text-base font-black text-emerald-400 block mt-1">USDT {(Number(formVolume) || 0).toLocaleString()}</span>
        </AntdCard>
      </div>

      <div className="hidden md:block border border-white/5 rounded-2xl bg-[#1c1824]/30 overflow-hidden">
        <Table<TeamMember>
          className="alliance-antd-table alliance-antd-user-detail-table"
          columns={columns}
          dataSource={filteredTeamMembers}
          pagination={false}
          rowKey="uid"
        />
      </div>

      <div className="block md:hidden border border-white/5 rounded-2xl divide-y divide-white/5 overflow-hidden bg-[#1c1824]/30">
        {filteredTeamMembers.map((member) => (
          <div key={member.uid} className="p-3.5 space-y-2 bg-white/[0.01] text-xs font-sans">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-white font-extrabold text-xs">{member.uid}</span>
                <span className="text-[#cbc4d2]/50 text-[10px]">({member.name.split(' ')[0]})</span>
              </div>
              <Tag className="alliance-antd-user-detail-tier-tag">{member.level}</Tag>
            </div>
            <div className="grid grid-cols-2 gap-4 font-mono">
              <div>
                <span className="text-[#cbc4d2]/40 text-[9px] font-sans block leading-none mb-1">{TEXT.nodes}</span>
                <span className="text-white font-bold block">{member.nodes}</span>
              </div>
              <div className="text-right">
                <span className="text-[#cbc4d2]/40 text-[9px] font-sans block leading-none mb-1">{TEXT.amount}</span>
                <span className="text-[#cfbcff] font-extrabold block text-xs">USDT {member.volume}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AntdCard>
  );
}
