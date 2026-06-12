import { Eye, EyeOff, Lock as LockIcon, Mail } from 'lucide-react';
import type { LoginFormProps } from '../types';

export default function LoginForm({
  loginEmail,
  loginPassword,
  showPassword,
  rememberMe,
  onSubmit,
  onLoginEmailChange,
  onLoginPasswordChange,
  onShowPasswordChange,
  onRememberMeChange,
  onForgotClick,
  onRegisterClick
}: LoginFormProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-base font-bold text-white tracking-wide">账户安全登录</h2>
        <span className="text-[10px] text-[#cfbcff]/80 bg-[#6750a4]/20 border border-[#6750a4]/40 px-2 py-0.5 rounded-full font-bold font-sans">
          智能识别模式
        </span>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div id="email_field" className="space-y-1.5 align-left text-left">
          <label className="text-[11px] font-bold text-[#cbc4d2]/60 block pl-0.5 text-left">登录邮箱</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#cbc4d2]/30">
              <Mail className="w-3.5 h-3.5" />
            </span>
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => onLoginEmailChange(e.target.value)}
              placeholder="请输入您的邮箱"
              required
              className="w-full bg-[#100d15] border border-white/[0.04] text-white placeholder-[#cbc4d2]/20 pl-10 pr-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#6750a4] focus:ring-1 focus:ring-[#6750a4]/30 transition-all text-xs font-semibold"
            />
          </div>
        </div>

        <div id="password_field" className="space-y-1.5 align-left text-left">
          <label className="text-[11px] font-bold text-[#cbc4d2]/60 block pl-0.5 text-left font-sans">访问密码</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#cbc4d2]/30">
              <LockIcon className="w-3.5 h-3.5" />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              value={loginPassword}
              onChange={(e) => onLoginPasswordChange(e.target.value)}
              placeholder="访问口令"
              required
              className="w-full bg-[#100d15] border border-white/[0.04] text-white placeholder-[#cbc4d2]/20 pl-10 pr-10 py-2.5 rounded-xl focus:outline-none focus:border-[#6750a4] focus:ring-1 focus:ring-[#6750a4]/30 transition-all text-xs font-semibold"
            />
            <button
              type="button"
              onChange={() => {}}
              onClick={() => onShowPasswordChange(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#cbc4d2]/40 hover:text-white transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-bold pt-1">
          <label className="flex items-center gap-1.5 text-[#cbc4d2]/40 hover:text-white transition-colors cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => onRememberMeChange(e.target.checked)}
              className="rounded border-white/10 bg-[#100d15] text-[#6750a4] focus:ring-0 focus:ring-offset-0 focus:outline-none w-3.5 h-3.5 accent-[#6750a4]"
            />
            记住密码
          </label>
          <button
            type="button"
            onClick={onForgotClick}
            className="text-[#cfbcff] hover:text-white transition-colors cursor-pointer font-bold"
          >
            忘记密码?
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#6750a4] hover:bg-[#785fb8] text-white py-2.5 rounded-xl font-bold transition-all duration-250 shadow-md shadow-[#6750a4]/10 hover:shadow-lg hover:shadow-[#6750a4]/20 text-xs cursor-pointer hover:scale-[1.01] active:scale-[0.99] block text-center mt-2"
        >
          立即登录
        </button>
      </form>

      <div className="relative flex py-4 items-center justify-center">
        <div className="flex-grow border-t border-white/[0.04]"></div>
        <span className="flex-shrink mx-3 text-[9px] font-bold text-[#cbc4d2]/15 tracking-widest font-mono">安全加密访问</span>
        <div className="flex-grow border-t border-white/[0.04]"></div>
      </div>

      <div className="text-center text-xs font-bold">
        <span className="text-[#cbc4d2]/40">还没有账户？</span>
        <button
          type="button"
          onClick={onRegisterClick}
          className="text-[#cfbcff] hover:underline ml-1 cursor-pointer font-bold"
        >
          立即注册
        </button>
      </div>
    </>
  );
}
