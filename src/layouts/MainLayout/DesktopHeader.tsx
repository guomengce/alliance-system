import { Bell, Languages, Settings, ShieldCheck } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { AppStateContext, LangCode } from './types';
import { DESKTOP_LANG_OPTIONS } from './navigation';
import { getRouteByPath } from '../../router/routes';

interface DesktopHeaderProps {
  state: AppStateContext;
}

export default function DesktopHeader({ state }: DesktopHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentRoute = getRouteByPath(location.pathname);
  const {
    portalMode,
    nickname,
    currentUid,
    unreadNotificationsCount,
    isLangDropdownOpen,
    setIsLangDropdownOpen,
    currentLang,
    setCurrentLang
  } = state;

  return (
    <div className="hidden md:flex sticky top-0 bg-[#0c0a0f]/80 backdrop-blur-3xl z-30 h-16 border-b border-white/5 select-none animate-fadeIn items-center justify-between px-8 w-full">
      <div className="flex items-center gap-3">
        <div className="px-3 py-1.5 bg-[#1c1822] rounded-full border border-white/5 text-xs text-[#cbc4d2]/70 tracking-wide flex items-center gap-1.5 font-sans font-extrabold shadow-sm">
          {currentRoute?.portalMode === 'client' && <span className="text-[#cfbcff]">{currentRoute.label}</span>}
          {currentRoute?.portalMode === 'admin' && (
            <span className="text-[#cfbcff] font-black flex items-center gap-1.5 uppercase text-[11px]">
              <ShieldCheck className="w-4 h-4 text-[#cfbcff]" />
              管理后台 ▸ {currentRoute.label || '系统管理控制台'}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <button
            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            className="p-2 bg-[#211f24] hover:bg-[#2d2a30] transition-colors rounded-xl text-[#cbc4d2] border border-white/5 flex items-center justify-center cursor-pointer gap-1.5 px-3 min-w-[76px]"
            title="选择语言 Language"
          >
            <Languages className="w-4 h-4 text-[#cbc4d2]" />
            <span className="text-[11.5px] font-bold leading-none select-none text-[#cbc4d2]/90">
              {currentLang === 'zh' ? '中文' : currentLang === 'zht' ? '繁體' : 'EN'}
            </span>
          </button>
          {isLangDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-[#18161c] border border-white/10 rounded-xl shadow-2xl py-1.5 z-50 animate-fadeIn text-xs">
              {DESKTOP_LANG_OPTIONS.map((lang) => (
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
              className="relative p-2 bg-[#211f24] hover:bg-[#2d2a30] transition-colors rounded-xl text-[#cbc4d2] border border-white/5 flex items-center justify-center cursor-pointer"
            >
              <Bell className="w-4.5 h-4.5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1.5 min-w-[16px] h-4 rounded-full bg-[#ffb4ab] text-[#690005] font-black text-[9px] flex items-center justify-center px-1 border border-[#0c0a0f]">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => navigate('/client/settings')}
              className="p-2 bg-[#211f24] hover:bg-[#2d2a30] transition-colors rounded-xl text-[#cbc4d2] border border-white/5 flex items-center justify-center cursor-pointer"
            >
              <Settings className="w-4.5 h-4.5" />
            </button>
          </>
        )}

        {portalMode === 'client' ? (
          <button
            onClick={() => navigate('/client/member')}
            className="flex items-center gap-3 px-3 py-1 bg-[#211f24]/30 hover:bg-[#2d2a30]/50 transition-all rounded-full border border-white/5 cursor-pointer text-left select-none group"
          >
            <div className="text-right">
              <p style={{ marginBottom: '0.2rem' }} className="text-xs font-bold text-white leading-tight font-sans group-hover:text-[#cfbcff] transition-colors">{nickname}</p>
              <p style={{ marginBottom: '0.2rem' }} className="text-[10px] text-[#cbc4d2]/50 font-mono leading-none">UID: {currentUid}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6750a4] to-[#cfbcff] flex items-center justify-center shadow-md relative overflow-hidden group-hover:shadow-[#6750a4]/30 group-hover:scale-105 transition-all shrink-0">
              <span className="text-white text-xs font-black">
                {nickname ? nickname.charAt(0).toUpperCase() : 'A'}
              </span>
            </div>
          </button>
        ) : (
          <button
            onClick={() => navigate('/admin/profile')}
            className="flex items-center gap-3 px-3 py-1 bg-[#211f24]/30 hover:bg-[#cfbcff]/15 border border-[#cfbcff]/20 hover:border-[#cfbcff]/40 rounded-full text-left cursor-pointer select-none group active:scale-[0.98] transition-all outline-none"
            title="点击进入安全中心 / 修改密码"
          >
            <div className="text-right">
              <p className="text-xs font-bold text-white leading-tight font-sans group-hover:text-[#cfbcff] transition-colors">{nickname}</p>
              <p className="text-[10px] text-[#cbc4d2]/50 font-mono leading-none mt-0.5">UID: {currentUid}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6750a4] to-[#cfbcff] flex items-center justify-center shadow-md relative overflow-hidden group-hover:shadow-[#6750a4]/30 group-hover:scale-105 transition-all shrink-0 border border-[#cfbcff]/30">
              <span className="text-white text-xs font-black">
                {nickname ? nickname.charAt(0).toUpperCase() : 'A'}
              </span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
