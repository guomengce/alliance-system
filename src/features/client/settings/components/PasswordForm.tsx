import { Eye, EyeOff, Key } from 'lucide-react';
import type { PasswordFormProps } from '../types';

export default function PasswordForm({
  showPassword,
  oldPassword,
  newPassword,
  setShowPassword,
  setOldPassword,
  setNewPassword,
  onUpdatePasswords
}: PasswordFormProps) {
  return (
    <div className="glass-card rounded-2xl p-6 md:p-8">
      <h3 className="text-base font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
        <Key className="w-5 h-5 text-[#cfbcff]" /> 账号登录安全密码
      </h3>

      <form onSubmit={onUpdatePasswords} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-[#cbc4d2] font-semibold uppercase tracking-wider">原始登录密码</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="******"
                className="w-full bg-[#211f24] border border-white/10 text-white rounded-lg pl-4 pr-10 py-2.5 text-sm focus:ring-1 focus:ring-[#cfbcff] outline-none"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-[#cbc4d2] font-semibold uppercase tracking-wider">新设定登录密码</label>
            <input 
              type="password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="请输入新安全密码..."
              className="bg-[#211f24] border border-white/10 text-white rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-[#cfbcff] outline-none"
            />
          </div>
        </div>

        <button 
          type="submit"
          className="bg-[#cfbcff] text-[#381e72] px-6 py-2.5 rounded-lg text-xs font-bold hover:brightness-110 active:scale-95 transition-all text-right ml-auto block"
        >
          修改登录密码
        </button>
      </form>
    </div>
  );
}
