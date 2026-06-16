import type { WorkspaceProps } from '../types';
import AccountsPanel from './AccountsPanel';
import { AddAccountModal } from './AddAccountModal';
import { AddRoleModal } from './AddRoleModal';
import { EditAccountModal } from './EditAccountModal';
import HeaderTabs from './HeaderTabs';
import PermissionsPanel from './PermissionsPanel';

export function Workspace({
  permissionInventory,
  roles,
  adminUsers,
  activeTab,
  selectedRoleCode,
  isNewAccountModalOpen,
  isNewRoleModalOpen,
  newUsername,
  newNickname,
  newEmail,
  newRole,
  newRoleName,
  newRoleCode,
  editingAccount,
  editNickname,
  editEmail,
  editRole,
  editStatus,
  activeRoleObj,
  setActiveTab,
  setSelectedRoleCode,
  setIsNewAccountModalOpen,
  setIsNewRoleModalOpen,
  setNewUsername,
  setNewNickname,
  setNewEmail,
  setNewRole,
  setNewRoleName,
  setNewRoleCode,
  setEditingAccount,
  setEditNickname,
  setEditEmail,
  setEditRole,
  setEditStatus,
  handleOpenEditAccount,
  handleSaveEditAccount,
  handleResetPassword,
  handleTogglePermission,
  handleCreateAccount,
  handleCreateRole,
  handleToggleAccountStatus,
  handleDeleteAccount
}: WorkspaceProps) {

  return (
    <div id="admin_rbac_page" className="space-y-4 md:space-y-6 select-none animate-fadeIn flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-3 text-left">
      <HeaderTabs
        activeTab={activeTab}
        adminUsers={adminUsers}
        roles={roles}
        setActiveTab={setActiveTab}
        setIsNewAccountModalOpen={setIsNewAccountModalOpen}
        setIsNewRoleModalOpen={setIsNewRoleModalOpen}
      />

      <div className="w-full">
        {activeTab === 'accounts' && (
          <AccountsPanel
            adminUsers={adminUsers}
            roles={roles}
            handleOpenEditAccount={handleOpenEditAccount}
            handleToggleAccountStatus={handleToggleAccountStatus}
            handleDeleteAccount={handleDeleteAccount}
          />
        )}

        {activeTab === 'permissions' && (
          <PermissionsPanel
            permissionInventory={permissionInventory}
            roles={roles}
            selectedRoleCode={selectedRoleCode}
            activeRoleObj={activeRoleObj}
            setSelectedRoleCode={setSelectedRoleCode}
            handleTogglePermission={handleTogglePermission}
          />
        )}
      </div>

      {isNewAccountModalOpen && (
        <AddAccountModal
          roles={roles}
          newUsername={newUsername}
          newNickname={newNickname}
          newEmail={newEmail}
          newRole={newRole}
          setIsNewAccountModalOpen={setIsNewAccountModalOpen}
          setNewUsername={setNewUsername}
          setNewNickname={setNewNickname}
          setNewEmail={setNewEmail}
          setNewRole={setNewRole}
          handleCreateAccount={handleCreateAccount}
        />
      )}

      {isNewRoleModalOpen && (
        <AddRoleModal
          newRoleName={newRoleName}
          newRoleCode={newRoleCode}
          setIsNewRoleModalOpen={setIsNewRoleModalOpen}
          setNewRoleName={setNewRoleName}
          setNewRoleCode={setNewRoleCode}
          handleCreateRole={handleCreateRole}
        />
      )}

      {editingAccount && (
        <EditAccountModal
          permissionInventory={permissionInventory}
          roles={roles}
          editingAccount={editingAccount}
          editNickname={editNickname}
          editEmail={editEmail}
          editRole={editRole}
          editStatus={editStatus}
          setEditingAccount={setEditingAccount}
          setEditNickname={setEditNickname}
          setEditEmail={setEditEmail}
          setEditRole={setEditRole}
          setEditStatus={setEditStatus}
          handleSaveEditAccount={handleSaveEditAccount}
          handleResetPassword={handleResetPassword}
        />
      )}

    </div>
  );
}
