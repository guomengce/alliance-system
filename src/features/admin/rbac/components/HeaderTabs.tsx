import { Key, Plus, ShieldCheck, UserPlus, Users } from 'lucide-react';
import type { WorkspaceProps } from '../types';

type HeaderTabsProps = Pick<
  WorkspaceProps,
  | 'activeTab'
  | 'adminUsers'
  | 'roles'
  | 'setActiveTab'
  | 'setIsNewAccountModalOpen'
  | 'setIsNewRoleModalOpen'
>;

export default function HeaderTabs({
  activeTab,
  adminUsers,
  roles,
  setActiveTab,
  setIsNewAccountModalOpen,
  setIsNewRoleModalOpen
}: HeaderTabsProps) {
  return (
    <>
      {/* Master Compact Header & Tab Switcher Card */}
    <div className="glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119]/90 space-y-4">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="space-y-1">
          <h3 className="text-sm md:text-base font-black text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#cfbcff]" />
            <span>管核控制中心 & RBAC 权限网格</span>
          </h3>
          <p className="text-[13px] text-[#cbc4d2]/50 leading-relaxed font-sans max-w-2xl">
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
    </>
  );
}
