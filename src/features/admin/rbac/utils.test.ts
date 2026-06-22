import { describe, expect, it } from 'vitest';
import type { AdminAccount, RolePermission } from './types';
import {
  createAdminAccount,
  createRolePermission,
  deleteAdminAccount,
  toggleAdminAccountStatus,
  toggleRolePermission,
  updateAdminAccount
} from './utils';

const accounts: AdminAccount[] = [
  {
    id: 'ACC-001',
    username: 'admin',
    nickname: 'Admin',
    role: 'SUPER_ADMIN',
    email: 'admin@example.com',
    status: 'active',
    lastLoginTime: '2026-06-22',
    lastLoginIp: '127.0.0.1'
  }
];

const roles: RolePermission[] = [
  {
    roleName: 'Operator',
    roleCode: 'OPERATOR',
    permissions: ['USER_MANAGE']
  }
];

describe('rbac utils', () => {
  it('updates an admin account profile', () => {
    expect(updateAdminAccount(accounts, 'ACC-001', {
      nickname: 'Root',
      email: 'root@example.com',
      role: 'OPERATOR',
      status: 'suspended'
    })[0]).toMatchObject({
      nickname: 'Root',
      email: 'root@example.com',
      role: 'OPERATOR',
      status: 'suspended'
    });
  });

  it('toggles role permissions', () => {
    expect(toggleRolePermission(roles, 'OPERATOR', 'PLAN_MANAGE')[0].permissions)
      .toEqual(['USER_MANAGE', 'PLAN_MANAGE']);
    expect(toggleRolePermission(roles, 'OPERATOR', 'USER_MANAGE')[0].permissions)
      .toEqual([]);
  });

  it('creates admin accounts and roles with normalized ids', () => {
    expect(createAdminAccount(accounts, {
      username: 'risk',
      nickname: 'Risk',
      email: 'risk@example.com',
      role: 'RISK_OFFICER'
    })).toMatchObject({
      id: 'ACC-002',
      status: 'active',
      lastLoginIp: '127.0.0.1'
    });

    expect(createRolePermission('Finance Director', 'finance dir')).toEqual({
      roleName: 'Finance Director',
      roleCode: 'FINANCE_DIR',
      permissions: []
    });
  });

  it('toggles and deletes admin accounts', () => {
    expect(toggleAdminAccountStatus(accounts, 'ACC-001')[0].status).toBe('suspended');
    expect(deleteAdminAccount(accounts, 'ACC-001')).toEqual([]);
  });
});
