import { ArrowLeft, Lock as LockIcon, Mail, User as UserIcon } from 'lucide-react';
import type { RegisterFormProps } from '../types';

export default function RegisterForm({
  regEmail,
  regNickname,
  regPassword,
  regConfirmPassword,
  onSubmit,
  onBackToLogin,
  onRegEmailChange,
  onRegNicknameChange,
  onRegPasswordChange,
  onRegConfirmPasswordChange
}: RegisterFormProps) {
  return (
    <>
      <div className="flex items-center gap-2 mb-5">
        <button
          onClick={onBackToLogin}
          className="p-1 text-[#cbc4d2]/40 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h2 className="text-base font-bold text-white tracking-wide">注册新同盟账户</h2>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5 align-left text-left">
          <label className="text-[11px] font-bold text-[#cbc4d2]/60 block pl-0.5 text-left">注册邮箱</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#cbc4d2]/30">
              <Mail className="w-3.5 h-3.5" />
            </span>
            <input
              type="email"
              value={regEmail}
              onChange={(e) => onRegEmailChange(e.target.value)}
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
              onChange={(e) => onRegNicknameChange(e.target.value)}
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
              onChange={(e) => onRegPasswordChange(e.target.value)}
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
              onChange={(e) => onRegConfirmPasswordChange(e.target.value)}
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
          onClick={onBackToLogin}
          className="text-[#cfbcff] hover:underline ml-1 cursor-pointer font-bold"
        >
          返回登录
        </button>
      </div>
    </>
  );
}

