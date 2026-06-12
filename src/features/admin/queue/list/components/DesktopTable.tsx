import { Eye } from 'lucide-react';
import type { DesktopTableProps } from '../../types';

export function DesktopTable({ lockedRoster, onOpenDetails }: DesktopTableProps) {
  return (
    <div className="hidden md:block overflow-x-auto border border-white/5 bg-[#1d1925]/20 rounded-2xl p-1">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-white/5 text-[#cbc4d2]/50 font-black bg-white/[0.01]">
            <th className="py-4 px-4">锁仓归属代表 UID</th>
            <th className="py-4 px-4 text-right">初始总锁定 (U)</th>
            <th className="py-4 px-4 text-amber-400 text-right">仍排队锁定金 (U)</th>
            <th className="py-4 px-4 text-emerald-400 text-right">已自动解锁 (U)</th>
            <th className="py-4 px-4 text-center">累计触发次数</th>
            <th className="py-4 px-4 text-center">穿透详情记录</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 font-mono">
          {lockedRoster.map(r => (
            <tr key={r.uid} className="hover:bg-white/[0.02] transition-colors">
              <td className="py-4 px-4 font-sans font-bold text-white text-left">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
                  <div>
                    <p className="text-white leading-none font-bold text-xs">{r.uid}</p>
                    <p className="text-[10px] text-[#cbc4d2]/40 font-normal mt-1">{r.nickname}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4 text-[#cbc4d2]/80 text-right">USDT {r.original.toLocaleString()}</td>
              <td className="py-4 px-4 font-extrabold text-amber-300 text-right">USDT {r.current.toLocaleString()}</td>
              <td className="py-4 px-4 font-extrabold text-emerald-400 text-right">USDT {r.unlocked.toLocaleString()}</td>
              <td className="py-4 px-4 text-center">
                <span className="text-[10px] font-black text-white bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                  {r.count} 次触发
                </span>
              </td>
              <td className="py-4 px-4 text-center">
                <button
                  type="button"
                  onClick={() => onOpenDetails(r)}
                  className="mx-auto bg-white/5 hover:bg-[#cfbcff]/15 text-[#cbc4d2] hover:text-[#cfbcff] px-3.5 py-1.5 rounded-xl font-bold font-sans active:scale-95 transition-all text-xs flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>记录详情</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
