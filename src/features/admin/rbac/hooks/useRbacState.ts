import { useState, type FormEvent } from 'react';
import {
  getInitialAdminAccounts,
  getInitialPermissionDefinitions,
  getInitialRolePermissions
} from '../../../../api/admin/rbac';
import { useAppContext } from '../../../../context/AppContext';
import type { AccountStatus, AdminAccount, RbacTab, RolePermission } from '../types';
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
  const [roles, setRoles] = useState<RolePermission[]>(() => getInitialRolePermissions());
  const [adminUsers, setAdminUsers] = useState<AdminAccount[]>(() => getInitialAdminAccounts());
  const [permissionInventory] = useState(() => getInitialPermissionDefinitions());
  const [activeTab, setActiveTab] = useState<RbacTab>('accounts');
  const [selectedRoleCode, setSelectedRoleCode] = useState<string>('SUPER_ADMIN');
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

  const activeRoleObj = roles.find(r => r.roleCode === selectedRoleCode) || roles[0];

  const handleOpenEditAccount = (account: AdminAccount) => {
    setEditingAccount(account);
    setEditNickname(account.nickname);
    setEditEmail(account.email);
    setEditRole(account.role);
    setEditStatus(account.status);
  };

  const handleSaveEditAccount = (event: FormEvent) => {
    event.preventDefault();
    if (!editingAccount) return;
    if (!editNickname.trim() || !editEmail.trim()) {
      triggerGlobalAlert('请将必填框填写完整！', 'error');
      return;
    }
    if (!isValidEmail(editEmail)) {
      triggerGlobalAlert('请输入合法的邮箱格式。', 'error');
      return;
    }

    setAdminUsers(prev => updateAdminAccount(prev, editingAccount.id, {
      nickname: editNickname.trim(),
      email: editEmail.trim(),
      role: editRole,
      status: editStatus
    }));

    triggerGlobalAlert(`【管理员档案修改成功】\n已成功将“${editNickname}”的信息和角色挂接完成热更新。`, 'success');
    setEditingAccount(null);
  };

  const handleResetPassword = (username: string) => {
    const customPassword = prompt(`请输入为管理员 [${username}] 分配的新后台访问密码；留空则自动生成高强度密码。`);
    if (customPassword === null) return;

    const finalPassword = customPassword.trim() || generatePassword();
    triggerGlobalAlert(`【访问密码重置完成】\n管理员 [${username}] 的新登录校验密码为：\n${finalPassword}`, 'success');
  };

  const handleTogglePermission = (roleCode: string, permissionCode: string) => {
    if (roleCode === 'SUPER_ADMIN') {
      triggerGlobalAlert('【安全管控警告】超级管理员拥有全部权限，系统禁止缩减或改动 SUPER_ADMIN 权限。', 'warning');
      return;
    }

    setRoles(prev => toggleRolePermission(prev, roleCode, permissionCode));
  };

  const handleCreateAccount = (event: FormEvent) => {
    event.preventDefault();
    if (!newUsername.trim() || !newNickname.trim() || !newEmail.trim()) {
      triggerGlobalAlert('请将必填框填写完整！', 'error');
      return;
    }
    if (!isValidEmail(newEmail)) {
      triggerGlobalAlert('请输入合法的邮箱格式。', 'error');
      return;
    }
    const exists = adminUsers.some(user => user.username.toLowerCase() === newUsername.toLowerCase());
    if (exists) {
      triggerGlobalAlert('此管理员账号名已存在。', 'error');
      return;
    }

    setAdminUsers(prev => [
      ...prev,
      createAdminAccount(prev, {
        username: newUsername,
        nickname: newNickname,
        email: newEmail,
        role: newRole
      })
    ]);
    setIsNewAccountModalOpen(false);
    setNewUsername('');
    setNewNickname('');
    setNewEmail('');
    setNewRole('OPERATOR');
    triggerGlobalAlert(`【系统账号分配成功】\n已成功为“${newNickname}”分拨后台入口权限，专属权限已与“${newRole}”角色联动挂载。`, 'success');
  };

  const handleCreateRole = (event: FormEvent) => {
    event.preventDefault();
    if (!newRoleName.trim() || !newRoleCode.trim()) {
      triggerGlobalAlert('请填写完整名称与编码。', 'error');
      return;
    }
    const cleanCode = normalizeRoleCode(newRoleCode);
    const codeExists = roles.some(role => role.roleCode === cleanCode);
    if (codeExists) {
      triggerGlobalAlert('存在相同编码的角色。', 'error');
      return;
    }

    setRoles(prev => [...prev, createRolePermission(newRoleName, newRoleCode)]);
    setSelectedRoleCode(cleanCode);
    setIsNewRoleModalOpen(false);
    setNewRoleName('');
    setNewRoleCode('');
    triggerGlobalAlert(`【创建全新角色成功】\n已建立角色“${newRoleName}”[${cleanCode}]，现在可在权限网格中勾选分权细节。`, 'success');
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
    if (confirm(`【操作警告】确认注销并回收管理员（UID: ${id} - ${target?.username}）的全部后台权限吗？`)) {
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
