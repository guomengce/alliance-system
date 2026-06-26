import { UserCheck, X } from 'lucide-react';
import type { AddAccountModalProps } from '../types';

export function AddAccountModal({
  roles,
  newUsername,
  newNickname,
  newEmail,
  newRole,
  setIsNewAccountModalOpen,
  setNewUsername,
  setNewNickname,
  setNewEmail,
  setNewRole,
  handleCreateAccount,
}: AddAccountModalProps) {
  return (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn p-4">
          <form 
            onSubmit={handleCreateAccount}
            className="bg-[#181421] border border-white/10 rounded-3xl max-w-md w-full p-6 md:p-8 relative shadow-2xl animate-slideUp space-y-5 max-h-[92vh] overflow-y-auto custom-scrollbar"
          >
            <button
              type="button"
              onClick={() => setIsNewAccountModalOpen(false)}
              className="absolute right-4 top-4 text-[#cbc4d2]/60 hover:text-white transition-colors cursor-pointer outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 pb-3 border-b border-white/5">
              <div className="w-9 h-9 rounded-xl bg-[#cfbcff]/10 flex items-center justify-center border border-[#cfbcff]/20">
                <UserCheck className="w-4 h-4 text-[#cfbcff]" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-black text-white">分拨授权新后台管理员账户</h4>
                <p className="text-xs text-[#cbc4d2]/40 font-mono mt-0.5">CREATE BACKOFFICE ENTRANCE</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-left text-sans">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#cbc4d2]/60 uppercase">设置登录账号名 (必填/唯一)</label>
                <input 
                  type="text"
                  required
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="如: finance_ops_mary"
                  className="w-full bg-[#110e16] border border-white/10 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#cfbcff]/50 font-mono"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#cbc4d2]/60 uppercase">管理员真实姓名/昵称名称 (必填)</label>
                <input 
                  type="text"
                  required
                  value={newNickname}
                  onChange={(e) => setNewNickname(e.target.value)}
                  placeholder="如: 审计代表 (Mary)"
                  className="w-full bg-[#110e16] border border-white/10 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#cfbcff]/50"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#cbc4d2]/60 uppercase">工作邮箱地址 (必填)</label>
                <input 
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="如: mary@alliance.system"
                  className="w-full bg-[#110e16] border border-white/10 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#cfbcff]/50 font-mono"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#cbc4d2]/60 uppercase">指派初始关联挂接角色</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-[#110e16] border border-white/10 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#cfbcff]/50 cursor-pointer font-bold"
                >
                  {roles.map(r => (
                    <option key={r.roleCode} value={r.roleCode}>
                      {r.roleName} ({r.roleCode})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex gap-3 text-xs">
              <button
                type="button"
                onClick={() => setIsNewAccountModalOpen(false)}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all cursor-pointer"
              >
                取消
              </button>
              <button
                type="submit"
                className="flex-[2] py-3 bg-gradient-to-r from-emerald-500 to-teal-400 text-[#110e16] font-black rounded-xl cursor-pointer transition-all text-center"
              >
                授权新管理员并激活
              </button>
            </div>
          </form>
        </div>
  );
}
