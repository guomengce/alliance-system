import { useState } from 'react';
import type { LangCode, PortalMode } from './types';

export function useAppShellState() {
  const [portalMode, setPortalMode] = useState<PortalMode>('client');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [currentLang, setCurrentLang] = useState<LangCode>('zh');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState<boolean>(false);

  return {
    portalMode,
    setPortalMode,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    currentLang,
    setCurrentLang,
    isLangDropdownOpen,
    setIsLangDropdownOpen
  };
}
