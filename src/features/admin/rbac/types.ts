import type { Dispatch, SetStateAction } from 'react';

export interface AdminAccount {
  id: string;
  username: string;
  nickname: string;
  role: string;
  email: string;
  status: 'active' | 'suspended' | 'isolated';
  lastLoginTime: string;
  lastLoginIp: string;
}

export interface RolePermission {
  roleName: string;
  roleCode: string;
  permissions: string[];
}

export interface PermissionDefinition {
  code: string;
  name: string;
  description: string;
}

export type RbacTab = 'accounts' | 'permissions';
export type AccountStatus = AdminAccount['status'];

export interface AddAccountFormValues {
  username: string;
  nickname: string;
  email: string;
  role: string;
}

export interface AddRoleFormValues {
  roleName: string;
  roleCode: string;
}

export interface EditAccountFormValues {
  nickname: string;
  email: string;
  role: string;
  status: AccountStatus;
}

export interface WorkspaceProps {
  permissionInventory: PermissionDefinition[];
  roles: RolePermission[];
  adminUsers: AdminAccount[];
  activeTab: RbacTab;
  selectedRoleCode: string;
  isNewAccountModalOpen: boolean;
  isNewRoleModalOpen: boolean;
  newUsername: string;
  newNickname: string;
  newEmail: string;
  newRole: string;
  newRoleName: string;
  newRoleCode: string;
  editingAccount: AdminAccount | null;
  editNickname: string;
  editEmail: string;
  editRole: string;
  editStatus: AccountStatus;
  activeRoleObj: RolePermission;
  setActiveTab: Dispatch<SetStateAction<RbacTab>>;
  setSelectedRoleCode: Dispatch<SetStateAction<string>>;
  setIsNewAccountModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsNewRoleModalOpen: Dispatch<SetStateAction<boolean>>;
  setNewUsername: Dispatch<SetStateAction<string>>;
  setNewNickname: Dispatch<SetStateAction<string>>;
  setNewEmail: Dispatch<SetStateAction<string>>;
  setNewRole: Dispatch<SetStateAction<string>>;
  setNewRoleName: Dispatch<SetStateAction<string>>;
  setNewRoleCode: Dispatch<SetStateAction<string>>;
  setEditingAccount: Dispatch<SetStateAction<AdminAccount | null>>;
  setEditNickname: Dispatch<SetStateAction<string>>;
  setEditEmail: Dispatch<SetStateAction<string>>;
  setEditRole: Dispatch<SetStateAction<string>>;
  setEditStatus: Dispatch<SetStateAction<AccountStatus>>;
  handleOpenEditAccount: (u: AdminAccount) => void;
  handleSaveEditAccount: (values: EditAccountFormValues) => void;
  handleResetPassword: (username: string) => void;
  handleTogglePermission: (roleCode: string, permissionCode: string) => void;
  handleCreateAccount: (values: AddAccountFormValues) => void;
  handleCreateRole: (values: AddRoleFormValues) => void;
  handleToggleAccountStatus: (id: string) => void;
  handleDeleteAccount: (id: string) => void;
}

export type AddAccountModalProps = Pick<
  WorkspaceProps,
  | 'roles'
  | 'newUsername'
  | 'newNickname'
  | 'newEmail'
  | 'newRole'
  | 'setIsNewAccountModalOpen'
  | 'setNewUsername'
  | 'setNewNickname'
  | 'setNewEmail'
  | 'setNewRole'
  | 'handleCreateAccount'
>;

export type AddRoleModalProps = Pick<
  WorkspaceProps,
  | 'newRoleName'
  | 'newRoleCode'
  | 'setIsNewRoleModalOpen'
  | 'setNewRoleName'
  | 'setNewRoleCode'
  | 'handleCreateRole'
>;

export type EditAccountModalProps = Omit<
  Pick<
    WorkspaceProps,
    | 'permissionInventory'
    | 'roles'
    | 'editingAccount'
    | 'editNickname'
    | 'editEmail'
    | 'editRole'
    | 'editStatus'
    | 'setEditingAccount'
    | 'setEditNickname'
    | 'setEditEmail'
    | 'setEditRole'
    | 'setEditStatus'
    | 'handleSaveEditAccount'
    | 'handleResetPassword'
  >,
  'editingAccount'
> & {
  editingAccount: AdminAccount;
};
