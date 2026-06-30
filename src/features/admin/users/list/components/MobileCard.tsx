import type { Key } from 'react';
import { Avatar, Button, Space, Tag } from 'antd';
import { Edit } from 'lucide-react';

import { AntdCard } from '../../../../../shared/antd/AntdCard';
import { DownlineMember } from '../../types';

interface MobileCardProps {
  key?: Key;
  user: DownlineMember;
  onStartEditing: (user: DownlineMember) => void;
  onKycAudit: (uid: string, accept: boolean) => void;
}

export default function MobileCard({
  user,
  onStartEditing,
  onKycAudit,
}: MobileCardProps) {
  const renderKycStatus = () => {
    if (user.kycL2 === 'verified') {
      return <Tag color="success">L2 认证</Tag>;
    }

    if (user.kycL2 === 'pending') {
      return (
        <>
          <Tag color="warning" className="animate-pulse">L2 待审</Tag>
          <Button
            className="alliance-antd-mini-button alliance-antd-mini-button-success"
            size="small"
            onClick={() => onKycAudit(user.uid, true)}
          >
            批准
          </Button>
        </>
      );
    }

    if (user.kycL1 === 'verified' || user.kycL1 === undefined) {
      return <Tag color="purple">L1 认证</Tag>;
    }

    return <Tag>未核验</Tag>;
  };

  return (
    <AntdCard className="alliance-antd-mobile-card">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2.5">
          <Avatar className="alliance-antd-avatar" size={32}>
            {user.avatarLetter || (user.nickname ? user.nickname.charAt(0).toUpperCase() : 'U')}
          </Avatar>
          <div>
            <p className="font-extrabold text-xs text-white leading-tight">{user.nickname || '未设置昵称'}</p>
            <p className="font-mono text-xs text-[#cbc4d2]/50 mt-0.5">UID: {user.uid}</p>
          </div>
        </div>

        <Tag color="purple">
          Sponsor: {user.sponsor || '999001'}
        </Tag>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[13px] border-t border-b border-white/5 py-2 font-sans">
        <div>
          <span className="text-white/40 text-xs block">联系方式</span>
          <p className="text-white font-mono font-bold mt-0.5">{user.phone || '暂无绑定手机'}</p>
          <p className="text-[#cbc4d2]/50 font-mono text-xs truncate">{user.email || `${user.uid}@alliance.com`}</p>
        </div>
        <div>
          <span className="text-white/40 text-xs block">下级/业绩</span>
          <p className="font-bold text-[#cfbcff] font-mono text-xs mt-0.5">{user.nodeSize} 个下级</p>
          <p className="text-emerald-400 font-bold font-mono text-xs">USDT {user.volume.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex justify-between items-center text-[13px] font-sans">
        <div className="flex-1 min-w-0 pr-2">
          <span className="text-white/40 text-xs block">KYC 状态 / 注册时间</span>
          <div className="mt-1 space-y-1">
            <Space size={6} className="alliance-antd-status-space" wrap>
              {renderKycStatus()}
            </Space>

            <div className="text-[#cbc4d2]/45 font-mono text-xs pt-1">
              注册时间: {user.registrationDate}
            </div>
          </div>
        </div>

        <Button
          className="alliance-antd-mobile-action-button"
          icon={<Edit className="w-3" />}
          size="small"
          onClick={() => onStartEditing(user)}
        >
          查看
        </Button>
      </div>
    </AntdCard>
  );
}
