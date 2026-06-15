import { useLocation, useNavigate } from 'react-router-dom';
import type { NavigationProps } from './types';

export default function MobileBottomNav({ menuItems }: NavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#110e16]/95 backdrop-blur-xl border-t border-white/5 flex items-center z-50 px-3 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.4)] justify-around">
      {menuItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center justify-center gap-1 py-1 transition-all shrink-0 flex-1 text-[#cbc4d2]/60 hover:text-[#cbc4d2]"
          >
            <IconComponent className={`w-4.5 h-4.5 transition-transform ${isActive ? 'scale-110 text-[#cfbcff]' : ''}`} />
            <span className="text-[9px] tracking-tight whitespace-nowrap">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}