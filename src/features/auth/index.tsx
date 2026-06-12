import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AlertBanner from '../../components/AlertBanner';
import { useAppContext } from '../../context/AppContext';
import Background from './components/Background';
import BrandHeader from './components/BrandHeader';
import FooterInfo from './components/FooterInfo';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import type { AuthView, LoginViewProps } from './types';
export default function LoginView({
  portalMode,
  setPortalMode,
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  setNickname,
  setEmail,
  onSuccess
}: LoginViewProps) {
  // Access global registered users database & states
  const { registeredUsers, setRegisteredUsers, setAdminRole, setActiveTab } = useAppContext();

  // Active form view standard: 'login' | 'register' | 'forgot' | 'reset'
  const [view, setView] = useState<AuthView>('login');

  const [errorMsg, setErrorMsg] = useState<string>('');
  const [alertType, setAlertType] = useState<'success' | 'error' | 'warning' | 'info'>('error');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  // Registration form states
  const [regEmail, setRegEmail] = useState<string>('');
  const [regNickname, setRegNickname] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('');
  const [regConfirmPassword, setRegConfirmPassword] = useState<string>('');

  // Password Reset flow states
  const [forgotEmail, setForgotEmail] = useState<string>('');
  const [resetCode, setResetCode] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  // Main login handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedEmail = loginEmail.trim();

    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setAlertType('error');
      setErrorMsg('请输入合法的系统安全登录邮箱账户');
      return;
    }

    if (!loginPassword || loginPassword.length < 4) {
      setAlertType('error');
      setErrorMsg('系统密钥口令长度不足，请重试');
      return;
    }

    // Match users database
    const matched = registeredUsers.find(
      u => u.email.trim().toLowerCase() === trimmedEmail.toLowerCase()
    );

    if (!matched) {
      setAlertType('error');
      setErrorMsg('登录账号未在系统注册，请先点击下方注册新账户');
      return;
    }

    if (matched.password !== loginPassword) {
      setAlertType('error');
      setErrorMsg('您输入的登录密钥/密码不正确，请重新输入');
      return;
    }

    // Assign dynamic user attributes
    setPortalMode(matched.portalMode);
    setAdminRole(matched.role);
    setNickname(matched.nickname);
    setEmail(matched.email);

    // Auto router target
    if (matched.portalMode === 'admin') {
      setActiveTab('admin-dashboard');
    } else {
      setActiveTab('home');
    }

    onSuccess(matched.portalMode);
  };

  // Register user handler
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedEmail = regEmail.trim();
    const trimmedNick = regNickname.trim();

    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setAlertType('error');
      setErrorMsg('邮箱格式错误');
      return;
    }

    if (!trimmedNick) {
      setAlertType('error');
      setErrorMsg('请输入同盟专属名称（昵称）');
      return;
    }

    if (regPassword.length < 4) {
      setAlertType('error');
      setErrorMsg('密码安全强度不足，最少 4 位');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setAlertType('error');
      setErrorMsg('两次输入的密码不一致');
      return;
    }

    // Check conflict
    const conflict = registeredUsers.some(
      u => u.email.trim().toLowerCase() === trimmedEmail.toLowerCase()
    );
    if (conflict) {
      setAlertType('error');
      setErrorMsg('此邮箱已注册，请直接登录或找回密码');
      return;
    }

    // Determine admin/client role automatically
    // Email ending with @alliance.system registers as Admin (OPERATOR) for testing role-based permissions
    const isTestSystemMail = trimmedEmail.toLowerCase().endsWith('@alliance.system');
    const newPortal: 'client' | 'admin' = isTestSystemMail ? 'admin' : 'client';
    const newRole: 'SUPER_ADMIN' | 'FINANCE_DIR' | 'RISK_OFFICER' | 'OPERATOR' | null = isTestSystemMail ? 'OPERATOR' : null;

    const newUser = {
      email: trimmedEmail,
      password: regPassword,
      nickname: trimmedNick + (isTestSystemMail ? ' (运营专员)' : ''),
      portalMode: newPortal,
      role: newRole
    };

    setRegisteredUsers(prev => [...prev, newUser]);
    
    // Autofill username
    setLoginEmail(trimmedEmail);
    setLoginPassword(regPassword);
    
    setAlertType('success');
    setErrorMsg(`注册成功！已为您分配：${isTestSystemMail ? '系统管理员菜单 (Operator)' : '联盟普通会员账户'}`);
    setView('login');
  };

  // Trigger password recover state
  const handleRequestResetCode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedForgot = forgotEmail.trim();
    if (!trimmedForgot || !trimmedForgot.includes('@')) {
      setAlertType('error');
      setErrorMsg('请输入用以验证的系统安全登录邮箱');
      return;
    }

    const matched = registeredUsers.find(
      u => u.email.trim().toLowerCase() === trimmedForgot.toLowerCase()
    );

    if (!matched) {
      setAlertType('error');
      setErrorMsg('未查找到此邮箱注册信息，请核对后重试');
      return;
    }

    // Enter verification state with code preset
    setResetCode('');
    setNewPassword('');
    setConfirmNewPassword('');
    setAlertType('success');
    setErrorMsg('系统重置密码安全验证码已被分发，演示核验码为 [ 123456 ]');
    setView('reset');
  };

  // Set new password
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (resetCode.trim() !== '123456') {
      setAlertType('error');
      setErrorMsg('安全核验码不正确，请核对或重新输入 demonstration key: 123456');
      return;
    }

    if (newPassword.length < 4) {
      setAlertType('error');
      setErrorMsg('新密码过于简单，长度至少需要4位');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setAlertType('error');
      setErrorMsg('两次填写的密码不匹配，请重新核对');
      return;
    }

    // Update password inside users local list
    setRegisteredUsers(prev => prev.map(user => {
      if (user.email.toLowerCase() === forgotEmail.trim().toLowerCase()) {
        return { ...user, password: newPassword };
      }
      return user;
    }));

    // Pre-fill on login
    setLoginEmail(forgotEmail.trim());
    setLoginPassword(newPassword);

    setAlertType('success');
    setErrorMsg('您的同盟系统登录密码已被重置更新！请重新输入新密码登录。');
    setView('login');
  };

  return (
    <motion.div 
      key="login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen items-center justify-center p-4 relative bg-[#09070d] w-full select-none"
    >
      <Background />

      <div className="w-full max-w-sm flex flex-col items-center relative z-10 space-y-7">
        
        <BrandHeader />

        {/* Central interactive Glass Login card */}
        <div className="w-full bg-[#16131c]/90 border border-white/[0.06] p-7 md:p-8 rounded-[24px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl relative">
          
          {/* Action Alerts and Interactive Feedbacks */}
          <AnimatePresence mode="wait">
            {errorMsg && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-5 overflow-hidden"
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
              onForgotClick={() => {
                setErrorMsg('');
                setForgotEmail(loginEmail);
                setView('forgot');
              }}
              onRegisterClick={() => {
                setErrorMsg('');
                setView('register');
              }}
            />
          )}

          {view === 'register' && (
            <RegisterForm
              regEmail={regEmail}
              regNickname={regNickname}
              regPassword={regPassword}
              regConfirmPassword={regConfirmPassword}
              onSubmit={handleRegister}
              onBackToLogin={() => { setView('login'); setErrorMsg(''); }}
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
              onBackToLogin={() => { setView('login'); setErrorMsg(''); }}
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
              onBackToForgot={() => { setView('forgot'); setErrorMsg(''); }}
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
