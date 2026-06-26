import { Search, Users } from 'lucide-react';
import type { TeamPanelProps } from '../../types';

export function TeamPanel({
  teamSearchText,
  setTeamSearchText,
  formNodes,
  formVolume,
  filteredTeamMembers
}: TeamPanelProps) {
  return (
          <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 bg-[#141119] space-y-5 animate-fadeIn text-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#cfbcff]" />
                <h2 className="text-sm font-bold text-white tracking-wider">旗下直推与间推裂变拓扑账谱</h2>
              </div>
              
              {/* Interactive inline team member search box */}
              <div className="relative w-full sm:w-60">
                <input 
                  type="text"
                  value={teamSearchText}
                  onChange={(e) => setTeamSearchText(e.target.value)}
                  placeholder="查找下级(UID / 昵称 / 级别)..."
                  className="w-full bg-[#1c1824] border border-white/10 rounded-xl px-3.5 py-2 pl-9 text-[13px] text-white placeholder-white/30 focus:ring-1 focus:ring-[#cfbcff] outline-none"
                />
                <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#1c1824] p-4 rounded-xl border border-white/5">
                <span className="text-xs text-[#cbc4d2]/40 font-bold block uppercase font-mono">TOTAL ASSOCIATIVE DEPTH</span>
                <span className="text-base font-black text-white block mt-1">{formNodes} 个直属与关联裂变同盟</span>
              </div>
              <div className="bg-[#1c1824] p-4 rounded-xl border border-white/5">
                <span className="text-xs text-[#cbc4d2]/40 font-bold block uppercase font-mono">AGGREGATE VOLUME</span>
                <span className="text-base font-black text-emerald-400 block mt-1">USDT {(Number(formVolume) || 0).toLocaleString()}</span>
              </div>
            </div>

            {/* List of Downline associates in clean client-like grid card format */}
            <div className="hidden md:block border border-white/5 rounded-2xl bg-[#1c1824]/30 overflow-hidden">
              <div className="grid grid-cols-4 bg-white/3 py-2 px-4 text-[#cbc4d2]/40 font-black text-xs tracking-wide border-b border-white/5">
                <span>下级及裂变代表</span>
                <span>层级归属</span>
                <span className="text-right">直属推荐人数</span>
                <span className="text-right">累计业绩额 (USDT)</span>
              </div>
              <div className="divide-y divide-white/5 font-mono">
                {filteredTeamMembers.map((member) => (
                    <div key={member.uid} className="grid grid-cols-4 py-3.5 px-4 items-center hover:bg-white/[0.02] transition-colors">
                      <div>
                        <p className="font-extrabold text-white text-xs">{member.uid}</p>
                        <p className="text-xs text-[#cbc4d2]/40 mt-0.5 font-sans truncate">{member.name}</p>
                      </div>
                      <div>
                        <span className="bg-[#cfbcff]/10 text-[#cfbcff] text-xs px-2 py-0.5 font-bold rounded">
                          {member.level}
                        </span>
                      </div>
                      <p className="text-right text-white text-xs font-bold">{member.nodes}</p>
                      <p className="text-right text-[#cfbcff] font-extrabold text-xs">USDT {member.volume}</p>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Mobile View Team Cards */}
            <div className="block md:hidden border border-white/5 rounded-2xl divide-y divide-white/5 overflow-hidden bg-[#1c1824]/30">
              {filteredTeamMembers.map((member) => (
                  <div key={member.uid} className="p-3.5 space-y-2 bg-white/[0.01] hover:bg-white/[0.02] transition-colors text-xs font-sans">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-white font-extrabold text-xs">{member.uid}</span>
                        <span className="text-[#cbc4d2]/50 text-xs">({member.name.split(' ')[0]})</span>
                      </div>
                      <span className="bg-[#cfbcff]/10 text-[#cfbcff] text-xs px-2 py-0.5 font-bold rounded-lg border border-[#cfbcff]/10">
                        {member.level}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 font-mono">
                      <div>
                        <span className="text-[#cbc4d2]/40 text-xs font-sans block leading-none mb-1">直推推荐人数</span>
                        <span className="text-white font-bold block">{member.nodes}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[#cbc4d2]/40 text-xs font-sans block leading-none mb-1">累计业绩额</span>
                        <span className="text-[#cfbcff] font-extrabold block text-xs">USDT {member.volume}</span>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>

            <p className="text-xs text-[#cbc4d2]/40 italic pl-1 leading-relaxed">
              * 支持通过右上角搜索条即时过滤模糊匹配的团队节点。
            </p>
          </div>
  );
}
