import { ArrowLeft, Mail } from 'lucide-react';
import type { ForgotPasswordFormProps } from '../types';

export default function ForgotPasswordForm({
  forgotEmail,
  onSubmit,
  onBackToLogin,
  onForgotEmailChange
}: ForgotPasswordFormProps) {
  return (
    <>
      <div className="flex items-center gap-2 mb-5">
        <button
          onClick={onBackToLogin}
          className="p-1 text-[#cbc4d2]/40 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h2 className="text-base font-bold text-white tracking-wide">密码重设申请</h2>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
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
              onChange={(e) => onForgotEmailChange(e.target.value)}
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
  );
}
