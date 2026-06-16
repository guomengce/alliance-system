import { Sliders, X } from 'lucide-react';
import type { AddRoleModalProps } from '../types';

export function AddRoleModal({
  newRoleName,
  newRoleCode,
  setIsNewRoleModalOpen,
  setNewRoleName,
  setNewRoleCode,
  handleCreateRole,
}: AddRoleModalProps) {
  return (
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
  );
}
