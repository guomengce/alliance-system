import { useState } from 'react';

type UseSettingsFormStateOptions = {
  email: string;
  nickname: string;
};

export function useSettingsFormState({
  email,
  nickname
}: UseSettingsFormStateOptions) {
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [tempNickname, setTempNickname] = useState(nickname);
  const [tempEmail, setTempEmail] = useState(email);
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  return {
    errorMsg,
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
