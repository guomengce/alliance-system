import { Button, Space, Switch, Table, Tag, Tooltip, type TableColumnsType } from 'antd';
import { AlertCircle, Edit, Sliders, UserMinus } from 'lucide-react';

import { AntdCard } from '../../../../shared/antd/AntdCard';
import type { AdminAccount, WorkspaceProps } from '../types';

type AntdAccountsPanelProps = Pick<
  WorkspaceProps,
  | 'adminUsers'
  | 'roles'
  | 'handleOpenEditAccount'
  | 'handleToggleAccountStatus'
  | 'handleDeleteAccount'
>;

const TEXT = {
  title: '\u540e\u53f0\u6ce8\u518c\u6301\u6743\u7ba1\u7406\u5458\u767b\u5f55\u8d26\u53f7\u4ee3\u8868\u5217\u8868',
  account: '\u767b\u5f55\u8d26\u6237 / UID',
  profile: '\u4eba\u5458\u6635\u79f0 / \u90ae\u7bb1',
  role: '\u6302\u63a5\u5b89\u5168\u89d2\u8272',
  status: '\u72b6\u6001',
  actions: '\u5b89\u5168\u6d41\u63a7\u63a7\u5236',
  edit: '\u64cd\u4f5c',
  freeze: '\u51bb\u7ed3',
  activate: '\u6fc0\u6d3b',
  delete: '\u5220\u9664',
  active: '\u6d3b\u8dc3\u5c31\u7eea',
  suspended: '\u4e34\u65f6\u4e2d\u6b62',
  isolated: '\u9694\u79bb',
  noteTitle: '\u591a\u91cd\u5b89\u5168\u76fe\u724c\u58f0\u660e (IP & Multi-Location Isolation)',
  note: '\u7cfb\u7edf\u7ba1\u7406\u5458\u7684\u6240\u6709\u767b\u5f55\u5747\u53d7\u540c\u76df\u786c\u7f16\u9632\u5237\u89c4\u5219\u7ea6\u675f\uff0c\u591a\u89d2\u8272\u7ba1\u7406\u9075\u5faa\u6700\u5c0f\u5fc5\u8981\u6027\u5206\u6743\u7406\u5ff5\u3002',
};

const getStatusMeta = (status: AdminAccount['status']) => {
  if (status === 'active') return { label: TEXT.active, className: 'is-success' };
  if (status === 'suspended') return { label: TEXT.suspended, className: 'is-warning' };
  return { label: TEXT.isolated, className: 'is-danger' };
};

