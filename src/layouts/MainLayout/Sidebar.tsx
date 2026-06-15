import { useAppContext } from '../../context/AppContext';
import DesktopSidebar from './sidebar/DesktopSidebar';
import MobileBottomNav from './sidebar/MobileBottomNav';
import { ADMIN_MENU_ITEMS, CLIENT_MENU_ITEMS, getAllowedAdminMenuIds } from './sidebar/menu';
import type { SidebarProps } from './sidebar/types';

export default function Sidebar({
  portalMode
}: SidebarProps) {
  const { adminRole } = useAppContext();

  const allowedMenuIds = portalMode === 'admin' ? getAllowedAdminMenuIds(adminRole) : [];
  const rawMenuItems = portalMode === 'admin' ? ADMIN_MENU_ITEMS : CLIENT_MENU_ITEMS;
  const menuItems = portalMode === 'admin'
    ? rawMenuItems.filter(item => item.id && allowedMenuIds.includes(item.id))
    : rawMenuItems;

  return (
    <>
      <DesktopSidebar menuItems={menuItems} />

      {portalMode === 'client' && (
        <MobileBottomNav menuItems={menuItems} />
      )}
    </>
  );
}