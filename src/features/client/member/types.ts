import type { Dispatch, SetStateAction } from 'react';

export interface MemberViewProps {
  uid: string;
  nickname: string;
  joinDate: string;
  onUpdateNickname: (newVal: string) => void;
  onRaiseCredit: () => void;
  remainingCredit: number;
  totalCredit: number;
}

export interface RecentActivity {
  id: string;
  uid: string;
  action: string;
  time: string;
  highlight: boolean;
}

export interface ProfileCardProps {
  uid: string;
  nickname: string;
  joinDate: string;
  isEditing: boolean;
  tempNickname: string;
  setTempNickname: Dispatch<SetStateAction<string>>;
  onToggleEdit: () => void;
}

export interface TeamOverviewProps {
  recentActivities: RecentActivity[];
}

export interface RecentActivityRowProps {
  key?: string;
  activity: RecentActivity;
}

export interface CreditPoolProps {
  remainingCredit: number;
  totalCredit: number;
  onRaiseCredit: () => void;
}
