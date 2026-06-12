import { AlertCircle, Check, Mail, User, UserCheck } from 'lucide-react';
import type { ProfileFormProps } from '../types';

export function ProfileForm({
  formNickname,
  formEmail,
  profileSuccess,
  profileError,
  setFormNickname,
  setFormEmail,
  onSaveProfile
}: ProfileFormProps) {
  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-2 pb-3 border-b border-white/5">
        <User className="w-5 h-5 text-[#cfbcff]" />
        <h2 className="text-base font-extrabold text-white tracking-wide">基本资料 & 修改安全代称</h2>
      </div>

      <form onSubmit={onSaveProfile} className="space-y-4">
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
  );
}
