import { useState, type FormEvent } from 'react';
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

  const handleUpdateProfile = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const validationError = validateProfileForm(tempNickname, tempEmail);
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    onUpdateNickname(tempNickname);
    onUpdateEmail(tempEmail);
    setSuccessMsg('个人昵称与安全邮箱资料更新成功！');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleUpdatePasswords = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const validationError = validatePasswordForm(oldPassword, newPassword);
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }
    setSuccessMsg('登录安全密码修改成功！');
    setOldPassword('');
    setNewPassword('');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return {
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
