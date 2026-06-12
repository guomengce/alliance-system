import type { LucideIcon } from 'lucide-react';

export interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
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
}

export interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  menuItems: MenuItem[];
}

