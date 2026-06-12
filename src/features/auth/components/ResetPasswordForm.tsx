import { ArrowLeft, Eye, EyeOff, Lock as LockIcon, Smartphone } from 'lucide-react';
import type { ResetPasswordFormProps } from '../types';

export default function ResetPasswordForm({
  resetCode,
  newPassword,
  confirmNewPassword,
  showNewPassword,
  onSubmit,
  onBackToForgot,
  onResetCodeChange,
  onNewPasswordChange,
  onConfirmNewPasswordChange,
  onShowNewPasswordChange
}: ResetPasswordFormProps) {
  return (
    <>
      <div className="flex items-center gap-2 mb-5">
        <button
          onClick={onBackToForgot}
          className="p-1 text-[#cbc4d2]/40 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h2 className="text-base font-bold text-white tracking-wide">设置新安全密码</h2>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
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
              onChange={(e) => onResetCodeChange(e.target.value)}
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
              onChange={(e) => onNewPasswordChange(e.target.value)}
              placeholder="请输入4位以上新密码"
              required
              className="w-full bg-[#100d15] border border-white/[0.04] text-white placeholder-[#cbc4d2]/20 pl-10 pr-10 py-2.5 rounded-xl focus:outline-none focus:border-[#6750a4] focus:ring-1 focus:ring-[#6750a4]/30 transition-all text-xs font-semibold"
            />
            <button
              type="button"
              onClick={() => onShowNewPasswordChange(!showNewPassword)}
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
              onChange={(e) => onConfirmNewPasswordChange(e.target.value)}
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
  );
}
