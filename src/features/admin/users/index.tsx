import '../shared/antd-overrides.css';
import AntdDetailsPanel from './detail/AntdDetailsPanel';
import { useUsersState } from './hooks/useUsersState';
import List from './list';

export default function AdminUsersView() {
  const {
    activeTab,
    editingUser,
    filteredDownlines,
    filteredTeamMembers,
    formEmail,
    formFrozenUsdt,
    formKycL1,
    formKycL2,
    formNickname,
    formNodes,
    formPending,
    formPhone,
    formRegDate,
    formSponsor,
    formStatus,
    formTier,
    formTroo,
    formUsdt,
    formVolume,
    handleKycAudit,
    handleResetPasswordEmail,
    handleSaveInline,
    handleStartEditing,
    kycFilter,
    setActiveTab,
    setEditingUser,
    setFormEmail,
    setFormFrozenUsdt,
    setFormKycL1,
    setFormKycL2,
    setFormNickname,
    setFormPending,
    setFormPhone,
    setFormSponsor,
    setFormStatus,
    setFormTroo,
    setFormUsdt,
    setKycFilter,
    setTeamSearchText,
    setUserSearchText,
    teamSearchText,
    userSearchText
  } = useUsersState();

  if (editingUser) {
    return (
      <AntdDetailsPanel
        editingUser={editingUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        teamSearchText={teamSearchText}
        setTeamSearchText={setTeamSearchText}
        formNickname={formNickname}
        setFormNickname={setFormNickname}
        formEmail={formEmail}
        setFormEmail={setFormEmail}
        formPhone={formPhone}
        setFormPhone={setFormPhone}
        formSponsor={formSponsor}
        setFormSponsor={setFormSponsor}
        formStatus={formStatus}
        setFormStatus={setFormStatus}
        formRegDate={formRegDate}
        formTier={formTier}
        formUsdt={formUsdt}
        setFormUsdt={setFormUsdt}
        formFrozenUsdt={formFrozenUsdt}
        setFormFrozenUsdt={setFormFrozenUsdt}
        formTroo={formTroo}
        setFormTroo={setFormTroo}
        formPending={formPending}
        setFormPending={setFormPending}
        formNodes={formNodes}
        formVolume={formVolume}
        formKycL1={formKycL1}
        setFormKycL1={setFormKycL1}
        formKycL2={formKycL2}
        setFormKycL2={setFormKycL2}
        filteredTeamMembers={filteredTeamMembers}
        onBack={() => setEditingUser(null)}
        onResetPasswordEmail={handleResetPasswordEmail}
        onSave={handleSaveInline}
      />
    );
  }

  return (
    <List
      filteredDownlines={filteredDownlines}
      searchText={userSearchText}
      kycFilter={kycFilter}
      onSearchTextChange={setUserSearchText}
      onKycFilterChange={setKycFilter}
      onStartEditing={handleStartEditing}
      onKycAudit={handleKycAudit}
    />
  );
}
