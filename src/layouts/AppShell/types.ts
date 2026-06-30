import type { LucideIcon } from 'lucide-react';
import type { useAppContext } from '../../context/AppContext';

export type AppStateContext = ReturnType<typeof useAppContext>;

export type PortalMode = 'admin' | 'client';

export type LangCode = 'zh' | 'en' | 'zht';

export interface AppShellProps {
  portalMode: PortalMode;
}

export interface LayoutMenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
}
