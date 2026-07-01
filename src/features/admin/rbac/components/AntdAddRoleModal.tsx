import { useEffect } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { Sliders } from 'lucide-react';

import type { AddRoleFormValues, AddRoleModalProps } from '../types';

type AntdAddRoleModalProps = AddRoleModalProps & {
  open: boolean;
};

const TEXT = {
  title: '建立全新的后台细分管理角色',
  subtitle: 'DEFINE CUSTOM SECURITY ROLE',
  roleName: '设计角色名称（必填）',
  roleCode: '唯一角色编码（大写字母 / 下划线）',
  cancel: '取消',
  submit: '确认创建角色档案',
};

export default function AntdAddRoleModal({
  open,
  newRoleName,
  newRoleCode,
  setIsNewRoleModalOpen,
  handleCreateRole,
}: AntdAddRoleModalProps) {
  const [form] = Form.useForm<AddRoleFormValues>();

  useEffect(() => {
    form.setFieldsValue({
      roleName: newRoleName,
      roleCode: newRoleCode
    });
  }, [form, newRoleCode, newRoleName]);

  return (
    <Modal
      centered
      className="alliance-antd-modal alliance-antd-rbac-modal"
      destroyOnHidden
      footer={null}
      getContainer={false}
      onCancel={() => setIsNewRoleModalOpen(false)}
      open={open}
      width={448}
    >
      <div className="alliance-antd-rbac-modal-header">
        <div className="alliance-antd-rbac-modal-icon is-amber">
          <Sliders className="w-4 h-4" />
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
        onFinish={handleCreateRole}
      >
        <Form.Item name="roleName" label={TEXT.roleName} required>
          <Input placeholder="如 全球结算审核员" />
        </Form.Item>
        <Form.Item name="roleCode" label={TEXT.roleCode} required>
          <Input placeholder="如 GLOBAL_CLEARING_OFFICER" />
        </Form.Item>

        <div className="alliance-antd-rbac-modal-footer">
          <Button className="alliance-antd-rbac-modal-cancel" onClick={() => setIsNewRoleModalOpen(false)}>
            {TEXT.cancel}
          </Button>
          <Button className="alliance-antd-rbac-modal-submit is-purple" htmlType="submit" type="primary">
            {TEXT.submit}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
