import { useEffect, useState } from 'react';
import { getAdminUsersResponse, updateAdminUser } from '../../../../api/admin/users';
import { useAppContext } from '../../../../context/AppContext';
import {
  type AdminUsersApiResponse,
  type AdminUserTab,
  type KycFilter,
  type KycL1Status,
  type KycL2Status,
  type UserAccountStatus
} from '../types';
import {
  applyKycAudit,
  buildUpdatedUserFromForm,
  filterAdminUsers,
  filterTeamMembers,
  inferUserKycL2,
  transformAdminUsersResponse
} from '../utils';

const EMPTY_USERS_RESPONSE: AdminUsersApiResponse = {
  users: [],
  teamMembers: []
};

export function useUsersState() {
  const { triggerGlobalAlert } = useAppContext();
  const [usersResponse, setUsersResponse] = useState<AdminUsersApiResponse>(EMPTY_USERS_RESPONSE);
  const [userSearchText, setUserSearchText] = useState<string>('');
  const [kycFilter, setKycFilter] = useState<KycFilter>('all');
  const [editingUser, setEditingUser] = useState<ReturnType<typeof transformAdminUsersResponse>['downlines'][number] | null>(null);
  const [activeTab, setActiveTab] = useState<AdminUserTab>('profile');
  const [teamSearchText, setTeamSearchText] = useState<string>('');
  const [formNickname, setFormNickname] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSponsor, setFormSponsor] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formStatus, setFormStatus] = useState<UserAccountStatus>('normal');
  const [formRegDate, setFormRegDate] = useState('');
  const [formTier, setFormTier] = useState('');
  const [formUsdt, setFormUsdt] = useState<number>(0);
  const [formFrozenUsdt, setFormFrozenUsdt] = useState<number>(0);
  const [formTroo, setFormTroo] = useState<number>(0);
  const [formPending, setFormPending] = useState<number>(0);
  const [formNodes, setFormNodes] = useState<number>(0);
  const [formVolume, setFormVolume] = useState<number>(0);
  const [formKycL1, setFormKycL1] = useState<KycL1Status>('verified');
  const [formKycL2, setFormKycL2] = useState<KycL2Status>('unverified');

  useEffect(() => {
    let mounted = true;

    getAdminUsersResponse().then((response) => {
      if (mounted) {
        setUsersResponse(response);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const { downlines, teamMembers } = transformAdminUsersResponse(usersResponse);
  const filteredDownlines = filterAdminUsers(downlines, userSearchText, kycFilter);
  const filteredTeamMembers = filterTeamMembers(teamMembers, teamSearchText);

  const updateUserResponse = (
    uid: string,
    updater: (user: AdminUsersApiResponse['users'][number]) => AdminUsersApiResponse['users'][number]
  ) => {
    setUsersResponse(prev => ({
      ...prev,
      users: prev.users.map(user => user.uid === uid ? updater(user) : user),
    }));
  };

  const handleKycAudit = async (uid: string, accept: boolean) => {
    const audited = applyKycAudit(downlines, uid, accept).find(user => user.uid === uid);
    if (!audited) return;

    await updateAdminUser(uid, {
      tier: audited.tier,
      kycL2: audited.kycL2
    });

    updateUserResponse(uid, user => ({
      ...user,
      tierName: audited.tier,
      kyc: {
        ...user.kyc,
        l2: audited.kycL2 ?? user.kyc.l2,
      },
    }));
    triggerGlobalAlert(`用户 UID: ${uid} 的 KYC L2 审核已${accept ? '通过' : '驳回'}`, 'success');
  };

  const handleStartEditing = (user: ReturnType<typeof transformAdminUsersResponse>['downlines'][number]) => {
    setEditingUser(user);
    setActiveTab('profile');
    setTeamSearchText('');

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
    setFormKycL1(user.kycL1 || 'verified');
    setFormKycL2(inferUserKycL2(user));
  };

  const handleSaveInline = async () => {
    if (!editingUser) return;

    const updatedUser = buildUpdatedUserFromForm(editingUser, {
      nickname: formNickname,
      email: formEmail,
      phone: formPhone,
      sponsor: formSponsor,
      password: formPassword,
      status: formStatus,
      registrationDate: formRegDate,
      tier: formTier,
      usdtBalance: formUsdt,
      frozenBalance: formFrozenUsdt,
      trooBalance: formTroo,
      pendingBalance: formPending,
      nodeSize: formNodes,
      volume: formVolume,
      kycL1: formKycL1,
      kycL2: formKycL2
    });

    await updateAdminUser(editingUser.uid, updatedUser);

    updateUserResponse(editingUser.uid, user => ({
      ...user,
      tierName: updatedUser.tier,
      registeredAt: updatedUser.registrationDate,
      profile: {
        nickname: updatedUser.nickname || '',
        email: updatedUser.email || '',
        phone: updatedUser.phone || '',
        sponsor: updatedUser.sponsor || '',
        status: updatedUser.status || 'normal',
      },
      wallet: {
        usdtBalance: updatedUser.usdtBalance || 0,
        frozenBalance: updatedUser.frozenBalance || 0,
        trooBalance: updatedUser.trooBalance || 0,
        pendingBalance: updatedUser.pendingBalance || 0,
      },
      team: {
        nodeSize: updatedUser.nodeSize,
        volume: updatedUser.volume,
      },
      kyc: {
        l1: updatedUser.kycL1 || 'verified',
        l2: updatedUser.kycL2 || 'unverified',
      },
    }));

    triggerGlobalAlert(`用户 UID: ${editingUser.uid} 的资料已保存`, 'success');
    setEditingUser(null);
  };

  const handleResetPasswordEmail = () => {
    triggerGlobalAlert(`重置密码邮件已发送至 ${formEmail || '未绑定邮箱'}`, 'success');
  };

  return {
    activeTab,
    editingUser,
    filteredDownlines,
    formEmail,
    filteredTeamMembers,
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
  };
}
