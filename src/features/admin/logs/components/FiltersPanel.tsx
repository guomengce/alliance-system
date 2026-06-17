import { Filter, Search } from 'lucide-react';
import type { WorkspaceProps } from '../types';

type FiltersPanelProps = Pick<
  WorkspaceProps,
  | 'searchQuery'
  | 'setSearchQuery'
  | 'selectedSeverity'
  | 'setSelectedSeverity'
  | 'selectedCategory'
  | 'setSelectedCategory'
>;

export default function FiltersPanel({
  searchQuery,
  setSearchQuery,
  selectedSeverity,
  setSelectedSeverity,
  selectedCategory,
  setSelectedCategory
}: FiltersPanelProps) {
  return (
    <>
      {/* Search and Filters Bento Grid Panel */}
      <div className="bg-[#16121c] p-5 rounded-2xl border border-white/5 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Main search input field */}
          <div className="relative group flex-grow">
            <Search className="w-4 h-4 text-[#cbc4d2] opacity-60 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-[#cfbcff] transition-colors" />
            <input 
              type="text" 
              placeholder="搜索操作详情、管理员/系统、IP地址、模块名称、LOG流水号"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1e1927]/90 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/20 outline-none focus:border-[#cfbcff]/50 focus:ring-1 focus:ring-[#cfbcff]/20 transition-all font-semibold"
            />
          </div>

          {/* Selector filters split rows */}
          <div className="flex items-center gap-3 flex-wrap w-full md:w-auto justify-start md:justify-end">
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <span className="text-[10px] text-[#cbc4d2]/50 font-bold uppercase tracking-wider inline-flex items-center gap-1 shrink-0">
                <Filter className="w-3 h-3 text-[#cfbcff]" /> 等级:
              </span>
              {/* Desktop Level Filter Button Group */}
              <div className="hidden sm:flex bg-[#201b2a] rounded-xl p-0.5 border border-white/5 shrink-0">
                {['All', 'info', 'warn', 'error', 'critical'].map((sev) => (
                  <button
                    key={sev}
                    onClick={() => setSelectedSeverity(sev)}
                    className={`px-3 py-1 text-[11px] font-black rounded-lg transition-all capitalize select-none cursor-pointer ${
                      selectedSeverity === sev
                        ? 'bg-[#6750a4] text-white'
                        : 'text-[#cbc4d2]/50 hover:text-white'
                    }`}
                  >
                    {sev === 'All' ? '全部' : sev}
                  </button>
                ))}
              </div>
              {/* Mobile Level Filter Dropdown Selector */}
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="flex sm:hidden w-full bg-[#201b2a] border border-white/10 text-xs text-[#cbc4d2] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#cfbcff]/40 cursor-pointer font-semibold"
              >
                <option value="All">全部等级 (All)</option>
                <option value="info">Info (信息)</option>
                <option value="warn">Warn (警告)</option>
                <option value="error">Error (错误)</option>
                <option value="critical">Critical (核心拦截)</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <span className="text-[10px] text-[#cbc4d2]/50 font-bold uppercase tracking-wider inline-flex items-center gap-1 shrink-0">
                类别:
              </span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-[#201b2a] border border-white/10 text-xs text-[#cbc4d2] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#cfbcff]/40 cursor-pointer font-semibold w-full sm:w-auto"
              >
                <option value="All">全部类别</option>
                <option value="security">安全与防护</option>
                <option value="finance">财务出账</option>
                <option value="operation">运营事务</option>
                <option value="system">核心系统</option>
              </select>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
