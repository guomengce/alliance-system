import type { FormEvent } from 'react';

export type AuthView = 'login' | 'register' | 'forgot' | 'reset';

export interface LoginViewProps {
  portalMode: 'client' | 'admin';
  setPortalMode: (mode: 'client' | 'admin') => void;
  loginEmail: string;
  setLoginEmail: (email: string) => void;
  loginPassword: string;
  setLoginPassword: (password: string) => void;
  setNickname: (nickname: string) => void;
  setEmail: (email: string) => void;
  onSuccess: (mode: 'client' | 'admin') => void;
}

export interface LoginFormProps {
  loginEmail: string;
  loginPassword: string;
  showPassword: boolean;
  rememberMe: boolean;
  onSubmit: (e: FormEvent) => void;
  onLoginEmailChange: (value: string) => void;
  onLoginPasswordChange: (value: string) => void;
  onShowPasswordChange: (value: boolean) => void;
  onRememberMeChange: (value: boolean) => void;
  onForgotClick: () => void;
  onRegisterClick: () => void;
}

export interface RegisterFormProps {
  regEmail: string;
  regNickname: string;
  regPassword: string;
  regConfirmPassword: string;
  onSubmit: (e: FormEvent) => void;
  onBackToLogin: () => void;
  onRegEmailChange: (value: string) => void;
  onRegNicknameChange: (value: string) => void;
  onRegPasswordChange: (value: string) => void;
  onRegConfirmPasswordChange: (value: string) => void;
}

export interface ForgotPasswordFormProps {
  forgotEmail: string;
  onSubmit: (e: FormEvent) => void;
  onBackToLogin: () => void;
  onForgotEmailChange: (value: string) => void;
}

export interface ResetPasswordFormProps {
  resetCode: string;
  newPassword: string;
  confirmNewPassword: string;
  showNewPassword: boolean;
  onSubmit: (e: FormEvent) => void;
  onBackToForgot: () => void;
  onResetCodeChange: (value: string) => void;
  onNewPasswordChange: (value: string) => void;
  onConfirmNewPasswordChange: (value: string) => void;
  onShowNewPasswordChange: (value: boolean) => void;
}
