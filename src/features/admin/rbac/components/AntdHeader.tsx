import { Button, Tabs, type TabsProps } from 'antd';
import { Key, Plus, ShieldCheck, UserPlus, Users } from 'lucide-react';

import type { WorkspaceProps } from '../types';

type AntdHeaderProps = Pick<
  WorkspaceProps,
  | 'activeTab'
  | 'adminUsers'
  | 'roles'
  | 'setActiveTab'
  | 'setIsNewAccountModalOpen'
  | 'setIsNewRoleModalOpen'
>;

const TEXT = {
  title: '\u7ba1\u6838\u63a7\u5236\u4e2d\u5fc3 & RBAC \u6743\u9650\u7f51\u683c',
  desc: '\u57fa\u4e8e\u89d2\u8272\u8bbf\u95ee\u63a7\u5236\u6a21\u578b (RBAC) \u9694\u79bb\u8fd0\u8425\u3001\u98ce\u63a7\u4e0e\u5e95\u5c42\u7ed3\u7b97\uff0c\u63d0\u4f9b\u9ad8\u7b49\u7ea7\u5206\u6743\u7ba1\u7406\u4e0e\u5b9e\u65f6\u6388\u6743\u3002',
  accounts: '\u7ba1\u6838\u4eba\u5458',
  permissions: '\u6743\u9650\u51b3\u7b56\u7801',
  newRole: '\u65b0\u89d2\u8272',
  newAccount: '\u5206\u62e8\u7ba1\u7406\u5458',
};

export default function AntdHeader({
  activeTab,
  adminUsers,
  roles,
  setActiveTab,
  setIsNewAccountModalOpen,
  setIsNewRoleModalOpen
}: AntdHeaderProps) {
  const items: TabsProps['items'] = [
    {
      key: 'accounts',
      label: (
        <span className="inline-flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5" />
          {TEXT.accounts} ({adminUsers.length})
        </span>
      ),
    },
    {
      key: 'permissions',
      label: (
        <span className="inline-flex items-center gap-1.5">
          <Key className="w-3.5 h-3.5" />
          {TEXT.permissions} ({roles.length})
        </span>
      ),
    },
  ];

  return (
    <div className="glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119]/90 space-y-4">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="space-y-1">
          <h3 className="text-sm md:text-base font-black text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#cfbcff]" />
            <span>{TEXT.title}</span>
          </h3>
          <p className="text-[11px] text-[#cbc4d2]/50 leading-relaxed font-sans max-w-2xl">
            {TEXT.desc}
          </p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            className="alliance-antd-rbac-secondary-button"
            icon={<Plus className="w-3.5 h-3.5" />}
            onClick={() => setIsNewRoleModalOpen(true)}
          >
            {TEXT.newRole}
          </Button>
          <Button
            className="alliance-antd-rbac-primary-button"
            icon={<UserPlus className="w-3.5 h-3.5" />}
            onClick={() => setIsNewAccountModalOpen(true)}
          >
            {TEXT.newAccount}
          </Button>
        </div>
      </div>

      <Tabs
        activeKey={activeTab}
        className="alliance-antd-rbac-tabs"
        items={items}
        onChange={(key) => setActiveTab(key as WorkspaceProps['activeTab'])}
      />
    </div>
  );
}
