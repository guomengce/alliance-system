import type { Dispatch, FormEvent, SetStateAction } from 'react';

export interface SettingsViewProps {
  nickname: string;
  email: string;
  onUpdateNickname: (newVal: string) => void;
  onUpdateEmail: (newVal: string) => void;
  onLogout: () => void;
}

export interface ActiveDevice {
  name: string;
  location: string;
  ip: string;
  time: string;
  current: boolean;
}

export interface FeedbackMessagesProps {
  successMsg: string;
  errorMsg: string;
  setSuccessMsg: Dispatch<SetStateAction<string>>;
  setErrorMsg: Dispatch<SetStateAction<string>>;
}

export interface ProfileFormProps {
  tempNickname: string;
  tempEmail: string;
  setTempNickname: Dispatch<SetStateAction<string>>;
  setTempEmail: Dispatch<SetStateAction<string>>;
  onUpdateProfile: (e: FormEvent) => void;
}

export interface PasswordFormProps {
  showPassword: boolean;
  oldPassword: string;
  newPassword: string;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  setOldPassword: Dispatch<SetStateAction<string>>;
  setNewPassword: Dispatch<SetStateAction<string>>;
  onUpdatePasswords: (e: FormEvent) => void;
}

export interface SupportCardProps {
  setSuccessMsg: Dispatch<SetStateAction<string>>;
}

export interface DevicesPanelProps {
  activeDevices: ActiveDevice[];
}
