import { Input } from 'antd';
import { Coins, Search } from 'lucide-react';

import type { DownlineMember } from '@/src/types';
import AntdWalletsDesktop from './AntdWalletsDesktop';
import AntdWalletsMobile from './AntdWalletsMobile';

interface WalletsPanelProps {
  downlines: DownlineMember[];
  searchMemberQuery: string;
  setSearchMemberQuery: (query: string) => void;
  handleOpenWalletDetails: (member: DownlineMember) => void;
}

export const WALLETS_TEXT = {
  title: '\u8054\u76df\u4ee3\u8868\u4e2a\u4ebaUSDT\u3001\u51bb\u7ed3\u53caTROO\u80a1\u7968\u8d22\u5bcc\u5b58\u4f59\u666e\u67e5',
  desc: '\u5b9e\u65f6\u76d1\u7ba1\u7279\u5b9a\u4ee3\u6536\u7406\u8d22\u4ee3\u8868\u7684\u53ef\u7528\u3001\u6392\u961f\u5728\u9014\u3001\u51bb\u7ed3\u7b49\u5404\u9879\u7ec6\u9879\u6307\u6807\uff0c\u70b9\u51fb\u201c\u94b1\u5305\u7ea0\u504f\u8be6\u60c5\u201d\u6781\u901f\u62e8\u4e71\u53cd\u6b63\u3002',
  search: '\u952e\u5165\u6635\u79f0 / UID \u641c\u67e5\u8d26\u6237\u5b58\u4f59...',
  profile: '\u4f1a\u5458\u6635\u79f0 / UID \u8d26\u53f7',
  usdt: '\u53ef\u7528\u8d44\u91d1\u4f59\u989d (USDT)',
  frozen: '\u5df2\u51bb\u7ed3\u8d44\u4ea7 (USDT)',
  troo: 'TROO \u80a1\u7968\u914d\u552e\u4f59\u91cf',
  pending: 'D+1 \u5f85\u6838\u7b97\u4f63\u91d1 (USDT)',
  total: '\u603b\u8d44\u4ea7\u6298\u5408 (USDT)',
  status: '\u72b6\u6001',
  action: '\u94b1\u5305\u7ec6\u8282\u4fee\u6b63',
  audit: '\u8d22\u52a1\u5ba1\u8ba1',
  mobileAudit: '\u8d22\u52a1\u5ba1\u8ba1\u4e0e\u7ea0\u504f',
  normal: '\u6d3b\u8dc3',
  frozenStatus: '\u6302\u51bb',
  disabled: '\u53d7\u9650',
  unnamed: '\u65b0\u540c\u76df\u4f1a\u5458',
};

export const filterWalletMembers = (downlines: DownlineMember[], searchMemberQuery: string) => {
  if (!searchMemberQuery) return downlines;
  const query = searchMemberQuery.toLowerCase();
  return downlines.filter(member => (
    member.uid.includes(query) ||
    (member.nickname && member.nickname.toLowerCase().includes(query)) ||
    (member.email && member.email.toLowerCase().includes(query))
  ));
};

export const getWalletStatusMeta = (status?: DownlineMember['status']) => {
  if (status === 'normal') {
    return { label: WALLETS_TEXT.normal, className: 'is-success' };
  }
  if (status === 'frozen') {
    return { label: WALLETS_TEXT.frozenStatus, className: 'is-warning' };
  }
  return { label: WALLETS_TEXT.disabled, className: 'is-danger' };
};

export default function AntdWalletsPanel({
  downlines,
  searchMemberQuery,
  setSearchMemberQuery,
  handleOpenWalletDetails
}: WalletsPanelProps) {
  const filteredMembers = filterWalletMembers(downlines, searchMemberQuery);

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h4 className="text-xs uppercase tracking-wider text-white font-sans font-bold flex items-center gap-1.5">
            <Coins className="w-4 h-4 text-[#cfbcff]" />
            {WALLETS_TEXT.title}
          </h4>
          <p className="text-[10px] text-[#cbc4d2]/50 mt-0.5">
            {WALLETS_TEXT.desc}
          </p>
        </div>

        <Input
          className="alliance-antd-finance-search w-full sm:w-64"
          placeholder={WALLETS_TEXT.search}
          prefix={<Search className="w-3.5 h-3.5 text-white/40" />}
          value={searchMemberQuery}
          onChange={(event) => setSearchMemberQuery(event.target.value)}
        />
      </div>

      <AntdWalletsDesktop members={filteredMembers} handleOpenWalletDetails={handleOpenWalletDetails} />
      <AntdWalletsMobile members={filteredMembers} handleOpenWalletDetails={handleOpenWalletDetails} />
    </div>
  );
}
