import { ShieldCheck } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { NavigationProps } from './types';

export default function DesktopSidebar({ menuItems }: NavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] hidden md:flex flex-col bg-[#110e16]/80 backdrop-blur-3xl border-r border-white/5 shadow-2xl py-6 px-4 gap-4 z-50">
      <div className="flex items-center gap-3 px-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6750a4] to-[#cfbcff] flex items-center justify-center shadow-lg shadow-[#6750a4]/20">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-sans text-xl font-black text-[#cfbcff] tracking-tight leading-none">
            Alliance System
          </h1>
          <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest mt-1">
            Institutional Grade
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all duration-300 group ${
                isActive
                  ? 'bg-[#6750a4] text-white font-bold shadow-lg shadow-[#6750a4]/15'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <IconComponent className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
                  isActive ? 'text-white' : 'text-[#cbc4d2]'
                }`} />
                <span className="text-sm tracking-wide">{item.label}</span>
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}