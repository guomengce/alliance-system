import type { Dispatch, SetStateAction } from 'react';

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
  onUpdateProfile: (values: ClientProfileFormValues) => void;
}

export interface PasswordFormProps {
  showPassword: boolean;
  oldPassword: string;
  newPassword: string;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  onUpdatePasswords: (values: ClientPasswordFormValues) => void;
}

export interface SupportCardProps {
  setSuccessMsg: Dispatch<SetStateAction<string>>;
}

export interface DevicesPanelProps {
  activeDevices: ActiveDevice[];
}

export interface ClientProfileFormValues {
  nickname: string;
  email: string;
}

export interface ClientPasswordFormValues {
  oldPassword: string;
  newPassword: string;
}
