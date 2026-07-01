import { Button, Form, Input, List, Modal, Select } from 'antd';
import { Check, Edit, Lock, RefreshCw } from 'lucide-react';

import type { AccountStatus, EditAccountModalProps } from '../types';

type AntdEditAccountModalProps = EditAccountModalProps & {
  open: boolean;
};

const TEXT = {
  title: '持权管理账号详情与特权修订',
  subtitle: 'EDIT PRIVILEGED ACCOUNT',
  accountId: '验证账号标识（ID）',
  nickname: '持权管理员姓名 / 昵称（必填）',
  email: '联系与安全警报邮箱（必填）',
  role: '指派核心角色权能机制',
  masterLocked: '根节点初始主管理员 master 的角色挂接锁定为超级管理员，不可降权或更改。',
  permissions: '映射的子版块读写特权范围（权限）',
  emptyPermission: '尚未授予任何板块特殊读写权限',
  status: '安全管制状态设定',
  passwordTitle: '账号密码安全及口令重置',
  passwordDesc: '若由于离线密钥失效、多点异动异常或面临密码重核，建议一键强制重置该持权人的后台访问密码。',
  reset: '重置用户密码（Reset Password）',
  cancel: '关闭取消',
  submit: '保存修改并执行',
};

const STATUS_OPTIONS: Array<{ label: string; value: AccountStatus }> = [
  { label: '活跃就绪（Active Ready）', value: 'active' },
  { label: '临时中止（Suspended Wait）', value: 'suspended' },
  { label: '隔离管控（Isolated Warning）', value: 'isolated' },
];

export default function AntdEditAccountModal({
  open,
  permissionInventory,
  roles,
  editingAccount,
  editNickname,
  editEmail,
  editRole,
  editStatus,
  setEditingAccount,
  setEditNickname,
  setEditEmail,
  setEditRole,
  setEditStatus,
  handleSaveEditAccount,
  handleResetPassword,
}: AntdEditAccountModalProps) {
  const matchedRole = roles.find(role => role.roleCode === editRole);
  const permissions = matchedRole?.permissions ?? [];
  const isMaster = editingAccount.username === 'admin_master';

  return (
    <Modal
      centered
      className="alliance-antd-modal alliance-antd-rbac-modal"
      destroyOnHidden
      footer={null}
      getContainer={false}
      onCancel={() => setEditingAccount(null)}
      open={open}
      width={480}
    >
      <form onSubmit={handleSaveEditAccount} className="alliance-antd-rbac-modal-form">
        <div className="alliance-antd-rbac-modal-header">
          <div className="alliance-antd-rbac-modal-icon is-purple">
            <Edit className="w-4 h-4" />
          </div>
          <div>
            <h4>{TEXT.title}</h4>
            <p>{TEXT.subtitle}</p>
          </div>
        </div>

        <div className="alliance-antd-rbac-readonly-box">
          <span>{TEXT.accountId}</span>
          <strong>
            {editingAccount.username}
            <em>({editingAccount.id})</em>
          </strong>
        </div>

        <Form layout="vertical" className="alliance-antd-rbac-form" component={false}>
          <Form.Item label={TEXT.nickname} required>
            <Input
              value={editNickname}
              onChange={(event) => setEditNickname(event.target.value)}
              placeholder="如 审计主管"
            />
          </Form.Item>
          <Form.Item label={TEXT.email} required>
            <Input
              value={editEmail}
              onChange={(event) => setEditEmail(event.target.value)}
              placeholder="如 boss@alliance.system"
            />
          </Form.Item>
          <Form.Item label={TEXT.role}>
            <Select
              disabled={isMaster}
              value={editRole}
              onChange={setEditRole}
              options={roles.map(role => ({
                label: `${role.roleName} (${role.roleCode})`,
                value: role.roleCode,
              }))}
            />
            {isMaster && <p className="alliance-antd-rbac-lock-tip">{TEXT.masterLocked}</p>}
          </Form.Item>
        </Form>

        <div className="alliance-antd-rbac-permission-preview">
          <span>{TEXT.permissions}</span>
          {permissions.length === 0 ? (
            <p>{TEXT.emptyPermission}</p>
          ) : (
            <List
              dataSource={permissions}
              renderItem={(code) => {
                const permission = permissionInventory.find(item => item.code === code);
                return (
                  <List.Item>
                    <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>
                      {permission?.name || code}
                      <em>[{code}]</em>
                    </span>
                  </List.Item>
                );
              }}
            />
          )}
        </div>

        <Form layout="vertical" className="alliance-antd-rbac-form" component={false}>
          <Form.Item label={TEXT.status}>
            <Select
              disabled={isMaster}
              value={editStatus}
              onChange={setEditStatus}
              options={STATUS_OPTIONS}
            />
          </Form.Item>
        </Form>

        <div className="alliance-antd-rbac-danger-box">
          <div>
            <Lock className="w-3.5 h-3.5" />
            <span>{TEXT.passwordTitle}</span>
          </div>
          <p>{TEXT.passwordDesc}</p>
          <Button
            className="alliance-antd-rbac-reset-button"
            icon={<RefreshCw className="w-3.5 h-3.5" />}
            onClick={() => handleResetPassword(editingAccount.username)}
          >
            {TEXT.reset}
          </Button>
        </div>

        <div className="alliance-antd-rbac-modal-footer">
          <Button className="alliance-antd-rbac-modal-cancel" onClick={() => setEditingAccount(null)}>
            {TEXT.cancel}
          </Button>
          <Button className="alliance-antd-rbac-modal-submit is-green" htmlType="submit">
            {TEXT.submit}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
