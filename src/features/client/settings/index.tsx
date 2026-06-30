import './antd-overrides.css';
import PageView from '../../../shared/components/PageView';
import DevicesPanel from './components/DevicesPanel';
import FeedbackMessages from './components/FeedbackMessages';
import LogoutButton from './components/LogoutButton';
import PasswordForm from './components/PasswordForm';
import ProfileForm from './components/ProfileForm';
import SupportCard from './components/SupportCard';
import { useSettingsFormState } from './hooks/useSettingsFormState';
import type { SettingsViewProps } from './types';

export default function SettingsView({
  nickname,
  email,
  onUpdateNickname,
  onUpdateEmail,
  onLogout
}: SettingsViewProps) {
  const {
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
  } = useSettingsFormState({
    email,
    nickname,
    onUpdateEmail,
    onUpdateNickname
  });

  return (
    <PageView>
      <div className="mb-2">
        <p className="text-xs text-[#cbc4d2] opacity-75 font-medium">管理您的个人资料、系统登录安全密码、查看团队客户服务及多端登录会话</p>
      </div>

      <FeedbackMessages
        successMsg={successMsg}
        errorMsg={errorMsg}
        setSuccessMsg={setSuccessMsg}
        setErrorMsg={setErrorMsg}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Profile and Password columns */}
        <div className="lg:col-span-7 space-y-6">
          {/* Profile settings Form */}
          <ProfileForm
            tempNickname={tempNickname}
            tempEmail={tempEmail}
            setTempNickname={setTempNickname}
            setTempEmail={setTempEmail}
            onUpdateProfile={handleUpdateProfile}
          />

          {/* Secure Passwords Form */}
          <PasswordForm
            showPassword={showPassword}
            oldPassword={oldPassword}
            newPassword={newPassword}
            setShowPassword={setShowPassword}
            setOldPassword={setOldPassword}
            setNewPassword={setNewPassword}
            onUpdatePasswords={handleUpdatePasswords}
          />
        </div>

        {/* Support & Device Columns */}
        <div className="lg:col-span-5 space-y-6">
          {/* 客服支持与通道 */}
          <SupportCard setSuccessMsg={setSuccessMsg} />

          {/* Active Devices lists & System Version combined elegantly */}
          <DevicesPanel activeDevices={activeDevices} />

          <LogoutButton onLogout={onLogout} />
        </div>
      </div>
    </PageView>
  );
}
