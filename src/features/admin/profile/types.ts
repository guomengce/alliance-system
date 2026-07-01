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
  onSaveProfile: (values: AdminProfileFormValues) => void;
}

export interface PasswordFormProps {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  passwordSuccess: string;
  passwordError: string;
  onSavePassword: (values: AdminPasswordFormValues) => void;
}

export interface LogoutSectionProps {
  onLogout: () => void;
}

export interface AdminProfileFormValues {
  nickname: string;
  email: string;
}

export interface AdminPasswordFormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
