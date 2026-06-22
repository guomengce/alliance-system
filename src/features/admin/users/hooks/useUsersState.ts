import { useState } from 'react';
import {
  AdminUserTab,
  DownlineMember,
  KycFilter,
  KycL1Status,
  KycL2Status,
  UserAccountStatus
} from '../types';
import {
  applyKycAudit,
  buildUpdatedUserFromForm,
  filterAdminUsers,
  inferUserKycL2
} from '../utils';

export function useUsersState(
  downlines: DownlineMember[],
  onUpdateDownlines: (members: DownlineMember[]) => void
) {
  const [userSearchText, setUserSearchText] = useState<string>('');
  const [kycFilter, setKycFilter] = useState<KycFilter>('all');
  const [editingUser, setEditingUser] = useState<DownlineMember | null>(null);
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

  const filteredDownlines = filterAdminUsers(downlines, userSearchText, kycFilter);

  const handleKycAudit = (uid: string, accept: boolean) => {
    onUpdateDownlines(applyKycAudit(downlines, uid, accept));
    alert(`用户 UID: ${uid} 的 KYC L2 级身份核验结果审核【${accept ? '通过' : '驳回复查'}】！`);
  };

  const handleStartEditing = (user: DownlineMember) => {
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

    onUpdateDownlines(downlines.map((member) => {
      if (member.uid !== editingUser.uid) return member;

      return buildUpdatedUserFromForm(member, {
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
    }));

    alert(`用户 UID: ${editingUser.uid} 的档案信息及资产设置已成功修改并刷新！`);
    setEditingUser(null);
  };

  const handleResetPasswordEmail = () => {
    alert(`重置密码邮件已发送至该用户邮箱: ${formEmail || '暂无绑定邮箱'} ！请指导该用户在邮箱中完成新密码自主设定。`);
  };

  return {
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
