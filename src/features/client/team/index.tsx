import { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  ArrowUpRight, 
  Network, 
  Layers, 
  LineChart, 
  Crown, 
  GitMerge, 
  Copy,
  ChevronRight,
  ExternalLink,
  Share2,
  LayoutGrid,
  List,
  Check,
  Download,
  QrCode,
  UserCheck
} from 'lucide-react';
import { DownlineMember } from '../../../types';
import PageView from '../../../components/PageView';

interface TeamViewProps {
  downlines: DownlineMember[];
}

export default function TeamView({ downlines }: TeamViewProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [copiedUid, setCopiedUid] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [exporting, setExporting] = useState<boolean>(false);

  // Filter list
  const filteredDownlines = downlines.filter(m => {
    if (levelFilter !== 'all' && m.level !== levelFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return m.uid.includes(q) || m.level.toLowerCase().includes(q);
    }
    return true;
  });

  const handleCopyUid = (uid: string) => {
    navigator.clipboard?.writeText(uid);
    setCopiedUid(uid);
    setTimeout(() => setCopiedUid(null), 2000);
  };

  const handleCopyInviteLink = () => {
    navigator.clipboard?.writeText('https://alliance-system.console/register?ref=8898218-X');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleExportData = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      alert('团队数据报表已生成并准备导出 (Downline_Ledger_Export.csv)');
    }, 1500);
  };

  return (
    <PageView>
      {/* Page Title Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs text-[#cbc4d2]/50">
            多维监控网络裂变节点、裂变代理体量与核心收益分成状态
          </p>
        </div>
      </div>

      {/* Top row cards (4 columns overview) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 select-none">
        <div className="glass-card p-5 rounded-2xl flex flex-col justify-between hover:bg-white/2 transition-colors duration-300">
          <span className="text-[11px] text-[#cbc4d2]/50 font-medium tracking-wide">团队总人数</span>
          <span className="text-2xl lg:text-3xl font-black text-white font-mono mt-3">2,410</span>
        </div>
        
        <div className="glass-card p-5 rounded-2xl flex flex-col justify-between hover:bg-white/2 transition-colors duration-300">
          <span className="text-[11px] text-[#cbc4d2]/50 font-medium tracking-wide">L1 直属人数</span>
          <span className="text-2xl lg:text-3xl font-black text-[#cfbcff] font-mono mt-3">42</span>
        </div>
        
        <div className="glass-card p-5 rounded-2xl flex flex-col justify-between hover:bg-white/2 transition-colors duration-300">
          <span className="text-[11px] text-[#cbc4d2]/50 font-medium tracking-wide">L2-L3 团队直销</span>
          <span className="text-2xl lg:text-3xl font-black text-white font-mono mt-3">850</span>
        </div>
        
        <div className="glass-card p-5 rounded-2xl flex flex-col justify-between hover:bg-white/2 transition-colors duration-300">
          <span className="text-[11px] text-[#cbc4d2]/50 font-medium tracking-wide">活跃节点数</span>
          <span className="text-2xl lg:text-3xl font-black text-white font-mono mt-3">1,518</span>
        </div>
      </div>

      {/* Promo Center Full-width Card */}
      <section className="glass-card p-6 md:p-7 rounded-2xl relative overflow-hidden group border border-white/5 shadow-xl shadow-black/30">
        <div className="absolute top-0 right-0 p-5 z-10 text-white/50 hover:text-white transition-colors cursor-pointer" onClick={handleCopyInviteLink}>
          <Share2 className="w-5 h-5 transition-transform duration-300 hover:scale-110" />
        </div>
        
        <div>
          <h3 className="text-sm font-black text-[#cfbcff] uppercase tracking-wider flex items-center gap-2">
            推广中心
          </h3>
          <p className="text-xs text-[#cbc4d2]/60 mt-1">分享链接即可获得 10% 佣金收益</p>
          
          <p className="text-xs text-[#cbc4d2]/50 mt-3 md:max-w-4xl leading-relaxed">
            通过分享专属邀请码或分享链接，推荐好友成为代理团队成员。好友进行充值、代购或流动质押，您都将获得高额收益分成。推荐收益具有长久合法权益。
          </p>
        </div>

        {/* Input box to copy refer code */}
        <div className="mt-5 max-w-full md:max-w-2xl">
          <div className="flex items-center bg-[#17141f] border border-white/5 rounded-xl p-1 px-4 lg:w-4/5">
            <input 
              type="text" 
              readOnly 
              value="8898218-X" 
              className="bg-transparent border-none text-white text-xs font-mono select-all outline-none flex-1 truncate pr-2 h-9 py-2"
            />
            <button 
              onClick={handleCopyInviteLink}
              disabled={copiedLink}
              className={`px-5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                copiedLink 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'bg-[#cfbcff] text-[#200e42] hover:bg-[#ebdfff] active:scale-95'
              }`}
            >
              {copiedLink ? '已复制' : '复制'}
            </button>
          </div>
        </div>
      </section>

      {/* Team Path and Graphical User Flow Node */}
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
            <div className="mb-6 bg-[#1c1822] border border-white/5 px-4 py-1.5 rounded-full text-[9px] font-mono tracking-widest text-[#cbc4d2]/50 flex items-center gap-1.5 uppercase select-none">
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
                <div className="absolute bottom-0 right-0 bg-[#cfbcff] text-[#1c1822] text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#16131c] shadow">
                  L2
                </div>
              </div>

              {/* Title / ID display */}
              <h4 className="text-xl font-black text-white mt-4 font-sans tracking-wide">ID: 721099</h4>
              
              {/* Verification label */}
              <p className="text-[10px] font-bold text-[#cfbcff]/85 tracking-widest mt-1 uppercase select-none">VERIFIED MEMBER - SEP 2023</p>
              
              {/* Division stat parameters */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-white/5 select-none font-sans">
                <div className="text-left pl-3">
                  <p className="text-[10px] text-[#cbc4d2]/40 font-bold uppercase tracking-wide">直属推荐</p>
                  <p className="text-lg font-extrabold text-[#cbc4d2] font-mono mt-0.5">156</p>
                </div>
                <div className="text-right pr-3 border-l border-white/5">
                  <p className="text-[10px] text-[#cbc4d2]/40 font-bold uppercase tracking-wide">团队业绩</p>
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
                  {(['all', 'L1', 'L2', 'L3'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setLevelFilter(lvl)}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
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
                {filteredDownlines.length > 0 ? (
                  filteredDownlines.map((member) => (
                    <div 
                      key={member.uid} 
                      className="bg-[#1c1824]/40 hover:bg-[#221e2c]/75 hover:border-[#cfbcff]/20 transition-all duration-300 p-5 rounded-2xl border border-white/5 relative overflow-hidden flex flex-col justify-between shadow-lg shadow-black/20"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-sm font-black text-white font-mono">{member.uid}</span>
                        <span className="text-[9px] font-black bg-[#cfbcff]/15 text-[#cfbcff] px-2 py-0.5 rounded border border-[#cfbcff]/10">
                          {member.level} MEMBER
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/5 text-left">
                        <div>
                          <span className="text-[10px] text-[#cbc4d2]/40 block font-medium">直属推荐</span>
                          <span className="text-xs font-black text-white font-mono mt-0.5 block">{member.nodeSize}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#cbc4d2]/40 block font-medium">累计业绩</span>
                          <span className="text-xs font-black text-[#cfbcff] font-mono mt-0.5 block">USDT {member.volume.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
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
                      <tr className="border-b border-white/5 bg-white/2 text-[#cbc4d2]/60 text-[10px] font-bold uppercase tracking-wider">
                        <th className="p-4 px-6">下线标识 UID</th>
                        <th className="p-4 px-6">层级代理</th>
                        <th className="p-4 px-6 text-right">直属推荐</th>
                        <th className="p-4 px-6 text-right">累计业绩额</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs divide-y divide-white/5">
                      {filteredDownlines.map((member) => (
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
                  {filteredDownlines.map((member, index) => (
                    <div key={member.uid} className={`space-y-2 ${index > 0 ? 'pt-4' : ''}`}>
                      <div className="flex justify-between items-center">
                        <span className="font-mono font-bold text-white text-sm">{member.uid}</span>
                        <span className="text-[10px] font-semibold text-[#cfbcff] bg-[#cfbcff]/5 px-2 py-0.5 rounded border border-[#cfbcff]/15">
                          {member.level}级 (直推)
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <p className="text-[#cbc4d2]/40 text-[10px] font-mono">直属推荐</p>
                          <p className="text-white font-bold mt-0.5">{member.nodeSize} 人</p>
                        </div>
                        <div>
                          <p className="text-[#cbc4d2]/40 text-[10px] font-mono text-right">累计业绩额</p>
                          <p className="text-[#cfbcff] font-bold font-mono mt-0.5 text-right">USDT {member.volume.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Downlines interactive structured ledger table */}
      <section className="glass-card rounded-2xl overflow-hidden shadow-xl border border-white/5">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-bold tracking-tight text-white text-base">下属成员详情表</h3>
            <p className="text-[11px] text-[#cbc4d2]/40">实时展示直属、二代及网络裂变用户的业绩质押明细列表</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            {/* Global search within list */}
            <div className="relative group flex items-center bg-[#1e1a26]/90 border border-white/5 rounded-xl px-3 py-1.5 focus-within:border-[#cfbcff]/40 transition-all">
              <Search className="w-4 h-4 text-[#cbc4d2] opacity-60 mr-2" />
              <input 
                type="text" 
                placeholder="搜索用户ID..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none text-xs text-white outline-none w-full sm:w-32 h-6"
              />
            </div>
            
            <button 
              onClick={handleExportData}
              disabled={exporting}
              className="px-4 py-2 bg-[#cfbcff] text-[#2c155c] hover:bg-[#ebdfff] transition-all rounded-xl text-xs font-bold inline-flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              {exporting ? '导出中...' : '导出报表'}
            </button>
          </div>
        </div>

        <div className="hidden md:block overflow-x-auto scrollbar-hide">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/2 text-[#cbc4d2] text-[10px] font-bold uppercase tracking-wider">
                <th className="p-4 px-6">用户 ID</th>
                <th className="p-4 px-6 xl:text-center">注册时间</th>
                <th className="p-4 px-6 xl:text-center">节点层级</th>
                <th className="p-4 px-6 text-right">累计业绩 (USDT)</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {filteredDownlines.length > 0 ? (
                filteredDownlines.map((m) => (
                  <tr key={m.uid} className="hover:bg-white/2 transition-colors">
                    <td className="p-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#6750a4]/15 flex items-center justify-center text-[10px] font-bold text-[#cfbcff] border border-[#cfbcff]/15 select-none uppercase">
                          {m.avatarLetter}
                        </div>
                        <div>
                          <p className="font-bold text-white font-mono text-xs">{m.uid}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 px-6 xl:text-center text-xs text-[#cbc4d2]/70 font-mono whitespace-nowrap">{m.registrationDate}</td>
                    <td className="p-4 px-6 xl:text-center whitespace-nowrap">
                      <span className="px-2.5 py-1 bg-white/5 rounded-full text-xs font-semibold text-[#cfbcff]">
                        {m.level} 级
                      </span>
                    </td>
                    <td className="p-4 px-6 text-right font-bold text-white font-mono whitespace-nowrap">USDT {m.volume.toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-xs text-[#cbc4d2]/40 font-medium">
                    没有查找到符合条件的裂变下属节点账单
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View with Cards */}
        <div className="md:hidden divide-y divide-white/5 space-y-4 p-4">
          {filteredDownlines.length > 0 ? (
            filteredDownlines.map((m, index) => (
              <div key={m.uid} className={`space-y-3 ${index > 0 ? 'pt-4' : ''}`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#6750a4]/15 flex items-center justify-center text-[10px] font-bold text-[#cfbcff] border border-[#cfbcff]/15 select-none uppercase">
                      {m.avatarLetter}
                    </div>
                    <p className="font-bold text-white font-mono text-sm">{m.uid}</p>
                  </div>
                  <span className="px-2 py-0.5 bg-white/5 border border-white/5 rounded-full text-[10px] font-semibold text-[#cfbcff]">
                    {m.level} 级
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-[#cbc4d2]/40 text-[10px] font-semibold font-mono">注册时间</p>
                    <p className="text-white/80 font-mono mt-0.5">{m.registrationDate}</p>
                  </div>
                  <div>
                    <p className="text-[#cbc4d2]/40 text-[10px] font-semibold font-mono text-right">累计业绩</p>
                    <p className="text-[#cfbcff] font-bold font-mono mt-0.5 text-right">USDT {m.volume.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-xs text-[#cbc4d2]/40 font-medium">
              没有查找到符合条件的裂变下属节点账单
            </div>
          )}
        </div>
      </section>
    </PageView>
  );
}
