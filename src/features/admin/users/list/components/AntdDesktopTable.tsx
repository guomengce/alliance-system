import { Avatar, Button, Space, Table, Tag, type TableColumnsType } from 'antd';
import { Edit } from 'lucide-react';

import { DownlineMember } from '../../types';

interface AntdDesktopTableProps {
  users: DownlineMember[];
  onStartEditing: (user: DownlineMember) => void;
  onKycAudit: (uid: string, accept: boolean) => void;
}

export default function AntdDesktopTable({
  users,
  onStartEditing,
  onKycAudit,
}: AntdDesktopTableProps) {
  const columns: TableColumnsType<DownlineMember> = [
    {
      title: '用户昵称 / UID 账号',
      dataIndex: 'nickname',
      key: 'profile',
      render: (_, user) => (
        <div className="flex items-center gap-3">
          <Avatar className="alliance-antd-avatar" size={32}>
            {user.avatarLetter || (user.nickname ? user.nickname.charAt(0).toUpperCase() : 'U')}
          </Avatar>
          <div>
            <p className="font-extrabold text-xs text-white leading-tight">{user.nickname || '未设置昵称'}</p>
            <p className="font-mono text-[10px] text-[#cbc4d2]/50 mt-0.5">UID: {user.uid}</p>
          </div>
        </div>
      ),
    },
    {
      title: '联系方式',
      key: 'contact',
      render: (_, user) => (
        <div>
          <p className="text-white font-mono text-[11px] font-bold">{user.phone || '暂无绑定手机'}</p>
          <p className="text-[#cbc4d2]/50 font-mono text-[10px] mt-0.5">{user.email || `${user.uid}@alliance.com`}</p>
        </div>
      ),
    },
    {
      title: '直属推荐关系',
      dataIndex: 'sponsor',
      key: 'sponsor',
      render: (sponsor) => (
        <Tag className="alliance-antd-tag alliance-antd-tag-purple">
          {sponsor || '999001 (SYS)'}
        </Tag>
      ),
    },
    {
      title: '注册激活日期',
      dataIndex: 'registrationDate',
      key: 'registrationDate',
      render: (registrationDate) => (
        <span className="text-[#cbc4d2]/70 font-mono">{registrationDate}</span>
      ),
    },
    {
      title: '下级/业绩',
      key: 'team',
      render: (_, user) => (
        <div>
          <p className="font-bold text-[#cfbcff] font-mono text-xs">{user.nodeSize} 个下级</p>
          <p className="text-emerald-400 font-bold font-mono text-[10px] mt-0.5">
            USDT {user.volume.toLocaleString()}
          </p>
        </div>
      ),
    },
    {
      title: 'KYC状态',
      key: 'kyc',
      render: (_, user) => (
        <Space size={6} className="alliance-antd-status-space">
          {user.kycL2 === 'verified' ? (
            <Tag className="alliance-antd-tag alliance-antd-tag-success">L2 认证</Tag>
          ) : user.kycL2 === 'pending' ? (
            <>
              <Tag className="alliance-antd-tag alliance-antd-tag-warning animate-pulse">L2 待审</Tag>
              <Button
                className="alliance-antd-mini-button alliance-antd-mini-button-success"
                size="small"
                onClick={() => onKycAudit(user.uid, true)}
                title="快速审核通过"
              >
                审核
              </Button>
            </>
          ) : user.kycL1 === 'verified' || user.kycL1 === undefined ? (
            <Tag className="alliance-antd-tag alliance-antd-tag-purple">L1 认证</Tag>
          ) : (
            <Tag className="alliance-antd-tag alliance-antd-tag-muted">未核验</Tag>
          )}
        </Space>
      ),
    },
    {
      title: '操作',
      key: 'actions',
      align: 'center',
      render: (_, user) => (
        <Button
          className="alliance-antd-action-button"
          icon={<Edit className="w-3.5" />}
          size="small"
          onClick={() => onStartEditing(user)}
        >
          查看
        </Button>
      ),
    },
  ];

  return (
    <div className="hidden md:block overflow-x-auto border border-white/5 rounded-2xl bg-[#1c1825]/40 p-1">
      <Table<DownlineMember>
        className="alliance-antd-table"
        columns={columns}
        dataSource={users}
        pagination={false}
        rowKey="uid"
      />
    </div>
  );
}
