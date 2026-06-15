import { useUsersState } from './hooks/useUsersState';
import {
  AdminUsersViewProps,
  DownlineMember,
} from './types';
import DetailsPanel from './detail';
import List from './list';

export default function AdminUsersView({
  downlines,
  onUpdateDownlines
}: AdminUsersViewProps) {
  const {
    activeTab,
    editingUser,
    filteredDownlines,
    formEmail,
    formFrozenUsdt,
    formKycL1,
    formKycL2,
    formNickname,
    formNodes,
    formPassword,
    formPending,
    formPhone,
    formRegDate,
    formSponsor,
    formStatus,
    formTier,
    formTroo,
    formUsdt,
    formVolume,
    kycFilter,
    setActiveTab,
    setEditingUser,
    setFormEmail,
    setFormFrozenUsdt,
    setFormKycL1,
    setFormKycL2,
    setFormNickname,
    setFormNodes,
    setFormPassword,
    setFormPending,
    setFormPhone,
    setFormRegDate,
    setFormSponsor,
    setFormStatus,
    setFormTier,
    setFormTroo,
    setFormUsdt,
    setFormVolume,
    setKycFilter,
    setTeamSearchText,
    setUserSearchText,
    teamSearchText,
    userSearchText
  } = useUsersState(downlines);

  // KYC Auditor Actions
  const handleKycAudit = (uid: string, accept: boolean) => {
    onUpdateDownlines(downlines.map(d => {
      if (d.uid === uid) {
        return { 
          ...d, 
          tier: accept ? '已认证' : '标准账户',
          kycL2: accept ? 'verified' : 'unverified'
        };
      }
      return d;
    }));
    alert(`用户 UID: ${uid} 的 KYC L2 级身份核验结果审核【${accept ? '通过' : '驳回复查'}】！`);
  };

  const handleStartEditing = (user: DownlineMember) => {
    setEditingUser(user);
    setActiveTab('profile');
    setTeamSearchText('');
    
    // Seed initial values from user entity to local states
    setFormNickname(user.nickname || '');
    setFormEmail(user.email || '');
    setFormPhone(user.phone || '');
    setFormSponsor(user.sponsor || '999001 (SYS)');
    setFormPassword('');
    setFormStatus(user.status || 'normal');
    setFormRegDate(user.registrationDate || '');
    setFormTier(user.tier || '标准账户');
    setFormUsdt(user.usdtBalance || 0);
    setFormFrozenUsdt(user.frozenBalance || 0);
    setFormTroo(user.trooBalance || 0);
    setFormPending(user.pendingBalance || 0);
    setFormNodes(user.nodeSize || 0);
    setFormVolume(user.volume || 0);

    // Initial KYC state loading
    setFormKycL1(user.kycL1 || 'verified');
    if (user.kycL2) {
      setFormKycL2(user.kycL2);
    } else {
      // Intelligently infer based on tier or sales volume
      if (user.tier.includes('认证') || user.tier.includes('已认证')) {
        setFormKycL2('verified');
      } else if (user.volume > 2000) {
        setFormKycL2('pending');
      } else {
        setFormKycL2('unverified');
      }
    }
  };

  const handleSaveInline = () => {
    if (!editingUser) return;

    // Derived tier based on KYC setting to maintain compatibility with other parts
    let updatedTier = formTier;
    if (formKycL2 === 'verified') {
      updatedTier = '已认证';
    } else if (formKycL2 === 'pending') {
      updatedTier = '待认证';
    } else {
      updatedTier = '标准账户';
    }
    
    onUpdateDownlines(downlines.map(d => {
      if (d.uid === editingUser.uid) {
        return {
          ...d,
          registrationDate: formRegDate,
          nodeSize: Number(formNodes) || 0,
          volume: Number(formVolume) || 0,
          tier: updatedTier,
          nickname: formNickname,
          email: formEmail,
          phone: formPhone,
          sponsor: formSponsor,
          status: formStatus,
          usdtBalance: Number(formUsdt) || 0,
          frozenBalance: Number(formFrozenUsdt) || 0,
          trooBalance: Number(formTroo) || 0,
          pendingBalance: Number(formPending) || 0,
          password: formPassword ? formPassword : d.password,
          kycL1: formKycL1,
          kycL2: formKycL2
        };
      }
      return d;
    }));

    alert(`用户 UID: ${editingUser.uid} 的档案信息及资产设置已成功修改并刷新！`);
    setEditingUser(null);
  };


  if (editingUser) {
    return (
      <DetailsPanel
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
        onBack={() => setEditingUser(null)}
        onResetPasswordEmail={() => {
          alert(`重置密码邮件已发送至该用户邮箱: ${formEmail || '暂无绑定邮箱'} ！请指导该用户在邮箱中完成新密码自主设定。`);
        }}
        onSave={handleSaveInline}
      />
    );
  }

  // Normal List View
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
