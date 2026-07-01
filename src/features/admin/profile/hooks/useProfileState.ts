import { useEffect, useState } from 'react';
import {
  changeAdminPassword,
  getAdminProfile,
  updateAdminProfile
} from '../../../../api/admin/profile';
import type { AdminPasswordFormValues, AdminProfileFormValues } from '../types';
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

  useEffect(() => {
    let mounted = true;

    getAdminProfile().then((profile) => {
      if (!mounted) return;
      setFormNickname(profile.nickname);
      setFormEmail(profile.email);
      onUpdateNickname(profile.nickname);
      onUpdateEmail(profile.email);
    });

    return () => {
      mounted = false;
    };
  }, [onUpdateEmail, onUpdateNickname]);

  const handleSaveProfile = async ({ nickname: nextNickname, email: nextEmail }: AdminProfileFormValues) => {
    setProfileSuccess(false);
    setProfileError('');

    const validationError = validateAdminProfileForm(nextNickname, nextEmail);
    if (validationError) {
      setProfileError(validationError);
      return;
    }

    const profile = await updateAdminProfile({
      nickname: nextNickname,
      email: nextEmail
    });
    setFormNickname(profile.nickname);
    setFormEmail(profile.email);
    onUpdateNickname(profile.nickname);
    onUpdateEmail(profile.email);
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 4000);
  };

  const handleSavePassword = async ({
    oldPassword: currentPassword,
    newPassword: nextPassword,
    confirmPassword: nextConfirmPassword
  }: AdminPasswordFormValues) => {
    setPasswordSuccess('');
    setPasswordError('');
    setOldPassword(currentPassword);
    setNewPassword(nextPassword);
    setConfirmPassword(nextConfirmPassword);

    const validationError = validateAdminPasswordForm(
      currentPassword,
      loginPassword,
      nextPassword,
      nextConfirmPassword
    );
    if (validationError) {
      setPasswordError(validationError);
      return;
    }

    await changeAdminPassword({
      oldPassword: currentPassword,
      newPassword: nextPassword
    });
    onUpdatePassword(nextPassword);
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
