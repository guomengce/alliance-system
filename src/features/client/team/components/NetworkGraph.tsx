import { ChevronRight, LayoutGrid, List } from 'lucide-react';
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
  return (
    <section className="space-y-4">
      {/* Path string bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#1d1927]/30 border border-white/5 p-4 rounded-xl px-5 select-none font-sans">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#cbc4d2]/50 font-bold">团队路径</span>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-1.5 text-[#cbc4d2]/70">
            <span className="opacity-80">来自JICK (720090)</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-40 text-[#cfbcff]" />
            <span className="text-[#cfbcff] font-extrabold bg-[#cfbcff]/10 px-2.5 py-0.5 rounded border border-[#cfbcff]/20">SARAH (880221)</span>
          </div>
        </div>
      </div>

      {/* Center Node tree representation dashboard */}
      <div className="w-full bg-[#14111a]/55 border border-white/5 rounded-3xl relative overflow-hidden flex flex-col p-6 md:p-10 select-none shadow-2xl shadow-black/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(207,188,255,0.06)_0%,transparent_70%)] pointer-events-none" />
        
        {/* Vertical line passing behind card */}
        <div className="absolute top-0 bottom-[30%] left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-[#cfbcff]/10 via-[#cfbcff]/20 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center pt-4 pb-12 w-full">
          {/* Top text identifier in tree card box */}
          <div className="mb-6 bg-[#1c1822] border border-white/5 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest text-[#cbc4d2]/50 flex items-center gap-1.5 uppercase select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#cfbcff] animate-pulse"></span>
            EASTERN RANK LEVEL-2 GROUP MEMBER
          </div>

          {/* Central Main Agent Node Card */}
          <div className="relative bg-[#16131c]/95 border border-[#cfbcff]/20 hover:border-[#cfbcff]/40 shadow-2xl shadow-black rounded-3xl p-6 md:p-8 px-10 text-center max-w-sm w-full transition-all duration-300 transform hover:-translate-y-1">
            
            {/* Elegant Portrait Avatar Slot */}
            <div className="relative mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-[#6750a4]/50 via-[#cfbcff]/40 to-transparent p-1 shadow-lg shadow-[#cfbcff]/10">
              <div className="w-full h-full rounded-full bg-[#131018] overflow-hidden flex items-center justify-center border border-[#cfbcff]/10">
                {/* Simulated professional face visual outline in avatar */}
                <svg className="w-11 h-11 text-[#cfbcff]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <div className="absolute bottom-0 right-0 bg-[#cfbcff] text-[#1c1822] text-xs font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#16131c] shadow">
                L2
              </div>
            </div>

            {/* Title / ID display */}
            <h4 className="text-xl font-black text-white mt-4 font-sans tracking-wide">ID: 721099</h4>
            
            {/* Verification label */}
            <p className="text-xs font-bold text-[#cfbcff]/85 tracking-widest mt-1 uppercase select-none">VERIFIED MEMBER - SEP 2023</p>
            
            {/* Division stat parameters */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-white/5 select-none font-sans">
              <div className="text-left pl-3">
                <p className="text-xs text-[#cbc4d2]/40 font-bold uppercase tracking-wide">直属推荐</p>
                <p className="text-lg font-extrabold text-[#cbc4d2] font-mono mt-0.5">156</p>
              </div>
              <div className="text-right pr-3 border-l border-white/5">
                <p className="text-xs text-[#cbc4d2]/40 font-bold uppercase tracking-wide">团队业绩</p>
                <p className="text-lg font-extrabold text-[#cfbcff] font-mono mt-0.5">89.2k</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-members section nested inside visual block */}
        <div className="relative z-10 border-t border-white/5 pt-8 mt-4 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-black text-white tracking-widest uppercase">下属成员</span>
              
              {/* Filter Pills Tabs (全部, L1, L2, L3) */}
              <div className="flex bg-[#1b1822]/90 rounded-full p-1 border border-white/5">
                {TEAM_LEVEL_FILTERS.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setLevelFilter(lvl)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      levelFilter === lvl 
                        ? 'bg-[#cfbcff] text-[#210c44]' 
                        : 'text-[#cbc4d2]/70 hover:text-white'
                    }`}
                  >
                    {lvl === 'all' ? '全部' : lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid and List view options toggles */}
            <div className="flex items-center gap-1.5 bg-[#1b1822] p-1 rounded-lg border border-white/5 self-end sm:self-auto">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Members rendering container */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/2 text-[#cbc4d2]/60 text-xs font-bold uppercase tracking-wider">
                      <th className="p-4 px-6">下线标识 UID</th>
                      <th className="p-4 px-6">层级代理</th>
                      <th className="p-4 px-6 text-right">直属推荐</th>
                      <th className="p-4 px-6 text-right">累计业绩额</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs divide-y divide-white/5">
                    {downlines.map((member) => (
                      <tr key={member.uid} className="hover:bg-white/2 transition-colors">
                        <td className="p-4 px-6 font-mono font-bold text-white">{member.uid}</td>
                        <td className="p-4 px-6 font-semibold text-[#cfbcff]">{member.level}级 (直推)</td>
                        <td className="p-4 px-6 text-right font-mono font-bold text-white">{member.nodeSize} 人</td>
                        <td className="p-4 px-6 text-right font-mono font-bold text-[#cfbcff]">USDT {member.volume.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View with Cards */}
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
