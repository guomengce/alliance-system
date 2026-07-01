import { Button, Form, Input, Modal } from 'antd';
import { Sliders } from 'lucide-react';

import type { AddRoleModalProps } from '../types';

type AntdAddRoleModalProps = AddRoleModalProps & {
  open: boolean;
};

const TEXT = {
  title: '建立全新的后台细分管理角色',
  subtitle: 'DEFINE CUSTOM SECURITY ROLE',
  roleName: '设计角色名称（必填）',
  roleCode: '唯一角色精算编码（大写字母 / 下划线）',
  cancel: '取消',
  submit: '确认创建角色档案',
};

export default function AntdAddRoleModal({
  open,
  newRoleName,
  newRoleCode,
  setIsNewRoleModalOpen,
  setNewRoleName,
  setNewRoleCode,
  handleCreateRole,
}: AntdAddRoleModalProps) {
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
      <form onSubmit={handleCreateRole} className="alliance-antd-rbac-modal-form">
        <div className="alliance-antd-rbac-modal-header">
          <div className="alliance-antd-rbac-modal-icon is-amber">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h4>{TEXT.title}</h4>
            <p>{TEXT.subtitle}</p>
          </div>
        </div>

        <Form layout="vertical" className="alliance-antd-rbac-form" component={false}>
          <Form.Item label={TEXT.roleName} required>
            <Input
              value={newRoleName}
              onChange={(event) => setNewRoleName(event.target.value)}
              placeholder="如 全球结算审核官"
            />
          </Form.Item>
          <Form.Item label={TEXT.roleCode} required>
            <Input
              value={newRoleCode}
              onChange={(event) => setNewRoleCode(event.target.value)}
              placeholder="如 GLOBAL_CLEARING_OFFICER"
            />
          </Form.Item>
        </Form>

        <div className="alliance-antd-rbac-modal-footer">
          <Button className="alliance-antd-rbac-modal-cancel" onClick={() => setIsNewRoleModalOpen(false)}>
            {TEXT.cancel}
          </Button>
          <Button className="alliance-antd-rbac-modal-submit is-purple" htmlType="submit">
            {TEXT.submit}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
