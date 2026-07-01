import { useEffect } from 'react';
import { Button, Form, Input, List, Modal, Select } from 'antd';
import { Check, Edit, Lock, RefreshCw } from 'lucide-react';

import type { AccountStatus, EditAccountFormValues, EditAccountModalProps } from '../types';

type AntdEditAccountModalProps = EditAccountModalProps & {
  open: boolean;
};

const TEXT = {
  title: '持权管理账号详情与特权修订',
  subtitle: 'EDIT PRIVILEGED ACCOUNT',
  accountId: '验证账号标识（ID）',
  nickname: '持权管理员姓名 / 昵称（必填）',
  email: '联系与安全警报邮箱（必填）',
  role: '指派核心角色机制',
  masterLocked: '根节点主管理员 master 的角色挂接锁定为超级管理员，不可降权或更改。',
  permissions: '映射的子模块读写特权范围（权限）',
  emptyPermission: '尚未授予任何板块特殊读写权限',
  status: '安全管控状态设定',
  passwordTitle: '账号密码安全及口令重置',
  passwordDesc: '如遇离线密钥失效、多点异动异常或需要密码复核，可一键强制重置该持权人的后台访问密码。',
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
  handleSaveEditAccount,
  handleResetPassword,
}: AntdEditAccountModalProps) {
  const [form] = Form.useForm<EditAccountFormValues>();
  const matchedRole = roles.find(role => role.roleCode === editRole);
  const permissions = matchedRole?.permissions ?? [];
  const isMaster = editingAccount.username === 'admin_master';

  useEffect(() => {
    form.setFieldsValue({
      nickname: editNickname,
      email: editEmail,
      role: editRole,
      status: editStatus
    });
  }, [editEmail, editNickname, editRole, editStatus, form]);

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

      <Form
        form={form}
        layout="vertical"
        className="alliance-antd-rbac-form alliance-antd-rbac-modal-form"
        onFinish={handleSaveEditAccount}
      >
        <Form.Item name="nickname" label={TEXT.nickname} required>
          <Input placeholder="如 审计主管" />
        </Form.Item>
        <Form.Item name="email" label={TEXT.email} required>
          <Input placeholder="如 boss@alliance.system" />
        </Form.Item>
        <Form.Item name="role" label={TEXT.role}>
          <Select
            disabled={isMaster}
            options={roles.map(role => ({
              label: `${role.roleName} (${role.roleCode})`,
              value: role.roleCode,
            }))}
          />
          {isMaster && <p className="alliance-antd-rbac-lock-tip">{TEXT.masterLocked}</p>}
        </Form.Item>

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

        <Form.Item name="status" label={TEXT.status}>
          <Select disabled={isMaster} options={STATUS_OPTIONS} />
        </Form.Item>

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
          <Button className="alliance-antd-rbac-modal-submit is-green" htmlType="submit" type="primary">
            {TEXT.submit}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
