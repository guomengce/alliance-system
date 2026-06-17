import { useState } from 'react';
import {
  AdminUserTab,
  DownlineMember,
  KycFilter,
  KycL1Status,
  KycL2Status,
  UserAccountStatus
} from '../types';
import { filterAdminUsers } from '../utils';

export function useUsersState(downlines: DownlineMember[]) {
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