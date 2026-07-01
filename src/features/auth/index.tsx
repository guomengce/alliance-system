import { AnimatePresence, motion } from 'motion/react';

import AlertBanner from '../../shared/components/AlertBanner';
import './antd-overrides.css';
import Background from './components/Background';
import BrandHeader from './components/BrandHeader';
import FooterInfo from './components/FooterInfo';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import { useAuthFormState } from './hooks/useAuthFormState';
import { useAuthHandlers } from './hooks/useAuthHandlers';
import type { LoginViewProps } from './types';

export default function LoginView({
  setPortalMode,
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  setNickname,
  setEmail,
  onSuccess,
}: LoginViewProps) {
  const formState = useAuthFormState();
  const {
    view,
    errorMsg,
    setErrorMsg,
    alertType,
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
  } = formState;

  const {
    handleSubmit,
    handleRegister,
    handleRequestResetCode,
    handleResetPassword,
    handleForgotClick,
    handleRegisterClick,
    handleBackToLogin,
    handleBackToForgot,
  } = useAuthHandlers({
    formState,
    setPortalMode,
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    setNickname,
    setEmail,
    onSuccess,
  });

  return (
    <motion.div
      key="login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="alliance-auth-page flex min-h-screen items-center justify-center p-4 relative bg-[#09070d] w-full select-none"
    >
      <Background />

      <div className="alliance-auth-shell w-full max-w-sm flex flex-col items-center relative z-10 space-y-7">
        <BrandHeader />

        {/* Central interactive Glass Login card */}
        <div className="alliance-auth-card w-full bg-[#16131c]/90 border border-white/[0.06] p-7 md:p-8 rounded-[24px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl relative">
          {/* Action Alerts and Interactive Feedbacks */}
          <AnimatePresence mode="wait">
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`alliance-auth-alert-wrap is-${alertType} mb-5 overflow-hidden`}
              >
                <AlertBanner
                  message={errorMsg}
                  type={alertType}
                  onClose={() => setErrorMsg('')}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {view === 'login' && (
            <LoginForm
              loginEmail={loginEmail}
              loginPassword={loginPassword}
              showPassword={showPassword}
              rememberMe={rememberMe}
              onSubmit={handleSubmit}
              onLoginEmailChange={setLoginEmail}
              onLoginPasswordChange={setLoginPassword}
              onShowPasswordChange={setShowPassword}
              onRememberMeChange={setRememberMe}
              onForgotClick={handleForgotClick}
              onRegisterClick={handleRegisterClick}
            />
          )}

          {view === 'register' && (
            <RegisterForm
              regEmail={regEmail}
              regNickname={regNickname}
              regPassword={regPassword}
              regConfirmPassword={regConfirmPassword}
              onSubmit={handleRegister}
              onBackToLogin={handleBackToLogin}
              onRegEmailChange={setRegEmail}
              onRegNicknameChange={setRegNickname}
              onRegPasswordChange={setRegPassword}
              onRegConfirmPasswordChange={setRegConfirmPassword}
            />
          )}

          {view === 'forgot' && (
            <ForgotPasswordForm
              forgotEmail={forgotEmail}
              onSubmit={handleRequestResetCode}
              onBackToLogin={handleBackToLogin}
              onForgotEmailChange={setForgotEmail}
            />
          )}

          {view === 'reset' && (
            <ResetPasswordForm
              resetCode={resetCode}
              newPassword={newPassword}
              confirmNewPassword={confirmNewPassword}
              showNewPassword={showNewPassword}
              onSubmit={handleResetPassword}
              onBackToForgot={handleBackToForgot}
              onResetCodeChange={setResetCode}
              onNewPasswordChange={setNewPassword}
              onConfirmNewPasswordChange={setConfirmNewPassword}
              onShowNewPasswordChange={setShowNewPassword}
            />
          )}
        </div>

        <FooterInfo />
      </div>
    </motion.div>
  );
}
