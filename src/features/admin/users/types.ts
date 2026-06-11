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
