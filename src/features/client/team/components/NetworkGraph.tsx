import { Segmented, Table, type TableColumnsType } from 'antd';
import { ChevronRight, LayoutGrid, List, UserRound } from 'lucide-react';
import type { DownlineMember } from '../../../../types';
import type { NetworkGraphProps } from '../types';
import { TEAM_LEVEL_FILTERS } from '../utils';
import { CompactTableMobileRow, GridMemberCard } from './MemberCards';

export default function NetworkGraph({
  downlines,
  levelFilter,
  viewMode,
  setLevelFilter,
  setViewMode
}: NetworkGraphProps) {
  const columns: TableColumnsType<DownlineMember> = [
    {
      title: '下线标识 UID',
      dataIndex: 'uid',
      key: 'uid',
      render: (uid: string) => <span className="font-mono font-bold text-white">{uid}</span>,
    },
    {
      title: '层级代理',
      dataIndex: 'level',
      key: 'level',
      render: (level: string) => <span className="font-semibold text-[#cfbcff]">{level}级 (直推)</span>,
    },
    {
      title: '直属推荐',
      dataIndex: 'nodeSize',
      key: 'nodeSize',
      align: 'right',
      render: (nodeSize: number) => <span className="font-mono font-bold text-white">{nodeSize} 人</span>,
    },
    {
      title: '累计业绩额',
      dataIndex: 'volume',
      key: 'volume',
      align: 'right',
      render: (volume: number) => <span className="font-mono font-bold text-[#cfbcff]">USDT {volume.toLocaleString()}</span>,
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#1d1927]/30 border border-white/5 p-4 rounded-xl px-5 select-none font-sans">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#cbc4d2]/50 font-bold">团队路径</span>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-1.5 text-[#cbc4d2]/70">
            <span className="opacity-80">来自 JICK (720090)</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-40 text-[#cfbcff]" />
            <span className="text-[#cfbcff] font-extrabold bg-[#cfbcff]/10 px-2.5 py-0.5 rounded border border-[#cfbcff]/20">SARAH (880221)</span>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#14111a]/55 border border-white/5 rounded-3xl relative overflow-hidden flex flex-col p-6 md:p-10 select-none shadow-2xl shadow-black/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(207,188,255,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute top-0 bottom-[30%] left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-[#cfbcff]/10 via-[#cfbcff]/20 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center pt-4 pb-12 w-full">
          <div className="mb-6 bg-[#1c1822] border border-white/5 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest text-[#cbc4d2]/50 flex items-center gap-1.5 uppercase select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#cfbcff] animate-pulse" />
            EASTERN RANK LEVEL-2 GROUP MEMBER
          </div>

          <div className="relative bg-[#16131c]/95 border border-[#cfbcff]/20 hover:border-[#cfbcff]/40 shadow-2xl shadow-black rounded-[28px] p-8 md:p-9 px-11 text-center max-w-[430px] w-full transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative mx-auto w-[92px] h-[92px] rounded-full bg-[#131018] border-[4px] border-[#6750a4]/65 shadow-[0_0_18px_rgba(207,188,255,0.16)] flex items-center justify-center">
              <UserRound className="w-12 h-12 text-[#cfbcff]/70" strokeWidth={1.8} />
              <div className="absolute bottom-2 right-1 bg-[#cfbcff] text-[#1c1822] text-xs font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#16131c] shadow">
                L2
              </div>
            </div>

            <h4 className="text-2xl font-black text-white mt-3 font-sans tracking-wide">ID: 721099</h4>
            <p className="text-xs font-bold text-[#cfbcff]/85 tracking-widest mt-1 uppercase select-none">VERIFIED MEMBER - SEP 2023</p>

            <div className="grid grid-cols-2 gap-4 mt-7 pt-6 border-t border-white/5 select-none font-sans">
              <div className="text-left pl-4">
                <p className="text-xs text-[#cbc4d2]/40 font-bold uppercase tracking-wide">直属推荐</p>
                <p className="text-xl font-extrabold text-[#cbc4d2] font-mono mt-1">156</p>
              </div>
              <div className="text-right pr-4 border-l border-white/5">
                <p className="text-xs text-[#cbc4d2]/40 font-bold uppercase tracking-wide">团队业绩</p>
                <p className="text-xl font-extrabold text-[#cfbcff] font-mono mt-1">89.2k</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 border-t border-white/5 pt-8 mt-4 w-full">
          <div className="flex flex-row items-center justify-between gap-4 mb-7">
            <div className="flex flex-row items-center gap-3 min-w-0">
              <span className="text-sm font-black text-white tracking-widest uppercase whitespace-nowrap">下属成员</span>
              <Segmented<string>
                className="alliance-antd-team-segmented"
                options={TEAM_LEVEL_FILTERS.map((lvl) => ({ label: lvl === 'all' ? '全部' : lvl, value: lvl }))}
                value={levelFilter}
                onChange={setLevelFilter}
              />
            </div>

            <Segmented<'grid' | 'list'>
              className="alliance-antd-team-view-segmented"
              options={[
                { label: <LayoutGrid className="w-4 h-4" />, value: 'grid' },
                { label: <List className="w-4 h-4" />, value: 'list' },
              ]}
              value={viewMode}
              onChange={setViewMode}
            />
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {downlines.length > 0 ? (
                downlines.map((member) => (
                  <GridMemberCard key={member.uid} member={member} />
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-xs text-[#cbc4d2]/30 bg-white/2 rounded-2xl border border-dashed border-white/5">
                  此等级下暂无团队成员节点资料
                </div>
              )}
            </div>
          ) : (
            <div className="bg-[#1c1824]/30 rounded-2xl overflow-hidden shadow-xl border border-white/5">
              <div className="hidden md:block overflow-x-auto scrollbar-hide">
                <Table<DownlineMember>
                  columns={columns}
                  dataSource={downlines}
                  pagination={false}
                  rowKey="uid"
                />
              </div>

              <div className="md:hidden divide-y divide-white/5 space-y-4 p-4">
                {downlines.map((member, index) => (
                  <CompactTableMobileRow key={member.uid} member={member} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
