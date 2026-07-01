import { Input, Select } from 'antd';
import { Users } from 'lucide-react';
import { KycFilter } from '../../types';

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
        <p className="text-[13px] text-[#cbc4d2]/50 mt-0.5 leading-tight">
          对超级同盟会员代表的状态实施权限管控与对账。点击“查看”可审核 L2 证照，执行全局深层对账与纠偏。
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
        <Input.Search
          allowClear
          defaultValue={searchText}
          key={searchText}
          onSearch={onSearchTextChange}
          placeholder="搜索昵称 / 邮箱 / UID..."
          className="w-full sm:w-48"
        />
        <Select<KycFilter>
          value={kycFilter}
          onChange={onKycFilterChange}
          className="min-w-36"
          options={[
            { value: 'all', label: '全部 KYC 状态' },
            { value: 'pending', label: '仅待 L2 终审' },
            { value: 'verified', label: 'L2 审核通过' }
          ]}
        />
      </div>
    </div>
  );
}
