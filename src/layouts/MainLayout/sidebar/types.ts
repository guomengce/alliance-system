import type { LucideIcon } from 'lucide-react';

export interface SidebarProps {
  uid: string;
  nickname: string;
  unreadCount: number;
  onLogout: () => void;
  portalMode: 'client' | 'admin';
}

export interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
}

export interface NavigationProps {
  menuItems: MenuItem[];
}