export default function AntdAccountsPanel({
  adminUsers,
  roles,
  handleOpenEditAccount,
  handleToggleAccountStatus,
  handleDeleteAccount
}: AntdAccountsPanelProps) {
  const columns: TableColumnsType<AdminAccount> = [
    {
      title: TEXT.account,
      dataIndex: 'username',
      key: 'username',
      render: (_, account) => (
        <div>
          <p className="font-extrabold text-white text-xs font-mono">{account.username}</p>
          <p className="text-[9px] text-[#cbc4d2]/40 mt-0.5 font-mono">{account.id}</p>
        </div>
      ),
    },
    {
      title: TEXT.profile,
      dataIndex: 'nickname',
      key: 'profile',
      render: (_, account) => (
        <div className="font-sans">
          <p className="text-white leading-none font-bold text-xs">{account.nickname}</p>
          <p className="text-[10px] text-[#cbc4d2]/50 mt-1">{account.email}</p>
        </div>
      ),
    },
    {
      title: TEXT.role,
      dataIndex: 'role',
      key: 'role',
      render: (role: AdminAccount['role']) => {
        const roleObj = roles.find(item => item.roleCode === role);
        return <Tag className="alliance-antd-rbac-role-tag">{roleObj?.roleName || role}</Tag>;
      },
    },
    {
      title: TEXT.status,
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status: AdminAccount['status']) => {
        const meta = getStatusMeta(status);
        return <Tag className={`alliance-antd-rbac-status-tag ${meta.className}`}>{meta.label}</Tag>;
      },
    },
    {
      title: TEXT.actions,
      key: 'actions',
      align: 'right',
      render: (_, account) => (
        <Space size={6}>
          <Button className="alliance-antd-rbac-mini-button is-purple" icon={<Edit className="w-3 h-3" />} onClick={() => handleOpenEditAccount(account)}>
            {TEXT.edit}
          </Button>
          <Tooltip title={account.status === 'active' ? TEXT.freeze : TEXT.activate}>
            <Switch
              checked={account.status === 'active'}
              className="alliance-antd-rbac-switch"
              onChange={() => handleToggleAccountStatus(account.id)}
            />
          </Tooltip>
          <Button className="alliance-antd-rbac-mini-button is-danger" icon={<UserMinus className="w-3 h-3" />} onClick={() => handleDeleteAccount(account.id)} aria-label={TEXT.delete} />
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6 animate-fadeIn">
      <AntdCard className="alliance-antd-rbac-panel-card">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h4 className="text-xs md:text-sm font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#cfbcff]" />
            <span>{TEXT.title}</span>
          </h4>
          <span className="text-[9px] md:text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
            Audited Under HMAC-SHA256
          </span>
        </div>

        <Table<AdminAccount>
          className="alliance-antd-table alliance-antd-rbac-table hidden md:block"
          columns={columns}
          dataSource={adminUsers}
          pagination={false}
          rowKey="id"
        />

        <div className="block md:hidden space-y-3">
          {adminUsers.map(account => {
            const roleObj = roles.find(role => role.roleCode === account.role);
            const statusMeta = getStatusMeta(account.status);
            return (
              <AntdCard key={account.id} className="alliance-antd-rbac-mobile-card">
                <div className="flex justify-between items-start gap-2 pb-2.5 border-b border-white/5">
                  <div>
                    <span className="text-[#cfbcff] font-extrabold text-sm font-mono">{account.username}</span>
                    <p className="text-[10px] text-[#cbc4d2]/40 font-mono leading-none mt-1">{account.id}</p>
                  </div>
                  <Tag className={`alliance-antd-rbac-status-tag ${statusMeta.className}`}>{statusMeta.label}</Tag>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-sans pb-1.5">
                  <div>
                    <span className="text-[#cbc4d2]/40 text-[9px] block mb-0.5 leading-none">{TEXT.profile}</span>
                    <span className="text-white font-bold text-[11px] block">{account.nickname}</span>
                  </div>
                  <div>
                    <span className="text-[#cbc4d2]/40 text-[9px] block mb-0.5 leading-none">{TEXT.role}</span>
                    <span className="text-[#cfbcff] font-extrabold text-[10px] block truncate leading-none mt-0.5">
                      {roleObj?.roleName || account.role}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[#cbc4d2]/40 text-[9px] block mb-0.5 leading-none">Email</span>
                    <span className="text-[#cbc4d2]/70 font-mono text-[10px] truncate block">{account.email}</span>
                  </div>
                </div>
                <Space className="w-full pt-2 border-t border-white/5" size={8}>
                  <Button className="alliance-antd-rbac-mobile-action is-purple" onClick={() => handleOpenEditAccount(account)}>{TEXT.edit}</Button>
                  <Button className="alliance-antd-rbac-mobile-action is-warning" onClick={() => handleToggleAccountStatus(account.id)}>{account.status === 'active' ? TEXT.freeze : TEXT.activate}</Button>
                  <Button className="alliance-antd-rbac-mobile-action is-danger" icon={<UserMinus className="w-4 h-4" />} onClick={() => handleDeleteAccount(account.id)} />
                </Space>
              </AntdCard>
            );
          })}
        </div>

        <div className="bg-[#1c1822]/60 p-4 rounded-xl border border-white/5 space-y-1 text-[11px] leading-relaxed text-[#cbc4d2]/80 text-left">
          <p className="font-bold text-[#cfbcff] flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>{TEXT.noteTitle}</span>
          </p>
          <p className="text-[10.51px]">{TEXT.note}</p>
        </div>
      </AntdCard>
    </div>
  );
}
