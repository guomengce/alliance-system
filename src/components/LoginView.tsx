import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, ShieldCheck, ArrowLeft, Mail, User as UserIcon, Lock as LockIcon, CheckCircle, Smartphone } from 'lucide-react';
import AlertBanner from './AlertBanner';
import { useAppContext } from '../context/AppContext';
// @ts-expect-error - Vite raw image import is supported
import bgImage from '../assets/images/login_bg_lines_1780999930585.png';

interface LoginViewProps {
  portalMode: 'client' | 'admin';
  setPortalMode: (mode: 'client' | 'admin') => void;
  loginEmail: string;
  setLoginEmail: (email: string) => void;
  loginPassword: string;
  setLoginPassword: (password: string) => void;
  setNickname: (nickname: string) => void;
  setEmail: (email: string) => void;
  onSuccess: (mode: 'client' | 'admin') => void;
}

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
  const [view, setView] = useState<'login' | 'register' | 'forgot' | 'reset'>('login');

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
      {/* High-fidelity abstract background layout matching mockup */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Dynamic Image with elegant continuous slow motion */}
        <motion.img 
          src={bgImage} 
          alt="Energetic Light Trails" 
          initial={{ scale: 1.08, x: -10, y: -10, rotate: 0 }}
          animate={{ 
            scale: [1.08, 1.18, 1.05, 1.08],
            x: [-10, 15, -20, -10],
            y: [-10, -25, 10, -10],
            rotate: [0, 2.5, -2, 0]
          }}
          transition={{ 
            duration: 35, 
            ease: "easeInOut", 
            repeat: Infinity,
            repeatType: "mirror" 
          }}
          className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-screen select-none pointer-events-none"
          referrerPolicy="no-referrer"
        />

        {/* Backdrop radial mask for high content readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#09070d]/20 via-[#0a080e]/65 to-[#09070d]"></div >
        <div className="absolute inset-0 bg-[#09070d]/25 backdrop-blur-[0.5px]"></div>
        
        {/* Subtle analytical grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:28px_28px]"></div>
        
        {/* Additional organic ambient glow nodes with synchronized slow breathing */}
        <motion.div 
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[-10%] w-[120%] h-[60%] bg-gradient-to-tr from-[#8a4e9c]/10 via-[#4e3c9c]/5 to-transparent blur-[140px] rounded-full rotate-[-12deg] transform origin-bottom-left"
        />
        <motion.div 
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[5%] right-[5%] w-[350px] h-[350px] bg-[#6750a4]/5 rounded-full blur-[100px]"
        />
      </div>

      <div className="w-full max-w-sm flex flex-col items-center relative z-10 space-y-7">
        
        {/* Head branding header with Asterisk logo container exactly like mockup */}
        <div className="flex flex-col items-center justify-center text-center space-y-2.5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#cfbcff] to-[#6750a4] flex items-center justify-center shadow-lg shadow-[#6750a4]/25 border border-white/10 shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] text-white">
                <line x1="12" y1="4" x2="12" y2="20" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="6.34" y1="6.34" x2="17.66" y2="17.66" />
                <line x1="6.34" y1="17.66" x2="17.66" y2="6.34" />
              </svg>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide uppercase font-sans">
              同盟系统 Alliance System
            </h1>
          </div>
          <p className="text-xs text-[#cbc4d2]/50 font-medium tracking-[0.25em] pl-1">
            机构级流动性管理平台
          </p>
        </div>

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
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-base font-bold text-white tracking-wide">账户安全登录</h2>
                <span className="text-[10px] text-[#cfbcff]/80 bg-[#6750a4]/20 border border-[#6750a4]/40 px-2 py-0.5 rounded-full font-bold font-sans">
                  智能识别模式
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Form Entry */}
                <div id="email_field" className="space-y-1.5 align-left text-left">
                  <label className="text-[11px] font-bold text-[#cbc4d2]/60 block pl-0.5 text-left">登录邮箱</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#cbc4d2]/30">
                      <Mail className="w-3.5 h-3.5" />
                    </span>
                    <input 
                      type="email" 
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="请输入您的邮箱" 
                      required
                      className="w-full bg-[#100d15] border border-white/[0.04] text-white placeholder-[#cbc4d2]/20 pl-10 pr-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#6750a4] focus:ring-1 focus:ring-[#6750a4]/30 transition-all text-xs font-semibold"
                    />
                  </div>
                </div>

                {/* Password Form Entry with password toggler */}
                <div id="password_field" className="space-y-1.5 align-left text-left">
                  <label className="text-[11px] font-bold text-[#cbc4d2]/60 block pl-0.5 text-left font-sans">访问密码</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#cbc4d2]/30">
                      <LockIcon className="w-3.5 h-3.5" />
                    </span>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="访问口令" 
                      required
                      className="w-full bg-[#100d15] border border-white/[0.04] text-white placeholder-[#cbc4d2]/20 pl-10 pr-10 py-2.5 rounded-xl focus:outline-none focus:border-[#6750a4] focus:ring-1 focus:ring-[#6750a4]/30 transition-all text-xs font-semibold"
                    />
                    <button
                      type="button"
                      onChange={() => {}}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#cbc4d2]/40 hover:text-white transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me checkbox and Forgot Password link */}
                <div className="flex items-center justify-between text-[11px] font-bold pt-1">
                  <label className="flex items-center gap-1.5 text-[#cbc4d2]/40 hover:text-white transition-colors cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-white/10 bg-[#100d15] text-[#6750a4] focus:ring-0 focus:ring-offset-0 focus:outline-none w-3.5 h-3.5 accent-[#6750a4]"
                    />
                    记住密码
                  </label>
                  <button 
                    type="button" 
                    onClick={() => {
                      setErrorMsg('');
                      setForgotEmail(loginEmail);
                      setView('forgot');
                    }} 
                    className="text-[#cfbcff] hover:text-white transition-colors cursor-pointer font-bold"
                  >
                    忘记密码?
                  </button>
                </div>

                {/* Submit Entry Button */}
                <button 
                  type="submit"
                  className="w-full bg-[#6750a4] hover:bg-[#785fb8] text-white py-2.5 rounded-xl font-bold transition-all duration-250 shadow-md shadow-[#6750a4]/10 hover:shadow-lg hover:shadow-[#6750a4]/20 text-xs cursor-pointer hover:scale-[1.01] active:scale-[0.99] block text-center mt-2"
                >
                  立即登录
                </button>
              </form>

              {/* Secure access line design */}
              <div className="relative flex py-4 items-center justify-center">
                <div className="flex-grow border-t border-white/[0.04]"></div>
                <span className="flex-shrink mx-3 text-[9px] font-bold text-[#cbc4d2]/15 tracking-widest font-mono">安全加密访问</span>
                <div className="flex-grow border-t border-white/[0.04]"></div>
              </div>

              {/* Registration helper links with interaction handler */}
              <div className="text-center text-xs font-bold">
                <span className="text-[#cbc4d2]/40">还没有账户？</span>
                <button 
                  type="button"
                  onClick={() => {
                    setErrorMsg('');
                    setView('register');
                  }}
                  className="text-[#cfbcff] hover:underline ml-1 cursor-pointer font-bold"
                >
                  立即注册
                </button>
              </div>
            </>
          )}

          {view === 'register' && (
            <>
              <div className="flex items-center gap-2 mb-5">
                <button 
                  onClick={() => { setView('login'); setErrorMsg(''); }}
                  className="p-1 text-[#cbc4d2]/40 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <h2 className="text-base font-bold text-white tracking-wide">注册新同盟账户</h2>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-1.5 align-left text-left">
                  <label className="text-[11px] font-bold text-[#cbc4d2]/60 block pl-0.5 text-left">注册邮箱</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#cbc4d2]/30">
                      <Mail className="w-3.5 h-3.5" />
                    </span>
                    <input 
                      type="email" 
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="请填写您的邮箱" 
                      required
                      className="w-full bg-[#100d15] border border-white/[0.04] text-white placeholder-[#cbc4d2]/20 pl-10 pr-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#6750a4] focus:ring-1 focus:ring-[#6750a4]/30 transition-all text-xs font-semibold"
                    />
                  </div>
                  <p className="text-[9px] text-[#cbc4d2]/30 leading-snug pl-0.5">
                    * 提示: 邮箱以 <span className="text-[#cfbcff]">@alliance.system</span> 结尾将内置管理员权限
                  </p>
                </div>

                <div className="space-y-1.5 align-left text-left">
                  <label className="text-[11px] font-bold text-[#cbc4d2]/60 block pl-0.5 text-left">会员专属昵称</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#cbc4d2]/30">
                      <UserIcon className="w-3.5 h-3.5" />
                    </span>
                    <input 
                      type="text" 
                      value={regNickname}
                      onChange={(e) => setRegNickname(e.target.value)}
                      placeholder="您的同盟昵称" 
                      required
                      className="w-full bg-[#100d15] border border-white/[0.04] text-white placeholder-[#cbc4d2]/20 pl-10 pr-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#6750a4] focus:ring-1 focus:ring-[#6750a4]/30 transition-all text-xs font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 align-left text-left">
                  <label className="text-[11px] font-bold text-[#cbc4d2]/60 block pl-0.5 text-left">设置访问密码</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#cbc4d2]/30">
                      <LockIcon className="w-3.5 h-3.5" />
                    </span>
                    <input 
                      type="password" 
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="设置安全密码" 
                      required
                      className="w-full bg-[#100d15] border border-white/[0.04] text-white placeholder-[#cbc4d2]/20 pl-10 pr-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#6750a4] focus:ring-1 focus:ring-[#6750a4]/30 transition-all text-xs font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 align-left text-left">
                  <label className="text-[11px] font-bold text-[#cbc4d2]/60 block pl-0.5 text-left">确认访问密码</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#cbc4d2]/30">
                      <LockIcon className="w-3.5 h-3.5" />
                    </span>
                    <input 
                      type="password" 
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="再次确认新密码" 
                      required
                      className="w-full bg-[#100d15] border border-white/[0.04] text-white placeholder-[#cbc4d2]/20 pl-10 pr-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#6750a4] focus:ring-1 focus:ring-[#6750a4]/30 transition-all text-xs font-semibold"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#6750a4] hover:bg-[#785fb8] text-white py-2.5 rounded-xl font-bold transition-all duration-250 shadow-md text-xs cursor-pointer mt-2 block text-center"
                >
                  创建注册并自动填入
                </button>
              </form>

              <div className="text-center text-xs font-bold mt-5">
                <span className="text-[#cbc4d2]/40">已有同盟账户？</span>
                <button 
                  type="button" 
                  onClick={() => { setView('login'); setErrorMsg(''); }}
                  className="text-[#cfbcff] hover:underline ml-1 cursor-pointer font-bold"
                >
                  返回登录
                </button>
              </div>
            </>
          )}

          {view === 'forgot' && (
            <>
              <div className="flex items-center gap-2 mb-5">
                <button 
                  onClick={() => { setView('login'); setErrorMsg(''); }}
                  className="p-1 text-[#cbc4d2]/40 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <h2 className="text-base font-bold text-white tracking-wide">密码重设申请</h2>
              </div>

              <form onSubmit={handleRequestResetCode} className="space-y-4">
                <p className="text-xs text-[#cbc4d2]/60 leading-relaxed text-left">
                  请输入您注册同盟系统所使用的邮箱地址，我们将通过多重安全节点自动发放密码重置安全验证秘钥码。
                </p>

                <div className="space-y-1.5 pt-2 align-left text-left">
                  <label className="text-[11px] font-bold text-[#cbc4d2]/60 block pl-0.5 text-left">注册邮箱</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#cbc4d2]/30">
                      <Mail className="w-3.5 h-3.5" />
                    </span>
                    <input 
                      type="email" 
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="输入您的注册邮箱" 
                      required
                      className="w-full bg-[#100d15] border border-white/[0.04] text-white placeholder-[#cbc4d2]/20 pl-10 pr-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#6750a4] focus:ring-1 focus:ring-[#6750a4]/30 transition-all text-xs font-semibold"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#6750a4] hover:bg-[#785fb8] text-white py-2.5 rounded-xl font-bold transition-all text-xs cursor-pointer mt-2 block text-center"
                >
                  检测账号并发送验证秘钥
                </button>
              </form>
            </>
          )}

          {view === 'reset' && (
            <>
              <div className="flex items-center gap-2 mb-5">
                <button 
                  onClick={() => { setView('forgot'); setErrorMsg(''); }}
                  className="p-1 text-[#cbc4d2]/40 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <h2 className="text-base font-bold text-white tracking-wide">设置新安全密码</h2>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-1.5 align-left text-left">
                  <label className="text-[10px] font-black text-[#cfbcff] block uppercase tracking-wider pl-0.5 text-left font-mono">
                    演示安全核验码 (123456)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#cbc4d2]/30">
                      <Smartphone className="w-3.5 h-3.5" />
                    </span>
                    <input 
                      type="text" 
                      value={resetCode}
                      onChange={(e) => setResetCode(e.target.value)}
                      placeholder="核验验证码 (请输入 123456)" 
                      required
                      className="w-full bg-[#100d15] border border-white/[0.04] text-white placeholder-[#cbc4d2]/20 pl-10 pr-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#6750a4] focus:ring-1 focus:ring-[#6750a4]/30 transition-all text-xs font-semibold font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 align-left text-left">
                  <label className="text-[11px] font-bold text-[#cbc4d2]/60 block pl-0.5 text-left font-sans">重设新访问密码</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#cbc4d2]/30">
                      <LockIcon className="w-3.5 h-3.5" />
                    </span>
                    <input 
                      type={showNewPassword ? "text" : "password"} 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="请输入4位以上新密码" 
                      required
                      className="w-full bg-[#100d15] border border-white/[0.04] text-white placeholder-[#cbc4d2]/20 pl-10 pr-10 py-2.5 rounded-xl focus:outline-none focus:border-[#6750a4] focus:ring-1 focus:ring-[#6750a4]/30 transition-all text-xs font-semibold"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#cbc4d2]/40 hover:text-white transition-colors cursor-pointer animate-none"
                    >
                      {showNewPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5 align-left text-left">
                  <label className="text-[11px] font-bold text-[#cbc4d2]/60 block pl-0.5 text-left">再次确认新密码</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#cbc4d2]/30">
                      <LockIcon className="w-3.5 h-3.5" />
                    </span>
                    <input 
                      type="password" 
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="再次输入相同密码" 
                      required
                      className="w-full bg-[#100d15] border border-white/[0.04] text-white placeholder-[#cbc4d2]/20 pl-10 pr-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#6750a4] focus:ring-1 focus:ring-[#6750a4]/30 transition-all text-xs font-semibold"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#6750a4] hover:bg-[#785fb8] text-white py-2.5 rounded-xl font-bold transition-all text-xs cursor-pointer mt-2 block text-center"
                >
                  确定完成密码重设
                </button>
              </form>
            </>
          )}

        </div>

        {/* Footer info exactly matching the bottom style layout in mockup */}
        <div className="flex items-center justify-center flex-wrap gap-x-3 gap-y-1.5 text-[9px] font-mono font-bold text-[#cbc4d2]/25 tracking-wider">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
            <span>服务器已连接</span>
          </div>
          <span>V 2.4.0-PRO</span>
          <span>© 2024 Alliance System</span>
        </div>

      </div>
    </motion.div>
  );
}
