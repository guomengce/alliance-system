import type { DownlineMobileRowProps, DownlineCardProps } from '../types';

export function LedgerDesktopRow({ member }: DownlineCardProps) {
  return (
    <tr className="hover:bg-white/2 transition-colors">
      <td className="p-4 px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#6750a4]/15 flex items-center justify-center text-xs font-bold text-[#cfbcff] border border-[#cfbcff]/15 select-none uppercase">
            {member.avatarLetter}
          </div>
          <div>
            <p className="font-bold text-white font-mono text-xs">{member.uid}</p>
          </div>
        </div>
      </td>
      <td className="p-4 px-6 xl:text-center text-xs text-[#cbc4d2]/70 font-mono whitespace-nowrap">{member.registrationDate}</td>
      <td className="p-4 px-6 xl:text-center whitespace-nowrap">
        <span className="px-2.5 py-1 bg-white/5 rounded-full text-xs font-semibold text-[#cfbcff]">
          {member.level} 级
        </span>
      </td>
      <td className="p-4 px-6 text-right font-bold text-white font-mono whitespace-nowrap">USDT {member.volume.toLocaleString()}</td>
    </tr>
  );
}

export function LedgerMobileRow({ member, index }: DownlineMobileRowProps) {
  return (
    <div className={`space-y-3 ${index > 0 ? 'pt-4' : ''}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#6750a4]/15 flex items-center justify-center text-xs font-bold text-[#cfbcff] border border-[#cfbcff]/15 select-none uppercase">
            {member.avatarLetter}
          </div>
          <p className="font-bold text-white font-mono text-sm">{member.uid}</p>
        </div>
        <span className="px-2 py-0.5 bg-white/5 border border-white/5 rounded-full text-xs font-semibold text-[#cfbcff]">
          {member.level} 级
        </span>
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
