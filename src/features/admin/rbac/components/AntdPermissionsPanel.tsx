import { Checkbox, List, Radio, Tag } from 'antd';
import { Key } from 'lucide-react';

import { AntdCard } from '../../../../shared/antd/AntdCard';
import type { WorkspaceProps } from '../types';

type AntdPermissionsPanelProps = Pick<
  WorkspaceProps,
  | 'permissionInventory'
  | 'roles'
  | 'selectedRoleCode'
  | 'activeRoleObj'
  | 'setSelectedRoleCode'
  | 'handleTogglePermission'
>;

const TEXT = {
  title: '\u6743\u9650\u7ed1\u5b9a\u4e0e\u7ec6\u9879\u51b3\u7b56\u77e9\u9635 Mapping',
  desc: '\u9009\u5b9a\u7279\u5b9a\u89d2\u8272\uff0c\u5b9e\u65f6\u52fe\u9009 / \u64a4\u9500\u5176\u8bbf\u95ee\u5b50\u7248\u5757\u548c\u6570\u636e\u6743\u9650\u3002',
  step1: '\u7b2c\u4e00\u6b65\uff1a\u9009\u62e9\u9700\u8981\u8c03\u6574\u7684\u540e\u53f0\u89d2\u8272\u7c7b\u578b',
  step2: '\u7b2c\u4e8c\u6b65\uff1a\u5b9e\u65f6\u6307\u6d3e\u53ca\u6838\u7b97\u529f\u80fd\u6743\u9650',
  enabled: '\u7cfb\u7edf\u7ec6\u9879\u5df2\u542f',
};

export default function AntdPermissionsPanel({
  permissionInventory,
  roles,
  selectedRoleCode,
  activeRoleObj,
  setSelectedRoleCode,
  handleTogglePermission
}: AntdPermissionsPanelProps) {
  return (
    <AntdCard className="alliance-antd-rbac-panel-card">
      <div className="flex flex-col gap-1 pb-3 border-b border-white/5 text-left">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Key className="w-4 h-4 text-amber-400" />
          {TEXT.title}
        </h4>
        <p className="text-[10px] text-[#cbc4d2]/50 font-sans mt-0.5">{TEXT.desc}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left">
        <div className="lg:col-span-4 space-y-3">
          <span className="text-[10px] font-black uppercase text-[#cbc4d2]/40 tracking-wider block text-left">
            {TEXT.step1}
          </span>
          <Radio.Group
            className="alliance-antd-rbac-role-radio"
            onChange={(event) => setSelectedRoleCode(event.target.value)}
            value={selectedRoleCode}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {roles.map(role => (
                <Radio.Button key={role.roleCode} value={role.roleCode}>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-bold">{role.roleName}</span>
                    <Tag className="alliance-antd-rbac-count-tag">{role.permissions.length}</Tag>
                  </div>
                  <span className="text-[9.5px] font-mono text-[#cbc4d2]/40">{role.roleCode}</span>
                </Radio.Button>
              ))}
            </div>
          </Radio.Group>
        </div>

        <div className="lg:col-span-8 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[10px] font-black uppercase text-[#cfbcff] tracking-wider block text-left">
              {TEXT.step2}: {activeRoleObj.roleName}
            </span>
            <span className="font-mono text-[10px] text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-lg border border-emerald-500/10 font-bold">
              {activeRoleObj.permissions.length} / {permissionInventory.length} {TEXT.enabled}
            </span>
          </div>

          <AntdCard className="alliance-antd-rbac-permission-card">
            <List
              className="alliance-antd-rbac-permission-list"
              dataSource={permissionInventory}
              grid={{ gutter: 12, column: 2, xs: 1, sm: 1, md: 2 }}
              renderItem={(permission) => {
                const checked = activeRoleObj.permissions.includes(permission.code);
                return (
                  <List.Item>
                    <Checkbox
                      checked={checked}
                      className="alliance-antd-rbac-permission-checkbox"
                      onChange={() => handleTogglePermission(activeRoleObj.roleCode, permission.code)}
                    >
                      <div className="text-left space-y-0.5">
                        <p className={`font-bold text-xs leading-normal ${checked ? 'text-white' : 'text-[#cbc4d2]/70'}`}>
                          {permission.name}
                          <span className="text-[9px] font-mono text-[#cbc4d2]/35 ml-1.5 font-normal">[{permission.code}]</span>
                        </p>
                        <p className="text-[10px] text-[#cbc4d2]/40 leading-relaxed font-sans font-medium">{permission.description}</p>
                      </div>
                    </Checkbox>
                  </List.Item>
                );
              }}
            />
          </AntdCard>
        </div>
      </div>
    </AntdCard>
  );
}
