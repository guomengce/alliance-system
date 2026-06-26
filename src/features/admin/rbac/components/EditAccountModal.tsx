import { Check, Edit, Lock, RefreshCw, X } from 'lucide-react';
import type { EditAccountModalProps } from '../types';

export function EditAccountModal({
  permissionInventory,
  roles,
  editingAccount,
  editNickname,
  editEmail,
  editRole,
  editStatus,
  setEditingAccount,
  setEditNickname,
  setEditEmail,
  setEditRole,
  setEditStatus,
  handleSaveEditAccount,
  handleResetPassword,
}: EditAccountModalProps) {
  return (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn p-4">
          <form 
            onSubmit={handleSaveEditAccount}
            className="bg-[#181421] border border-white/10 rounded-3xl max-w-md w-full p-6 md:p-8 relative shadow-2xl animate-slideUp space-y-5 max-h-[92vh] overflow-y-auto custom-scrollbar"
          >
            <button
              type="button"
              onClick={() => setEditingAccount(null)}
              className="absolute right-4 top-4 text-[#cbc4d2]/60 hover:text-white transition-colors cursor-pointer outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 pb-3 border-b border-white/5">
              <div className="w-9 h-9 rounded-xl bg-[#cfbcff]/10 flex items-center justify-center border border-[#cfbcff]/20">
                <Edit className="w-4 h-4 text-[#cfbcff]" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-black text-white">持权管理账号详情与特权修定</h4>
                <p className="text-xs text-[#cbc4d2]/40 font-mono mt-0.5">EDIT PRIVILEGED ACCOUNT</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-left font-sans">
              
              {/* Account username (Read-only status) */}
              <div className="flex flex-col gap-1.5 bg-[#110e16] p-3 rounded-xl border border-white/5 font-mono">
                <span className="text-xs font-bold text-[#cbc4d2]/40 uppercase animate-pulse">验证账号标识 (ID)</span>
                <span className="text-sm text-white font-extrabold flex items-center gap-2">
                  <span className="text-[#cfbcff]">{editingAccount.username}</span>
                  <span className="text-xs text-[#cbc4d2]/30">({editingAccount.id})</span>
                </span>
              </div>

              {/* Editable Name/Nickname */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#cbc4d2]/60 uppercase">持权管理员姓名/昵称 (必填)</label>
                <input 
                  type="text"
                  required
                  value={editNickname}
                  onChange={(e) => setEditNickname(e.target.value)}
                  placeholder="如: 审计主管"
                  className="w-full bg-[#110e16] border border-white/10 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#cfbcff]/50 font-sans"
                />
              </div>

              {/* Editable Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#cbc4d2]/60 uppercase">联络与安全警报邮箱 (必填)</label>
                <input 
                  type="email"
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  placeholder="如: boss@alliance.system"
                  className="w-full bg-[#110e16] border border-white/10 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#cfbcff]/50 font-mono"
                />
              </div>

              {/* Change Core Role Assignment */}
              <div className="flex flex-col gap-1.5 font-sans">
                <label className="text-xs font-bold text-[#cbc4d2]/60 uppercase">指派核心角色权能机制</label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  disabled={editingAccount.username === 'admin_master'}
                  className="w-full bg-[#110e16] border border-white/10 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#cfbcff]/50 cursor-pointer font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {roles.map(r => (
                    <option key={r.roleCode} value={r.roleCode}>
                      {r.roleName} ({r.roleCode})
                    </option>
                  ))}
                </select>
                {editingAccount.username === 'admin_master' && (
                  <p className="text-xs text-[#cbc4d2]/30 italic leading-normal">
                    * 根节点初始主管理员 master 的角色挂接锁定为超级管理员，不可降权或更改。
                  </p>
                )}
              </div>

              {/* Display corresponding permissions list dynamically */}
              <div className="p-3 bg-[#110e16]/80 rounded-xl border border-white/5 space-y-1.5 font-sans">
                <span className="text-[13px] font-black text-[#cfbcff]/80 uppercase block">映射的子版块读写特权范围 (权限)：</span>
                <div className="text-xs text-[#cbc4d2]/60 leading-normal space-y-1.5 max-h-[110px] overflow-y-auto scrollbar-thin">
                  {(() => {
                    const matchedRole = roles.find(r => r.roleCode === editRole);
                    if (!matchedRole || matchedRole.permissions.length === 0) {
                      return <span className="text-red-400 italic font-medium">● 尚未授予任何板块特殊读写权限</span>;
                    }
                    return matchedRole.permissions.map(pmCode => {
                      const permDef = permissionInventory.find(pd => pd.code === pmCode);
                      return (
                        <div key={pmCode} className="flex items-center gap-1.5 text-white/85">
                          <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>{permDef?.name || pmCode} <span className="text-xs font-mono opacity-45">[{pmCode}]</span></span>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* Edit Account Status selection */}
              <div className="flex flex-col gap-1.5 font-sans">
                <label className="text-xs font-bold text-[#cbc4d2]/60 uppercase">安全管制状态设定</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as any)}
                  disabled={editingAccount.username === 'admin_master'}
                  className="w-full bg-[#110e16] border border-white/10 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#cfbcff]/50 cursor-pointer font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="active">● 活跃就绪 (Active Ready)</option>
                  <option value="suspended">● 临时中止 (Suspended Wait)</option>
                  <option value="isolated">● 隔离管控 (Isolated Warning)</option>
                </select>
              </div>

              {/* Password Reset Trigger in High-Fidelity Alert style */}
              <div className="p-3 bg-red-950/20 border border-red-500/15 rounded-2xl flex flex-col gap-2 font-sans">
                <div className="flex items-center gap-1.5 text-red-400">
                  <Lock className="w-3.5 h-3.5" />
                  <span className="font-extrabold text-xs uppercase tracking-wide">账号密码安全及口令重置</span>
                </div>
                <p className="text-xs text-[#cbc4d2]/60 leading-relaxed text-left">
                  若由于离线密钥失落、多点异动异常或面临密码重核，建议一键强制重置该持权人的后台访问密码。
                </p>
                <button
                  type="button"
                  onClick={() => handleResetPassword(editingAccount.username)}
                  className="bg-red-500/10 hover:bg-red-500/25 active:scale-95 text-red-300 font-bold px-3 py-2.5 rounded-xl transition-all cursor-pointer border border-red-500/20 flex items-center justify-center gap-1.5 text-[13px] mt-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>重置用户密码 (Reset Password)</span>
                </button>
              </div>

            </div>

            {/* Modal Actions footer section */}
            <div className="pt-3 border-t border-white/5 flex gap-3 text-xs font-sans">
              <button
                type="button"
                onClick={() => setEditingAccount(null)}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all cursor-pointer"
              >
                关闭取消
              </button>
              <button
                type="submit"
                className="flex-[2] py-3 bg-gradient-to-r from-teal-500 to-emerald-400 text-[#110e16] font-black rounded-xl cursor-pointer transition-all text-center"
              >
                保存修改并执行
              </button>
            </div>
          </form>
        </div>
  );
}
