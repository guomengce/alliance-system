import { AnimatePresence } from 'motion/react';
import { ShieldCheck, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { AppStateContext } from './types';
import { ADMIN_MOBILE_MENU_ITEMS } from './navigation';

interface AdminMobileDrawerProps {
  state: AppStateContext;
}

export default function AdminMobileDrawer({ state }: AdminMobileDrawerProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    portalMode,
    isMobileMenuOpen,
    setIsMobileMenuOpen
  } = state;

  return (
    <>
      <AnimatePresence>
        {portalMode === 'admin' && isMobileMenuOpen && (
          <div
            key="admin-mobile-backdrop"
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-[95] animate-fadeIn"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {portalMode === 'admin' && isMobileMenuOpen && (
          <div
            key="admin-mobile-menu"
            className="md:hidden fixed inset-y-0 left-0 w-[280px] bg-[#110e16]/95 backdrop-blur-3xl border-r border-white/10 z-[100] shadow-2xl p-6 flex flex-col justify-between"
          >
            <div className="flex flex-col flex-grow overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6750a4] to-[#cfbcff] flex items-center justify-center shadow-lg shadow-[#6750a4]/20">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="font-sans text-lg font-black text-[#cfbcff] tracking-tight leading-none">
                      Alliance System
                    </h1>
                    <p className="text-[9px] text-white/50 font-bold uppercase tracking-widest mt-1">
                      Institutional Grade
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 focus:bg-white/5 rounded-lg text-white/60 hover:text-white transition-colors cursor-pointer outline-none"
                  title="鍏抽棴鑿滃崟"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
                {ADMIN_MOBILE_MENU_ITEMS.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        navigate(item.path);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all group cursor-pointer text-left ${
                        isActive
                          ? 'bg-[#6750a4] text-white font-bold shadow-lg shadow-[#6750a4]/15'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                          isActive ? 'text-white' : 'text-[#cbc4d2]'
                        }`} />
                        <span className="text-sm tracking-wide">{item.label}</span>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}