import { useState } from 'react';
import {
  getInitialAdminAccounts,
  getInitialRolePermissions
} from '../../../../api/admin/rbac';
import type { AccountStatus, AdminAccount, RbacTab, RolePermission } from '../types';

export function useRbacState() {
  const [roles, setRoles] = useState<RolePermission[]>(() => getInitialRolePermissions());
  const [adminUsers, setAdminUsers] = useState<AdminAccount[]>(() => getInitialAdminAccounts());
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
  };
}
