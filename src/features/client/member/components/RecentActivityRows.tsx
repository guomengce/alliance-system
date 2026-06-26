import type { RecentActivityRowProps } from '../types';

export function RecentActivityDesktopRow({ activity }: RecentActivityRowProps) {
  return (
    <tr className="border-b border-white/5 last:border-none">
      <td className="py-3 text-sm flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-[#36343a] flex items-center justify-center text-xs font-extrabold text-[#cfbcff]">{activity.id}</div>
        <span className="font-semibold text-white/95">{activity.uid}</span>
      </td>
      <td className="py-3 text-xs md:text-sm text-[#e7c365] font-semibold">{activity.action}</td>
      <td className="py-3 text-right text-xs text-[#cbc4d2] font-mono opacity-60">{activity.time}</td>
    </tr>
  );
}

export function RecentActivityMobileCard({ activity }: RecentActivityRowProps) {
  return (
    <div className="flex justify-between items-center bg-white/[0.01] p-3 rounded-lg border border-white/5">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-[#36343a] flex items-center justify-center text-xs font-extrabold text-[#cfbcff]">{activity.id}</div>
        <div>
          <p className="font-semibold text-white text-xs">{activity.uid}</p>
          <p className="text-xs text-[#cbc4d2]/60 font-mono mt-0.5">{activity.time}</p>
        </div>
      </div>
      <span className="text-xs text-[#e7c365] font-semibold">{activity.action}</span>
    </div>
  );
}
