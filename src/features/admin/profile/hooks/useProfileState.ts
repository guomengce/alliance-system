import { useState } from 'react';

export function useProfileState(nickname: string, email: string) {
  const [formNickname, setFormNickname] = useState(nickname);
  const [formEmail, setFormEmail] = useState(email);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');

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
    setConfirmPassword,
    setFormEmail,
    setFormNickname,
    setNewPassword,
    setOldPassword,
    setPasswordError,
    setPasswordSuccess,
    setProfileError,
    setProfileSuccess
  };
}