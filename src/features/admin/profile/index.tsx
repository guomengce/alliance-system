import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Check, 
  Clock, 
  ShieldCheck, 
  User, 
  Lock, 
  X, 
  LogOut, 
  AlertCircle,
  KeyRound,
  Mail,
  UserCheck
} from 'lucide-react';

interface AdminProfileViewProps {
  uid: string;
  nickname: string;
  email: string;
  loginPasswordVal: string;
  onUpdateNickname: (newName: string) => void;
  onUpdateEmail: (newEmail: string) => void;
  onUpdatePassword: (newPw: string) => void;
  onLogout: () => void;
}

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

  const handleSaveProfile = (e: React.FormEvent) => {
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

  const handleSavePassword = (e: React.FormEvent) => {
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
      <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-[#cfbcff]/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-6 w-full">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#6750a4] to-[#cfbcff] p-1 shadow-lg">
              <div className="w-full h-full rounded-full bg-[#141218] flex items-center justify-center border border-[#cfbcff]/20">
                <span className="text-3xl font-black text-[#cfbcff] tracking-tight font-mono">
                  {nickname ? nickname.charAt(0).toUpperCase() : 'A'}
                </span>
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#cfbcff] text-[#141218] w-7 h-7 rounded-lg flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-4.5 h-4.5" />
            </div>
          </div>

          <div className="space-y-3 flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-3 justify-center md:justify-start">
              <h1 className="text-xl md:text-2xl font-black text-white">{nickname}</h1>
              <span className="bg-[#cfbcff]/10 text-[#cfbcff] text-[10px] font-black uppercase px-2.5 py-0.5 rounded border border-[#cfbcff]/20 w-fit mx-auto md:mx-0 tracking-wider">
                SYSTEM SUPERUSER
              </span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-[#cbc4d2]">
              <div className="flex items-center gap-1.5 opacity-80">
                <span className="font-semibold text-[#cfbcff] font-mono">ADMIN UID:</span>
                <span className="font-mono">{uid}</span>
              </div>
              <div className="flex items-center gap-1.5 opacity-80">
                <span className="font-semibold text-[#cfbcff] font-mono">ROLE LEVEL:</span>
                <span>ROOT MASTER</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Settings Form Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic profile details form */}
        <div className="glass-card rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-white/5">
            <User className="w-5 h-5 text-[#cfbcff]" />
            <h2 className="text-base font-extrabold text-white tracking-wide">基本资料 & 修改安全代称</h2>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#cbc4d2] uppercase">系统管理员名称 (Nickname)</label>
              <div className="relative">
                <input 
                  type="text"
                  value={formNickname}
                  onChange={(e) => setFormNickname(e.target.value)}
                  className="bg-[#110e16] border border-white/10 hover:border-[#cfbcff]/30 focus:border-[#cfbcff] text-white text-xs font-bold px-4 py-3 rounded-xl focus:outline-none transition-all w-full pl-10"
                  placeholder="请输入超级管理员代称"
                />
                <UserCheck className="w-4 h-4 text-[#cbc4d2]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#cbc4d2] uppercase">安全保密邮箱 (Email)</label>
              <div className="relative">
                <input 
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="bg-[#110e16] border border-white/10 hover:border-[#cfbcff]/30 focus:border-[#cfbcff] text-white text-xs font-bold px-4 py-3 rounded-xl focus:outline-none transition-all w-full pl-10 font-mono"
                  placeholder="root@alliance.com"
                />
                <Mail className="w-4 h-4 text-[#cbc4d2]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {profileError && (
              <p className="text-white font-bold text-xs flex items-center gap-1.5 bg-white/5 p-2 rounded-lg border border-white/10">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#cfbcff]" /> {profileError}
              </p>
            )}

            {profileSuccess && (
              <p className="text-white font-bold text-xs flex items-center gap-1.5 bg-[#cfbcff]/10 p-2 rounded-lg border border-[#cfbcff]/20">
                <Check className="w-4 h-4 shrink-0 text-[#cfbcff]" /> 管理员账户信息保存成功！
              </p>
            )}

            <div className="pt-2 flex justify-end">
              <button 
                type="submit"
                className="bg-[#cfbcff] hover:bg-[#cfbcff]/90 active:scale-95 text-[#141218] px-6 py-3 rounded-xl font-extrabold text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-[#cfbcff]/10 cursor-pointer"
              >
                <Check className="w-4 h-4" /> 保存当前资料
              </button>
            </div>
          </form>
        </div>

        {/* Password Security updates */}
        <div className="glass-card rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-white/5">
            <Lock className="w-5 h-5 text-[#cfbcff]" />
            <h2 className="text-base font-extrabold text-white tracking-wide">更变安全凭证 / 修改系统密码</h2>
          </div>

          <form onSubmit={handleSavePassword} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#cbc4d2] uppercase">当前超级管理旧密码</label>
              <div className="relative">
                <input 
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="bg-[#110e16] border border-white/10 hover:border-[#cfbcff]/30 focus:border-[#cfbcff] text-white text-xs px-4 py-3 rounded-xl focus:outline-none transition-all w-full pl-10 font-mono"
                  placeholder="请输入当前在使用密码进行授权"
                />
                <KeyRound className="w-4 h-4 text-[#cbc4d2]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#cbc4d2] uppercase">设置新安全密码</label>
                <div className="relative">
                  <input 
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-[#110e16] border border-white/10 hover:border-[#cfbcff]/30 focus:border-[#cfbcff] text-white text-xs px-4 py-3 rounded-xl focus:outline-none transition-all w-full pl-10 font-mono"
                    placeholder="不小于6位强口令"
                  />
                  <Lock className="w-4 h-4 text-[#cbc4d2]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#cbc4d2] uppercase">确认新安全密码</label>
                <div className="relative">
                  <input 
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-[#110e16] border border-white/10 hover:border-[#cfbcff]/30 focus:border-[#cfbcff] text-white text-xs px-4 py-3 rounded-xl focus:outline-none transition-all w-full pl-10 font-mono"
                    placeholder="再次核对无误密码"
                  />
                  <Lock className="w-4 h-4 text-[#cbc4d2]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {passwordError && (
              <p className="text-white font-bold text-xs flex items-center gap-1.5 bg-white/5 p-2 rounded-lg border border-white/10">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#cfbcff]" /> {passwordError}
              </p>
            )}

            {passwordSuccess && (
              <p className="text-white font-bold text-xs flex items-center gap-1.5 bg-[#cfbcff]/10 p-2 rounded-lg border border-[#cfbcff]/20">
                <Check className="w-4 h-4 shrink-0 text-[#cfbcff]" /> {passwordSuccess}
              </p>
            )}

            <div className="pt-2 flex justify-end">
              <button 
                type="submit"
                className="bg-[#cfbcff]/10 hover:bg-[#cfbcff]/20 text-[#cfbcff] border border-[#cfbcff]/30 hover:border-[#cfbcff]/50 px-6 py-3 rounded-xl font-extrabold text-xs transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <Check className="w-4 h-4" /> 确认修改
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Safety Logout Separator Section matching client setting design */}
      <div className="pt-6 max-w-xs mx-auto">
        <button 
          onClick={onLogout}
          className="w-full py-3.5 rounded-2xl border border-red-500/10 hover:bg-red-500/10 text-red-400 font-extrabold text-xs flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] active:scale-95 cursor-pointer"
        >
          <LogOut className="w-4 h-4" /> 安全注销退出系统
        </button>
      </div>
    </motion.div>
  );
}

