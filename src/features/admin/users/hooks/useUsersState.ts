import { useState } from 'react';
import { useAppContext } from '../../../../context/AppContext';
import {
  AdminUsersApiResponse,
  AdminUserTab,
  KycFilter,
  KycL1Status,
  KycL2Status,
  UserAccountStatus
} from '../types';
import {
  applyKycAudit,
  buildUpdatedUserFromForm,
  filterAdminUsers,
  filterTeamMembers,
  inferUserKycL2,
  transformAdminUsersResponse
} from '../utils';

const INITIAL_USERS_RESPONSE: AdminUsersApiResponse = {
  users: [
    {
      uid: '889425',
      level: 'L1',
      tierName: '标准账户',
      registeredAt: '2026-06-01 10:30',
      avatarLetter: '张',
      investedAmount: 12000,
      profile: {
        nickname: '张启明',
        email: 'zhangqiming@example.com',
        phone: '13800000001',
        sponsor: '999001 (SYS)',
        status: 'normal',
      },
      wallet: {
        usdtBalance: 16800,
        frozenBalance: 500,
        trooBalance: 42000,
        pendingBalance: 980,
      },
      team: {
        nodeSize: 18,
        volume: 58400,
      },
      kyc: {
        l1: 'verified',
        l2: 'pending',
      },
    },
    {
      uid: '889426',
      level: 'L2',
      tierName: '已认证',
      registeredAt: '2026-06-03 14:12',
      avatarLetter: '李',
      investedAmount: 25000,
      profile: {
        nickname: '李明轩',
        email: 'limingxuan@example.com',
        phone: '13800000002',
        sponsor: '889425',
        status: 'normal',
      },
      wallet: {
        usdtBalance: 9300,
        frozenBalance: 0,
        trooBalance: 18500,
        pendingBalance: 120,
      },
      team: {
        nodeSize: 7,
        volume: 22100,
      },
      kyc: {
        l1: 'verified',
        l2: 'verified',
      },
    },
    {
      uid: '889427',
      level: 'L1',
      tierName: '风控冻结',
      registeredAt: '2026-06-08 09:45',
      avatarLetter: '王',
      investedAmount: 3600,
      profile: {
        nickname: '王若溪',
        email: 'wangruoxi@example.com',
        phone: '13800000003',
        sponsor: '999001 (SYS)',
        status: 'frozen',
      },
      wallet: {
        usdtBalance: 4100,
        frozenBalance: 1500,
        trooBalance: 6200,
        pendingBalance: 0,
      },
      team: {
        nodeSize: 3,
        volume: 6400,
      },
      kyc: {
        l1: 'verified',
        l2: 'unverified',
      },
    },
  ],
  teamMembers: [
    { uid: '889425', name: '张启明', level: 'L1', nodes: 18, volume: 58400 },
    { uid: '889426', name: '李明轩', level: 'L2', nodes: 7, volume: 22100 },
    { uid: '889427', name: '王若溪', level: 'L1', nodes: 3, volume: 6400 },
  ],
};

export function useUsersState() {
  const { triggerGlobalAlert } = useAppContext();
  const [usersResponse, setUsersResponse] = useState<AdminUsersApiResponse>(INITIAL_USERS_RESPONSE);
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

  const handleKycAudit = (uid: string, accept: boolean) => {
    const audited = applyKycAudit(downlines, uid, accept).find(user => user.uid === uid);
    if (!audited) return;

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

  const handleSaveInline = () => {
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
