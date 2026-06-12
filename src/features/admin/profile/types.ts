import type { Dispatch, FormEvent, SetStateAction } from 'react';

export interface AdminProfileViewProps {
  uid: string;
  nickname: string;
  email: string;
  loginPasswordVal: string;
  onUpdateNickname: (newName: string) => void;
  onUpdateEmail: (newEmail: string) => void;
  onUpdatePassword: (newPw: string) => void;
  onLogout: () => void;
}

export interface ProfileBannerProps {
  uid: string;
  nickname: string;
}

export interface ProfileFormProps {
  formNickname: string;
  formEmail: string;
  profileSuccess: boolean;
  profileError: string;
  setFormNickname: Dispatch<SetStateAction<string>>;
  setFormEmail: Dispatch<SetStateAction<string>>;
  onSaveProfile: (e: FormEvent) => void;
}

export interface PasswordFormProps {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  passwordSuccess: string;
  passwordError: string;
  setOldPassword: Dispatch<SetStateAction<string>>;
  setNewPassword: Dispatch<SetStateAction<string>>;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
  onSavePassword: (e: FormEvent) => void;
}

export interface LogoutSectionProps {
  onLogout: () => void;
}
