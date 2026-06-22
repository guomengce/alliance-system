import { describe, expect, it } from 'vitest';
import {
  INITIAL_ADMIN_ACCOUNT_DTOS,
  INITIAL_PERMISSION_DEFINITION_DTOS,
  INITIAL_ROLE_PERMISSION_DTOS
} from '../../mock/admin/rbac';
import {
  getInitialAdminAccounts,
  getInitialPermissionDefinitions,
  getInitialRolePermissions,
  mapAdminAccountDto,
  mapPermissionDefinitionDto,
  mapRolePermissionDto
} from './rbac';

describe('admin rbac mappers', () => {
  it('maps role, account, and permission DTOs into view models', () => {
    expect(mapRolePermissionDto({
      roleName: 'Operator',
      roleCode: 'OPERATOR',
      permissions: ['USER_MANAGE']
    })).toEqual({
      roleName: 'Operator',
      roleCode: 'OPERATOR',
      permissions: ['USER_MANAGE']
    });

    expect(mapAdminAccountDto({
      id: 'ACC-1',
      username: 'admin',
      nickname: 'Admin',
      role: 'OPERATOR',
      email: 'admin@example.com',
      status: 'active',
      lastLoginTime: '2026-06-22 12:00:00',
      lastLoginIp: '127.0.0.1'
    })).toEqual({
      id: 'ACC-1',
      username: 'admin',
      nickname: 'Admin',
      role: 'OPERATOR',
      email: 'admin@example.com',
      status: 'active',
      lastLoginTime: '2026-06-22 12:00:00',
      lastLoginIp: '127.0.0.1'
    });

    expect(mapPermissionDefinitionDto({
      code: 'USER_MANAGE',
      name: 'User Manage',
      description: 'Manage users'
    })).toEqual({
      code: 'USER_MANAGE',
      name: 'User Manage',
      description: 'Manage users'
    });
  });

  it('returns initial rbac data as fresh arrays', () => {
    expect(getInitialRolePermissions()).toHaveLength(INITIAL_ROLE_PERMISSION_DTOS.length);
    expect(getInitialAdminAccounts()).toHaveLength(INITIAL_ADMIN_ACCOUNT_DTOS.length);
    expect(getInitialPermissionDefinitions()).toHaveLength(INITIAL_PERMISSION_DEFINITION_DTOS.length);
    expect(getInitialRolePermissions()).not.toBe(getInitialRolePermissions());
    expect(getInitialAdminAccounts()).not.toBe(getInitialAdminAccounts());
    expect(getInitialPermissionDefinitions()).not.toBe(getInitialPermissionDefinitions());
  });
});
