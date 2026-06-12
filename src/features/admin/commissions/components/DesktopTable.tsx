import { Eye } from 'lucide-react';
import type { DesktopTableProps } from '../types';
import StatusBadge from './StatusBadge';

export default function DesktopTable({ commissions, onSelectCommission }: DesktopTableProps) {
  return (
    <div className="hidden md:block overflow-x-auto border border-white/5 bg-[#1d1925]/20 rounded-2xl p-1">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-white/5 text-[#cbc4d2]/50 font-black tracking-wide bg-white/[0.01]">
            <th className="py-3 px-4">返佣号/关联号</th>
            <th className="py-3 px-4 text-center">级别</th>
            <th className="py-3 px-4">代理人 / UID</th>
            <th className="py-3 px-4 font-mono">分配数值 (USDT)</th>
            <th className="py-3 px-4">到账核算状态</th>
            <th className="py-3 px-4 text-right">操作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 font-mono">
          {commissions.map(p => (
            <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
              <td className="py-3.5 px-4 font-mono font-bold text-white">
                <div className="flex flex-col">
                  <span>{p.id}</span>
                  <span className="text-[9px] text-[#cbc4d2]/30 font-normal">源: {p.orderId}</span>
                </div>
              </td>
              <td className="py-3.5 px-4 text-center">
                <span className="text-[10px] font-black text-[#cfbcff] bg-[#cfbcff]/10 px-2 py-0.5 rounded">
                  {p.level}代
                </span>
              </td>
              <td className="py-3.5 px-4">
                <p className="text-[#cbc4d2] font-semibold">{p.uid}</p>
                <p className="text-[9px] text-[#cbc4d2]/40 font-sans truncate max-w-[130px]">{p.recipientNickname}</p>
              </td>
              <td className={`py-3.5 px-4 font-extrabold text-xs ${p.status === 'intercepted' ? 'text-red-400' : 'text-emerald-400'}`}>
                USDT {p.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
              </td>
              <td className="py-3.5 px-4">
                <StatusBadge status={p.status} variant="desktop" />
              </td>
              <td className="py-3.5 px-4 text-right">
                <button
                  type="button; submit"
                  onClick={() => onSelectCommission(p)}
                  className="bg-white/5 hover:bg-[#cfbcff]/10 select-none text-white hover:text-[#cfbcff] px-2.5 py-1 rounded-lg text-[11px] font-bold font-sans active:scale-95 transition-all outline-none inline-flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3 h-3" />
                  <span>查看</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
