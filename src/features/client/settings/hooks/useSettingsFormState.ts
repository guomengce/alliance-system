import { useEffect, useState } from 'react';
import {
  changeClientPassword,
  getClientSettings,
  updateClientSettings
} from '../../../../api/client/settings';
import type { ActiveDevice, ClientPasswordFormValues, ClientProfileFormValues } from '../types';
import { validatePasswordForm, validateProfileForm } from '../utils';

type UseSettingsFormStateOptions = {
  email: string;
  nickname: string;
  onUpdateEmail: (newVal: string) => void;
  onUpdateNickname: (newVal: string) => void;
};

export function useSettingsFormState({
  email,
  nickname,
  onUpdateEmail,
  onUpdateNickname
}: UseSettingsFormStateOptions) {
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [tempNickname, setTempNickname] = useState(nickname);
  const [tempEmail, setTempEmail] = useState(email);
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [activeDevices, setActiveDevices] = useState<ActiveDevice[]>([]);

  useEffect(() => {
    let mounted = true;

    getClientSettings().then((settings) => {
      if (!mounted) return;
      setTempNickname(settings.nickname);
      setTempEmail(settings.email);
      setActiveDevices(settings.activeDevices);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const handleUpdateProfile = async ({ nickname: nextNickname, email: nextEmail }: ClientProfileFormValues) => {
    setErrorMsg('');
    setSuccessMsg('');

    const validationError = validateProfileForm(nextNickname, nextEmail);
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }
    const settings = await updateClientSettings({
      nickname: nextNickname,
      email: nextEmail
    });
    setTempNickname(settings.nickname);
    setTempEmail(settings.email);
    setActiveDevices(settings.activeDevices);
    onUpdateNickname(settings.nickname);
    onUpdateEmail(settings.email);
    setSuccessMsg('个人昵称与安全邮箱资料更新成功！');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleUpdatePasswords = async ({ oldPassword: currentPassword, newPassword: nextPassword }: ClientPasswordFormValues) => {
    setErrorMsg('');
    setSuccessMsg('');
    setOldPassword(currentPassword);
    setNewPassword(nextPassword);

    const validationError = validatePasswordForm(currentPassword, nextPassword);
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }
    await changeClientPassword({
      oldPassword: currentPassword,
      newPassword: nextPassword
    });
    setSuccessMsg('登录安全密码修改成功！');
    setOldPassword('');
    setNewPassword('');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return {
    activeDevices,
    errorMsg,
    handleUpdatePasswords,
    handleUpdateProfile,
    newPassword,
    oldPassword,
    setErrorMsg,
    setNewPassword,
    setOldPassword,
    setShowPassword,
    setSuccessMsg,
    setTempEmail,
    setTempNickname,
    showPassword,
    successMsg,
    tempEmail,
    tempNickname
  };
}
