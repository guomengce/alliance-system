import { Avatar, Button, Input, Tag } from 'antd';
import { ShieldCheck } from 'lucide-react';
import type { ProfileCardProps } from '../types';

export default function ProfileCard({
  uid,
  nickname,
  joinDate,
  isEditing,
  tempNickname,
  setTempNickname,
  onToggleEdit
}: ProfileCardProps) {
  return (
    <div className="lg:col-span-8 glass-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-32 h-32 bg-[#cfbcff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center gap-6 w-full">
        <div className="relative">
          <div className="alliance-antd-member-profile-avatar-wrap">
            <Avatar className="alliance-antd-member-profile-avatar" size={82}>
              <span className="alliance-antd-member-profile-avatar-text">
                {nickname ? nickname.slice(0, 2).toUpperCase() : 'US'}
              </span>
            </Avatar>
          </div>
          <div className="alliance-antd-member-profile-badge">
            <ShieldCheck className="w-4.5 h-4.5" />
          </div>
        </div>

        <div className="space-y-3 flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-3 justify-center md:justify-start">
            {isEditing ? (
              <Input
                value={tempNickname}
                onChange={(e) => setTempNickname(e.target.value)}
                className="alliance-antd-member-name-input max-w-[180px]"
              />
            ) : (
              <h1 className="text-xl md:text-2xl font-black text-white">{nickname}</h1>
            )}
            <Tag className="alliance-antd-member-account-tag w-fit mx-auto md:mx-0">
              标准账户
            </Tag>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-[#cbc4d2]">
            <div className="flex items-center gap-1.5 opacity-80">
              <span className="font-semibold text-[#cfbcff]">ID:</span>
              <span className="font-mono">{uid}</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-80">
              <span className="font-semibold text-[#cfbcff]">加入时间:</span>
              <span className="font-mono">{joinDate}</span>
            </div>
          </div>
        </div>
      </div>

      <Button onClick={onToggleEdit} className="alliance-antd-member-edit-button whitespace-nowrap">
        {isEditing ? '保存修改' : '修改资料'}
      </Button>
    </div>
  );
}
