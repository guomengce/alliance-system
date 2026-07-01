import AntdAccountsPanel from './components/AntdAccountsPanel';
import AntdAddAccountModal from './components/AntdAddAccountModal';
import AntdAddRoleModal from './components/AntdAddRoleModal';
import AntdEditAccountModal from './components/AntdEditAccountModal';
import AntdHeader from './components/AntdHeader';
import AntdPermissionsPanel from './components/AntdPermissionsPanel';
import { useRbacState } from './hooks/useRbacState';

export default function AdminRbacView() {
  const state = useRbacState();

  return (
    <div id="admin_rbac_page" className="space-y-4 md:space-y-6 select-none animate-fadeIn flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-3 text-left">
      <AntdHeader
        activeTab={state.activeTab}
        adminUsers={state.adminUsers}
        roles={state.roles}
        setActiveTab={state.setActiveTab}
        setIsNewAccountModalOpen={state.setIsNewAccountModalOpen}
        setIsNewRoleModalOpen={state.setIsNewRoleModalOpen}
      />

      <div className="w-full">
        {state.activeTab === 'accounts' && (
          <AntdAccountsPanel
            adminUsers={state.adminUsers}
            roles={state.roles}
            handleOpenEditAccount={state.handleOpenEditAccount}
            handleToggleAccountStatus={state.handleToggleAccountStatus}
            handleDeleteAccount={state.handleDeleteAccount}
          />
        )}

        {state.activeTab === 'permissions' && (
          <AntdPermissionsPanel
            permissionInventory={state.permissionInventory}
            roles={state.roles}
            selectedRoleCode={state.selectedRoleCode}
            activeRoleObj={state.activeRoleObj}
            setSelectedRoleCode={state.setSelectedRoleCode}
            handleTogglePermission={state.handleTogglePermission}
          />
        )}
      </div>

      <AntdAddAccountModal
        open={state.isNewAccountModalOpen}
        roles={state.roles}
        newUsername={state.newUsername}
        newNickname={state.newNickname}
        newEmail={state.newEmail}
        newRole={state.newRole}
        setIsNewAccountModalOpen={state.setIsNewAccountModalOpen}
        setNewUsername={state.setNewUsername}
        setNewNickname={state.setNewNickname}
        setNewEmail={state.setNewEmail}
        setNewRole={state.setNewRole}
        handleCreateAccount={state.handleCreateAccount}
      />

      <AntdAddRoleModal
        open={state.isNewRoleModalOpen}
        newRoleName={state.newRoleName}
        newRoleCode={state.newRoleCode}
        setIsNewRoleModalOpen={state.setIsNewRoleModalOpen}
        setNewRoleName={state.setNewRoleName}
        setNewRoleCode={state.setNewRoleCode}
        handleCreateRole={state.handleCreateRole}
      />

      {state.editingAccount && (
        <AntdEditAccountModal
          open={Boolean(state.editingAccount)}
          permissionInventory={state.permissionInventory}
          roles={state.roles}
          editingAccount={state.editingAccount}
          editNickname={state.editNickname}
          editEmail={state.editEmail}
          editRole={state.editRole}
          editStatus={state.editStatus}
          setEditingAccount={state.setEditingAccount}
          setEditNickname={state.setEditNickname}
          setEditEmail={state.setEditEmail}
          setEditRole={state.setEditRole}
          setEditStatus={state.setEditStatus}
          handleSaveEditAccount={state.handleSaveEditAccount}
          handleResetPassword={state.handleResetPassword}
        />
      )}
    </div>
  );
}
