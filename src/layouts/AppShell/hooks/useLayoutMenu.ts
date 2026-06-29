import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ADMIN_MENU_ITEMS, CLIENT_MENU_ITEMS, getAllowedAdminMenuIds } from '../config/menu';
import type { AppStateContext, LayoutMenuItem, PortalMode } from '../types';

interface UseLayoutMenuParams {
  portalMode: PortalMode;
  state: AppStateContext;
}

export function useLayoutMenu({ portalMode, state }: UseLayoutMenuParams) {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = useMemo<LayoutMenuItem[]>(() => {
    if (portalMode === 'client') return CLIENT_MENU_ITEMS;

    const allowedMenuIds = getAllowedAdminMenuIds(state.adminRole);
    return ADMIN_MENU_ITEMS.filter((item) => allowedMenuIds.includes(item.id));
  }, [portalMode, state.adminRole]);

  const selectedKey = useMemo(() => {
    const activeItem = menuItems.find((item) => location.pathname === item.path);
    return activeItem?.id;
  }, [location.pathname, menuItems]);

  const navigateToMenuItem = (item: LayoutMenuItem) => {
    navigate(item.path);
    state.setIsMobileMenuOpen(false);
  };

  return {
    menuItems,
    selectedKey,
    navigateToMenuItem
  };
}
