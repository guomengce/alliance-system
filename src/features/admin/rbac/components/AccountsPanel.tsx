import { AlertCircle, Edit, Sliders, UserMinus } from 'lucide-react';
import type { WorkspaceProps } from '../types';

type AccountsPanelProps = Pick<
  WorkspaceProps,
  | 'adminUsers'
  | 'roles'
  | 'handleOpenEditAccount'
  | 'handleToggleAccountStatus'
  | 'handleDeleteAccount'
>;

export default function AccountsPanel({
  adminUsers,
  roles,
  handleOpenEditAccount,
  handleToggleAccountStatus,
  handleDeleteAccount
}: AccountsPanelProps) {
  return (
    <div className="space-y-4 md:space-y-6 animate-fadeIn">
      {/* List Row card */}
      <div className="glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h4 className="text-xs md:text-sm font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#cfbcff]" />
            <span>后台注册持权管理员登录账号代表列表</span>
          </h4>
          <span className="text-xs text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
            Audited Under HMAC-SHA256
          </span>
        </div>

        {/* Desktop/Tablet View Table */}
        <div className="hidden md:block overflow-x-auto text-xs">
          <table className="w-full text-left font-sans">
            <thead>
              <tr className="border-b border-white/5 text-[#cbc4d2]/50 font-black">
                <th className="py-3 px-2">登录账户 / UID</th>
                <th className="py-3 px-2">人员昵称 / 邮箱</th>
                <th className="py-3 px-2">挂接安全角色</th>
                <th className="py-3 px-2 text-center">状态</th>
                <th className="py-3 px-4 text-right">安全流控控制</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {adminUsers.map(u => {
                const roleObj = roles.find(r => r.roleCode === u.role);
                return (
                  <tr key={u.id} className="hover:bg-white/[0.015] transition-colors">
                    <td className="py-3.5 px-2 text-left">
                      <p className="font-extrabold text-white text-xs font-mono">{u.username}</p>
                      <p className="text-xs text-[#cbc4d2]/40 mt-0.5">{u.id}</p>
                    </td>
                    <td className="py-3.5 px-2 text-left font-sans">
                      <p className="text-white leading-none font-bold text-xs">{u.nickname}</p>
                      <p className="text-xs text-[#cbc4d2]/50 mt-1">{u.email}</p>
                    </td>
                    <td className="py-3.5 px-2 text-left">
                      <span className="text-xs bg-[#6750a4]/10 border border-[#cfbcff]/20 text-[#cfbcff] px-2 py-1 rounded-lg font-sans font-extrabold">
                        {roleObj?.roleName || u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-center">
                      <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                        u.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' :
                        u.status === 'suspended' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {u.status === 'active' ? '● 活跃就绪' : u.status === 'suspended' ? '● 临时中止' : '● 隔离'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-sans space-x-1.5 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleOpenEditAccount(u)}
                        className="px-2.5 py-1.5 bg-[#cfbcff]/10 text-[#cfbcff] hover:bg-[#cfbcff]/20 border border-[#cfbcff]/20 rounded-lg text-xs font-bold cursor-pointer transition-colors inline-block animate-fadeIn"
                        title="查看并修定基本档案、权限角色、重置登录口令密码"
                      >
                        <Edit className="w-3 h-3 inline mr-1" />
                        <span>操作</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleAccountStatus(u.id)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors border ${
                          u.status === 'active' 
                            ? 'bg-amber-500/5 text-amber-300 border-amber-500/20 hover:bg-amber-500/10' 
                            : 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10'
                        }`}
                        title="冻结或解封该账户"
                      >
                        {u.status === 'active' ? '冻结' : '激活'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteAccount(u.id)}
                        className="px-2.5 py-1.5 bg-red-500/5 text-red-400 hover:bg-red-500/10 border border-red-500/20 rounded-lg text-xs font-bold cursor-pointer transition-colors"
                        title="物理回收此账户一切权限"
                      >
                        <UserMinus className="w-3 h-3 inline" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile-Friendly Cards View */}
        <div className="block md:hidden space-y-3">
          {adminUsers.map(u => {
            const roleObj = roles.find(r => r.roleCode === u.role);
            return (
              <div key={u.id} className="bg-white/[0.01]/10 border border-white/5 rounded-xl p-3.5 space-y-3 transition-all hover:border-white/10">
                <div className="flex justify-between items-start gap-2 pb-2.5 border-b border-white/5">
                  <div>
                    <span className="text-[#cfbcff] font-extrabold text-sm font-mono">{u.username}</span>
                    <p className="text-xs text-[#cbc4d2]/40 font-mono leading-none mt-1">{u.id}</p>
                  </div>
                  <span className={`text-xs font-black px-2 py-0.5 rounded ${
                    u.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' :
                    u.status === 'suspended' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
                  }`}>
                    {u.status === 'active' ? '● 活跃就绪' : u.status === 'suspended' ? '● 临时中止' : '● 隔离'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-sans pb-1.5">
                  <div>
                    <span className="text-[#cbc4d2]/40 text-xs block mb-0.5 leading-none">持权人姓名</span>
                    <span className="text-white font-bold text-[13px] block">{u.nickname}</span>
                  </div>
                  <div>
                    <span className="text-[#cbc4d2]/40 text-xs block mb-0.5 leading-none">关联核心角色</span>
                    <span className="text-[#cfbcff] font-extrabold text-xs block truncate leading-none mt-0.5">
                      {roleObj?.roleName || u.role}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[#cbc4d2]/40 text-xs block mb-0.5 leading-none">系统绑定邮箱</span>
                    <span className="text-[#cbc4d2]/70 font-mono text-xs truncate block">{u.email}</span>
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 pt-2 border-t border-white/5 font-sans">
                  <button
                    type="button"
                    onClick={() => handleOpenEditAccount(u)}
                    className="flex-1 py-2 bg-[#cfbcff]/10 text-[#cfbcff] hover:bg-[#cfbcff]/20 border border-[#cfbcff]/20 rounded-xl text-[13px] font-bold cursor-pointer transition-colors text-center"
                  >
                    管理/重置
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleAccountStatus(u.id)}
                    className={`flex-1 py-2 rounded-xl text-[13px] font-bold cursor-pointer transition-colors border text-center ${
                      u.status === 'active' 
                        ? 'bg-amber-500/5 text-amber-300 border-amber-500/20 hover:bg-amber-500/10' 
                        : 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10'
                    }`}
                  >
                    {u.status === 'active' ? '冻结' : '激活'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteAccount(u.id)}
                    className="px-4 py-2 bg-red-500/5 text-red-400 hover:bg-red-500/10 border border-red-500/20 rounded-xl text-[13px] font-bold cursor-pointer transition-colors flex items-center justify-center shrink-0"
                    title="注销该代表权"
                  >
                    <UserMinus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-[#1c1822]/60 p-4 rounded-xl border border-white/5 space-y-1 text-[13px] leading-relaxed text-[#cbc4d2]/80 text-left">
          <p className="font-bold text-[#cfbcff] flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>多重安全盾牌声明 (IP & Multi-Location Isolation)</span>
          </p>
          <p className="text-[10.51px]">
            系统管理员的所有登录均受同盟硬编防刷规则约束，不合法 IP 及未知物理机器将强制吊销。多角色管理遵循最小必要性分权理念。
          </p>
        </div>
      </div>
    </div>
  );
}
