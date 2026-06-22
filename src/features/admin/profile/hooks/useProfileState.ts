import { useState, type FormEvent } from 'react';
import {
  validateAdminPasswordForm,
  validateAdminProfileForm
} from '../utils';

interface UseProfileStateOptions {
  nickname: string;
  email: string;
  loginPassword: string;
  onUpdateNickname: (newName: string) => void;
  onUpdateEmail: (newEmail: string) => void;
  onUpdatePassword: (newPassword: string) => void;
}

export function useProfileState({
  nickname,
  email,
  loginPassword,
  onUpdateNickname,
  onUpdateEmail,
  onUpdatePassword
}: UseProfileStateOptions) {
  const [formNickname, setFormNickname] = useState(nickname);
  const [formEmail, setFormEmail] = useState(email);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSaveProfile = (e: FormEvent) => {
    e.preventDefault();
    setProfileSuccess(false);
    setProfileError('');

    const validationError = validateAdminProfileForm(formNickname, formEmail);
    if (validationError) {
      setProfileError(validationError);
      return;
    }

    onUpdateNickname(formNickname);
    onUpdateEmail(formEmail);
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 4000);
  };

  const handleSavePassword = (e: FormEvent) => {
    e.preventDefault();
    setPasswordSuccess('');
    setPasswordError('');

    const validationError = validateAdminPasswordForm(
      oldPassword,
      loginPassword,
      newPassword,
      confirmPassword
    );
    if (validationError) {
      setPasswordError(validationError);
      return;
    }

    onUpdatePassword(newPassword);
    setPasswordSuccess('核心管理密码已通过系统哈希重置，请妥善保管新密匙！');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSuccess(''), 5000);
  };

  return {
    confirmPassword,
    formEmail,
    formNickname,
    newPassword,
    oldPassword,
    passwordError,
    passwordSuccess,
    profileError,
    profileSuccess,
    handleSavePassword,
    handleSaveProfile,
    setConfirmPassword,
    setFormEmail,
    setFormNickname,
    setNewPassword,
    setOldPassword
  };
}
