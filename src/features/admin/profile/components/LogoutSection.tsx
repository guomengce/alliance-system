import { LogOut } from 'lucide-react';
import type { LogoutSectionProps } from '../types';

export function LogoutSection({ onLogout }: LogoutSectionProps) {
  return (
    <div className="pt-6 max-w-xs mx-auto">
      <button
        onClick={onLogout}
        className="w-full py-3.5 rounded-2xl border border-red-500/10 hover:bg-red-500/10 text-red-400 font-extrabold text-xs flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] active:scale-95 cursor-pointer"
      >
        <LogOut className="w-4 h-4" /> 安全注销退出系统
      </button>
    </div>
  );
}
