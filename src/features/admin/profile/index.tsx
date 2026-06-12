import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'motion/react';
import { LogoutSection } from './components/LogoutSection';
import { PasswordForm } from './components/PasswordForm';
import { ProfileBanner } from './components/ProfileBanner';
import { ProfileForm } from './components/ProfileForm';
import type { AdminProfileViewProps } from './types';

export default function AdminProfileView({
  uid,
  nickname,
  email,
  loginPasswordVal,
  onUpdateNickname,
  onUpdateEmail,
  onUpdatePassword,
  onLogout,
}: AdminProfileViewProps) {
  // Local profile states
  const [formNickname, setFormNickname] = useState(nickname);
  const [formEmail, setFormEmail] = useState(email);

  // Local password modification states
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Notification states
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState('');

  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSaveProfile = (e: FormEvent) => {
    e.preventDefault();
    setProfileSuccess(false);
    setProfileError('');

    if (!formNickname.trim()) {
      setProfileError('超级管理员代称不能为空');
      return;
    }
    if (!formEmail.trim() || !formEmail.includes('@')) {
      setProfileError('请输入正确的系统电子邮箱地址');
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

    if (!oldPassword) {
      setPasswordError('请输入当前正在使用的旧安全密码');
      return;
    }
    if (oldPassword !== loginPasswordVal) {
      setPasswordError('当前旧密码验证失败，密码不正确');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('新密码长度过短，不得小于 6 位');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('两次输入的新安全密码不吻合，请重新校配');
      return;
    }

    onUpdatePassword(newPassword);
    setPasswordSuccess('核心管理密码已通过系统哈希重置，请妥善保管新密匙！');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSuccess(''), 5000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-4"
    >
      {/* Top Banner Intro - Full Width */}
      <ProfileBanner uid={uid} nickname={nickname} />

      {/* Main Settings Form Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic profile details form */}
        <ProfileForm
          formNickname={formNickname}
          formEmail={formEmail}
          profileSuccess={profileSuccess}
          profileError={profileError}
          setFormNickname={setFormNickname}
          setFormEmail={setFormEmail}
          onSaveProfile={handleSaveProfile}
        />

        {/* Password Security updates */}
        <PasswordForm
          oldPassword={oldPassword}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          passwordSuccess={passwordSuccess}
          passwordError={passwordError}
          setOldPassword={setOldPassword}
          setNewPassword={setNewPassword}
          setConfirmPassword={setConfirmPassword}
          onSavePassword={handleSavePassword}
        />
      </div>

      {/* Safety Logout Separator Section matching client setting design */}
      <LogoutSection onLogout={onLogout} />
    </motion.div>
  );
}
