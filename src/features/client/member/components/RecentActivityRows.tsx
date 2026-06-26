import { Avatar, Tag } from 'antd';
import type { RecentActivityRowProps } from '../types';

export function RecentActivityDesktopRow({ activity }: RecentActivityRowProps) {
  return {
    key: activity.id,
    user: (
      <div className="flex items-center gap-2">
        <Avatar className="alliance-antd-member-activity-avatar" size={28}>{activity.id}</Avatar>
        <span className="font-semibold text-white/95">{activity.uid}</span>
      </div>
    ),
    action: <Tag className="alliance-antd-member-activity-tag">{activity.action}</Tag>,
    time: <span className="text-xs text-[#cbc4d2] font-mono opacity-60">{activity.time}</span>,
  };
}

export function RecentActivityMobileCard({ activity }: RecentActivityRowProps) {
  return (
    <div className="flex justify-between items-center bg-white/[0.01] p-3 rounded-lg border border-white/5">
      <div className="flex items-center gap-2">
        <Avatar className="alliance-antd-member-activity-avatar" size={28}>{activity.id}</Avatar>
        <div>
          <p className="font-semibold text-white text-xs">{activity.uid}</p>
          <p className="text-xs text-[#cbc4d2]/60 font-mono mt-0.5">{activity.time}</p>
        </div>
      </div>
      <Tag className="alliance-antd-member-activity-tag">{activity.action}</Tag>
    </div>
  );
}
