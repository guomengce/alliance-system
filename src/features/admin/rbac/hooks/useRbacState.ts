import { useEffect, useState } from 'react';
import {
  getAdminAccounts,
  getAdminRolePermissions,
  getPermissionDefinitions
} from '../../../../api/admin/rbac';
import { useAppContext } from '../../../../context/AppContext';
import type {
  AccountStatus,
  AddAccountFormValues,
  AddRoleFormValues,
  AdminAccount,
  EditAccountFormValues,
  RbacTab,
  RolePermission
} from '../types';
import {
  createAdminAccount,
  createRolePermission,
  deleteAdminAccount,
  generatePassword,
  isValidEmail,
  normalizeRoleCode,
  toggleAdminAccountStatus,
  toggleRolePermission,
  updateAdminAccount
} from '../utils';

export function useRbacState() {
  const { triggerGlobalAlert } = useAppContext();
  const [roles, setRoles] = useState<RolePermission[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminAccount[]>([]);
  const [permissionInventory, setPermissionInventory] = useState(() => []);
  const [activeTab, setActiveTab] = useState<RbacTab>('accounts');
  const [selectedRoleCode, setSelectedRoleCode] = useState('SUPER_ADMIN');
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isNewRoleModalOpen, setIsNewRoleModalOpen] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newNickname, setNewNickname] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('OPERATOR');
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleCode, setNewRoleCode] = useState('');
  const [editingAccount, setEditingAccount] = useState<AdminAccount | null>(null);
  const [editNickname, setEditNickname] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRole, setEditRole] = useState('OPERATOR');
  const [editStatus, setEditStatus] = useState<AccountStatus>('active');

  useEffect(() => {
    let mounted = true;

    Promise.all([
      getAdminRolePermissions(),
      getAdminAccounts(),
      getPermissionDefinitions()
    ]).then(([nextRoles, nextAccounts, nextPermissions]) => {
      if (!mounted) return;
      setRoles(nextRoles);
      setAdminUsers(nextAccounts);
      setPermissionInventory(nextPermissions);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const activeRoleObj = roles.find(role => role.roleCode === selectedRoleCode) || roles[0];

  const handleOpenEditAccount = (account: AdminAccount) => {
    setEditingAccount(account);
    setEditNickname(account.nickname);
    setEditEmail(account.email);
    setEditRole(account.role);
    setEditStatus(account.status);
  };

  const handleSaveEditAccount = ({ nickname, email, role, status }: EditAccountFormValues) => {
    if (!editingAccount) return;

    setEditNickname(nickname);
    setEditEmail(email);
    setEditRole(role);
    setEditStatus(status);

    if (!nickname.trim() || !email.trim()) {
      triggerGlobalAlert('请将必填框填写完整！', 'error');
      return;
    }
    if (!isValidEmail(email)) {
      triggerGlobalAlert('请输入合法的邮箱格式。', 'error');
      return;
    }

    setAdminUsers(prev => updateAdminAccount(prev, editingAccount.id, {
      nickname: nickname.trim(),
      email: email.trim(),
      role,
      status
    }));

    triggerGlobalAlert(`管理员档案修改成功，已更新 ${nickname} 的信息和角色。`, 'success');
    setEditingAccount(null);
  };

  const handleResetPassword = (username: string) => {
    const customPassword = prompt(`请输入为管理员 [${username}] 分配的新后台访问密码；留空则自动生成高强度密码。`);
    if (customPassword === null) return;

    const finalPassword = customPassword.trim() || generatePassword();
    triggerGlobalAlert(`访问密码重置完成：管理员 [${username}] 的新登录校验密码为：\n${finalPassword}`, 'success');
  };

  const handleTogglePermission = (roleCode: string, permissionCode: string) => {
    if (roleCode === 'SUPER_ADMIN') {
      triggerGlobalAlert('超级管理员拥有全部权限，系统禁止缩减或改动 SUPER_ADMIN 权限。', 'warning');
      return;
    }

    setRoles(prev => toggleRolePermission(prev, roleCode, permissionCode));
  };

  const handleCreateAccount = ({ username, nickname, email, role }: AddAccountFormValues) => {
    setNewUsername(username);
    setNewNickname(nickname);
    setNewEmail(email);
    setNewRole(role);

    if (!username.trim() || !nickname.trim() || !email.trim()) {
      triggerGlobalAlert('请将必填框填写完整！', 'error');
      return;
    }
    if (!isValidEmail(email)) {
      triggerGlobalAlert('请输入合法的邮箱格式。', 'error');
      return;
    }
    const exists = adminUsers.some(user => user.username.toLowerCase() === username.toLowerCase());
    if (exists) {
      triggerGlobalAlert('此管理员账号名已存在。', 'error');
      return;
    }

    setAdminUsers(prev => [
      ...prev,
      createAdminAccount(prev, {
        username,
        nickname,
        email,
        role
      })
    ]);
    setIsNewAccountModalOpen(false);
    setNewUsername('');
    setNewNickname('');
    setNewEmail('');
    setNewRole('OPERATOR');
    triggerGlobalAlert(`系统账号分配成功，已为 ${nickname} 分配后台入口权限。`, 'success');
  };

  const handleCreateRole = ({ roleName, roleCode }: AddRoleFormValues) => {
    setNewRoleName(roleName);
    setNewRoleCode(roleCode);

    if (!roleName.trim() || !roleCode.trim()) {
      triggerGlobalAlert('请填写完整名称与编码。', 'error');
      return;
    }
    const cleanCode = normalizeRoleCode(roleCode);
    const codeExists = roles.some(role => role.roleCode === cleanCode);
    if (codeExists) {
      triggerGlobalAlert('存在相同编码的角色。', 'error');
      return;
    }

    setRoles(prev => [...prev, createRolePermission(roleName, roleCode)]);
    setSelectedRoleCode(cleanCode);
    setIsNewRoleModalOpen(false);
    setNewRoleName('');
    setNewRoleCode('');
    triggerGlobalAlert(`创建全新角色成功：${roleName} [${cleanCode}]。`, 'success');
  };

  const handleToggleAccountStatus = (id: string) => {
    const target = adminUsers.find(account => account.id === id);
    if (target?.username === 'admin_master') {
      triggerGlobalAlert('安全防线：主管理员 master 为根特权账号，不允许冻结或拉黑。', 'warning');
      return;
    }

    setAdminUsers(prev => toggleAdminAccountStatus(prev, id));
  };

  const handleDeleteAccount = (id: string) => {
    const target = adminUsers.find(account => account.id === id);
    if (target?.username === 'admin_master') {
      triggerGlobalAlert('操作被驳回：底层核心账号不允许执行物理删除。', 'warning');
      return;
    }
    if (confirm(`确认注销并回收管理员（ID: ${id} - ${target?.username}）的全部后台权限吗？`)) {
      setAdminUsers(prev => deleteAdminAccount(prev, id));
    }
  };

  return {
    activeRoleObj,
    activeTab,
    adminUsers,
    editEmail,
    editNickname,
    editRole,
    editStatus,
    editingAccount,
    isNewAccountModalOpen,
    isNewRoleModalOpen,
    newEmail,
    newNickname,
    newRole,
    newRoleCode,
    newRoleName,
    newUsername,
    permissionInventory,
    roles,
    selectedRoleCode,
    setActiveTab,
    setEditEmail,
    setEditNickname,
    setEditRole,
    setEditStatus,
    setEditingAccount,
    setIsNewAccountModalOpen,
    setIsNewRoleModalOpen,
    setNewEmail,
    setNewNickname,
    setNewRole,
    setNewRoleCode,
    setNewRoleName,
    setNewUsername,
    setSelectedRoleCode,
    handleCreateAccount,
    handleCreateRole,
    handleDeleteAccount,
    handleOpenEditAccount,
    handleResetPassword,
    handleSaveEditAccount,
    handleToggleAccountStatus,
    handleTogglePermission
  };
}
