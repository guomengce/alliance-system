import { useEffect } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import { UserCheck } from 'lucide-react';

import type { AddAccountFormValues, AddAccountModalProps } from '../types';

type AntdAddAccountModalProps = AddAccountModalProps & {
  open: boolean;
};

const TEXT = {
  title: '分配授权新后台管理员账号',
  subtitle: 'CREATE BACKOFFICE ENTRANCE',
  username: '设置登录账号名（必填/唯一）',
  nickname: '管理员真实姓名 / 昵称名称（必填）',
  email: '工作邮箱地址（必填）',
  role: '指派初始关联角色',
  cancel: '取消',
  submit: '授权新管理员并激活',
};

export default function AntdAddAccountModal({
  open,
  roles,
  newUsername,
  newNickname,
  newEmail,
  newRole,
  setIsNewAccountModalOpen,
  handleCreateAccount,
}: AntdAddAccountModalProps) {
  const [form] = Form.useForm<AddAccountFormValues>();

  useEffect(() => {
    form.setFieldsValue({
      username: newUsername,
      nickname: newNickname,
      email: newEmail,
      role: newRole
    });
  }, [form, newEmail, newNickname, newRole, newUsername]);

  return (
    <Modal
      centered
      className="alliance-antd-modal alliance-antd-rbac-modal"
      destroyOnHidden
      footer={null}
      getContainer={false}
      onCancel={() => setIsNewAccountModalOpen(false)}
      open={open}
      width={448}
    >
      <div className="alliance-antd-rbac-modal-header">
        <div className="alliance-antd-rbac-modal-icon is-purple">
          <UserCheck className="w-4 h-4" />
        </div>
        <div>
          <h4>{TEXT.title}</h4>
          <p>{TEXT.subtitle}</p>
        </div>
      </div>

      <Form
        form={form}
        layout="vertical"
        className="alliance-antd-rbac-form alliance-antd-rbac-modal-form"
        onFinish={handleCreateAccount}
      >
        <Form.Item name="username" label={TEXT.username} required>
          <Input placeholder="如 finance_ops_mary" />
        </Form.Item>
        <Form.Item name="nickname" label={TEXT.nickname} required>
          <Input placeholder="如 审计代表 Mary" />
        </Form.Item>
        <Form.Item name="email" label={TEXT.email} required>
          <Input placeholder="如 mary@alliance.system" />
        </Form.Item>
        <Form.Item name="role" label={TEXT.role}>
          <Select
            options={roles.map(role => ({
              label: `${role.roleName} (${role.roleCode})`,
              value: role.roleCode,
            }))}
          />
        </Form.Item>

        <div className="alliance-antd-rbac-modal-footer">
          <Button className="alliance-antd-rbac-modal-cancel" onClick={() => setIsNewAccountModalOpen(false)}>
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
