import type { Dispatch, SetStateAction } from 'react';
import { DownlineMember } from '@/src/types';

export type KycFilter = 'all' | 'pending' | 'verified';
export type AdminUserTab = 'profile' | 'wallet' | 'team';
export type UserAccountStatus = 'normal' | 'frozen' | 'disabled';
export type KycL1Status = 'verified' | 'unverified';
export type KycL2Status = 'verified' | 'pending' | 'unverified';

export interface AdminUsersViewProps {
  downlines: DownlineMember[];
  onUpdateDownlines: (members: DownlineMember[]) => void;
}

export type { DownlineMember };


export interface TeamMember {
  uid: string;
  name: string;
  level: string;
  nodes: string;
  volume: string;
}

export interface DetailsPanelProps {
  editingUser: DownlineMember;
  activeTab: AdminUserTab;
  setActiveTab: Dispatch<SetStateAction<AdminUserTab>>;
  teamSearchText: string;
  setTeamSearchText: Dispatch<SetStateAction<string>>;
  formNickname: string;
  setFormNickname: Dispatch<SetStateAction<string>>;
  formEmail: string;
  setFormEmail: Dispatch<SetStateAction<string>>;
  formPhone: string;
  setFormPhone: Dispatch<SetStateAction<string>>;
  formSponsor: string;
  setFormSponsor: Dispatch<SetStateAction<string>>;
  formStatus: UserAccountStatus;
  setFormStatus: Dispatch<SetStateAction<UserAccountStatus>>;
  formRegDate: string;
  formTier: string;
  formUsdt: number;
  setFormUsdt: Dispatch<SetStateAction<number>>;
  formFrozenUsdt: number;
  setFormFrozenUsdt: Dispatch<SetStateAction<number>>;
  formTroo: number;
  setFormTroo: Dispatch<SetStateAction<number>>;
  formPending: number;
  setFormPending: Dispatch<SetStateAction<number>>;
  formNodes: number;
  formVolume: number;
  formKycL1: KycL1Status;
  setFormKycL1: Dispatch<SetStateAction<KycL1Status>>;
  formKycL2: KycL2Status;
  setFormKycL2: Dispatch<SetStateAction<KycL2Status>>;
  onBack: () => void;
  onResetPasswordEmail: () => void;
  onSave: () => void;
}

export type SummaryHeaderProps = Pick<
  DetailsPanelProps,
  'editingUser' | 'formNickname' | 'formStatus' | 'formTier' | 'onBack'
>;

export type TabSelectorProps = Pick<DetailsPanelProps, 'activeTab' | 'setActiveTab'>;

export type ProfilePanelProps = Pick<
  DetailsPanelProps,
  | 'editingUser'
  | 'formNickname'
  | 'setFormNickname'
  | 'formEmail'
  | 'setFormEmail'
  | 'formPhone'
  | 'setFormPhone'
  | 'formSponsor'
  | 'setFormSponsor'
  | 'formStatus'
  | 'setFormStatus'
  | 'formRegDate'
  | 'formKycL1'
  | 'setFormKycL1'
  | 'formKycL2'
  | 'setFormKycL2'
  | 'onResetPasswordEmail'
>;

export type WalletPanelProps = Pick<
  DetailsPanelProps,
  | 'formUsdt'
  | 'setFormUsdt'
  | 'formFrozenUsdt'
  | 'setFormFrozenUsdt'
  | 'formTroo'
  | 'setFormTroo'
  | 'formPending'
  | 'setFormPending'
  | 'formNodes'
  | 'formVolume'
>;

export type TeamPanelProps = Pick<
  DetailsPanelProps,
  'teamSearchText' | 'setTeamSearchText' | 'formNodes' | 'formVolume'
>;

export type FooterActionsProps = Pick<DetailsPanelProps, 'onBack' | 'onSave'>;
