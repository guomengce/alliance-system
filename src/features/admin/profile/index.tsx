import { motion } from 'motion/react';
import { LogoutSection } from './components/LogoutSection';
import { PasswordForm } from './components/PasswordForm';
import { ProfileBanner } from './components/ProfileBanner';
import { ProfileForm } from './components/ProfileForm';
import { useProfileState } from './hooks/useProfileState';
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
  const {
    confirmPassword,
    formEmail,
    formNickname,
    handleSavePassword,
    handleSaveProfile,
    newPassword,
    oldPassword,
    passwordError,
    passwordSuccess,
    profileError,
    profileSuccess
  } = useProfileState({
    nickname,
    email,
    loginPassword: loginPasswordVal,
    onUpdateNickname,
    onUpdateEmail,
    onUpdatePassword
  });

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
          onSaveProfile={handleSaveProfile}
        />

        {/* Password Security updates */}
        <PasswordForm
          oldPassword={oldPassword}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          passwordSuccess={passwordSuccess}
          passwordError={passwordError}
          onSavePassword={handleSavePassword}
        />
      </div>

      {/* Safety Logout Separator Section matching client setting design */}
      <LogoutSection onLogout={onLogout} />
    </motion.div>
  );
}
