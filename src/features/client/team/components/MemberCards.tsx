import { Card, Tag } from 'antd';
import type { DownlineCardProps, DownlineMobileRowProps } from '../types';

export function GridMemberCard({ member }: DownlineCardProps) {
  return (
    <Card className="alliance-antd-team-member-card">
      <div className="flex items-center justify-between w-full">
        <span className="text-sm font-black text-white font-mono">{member.uid}</span>
        <Tag className="alliance-antd-team-level-tag">
          {member.level} MEMBER
        </Tag>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/5 text-left">
        <div>
          <span className="text-xs text-[#cbc4d2]/40 block font-medium">直属推荐</span>
          <span className="text-xs font-black text-white font-mono mt-0.5 block">{member.nodeSize}</span>
        </div>
        <div>
          <span className="text-xs text-[#cbc4d2]/40 block font-medium">累计业绩</span>
          <span className="text-xs font-black text-[#cfbcff] font-mono mt-0.5 block">USDT {member.volume.toLocaleString()}</span>
        </div>
      </div>
    </Card>
  );
}

export function CompactTableMobileRow({ member, index }: DownlineMobileRowProps) {
  return (
    <div className={`space-y-2 ${index > 0 ? 'pt-4' : ''}`}>
      <div className="flex justify-between items-center">
        <span className="font-mono font-bold text-white text-sm">{member.uid}</span>
        <Tag className="alliance-antd-team-level-tag">
          {member.level}级 (直推)
        </Tag>
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <p className="text-[#cbc4d2]/40 text-xs font-mono">直属推荐</p>
          <p className="text-white font-bold mt-0.5">{member.nodeSize} 人</p>
        </div>
        <div>
          <p className="text-[#cbc4d2]/40 text-xs font-mono text-right">累计业绩额</p>
          <p className="text-[#cfbcff] font-bold font-mono mt-0.5 text-right">USDT {member.volume.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
