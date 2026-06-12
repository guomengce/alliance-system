import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  onLogout: () => void;
}

export default function LogoutButton({ onLogout }: LogoutButtonProps) {
  return (
    <button 
      onClick={onLogout}
      className="w-full py-3.5 rounded-2xl border border-rose-500/10 hover:bg-rose-500/10 text-[#ffb4ab] font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-300"
    >
      <LogOut className="w-4 h-4" /> 安全登出同盟系统
    </button>
  );
}
