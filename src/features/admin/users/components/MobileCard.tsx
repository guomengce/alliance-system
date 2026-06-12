import React from 'react';
import { Edit } from 'lucide-react';
import { DownlineMember } from '../types';

interface MobileCardProps {
  key?: React.Key;
  user: DownlineMember;
  onStartEditing: (user: DownlineMember) => void;
  onKycAudit: (uid: string, accept: boolean) => void;
}

export default function MobileCard({
  user,
  onStartEditing,
  onKycAudit,
}: MobileCardProps) {
  return (
    <div className="bg-[#1c1825]/60 border border-white/5 p-4 rounded-2xl space-y-3 font-sans">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#cfbcff]/10 border border-[#cfbcff]/20 text-[#cfbcff] flex items-center justify-center font-extrabold text-xs">
            {user.avatarLetter || (user.nickname ? user.nickname.charAt(0).toUpperCase() : 'U')}
          </div>
          <div>
            <p className="font-extrabold text-xs text-white leading-tight">{user.nickname || '未设置昵称'}</p>
            <p className="font-mono text-[9px] text-[#cbc4d2]/50 mt-0.5">UID: {user.uid}</p>
          </div>
        </div>
        <span className="font-mono text-[9px] font-semibold text-[#cfbcff] bg-[#cfbcff]/5 px-2 py-0.5 rounded border border-[#cfbcff]/10">
          Sponsor: {user.sponsor || '999001'}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-[11px] border-t border-b border-white/5 py-2 font-sans">
        <div>
          <span className="text-white/40 text-[9px] block">联系方式</span>
          <p className="text-white font-mono font-bold mt-0.5">{user.phone || '暂无绑定手机'}</p>
          <p className="text-[#cbc4d2]/50 font-mono text-[10px] truncate">{user.email || user.uid + '@alliance.com'}</p>
        </div>
        <div>
          <span className="text-white/40 text-[9px] block">下级/业绩</span>
          <p className="font-bold text-[#cfbcff] font-mono text-xs mt-0.5">{user.nodeSize} 个下级</p>
          <p className="text-emerald-400 font-bold font-mono text-[10px]">USDT {user.volume.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex justify-between items-center text-[11px] font-sans">
        <div className="flex-1 min-w-0 pr-2">
          <span className="text-white/40 text-[9px] block">KYC 状态 / 注册时间</span>
          <div className="mt-1 space-y-1">
            <div className="flex flex-wrap items-center gap-1.5">
              {user.kycL2 === 'verified' ? (
                <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md whitespace-nowrap">L2 级</span>
              ) : user.kycL2 === 'pending' ? (
                <div className="flex items-center gap-1">
                  <span className="text-[9px] font-black text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded-md animate-pulse whitespace-nowrap">L2 待审</span>
                  <button 
                    onClick={() => onKycAudit(user.uid, true)}
                    className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded text-[8px] font-bold hover:bg-emerald-500/35 transition-all cursor-pointer whitespace-nowrap"
                  >
                    批准
                  </button>
                </div>
              ) : user.kycL1 === 'verified' || user.kycL1 === undefined ? (
                <span className="text-[9px] font-black text-[#cfbcff] bg-[#cfbcff]/10 px-1.5 py-0.5 rounded-md whitespace-nowrap">L1 级</span>
              ) : (
                <span className="text-[9px] font-black text-gray-500 bg-white/5 px-1.5 py-0.5 rounded-md whitespace-nowrap">未核验</span>
              )}
            </div>
            
            <div className="text-[#cbc4d2]/45 font-mono text-[9px] pt-1">
              注册时间: {user.registrationDate}
            </div>
          </div>
        </div>

        <button 
          onClick={() => onStartEditing(user)}
          className="bg-gradient-to-r from-[#6750a4]/40 to-[#cfbcff]/20 text-[#cfbcff] text-[10px] font-bold py-1.5 px-3 border border-[#cfbcff]/20 rounded-xl cursor-pointer flex items-center gap-1 shrink-0"
        >
          <Edit className="w-3" />
          查看
        </button>
      </div>
    </div>
  );
}
