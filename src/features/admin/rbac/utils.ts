import type { AccountStatus, AdminAccount, RolePermission } from './types';

export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const normalizeRoleCode = (roleCode: string) => roleCode.toUpperCase().replace(/\s+/g, '_');

export const generatePassword = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%&*';
  let autoPwd = '';
  for (let i = 0; i < 15; i++) {
    autoPwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return autoPwd;
};

export const updateAdminAccount = (
  accounts: AdminAccount[],
  accountId: string,
  updates: Pick<AdminAccount, 'nickname' | 'email' | 'role' | 'status'>
) => accounts.map(account => (
  account.id === accountId
    ? { ...account, ...updates }
    : account
));

export const toggleRolePermission = (
  roles: RolePermission[],
  roleCode: string,
  permissionCode: string
) => roles.map(role => {
  if (role.roleCode !== roleCode) return role;

  const exists = role.permissions.includes(permissionCode);
  return {
    ...role,
    permissions: exists
      ? role.permissions.filter(permission => permission !== permissionCode)
      : [...role.permissions, permissionCode]
  };
});

interface CreateAdminAccountInput {
  username: string;
  nickname: string;
  email: string;
  role: string;
}

export const createAdminAccount = (
  accounts: AdminAccount[],
  input: CreateAdminAccountInput
): AdminAccount => ({
  id: `ACC-00${accounts.length + 1}`,
  username: input.username.trim(),
  nickname: input.nickname.trim(),
  role: input.role,
  email: input.email.trim(),
  status: 'active',
  lastLoginTime: '未曾登录',
  lastLoginIp: '127.0.0.1'
});

export const createRolePermission = (
  roleName: string,
  roleCode: string
): RolePermission => ({
  roleName: roleName.trim(),
  roleCode: normalizeRoleCode(roleCode),
  permissions: []
});

export const toggleAdminAccountStatus = (
  accounts: AdminAccount[],
  accountId: string
) => accounts.map(account => {
  if (account.id !== accountId) return account;

  const nextStatus: AccountStatus = account.status === 'active' ? 'suspended' : 'active';
  return { ...account, status: nextStatus };
});

export const deleteAdminAccount = (
  accounts: AdminAccount[],
  accountId: string
) => accounts.filter(account => account.id !== accountId);
