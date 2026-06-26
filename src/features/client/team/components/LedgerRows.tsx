import { Avatar, Tag } from 'antd';
import type { DownlineMobileRowProps } from '../types';

export function LedgerMobileRow({ member, index }: DownlineMobileRowProps) {
  return (
    <div className={`space-y-3 ${index > 0 ? 'pt-4' : ''}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Avatar className="alliance-antd-team-avatar" size={32}>
            {member.avatarLetter}
          </Avatar>
          <p className="font-bold text-white font-mono text-sm">{member.uid}</p>
        </div>
        <Tag className="alliance-antd-team-level-tag">{member.level} 级</Tag>
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <p className="text-[#cbc4d2]/40 text-xs font-semibold font-mono">注册时间</p>
          <p className="text-white/80 font-mono mt-0.5">{member.registrationDate}</p>
        </div>
        <div>
          <p className="text-[#cbc4d2]/40 text-xs font-semibold font-mono text-right">累计业绩</p>
          <p className="text-[#cfbcff] font-bold font-mono mt-0.5 text-right">USDT {member.volume.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
