import type { WorkspaceProps } from '../types';
import { 
  ShieldCheck, 
  UserPlus, 
  Users, 
  Key, 
  Sliders, 
  Lock, 
  X, 
  Plus, 
  Trash, 
  Check, 
  UserMinus,
  AlertCircle,
  HelpCircle,
  Activity,
  UserCheck,
  Edit,
  RefreshCw
} from 'lucide-react';

export function Workspace({
  permissionInventory,
  roles,
  adminUsers,
  activeTab,
  selectedRoleCode,
  isNewAccountModalOpen,
  isNewRoleModalOpen,
  newUsername,
  newNickname,
  newEmail,
  newRole,
  newRoleName,
  newRoleCode,
  editingAccount,
  editNickname,
  editEmail,
  editRole,
  editStatus,
  activeRoleObj,
  setActiveTab,
  setSelectedRoleCode,
  setIsNewAccountModalOpen,
  setIsNewRoleModalOpen,
  setNewUsername,
  setNewNickname,
  setNewEmail,
  setNewRole,
  setNewRoleName,
  setNewRoleCode,
  setEditingAccount,
  setEditNickname,
  setEditEmail,
  setEditRole,
  setEditStatus,
  handleOpenEditAccount,
  handleSaveEditAccount,
  handleResetPassword,
  handleTogglePermission,
  handleCreateAccount,
  handleCreateRole,
  handleToggleAccountStatus,
  handleDeleteAccount
}: WorkspaceProps) {

  return (
    <div id="admin_rbac_page" className="space-y-4 md:space-y-6 select-none animate-fadeIn flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-3 text-left">
      {/* Master Compact Header & Tab Switcher Card */}
      <div className="glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119]/90 space-y-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="space-y-1">
            <h3 className="text-sm md:text-base font-black text-white tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#cfbcff]" />
              <span>管核控制中心 & RBAC 权限网格</span>
            </h3>
            <p className="text-[11px] text-[#cbc4d2]/50 leading-relaxed font-sans max-w-2xl">
              基于角色访问控制模型（RBAC）隔离运营、风控与底层结算。安全多维防刷，提供高等级分权管理与实时钩选授权。
            </p>
          </div>
          
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full lg:w-auto shrink-0">
            {/* Integrated Tabs segment */}
            <div className="flex bg-[#110e16]/80 p-1 rounded-xl gap-1 border border-white/5 w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('accounts')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold tracking-tight rounded-lg transition-all cursor-pointer ${
                  activeTab === 'accounts'
                    ? 'bg-[#cfbcff] text-[#141119] font-extrabold shadow-sm'
                    : 'text-[#cbc4d2]/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>管核人员 ({adminUsers.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('permissions')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold tracking-tight rounded-lg transition-all cursor-pointer ${
                  activeTab === 'permissions'
                    ? 'bg-amber-400 text-[#141119] font-extrabold shadow-sm'
                    : 'text-[#cbc4d2]/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Key className="w-3.5 h-3.5" />
                <span>权限决策码 ({roles.length})</span>
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setIsNewRoleModalOpen(true)}
                className="flex-1 sm:flex-none justify-center bg-white/5 hover:bg-white/10 text-white font-bold text-xs py-2 px-3 rounded-xl border border-white/10 transition-all flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>新角色</span>
              </button>
              <button
                type="button"
                onClick={() => setIsNewAccountModalOpen(true)}
                className="flex-1 sm:flex-none justify-center bg-gradient-to-r from-[#6750a4] to-[#cfbcff] hover:brightness-110 text-white font-bold text-xs py-2 px-3.5 rounded-xl transition-all shadow-md flex items-center gap-1 cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>分拨管理员</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        {activeTab === 'accounts' && (
          <div className="space-y-4 md:space-y-6 animate-fadeIn">
            {/* List Row card */}
            <div className="glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h4 className="text-xs md:text-sm font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#cfbcff]" />
                  <span>后台注册持权管理员登录账号代表列表</span>
                </h4>
                <span className="text-[9px] md:text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
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
                            <p className="text-[9px] text-[#cbc4d2]/40 mt-0.5">{u.id}</p>
                          </td>
                          <td className="py-3.5 px-2 text-left font-sans">
                            <p className="text-white leading-none font-bold text-xs">{u.nickname}</p>
                            <p className="text-[10px] text-[#cbc4d2]/50 mt-1">{u.email}</p>
                          </td>
                          <td className="py-3.5 px-2 text-left">
                            <span className="text-[10px] bg-[#6750a4]/10 border border-[#cfbcff]/20 text-[#cfbcff] px-2 py-1 rounded-lg font-sans font-extrabold">
                              {roleObj?.roleName || u.role}
                            </span>
                          </td>
                          <td className="py-3.5 px-2 text-center">
                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
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
                              className="px-2.5 py-1.5 bg-[#cfbcff]/10 text-[#cfbcff] hover:bg-[#cfbcff]/20 border border-[#cfbcff]/20 rounded-lg text-[10px] font-bold cursor-pointer transition-colors inline-block animate-fadeIn"
                              title="查看并修定基本档案、权限角色、重置登录口令密码"
                            >
                              <Edit className="w-3 h-3 inline mr-1" />
                              <span>操作</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleToggleAccountStatus(u.id)}
                              className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer transition-colors border ${
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
                              className="px-2.5 py-1.5 bg-red-500/5 text-red-400 hover:bg-red-500/10 border border-red-500/20 rounded-lg text-[10px] font-bold cursor-pointer transition-colors"
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
                          <p className="text-[10px] text-[#cbc4d2]/40 font-mono leading-none mt-1">{u.id}</p>
                        </div>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded ${
                          u.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' :
                          u.status === 'suspended' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
                        }`}>
                          {u.status === 'active' ? '● 活跃就绪' : u.status === 'suspended' ? '● 临时中止' : '● 隔离'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-sans pb-1.5">
                        <div>
                          <span className="text-[#cbc4d2]/40 text-[9px] block mb-0.5 leading-none">持权人姓名</span>
                          <span className="text-white font-bold text-[11px] block">{u.nickname}</span>
                        </div>
                        <div>
                          <span className="text-[#cbc4d2]/40 text-[9px] block mb-0.5 leading-none">关联核心角色</span>
                          <span className="text-[#cfbcff] font-extrabold text-[10px] block truncate leading-none mt-0.5">
                            {roleObj?.roleName || u.role}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-[#cbc4d2]/40 text-[9px] block mb-0.5 leading-none">系统绑定邮箱</span>
                          <span className="text-[#cbc4d2]/70 font-mono text-[10px] truncate block">{u.email}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 pt-2 border-t border-white/5 font-sans">
                        <button
                          type="button"
                          onClick={() => handleOpenEditAccount(u)}
                          className="flex-1 py-2 bg-[#cfbcff]/10 text-[#cfbcff] hover:bg-[#cfbcff]/20 border border-[#cfbcff]/20 rounded-xl text-[11px] font-bold cursor-pointer transition-colors text-center"
                        >
                          管理/重置
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleAccountStatus(u.id)}
                          className={`flex-1 py-2 rounded-xl text-[11px] font-bold cursor-pointer transition-colors border text-center ${
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
                          className="px-4 py-2 bg-red-500/5 text-red-400 hover:bg-red-500/10 border border-red-500/20 rounded-xl text-[11px] font-bold cursor-pointer transition-colors flex items-center justify-center shrink-0"
                          title="注销该代表权"
                        >
                          <UserMinus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-[#1c1822]/60 p-4 rounded-xl border border-white/5 space-y-1 text-[11px] leading-relaxed text-[#cbc4d2]/80 text-left">
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
        )}

        {activeTab === 'permissions' && (
          /* Section 2: Role & Permission Mesh Configuration - Spatially optimized */
          <div className="glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-5 animate-fadeIn">
          <div className="flex flex-col gap-1 pb-3 border-b border-white/5 text-left">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-400" />
              权限绑定与细项决策矩阵 Mapping
            </h4>
            <p className="text-[10px] text-[#cbc4d2]/50 font-sans mt-0.5">
              选定特定角色，实时钩选/撤销其访问子版块和数据的权限
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left">
            {/* Left Column of Section 2: available roles list selection */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-[10px] font-black uppercase text-[#cbc4d2]/40 tracking-wider block text-left">
                第一步：选择需要调整的后台角色类型
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                {roles.map(r => {
                  const isActive = r.roleCode === selectedRoleCode;
                  return (
                    <button
                      key={r.roleCode}
                      type="button"
                      onClick={() => setSelectedRoleCode(r.roleCode)}
                      className={`px-4 py-3.5 rounded-xl text-left flex flex-col gap-1 cursor-pointer transition-all border duration-200 w-full hover:translate-x-1 ${
                        isActive 
                          ? 'bg-[#cfbcff]/10 text-emerald-300 border-[#cfbcff]/30 font-extrabold shadow-md shadow-black/30'
                          : 'bg-[#110e16]/30 hover:bg-[#110e16]/70 text-[#cbc4d2]/50 border-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={`text-xs font-bold ${isActive ? 'text-white' : 'text-[#cbc4d2]/70'}`}>
                          {r.roleName}
                        </span>
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />}
                      </div>
                      <span className="text-[9.5px] font-mono text-[#cbc4d2]/40">
                        {r.roleCode} • 已授安全凭证数 {r.permissions.length} 
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column of Section 2: permissions details grid */}
            <div className="lg:col-span-8 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[10px] font-black uppercase text-[#cfbcff] tracking-wider block text-left">
                  第二步：实时指派及核算功能极值 (关联角色：{activeRoleObj.roleName})
                </span>
                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-lg border border-emerald-500/10 font-bold">
                  {activeRoleObj.permissions.length} / {permissionInventory.length} 系统细项已启
                </span>
              </div>

              <div className="bg-[#110e16]/60 border border-white/5 rounded-2xl p-4 md:p-5 text-xs font-sans space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                  {permissionInventory.map(p => {
                    const isGranted = activeRoleObj.permissions.includes(p.code);
                    return (
                      <div 
                        key={p.code}
                        onClick={() => handleTogglePermission(activeRoleObj.roleCode, p.code)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none hover:bg-white/[0.02] ${
                          isGranted 
                            ? 'bg-gradient-to-r from-emerald-500/[0.04] to-teal-400/[0.01] border-emerald-500/25 text-white' 
                            : 'bg-[#191523]/25 border-white/5 text-[#cbc4d2]/50 hover:border-white/10'
                        }`}
                      >
                        <div className="pt-0.5">
                          <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                            isGranted 
                              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                              : 'border-white/20 hover:border-white/40'
                          }`}>
                            {isGranted && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                        </div>
                        
                        <div className="text-left space-y-0.5">
                          <p className={`font-bold text-xs leading-normal ${isGranted ? 'text-white' : 'text-[#cbc4d2]/70'}`}>
                            {p.name}
                            <span className="text-[9px] font-mono text-[#cbc4d2]/35 ml-1.5 font-normal">[{p.code}]</span>
                          </p>
                          <p className="text-[10px] text-[#cbc4d2]/40 leading-relaxed font-sans font-medium">{p.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {activeRoleObj.roleCode === 'SUPER_ADMIN' && (
                  <p className="text-[9.5px] text-amber-300 italic text-left leading-normal font-sans pt-1 border-t border-white/5">
                    * 超级系统管理员属于最高绝对防御特权节点，不接受任何形式的在线物理扣留或去勾选处理。
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* MODAL 1: ADD NEW ADMIN USER ACCOUNT */}
      {isNewAccountModalOpen && (
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
                <p className="text-[10px] text-[#cbc4d2]/40 font-mono mt-0.5">CREATE BACKOFFICE ENTRANCE</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-left text-sans">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#cbc4d2]/60 uppercase">设置登录账号名 (必填/唯一)</label>
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
                <label className="text-[10px] font-bold text-[#cbc4d2]/60 uppercase">管理员真实姓名/昵称名称 (必填)</label>
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
                <label className="text-[10px] font-bold text-[#cbc4d2]/60 uppercase">工作邮箱地址 (必填)</label>
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
                <label className="text-[10px] font-bold text-[#cbc4d2]/60 uppercase">指派初始关联挂接角色</label>
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
      )}

      {/* MODAL 2: ADD NEW SECURITY ROLE */}
      {isNewRoleModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn p-4">
          <form 
            onSubmit={handleCreateRole}
            className="bg-[#181421] border border-white/10 rounded-3xl max-w-md w-full p-6 md:p-8 relative shadow-2xl animate-slideUp space-y-5 max-h-[92vh] overflow-y-auto custom-scrollbar"
          >
            <button
              type="button"
              onClick={() => setIsNewRoleModalOpen(false)}
              className="absolute right-4 top-4 text-[#cbc4d2]/60 hover:text-white transition-colors cursor-pointer outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 pb-3 border-b border-white/5">
              <div className="w-9 h-9 rounded-xl bg-amber-400/10 flex items-center justify-center border border-amber-400/20">
                <Sliders className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-black text-white">建立全新的后台细分管理角色</h4>
                <p className="text-[10px] text-[#cbc4d2]/40 font-mono mt-0.5">DEFINE CUSTOM SECURITY ROLE</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-left text-sans">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#cbc4d2]/60 uppercase">设计角色名称 (必填)</label>
                <input 
                  type="text"
                  required
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder="如: 全球结算审核官"
                  className="w-full bg-[#110e16] border border-white/10 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#cfbcff]/50"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#cbc4d2]/60 uppercase">唯一角色精算编码 (大写字母/下划线)</label>
                <input 
                  type="text"
                  required
                  value={newRoleCode}
                  onChange={(e) => setNewRoleCode(e.target.value)}
                  placeholder="如: GLOBAL_CLEARING_OFFICER"
                  className="w-full bg-[#110e16] border border-white/10 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#cfbcff]/50 font-mono"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex gap-3 text-xs">
              <button
                type="button"
                onClick={() => setIsNewRoleModalOpen(false)}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all cursor-pointer"
              >
                取消
              </button>
              <button
                type="submit"
                className="flex-[2] py-3 bg-[#cfbcff] hover:brightness-110 text-[#110e16] font-black rounded-xl cursor-pointer transition-all text-center animate-pulse"
              >
                确认创建角色档
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 3: EDIT ADMIN ACCOUNT, ASSIGN ROLES/PERMISSIONS, & RESET PASSWORD */}
      {editingAccount && (
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
                <p className="text-[10px] text-[#cbc4d2]/40 font-mono mt-0.5">EDIT PRIVILEGED ACCOUNT</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-left font-sans">
              
              {/* Account username (Read-only status) */}
              <div className="flex flex-col gap-1.5 bg-[#110e16] p-3 rounded-xl border border-white/5 font-mono">
                <span className="text-[10px] font-bold text-[#cbc4d2]/40 uppercase animate-pulse">验证账号标识 (ID)</span>
                <span className="text-sm text-white font-extrabold flex items-center gap-2">
                  <span className="text-[#cfbcff]">{editingAccount.username}</span>
                  <span className="text-[10px] text-[#cbc4d2]/30">({editingAccount.id})</span>
                </span>
              </div>

              {/* Editable Name/Nickname */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#cbc4d2]/60 uppercase">持权管理员姓名/昵称 (必填)</label>
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
                <label className="text-[10px] font-bold text-[#cbc4d2]/60 uppercase">联络与安全警报邮箱 (必填)</label>
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
                <label className="text-[10px] font-bold text-[#cbc4d2]/60 uppercase">指派核心角色权能机制</label>
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
                  <p className="text-[9px] text-[#cbc4d2]/30 italic leading-normal">
                    * 根节点初始主管理员 master 的角色挂接锁定为超级管理员，不可降权或更改。
                  </p>
                )}
              </div>

              {/* Display corresponding permissions list dynamically */}
              <div className="p-3 bg-[#110e16]/80 rounded-xl border border-white/5 space-y-1.5 font-sans">
                <span className="text-[10.5px] font-black text-[#cfbcff]/80 uppercase block">映射的子版块读写特权范围 (权限)：</span>
                <div className="text-[10px] text-[#cbc4d2]/60 leading-normal space-y-1.5 max-h-[110px] overflow-y-auto scrollbar-thin">
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
                          <span>{permDef?.name || pmCode} <span className="text-[8px] font-mono opacity-45">[{pmCode}]</span></span>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* Edit Account Status selection */}
              <div className="flex flex-col gap-1.5 font-sans">
                <label className="text-[10px] font-bold text-[#cbc4d2]/60 uppercase">安全管制状态设定</label>
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
                  <span className="font-extrabold text-[10px] uppercase tracking-wide">账号密码安全及口令重置</span>
                </div>
                <p className="text-[10px] text-[#cbc4d2]/60 leading-relaxed text-left">
                  若由于离线密钥失落、多点异动异常或面临密码重核，建议一键强制重置该持权人的后台访问密码。
                </p>
                <button
                  type="button"
                  onClick={() => handleResetPassword(editingAccount.username)}
                  className="bg-red-500/10 hover:bg-red-500/25 active:scale-95 text-red-300 font-bold px-3 py-2.5 rounded-xl transition-all cursor-pointer border border-red-500/20 flex items-center justify-center gap-1.5 text-[11px] mt-1"
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
      )}

    </div>
  );
}
