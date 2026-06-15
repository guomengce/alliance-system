import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse } from '../types';

export type AdminRoleDto = Record<string, unknown>;

export const adminRbacApi = {
  listRoles: () => (
    apiClient.get<ApiEnvelope<ApiListResponse<AdminRoleDto>>>('/admin/rbac/roles')
  ),
  updateRole: (roleId: string, payload: Partial<AdminRoleDto>) => (
    apiClient.patch<ApiEnvelope<AdminRoleDto>, Partial<AdminRoleDto>>(`/admin/rbac/roles/${roleId}`, payload)
  )
};
