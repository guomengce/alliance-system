import { useState } from 'react';

import type { AuthAlertType, AuthView } from '../types';

export function useAuthFormState() {
  const [view, setView] = useState<AuthView>('login');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [alertType, setAlertType] = useState<AuthAlertType>('error');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const [regEmail, setRegEmail] = useState<string>('');
  const [regNickname, setRegNickname] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('');
  const [regConfirmPassword, setRegConfirmPassword] = useState<string>('');

  const [forgotEmail, setForgotEmail] = useState<string>('');
  const [resetCode, setResetCode] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  return {
    view,
    setView,
    errorMsg,
    setErrorMsg,
    alertType,
    setAlertType,
    showPassword,
    setShowPassword,
    rememberMe,
    setRememberMe,
    regEmail,
    setRegEmail,
    regNickname,
    setRegNickname,
    regPassword,
    setRegPassword,
    regConfirmPassword,
    setRegConfirmPassword,
    forgotEmail,
    setForgotEmail,
    resetCode,
    setResetCode,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    showNewPassword,
    setShowNewPassword,
  };
}

export type AuthFormState = ReturnType<typeof useAuthFormState>;
