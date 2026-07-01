import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse } from '../types';
import type {
  AdminAccount,
  PermissionDefinition,
  RolePermission
} from '../../features/admin/rbac/types';
import {
  INITIAL_ADMIN_ACCOUNT_DTOS,
  INITIAL_PERMISSION_DEFINITION_DTOS,
  INITIAL_ROLE_PERMISSION_DTOS
} from '../../mock/admin/rbac';

export interface AdminRoleDto {
  roleName: string;
  roleCode: string;
  permissions: string[];
}

export interface AdminAccountDto {
  id: string;
  username: string;
  nickname: string;
  role: string;
  email: string;
  status: AdminAccount['status'];
  lastLoginTime: string;
  lastLoginIp: string;
}

export interface PermissionDefinitionDto {
  code: string;
  name: string;
  description: string;
}

export const adminRbacApi = {
  listRoles: () => (
    apiClient.get<ApiEnvelope<ApiListResponse<AdminRoleDto>>>('/admin/rbac/roles')
  ),
  listAccounts: () => (
    apiClient.get<ApiEnvelope<ApiListResponse<AdminAccountDto>>>('/admin/rbac/accounts')
  ),
  listPermissions: () => (
    apiClient.get<ApiEnvelope<ApiListResponse<PermissionDefinitionDto>>>('/admin/rbac/permissions')
  ),
  updateRole: (roleId: string, payload: Partial<AdminRoleDto>) => (
    apiClient.patch<ApiEnvelope<AdminRoleDto>, Partial<AdminRoleDto>>(`/admin/rbac/roles/${roleId}`, payload)
  )
};

export const mapRolePermissionDto = (dto: AdminRoleDto): RolePermission => ({
  roleName: dto.roleName,
  roleCode: dto.roleCode,
  permissions: dto.permissions
});

export const mapAdminAccountDto = (dto: AdminAccountDto): AdminAccount => ({
  id: dto.id,
  username: dto.username,
  nickname: dto.nickname,
  role: dto.role,
  email: dto.email,
  status: dto.status,
  lastLoginTime: dto.lastLoginTime,
  lastLoginIp: dto.lastLoginIp
});

export const mapPermissionDefinitionDto = (
  dto: PermissionDefinitionDto
): PermissionDefinition => ({
  code: dto.code,
  name: dto.name,
  description: dto.description
});

export const getInitialRolePermissions = (): RolePermission[] => (
  INITIAL_ROLE_PERMISSION_DTOS.map((role) => mapRolePermissionDto(role))
);

export const getInitialAdminAccounts = (): AdminAccount[] => (
  INITIAL_ADMIN_ACCOUNT_DTOS.map((account) => mapAdminAccountDto(account))
);

export const getInitialPermissionDefinitions = (): PermissionDefinition[] => (
  INITIAL_PERMISSION_DEFINITION_DTOS.map((permission) => mapPermissionDefinitionDto(permission))
);

export const getAdminRolePermissions = async (): Promise<RolePermission[]> => {
  const response = await adminRbacApi.listRoles();
  return response.data.items.map((role) => mapRolePermissionDto(role));
};

export const getAdminAccounts = async (): Promise<AdminAccount[]> => {
  const response = await adminRbacApi.listAccounts();
  return response.data.items.map((account) => mapAdminAccountDto(account));
};

export const getPermissionDefinitions = async (): Promise<PermissionDefinition[]> => {
  const response = await adminRbacApi.listPermissions();
  return response.data.items.map((permission) => mapPermissionDefinitionDto(permission));
};
