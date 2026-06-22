import type { FormEvent } from 'react';
import { getInitialPermissionDefinitions } from '../../../api/admin/rbac';
import { Workspace } from './components/Workspace';
import { useRbacState } from './hooks/useRbacState';
import type { AdminAccount, RolePermission } from './types';
import {
  generatePassword,
  isValidEmail,
  normalizeRoleCode
} from './utils';

export default function AdminRbacView() {
  const permissionInventory = getInitialPermissionDefinitions();
  const {
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
    roles,
    selectedRoleCode,
    setActiveTab,
    setAdminUsers,
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
    setRoles,
    setSelectedRoleCode
  } = useRbacState();

  const handleOpenEditAccount = (u: AdminAccount) => {
    setEditingAccount(u);
    setEditNickname(u.nickname);
    setEditEmail(u.email);
    setEditRole(u.role);
    setEditStatus(u.status);
  };

  const handleSaveEditAccount = (e: FormEvent) => {
    e.preventDefault();
    if (!editingAccount) return;
    if (!editNickname.trim() || !editEmail.trim()) {
      alert('请将必填框填写完整！');
      return;
    }
    if (!isValidEmail(editEmail)) {
      alert('请输入合法的邮箱格式！');
      return;
    }

    setAdminUsers(prev => prev.map(u => {
      if (u.id === editingAccount.id) {
        return {
          ...u,
          nickname: editNickname.trim(),
          email: editEmail.trim(),
          role: editRole,
          status: editStatus
        };
      }
      return u;
    }));

    alert(`【管理员档案修改成功】\n已成功将「${editNickname}」的信息和角色挂接完成热载部署更新！`);
    setEditingAccount(null);
  };

  const handleResetPassword = (username: string) => {
    const customPassword = prompt(`请输入为持权管理员 [${username}] 分配的新后台操作访问密钥，或留空来随机生成高危防护密钥码：`);
    if (customPassword === null) return; // Cancelled

    let finalPwd = customPassword.trim();
    if (!finalPwd) {
      finalPwd = generatePassword();
    }

    alert(`【🔑 访问密码重塑就绪】\n\n已成功为该同盟核心账户 [${username}] 触发安全机制重置！\n\n管理员 [${username}] 的新登录校验初始密码为：\n${finalPwd}\n\n* 会员档案口令已被新哈希值强制覆盖，请速将其离线保存在管理员隔离库。`);
  };

  // Toggle state permissions for current role
  const handleTogglePermission = (roleCode: string, permissionCode: string) => {
    if (roleCode === 'SUPER_ADMIN') {
      alert('【安全管控警告】超级管理员拥有一切无上限特权，系统禁止缩减或改动 SUPER_ADMIN 权限域！');
      return;
    }
    setRoles(prev => prev.map(r => {
      if (r.roleCode === roleCode) {
        const exists = r.permissions.includes(permissionCode);
        const updatedPermissions = exists
          ? r.permissions.filter(p => p !== permissionCode)
          : [...r.permissions, permissionCode];
        return { ...r, permissions: updatedPermissions };
      }
      return r;
    }));
  };

  // Add new account
  const handleCreateAccount = (e: FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim() || !newNickname.trim() || !newEmail.trim()) {
      alert('请将必填框填写完整！');
      return;
    }
    if (!isValidEmail(newEmail)) {
      alert('请输入合法的邮箱格式！');
      return;
    }
    const exists = adminUsers.some(u => u.username.toLowerCase() === newUsername.toLowerCase());
    if (exists) {
      alert('此管理员账号名已存在！');
      return;
    }

    const newAcc: AdminAccount = {
      id: `ACC-00${adminUsers.length + 1}`,
      username: newUsername.trim(),
      nickname: newNickname.trim(),
      role: newRole,
      email: newEmail.trim(),
      status: 'active',
      lastLoginTime: '未曾登录',
      lastLoginIp: '127.0.0.1'
    };

    setAdminUsers([...adminUsers, newAcc]);
    setIsNewAccountModalOpen(false);
    // Reset
    setNewUsername('');
    setNewNickname('');
    setNewEmail('');
    setNewRole('OPERATOR');
    alert(`【系统账户分配成功】\n已成功为「${newNickname}」分拨后台入口权限！其专属权限已与「${newRole}」角色进行联动挂载。`);
  };

  // Add custom Role code
  const handleCreateRole = (e: FormEvent) => {
    e.preventDefault();
    if (!newRoleName.trim() || !newRoleCode.trim()) {
      alert('请填写完整名称与编码！');
      return;
    }
    const cleanCode = normalizeRoleCode(newRoleCode);
    const codeExists = roles.some(r => r.roleCode === cleanCode);
    if (codeExists) {
      alert('存在相同编码的代码角色！');
      return;
    }

    const newRoleObj: RolePermission = {
      roleName: newRoleName.trim(),
      roleCode: cleanCode,
      permissions: []
    };

    setRoles([...roles, newRoleObj]);
    setSelectedRoleCode(cleanCode);
    setIsNewRoleModalOpen(false);
    setNewRoleName('');
    setNewRoleCode('');
    alert(`【创建全新角色成功】\n已建立角色「${newRoleName}」[${cleanCode}]，现在您可实时在权限网格中勾选激活其分权细节。`);
  };

  // Toggle account status
  const handleToggleAccountStatus = (id: string) => {
    const target = adminUsers.find(a => a.id === id);
    if (target?.username === 'admin_master') {
      alert('安全防御：主主管理员 master 被判定为根特权不可篡改节点，系统决不允许冻结或拉黑该初始管理员！');
      return;
    }
    setAdminUsers(prev => prev.map(a => {
      if (a.id === id) {
        const nextStatus = a.status === 'active' ? 'suspended' : 'active';
        return { ...a, status: nextStatus };
      }
      return a;
    }));
  };

  // Delete account of admin
  const handleDeleteAccount = (id: string) => {
    const target = adminUsers.find(a => a.id === id);
    if (target?.username === 'admin_master') {
      alert('操作被驳回：底核心账号主代表不允许执行物理删除！');
      return;
    }
    if (confirm(`【操作警告】确认要彻底注销并回收该管理员（UID: ${id} - ${target?.username}）的全部后门读写权限吗？一旦注销其所有凭据将立即失效。`)) {
      setAdminUsers(prev => prev.filter(a => a.id !== id));
    }
  };


  return (
    <Workspace
      permissionInventory={permissionInventory}
      roles={roles}
      adminUsers={adminUsers}
      activeTab={activeTab}
      selectedRoleCode={selectedRoleCode}
      isNewAccountModalOpen={isNewAccountModalOpen}
      isNewRoleModalOpen={isNewRoleModalOpen}
      newUsername={newUsername}
      newNickname={newNickname}
      newEmail={newEmail}
      newRole={newRole}
      newRoleName={newRoleName}
      newRoleCode={newRoleCode}
      editingAccount={editingAccount}
      editNickname={editNickname}
      editEmail={editEmail}
      editRole={editRole}
      editStatus={editStatus}
      activeRoleObj={activeRoleObj}
      setActiveTab={setActiveTab}
      setSelectedRoleCode={setSelectedRoleCode}
      setIsNewAccountModalOpen={setIsNewAccountModalOpen}
      setIsNewRoleModalOpen={setIsNewRoleModalOpen}
      setNewUsername={setNewUsername}
      setNewNickname={setNewNickname}
      setNewEmail={setNewEmail}
      setNewRole={setNewRole}
      setNewRoleName={setNewRoleName}
      setNewRoleCode={setNewRoleCode}
      setEditingAccount={setEditingAccount}
      setEditNickname={setEditNickname}
      setEditEmail={setEditEmail}
      setEditRole={setEditRole}
      setEditStatus={setEditStatus}
      handleOpenEditAccount={handleOpenEditAccount}
      handleSaveEditAccount={handleSaveEditAccount}
      handleResetPassword={handleResetPassword}
      handleTogglePermission={handleTogglePermission}
      handleCreateAccount={handleCreateAccount}
      handleCreateRole={handleCreateRole}
      handleToggleAccountStatus={handleToggleAccountStatus}
      handleDeleteAccount={handleDeleteAccount}
    />
  );
}
