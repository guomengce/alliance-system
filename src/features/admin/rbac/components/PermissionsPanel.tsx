import { Check, Key } from 'lucide-react';
import type { WorkspaceProps } from '../types';

type PermissionsPanelProps = Pick<
  WorkspaceProps,
  | 'permissionInventory'
  | 'roles'
  | 'selectedRoleCode'
  | 'activeRoleObj'
  | 'setSelectedRoleCode'
  | 'handleTogglePermission'
>;

export default function PermissionsPanel({
  permissionInventory,
  roles,
  selectedRoleCode,
  activeRoleObj,
  setSelectedRoleCode,
  handleTogglePermission
}: PermissionsPanelProps) {
  return (
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
  );
}
