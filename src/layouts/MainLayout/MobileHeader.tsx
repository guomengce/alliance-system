import { Bell, Languages, Menu, Settings, ShieldCheck, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { AppStateContext, LangCode } from './types';
import { MOBILE_LANG_OPTIONS } from './navigation';

interface MobileHeaderProps {
  state: AppStateContext;
}

export default function MobileHeader({ state }: MobileHeaderProps) {
  const navigate = useNavigate();
  const {
    portalMode,
    nickname,

    unreadNotificationsCount,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isLangDropdownOpen,
    setIsLangDropdownOpen,
    currentLang,
    setCurrentLang
  } = state;

  return (
    <div className="flex md:hidden fixed top-0 left-0 right-0 h-16 bg-[#110e16]/80 backdrop-blur-3xl border-b border-b-white/5 z-50 justify-between items-center px-4 shadow-md select-none">
      <div className="flex items-center gap-2">
        {portalMode === 'admin' && (
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 focus:bg-white/5 rounded-xl hover:text-[#cfbcff] text-white transition-colors cursor-pointer mr-0.5 outline-none"
            title="绯荤粺绠＄悊鑿滃崟"
          >
            {isMobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
          </button>
        )}
        <ShieldCheck className="w-5.5 h-5.5 text-[#cfbcff]" />
        <span className="font-sans text-sm font-black text-white tracking-widest uppercase">Alliance</span>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="relative">
          <button
            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            className="p-2 bg-[#211f24]/50 hover:bg-[#2d2a30]/80 transition-colors rounded-xl text-[#cbc4d2] border border-white/5 flex items-center justify-center cursor-pointer"
            title="閫夋嫨璇█ Language"
          >
            <Languages className="w-4 h-4" />
          </button>
          {isLangDropdownOpen && (
            <div className="absolute right-0 mt-2 w-28 bg-[#1a1722] border border-white/10 rounded-xl shadow-2xl py-1 z-[110] animate-fadeIn text-xs">
              {MOBILE_LANG_OPTIONS.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setCurrentLang(lang.code as LangCode);
                    setIsLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 hover:bg-white/5 transition-colors font-semibold flex items-center justify-between ${
                    currentLang === lang.code ? 'text-[#cfbcff]' : 'text-[#cbc4d2]'
                  }`}
                >
                  <span>{lang.label}</span>
                  {currentLang === lang.code && <span className="w-1.5 h-1.5 rounded-full bg-[#cfbcff]"></span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {portalMode === 'client' && (
          <>
            <button
              onClick={() => navigate('/client/notifications')}
              className="relative p-2 bg-[#211f24]/50 hover:bg-[#2d2a30]/80 transition-colors rounded-xl text-[#cbc4d2] border border-white/5 flex items-center justify-center cursor-pointer"
              title="閫氱煡涓績"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[14px] h-3.5 rounded-full bg-[#ffb4ab] text-[#690005] font-extrabold text-[8px] flex items-center justify-center px-0.5 border border-[#110e16]">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => navigate('/client/settings')}
              className="p-2 bg-[#211f24]/50 hover:bg-[#2d2a30]/80 transition-colors rounded-xl text-[#cbc4d2] border border-white/5 flex items-center justify-center cursor-pointer"
              title="系统设定"
            >
              <Settings className="w-4 h-4" />
            </button>
          </>
        )}

        {portalMode === 'client' ? (
          <button
            onClick={() => navigate('/client/member')}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6750a4] to-[#cfbcff] flex items-center justify-center shadow-md relative overflow-hidden text-center active:scale-95 transition-all shrink-0 cursor-pointer border border-white/10"
            title="会员中心"
          >
            <span className="text-white text-xs font-black">
              {nickname ? nickname.charAt(0).toUpperCase() : 'A'}
            </span>
          </button>
        ) : (
          <button
            onClick={() => navigate('/admin/profile')}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6750a4] to-[#cfbcff] flex items-center justify-center shadow-md relative overflow-hidden text-center shrink-0 border border-[#cfbcff]/45 cursor-pointer active:scale-95 transition-all outline-none"
            title="管理账户资料 ＆ 安全"
          >
            <span className="text-white text-xs font-black">
              {nickname ? nickname.charAt(0).toUpperCase() : 'A'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
