import React from 'react';
import { Search, Users } from 'lucide-react';
import { KycFilter } from '../types';

interface ToolbarProps {
  searchText: string;
  kycFilter: KycFilter;
  onSearchTextChange: (value: string) => void;
  onKycFilterChange: (value: KycFilter) => void;
}

export default function Toolbar({
  searchText,
  kycFilter,
  onSearchTextChange,
  onKycFilterChange,
}: ToolbarProps) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-3.5 border-b border-white/5 pb-3.5">
      <div>
        <h3 className="text-sm md:text-base font-black text-white tracking-tight flex items-center gap-2">
          <Users className="w-4 h-4 text-[#cfbcff]" />
          <span>用户列表</span>
        </h3>
        <p className="text-[11px] text-[#cbc4d2]/50 mt-0.5 leading-tight">
          对超级同盟会员代表的状态实施权限管控与对账。点击“查看”可审核 L2 证照，执行全局深层对账与纠偏。
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
        <div className="relative flex-grow sm:flex-grow-0">
          <input
            type="text"
            value={searchText}
            onChange={(e) => onSearchTextChange(e.target.value)}
            placeholder="搜索昵称 / 邮箱 / UID..."
            className="bg-[#211f24] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/35 focus:ring-1 focus:ring-[#cfbcff] outline-none pl-8 w-full sm:w-48 transition-all"
          />
          <Search className="w-3.5 h-3.5 text-white/40 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
        <select
          value={kycFilter}
          onChange={(e) => onKycFilterChange(e.target.value as KycFilter)}
          className="bg-[#211f24] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white font-bold cursor-pointer font-sans focus:outline-none transition-all"
        >
          <option value="all">全部 KYC 状态</option>
          <option value="pending">仅待 L2 终审</option>
          <option value="verified">L2 审核通过</option>
        </select>
      </div>
    </div>
  );
}
