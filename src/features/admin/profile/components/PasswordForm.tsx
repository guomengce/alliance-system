import { AlertCircle, Check, KeyRound, Lock } from 'lucide-react';
import type { PasswordFormProps } from '../types';

export function PasswordForm({
  oldPassword,
  newPassword,
  confirmPassword,
  passwordSuccess,
  passwordError,
  setOldPassword,
  setNewPassword,
  setConfirmPassword,
  onSavePassword
}: PasswordFormProps) {
  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-2 pb-3 border-b border-white/5">
        <Lock className="w-5 h-5 text-[#cfbcff]" />
        <h2 className="text-base font-extrabold text-white tracking-wide">更变安全凭证 / 修改系统密码</h2>
      </div>

      <form onSubmit={onSavePassword} className="space-y-4">
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
  );
}
