import { Button, Tag } from 'antd';
import { Eye } from 'lucide-react';

import { AntdCard } from '@/src/shared/antd/AntdCard';
import type { DownlineMember } from '@/src/types';
import { getWalletStatusMeta, WALLETS_TEXT } from './AntdWalletsPanel';

interface AntdWalletsMobileProps {
  members: DownlineMember[];
  handleOpenWalletDetails: (member: DownlineMember) => void;
}

export default function AntdWalletsMobile({ members, handleOpenWalletDetails }: AntdWalletsMobileProps) {
  return (
    <div className="block md:hidden space-y-3">
      {members.map(member => {
        const totalWealth = (member.usdtBalance || 0) + (member.frozenBalance || 0) + (member.pendingBalance || 0);
        const statusMeta = getWalletStatusMeta(member.status);

        return (
          <AntdCard key={member.uid} className="alliance-antd-mobile-card alliance-antd-finance-mobile-card">
            <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
              <div>
                <span className="font-extrabold text-white text-sm">{member.nickname || WALLETS_TEXT.unnamed}</span>
                <div className="text-xs text-[#cbc4d2]/40 font-mono mt-0.5">UID: {member.uid}</div>
              </div>
              <Tag className={`alliance-antd-finance-status-tag ${statusMeta.className}`}>{statusMeta.label}</Tag>
            </div>

            <div className="grid grid-cols-2 gap-y-3 gap-x-4 font-mono text-[13px] pb-1">
              <div>
                <span className="text-[#cbc4d2]/40 text-xs font-sans block leading-none mb-1">{WALLETS_TEXT.usdt}</span>
                <span className="text-emerald-400 font-extrabold block text-xs">{member.usdtBalance?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'} U</span>
              </div>
              <div>
                <span className="text-[#cbc4d2]/40 text-xs font-sans block leading-none mb-1">{WALLETS_TEXT.frozen}</span>
                <span className="text-cyan-400 font-extrabold block text-xs">{member.frozenBalance?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'} U</span>
              </div>
              <div>
                <span className="text-[#cbc4d2]/40 text-xs font-sans block leading-none mb-1">{WALLETS_TEXT.troo}</span>
                <span className="text-[#cfbcff] font-extrabold block text-xs">{member.trooBalance?.toLocaleString(undefined, { minimumFractionDigits: 0 }) || '0'} TROO</span>
              </div>
              <div>
                <span className="text-[#cbc4d2]/40 text-xs font-sans block leading-none mb-1">{WALLETS_TEXT.pending}</span>
                <span className="text-amber-500 font-bold block text-xs">{member.pendingBalance?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'} U</span>
              </div>
              <div className="col-span-2 pt-2 border-t border-white/5">
                <span className="text-[#cbc4d2]/40 text-xs font-sans block leading-none mb-1">{WALLETS_TEXT.total}</span>
                <span className="text-white font-black text-xs font-mono">USDT {totalWealth.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <div className="pt-1.5">
              <Button
                className="alliance-antd-finance-mobile-full-button"
                icon={<Eye className="w-4 h-4 text-[#cfbcff]" />}
                onClick={() => handleOpenWalletDetails(member)}
              >
                {WALLETS_TEXT.mobileAudit}
              </Button>
            </div>
          </AntdCard>
        );
      })}
    </div>
  );
}
