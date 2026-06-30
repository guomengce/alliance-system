import { Button, Drawer, Layout, Menu, type MenuProps } from 'antd';
import { ShieldCheck, X } from 'lucide-react';
import type { AppStateContext, LayoutMenuItem, PortalMode } from '../types';
import { useLayoutMenu } from '../hooks/useLayoutMenu';

const { Sider } = Layout;

interface SidebarProps {
  portalMode: PortalMode;
  state: AppStateContext;
}

const buildMenuItems = (menuItems: LayoutMenuItem[]): MenuProps['items'] => (
  menuItems.map((item) => {
    const IconComponent = item.icon;
    return {
      key: item.id,
      icon: <IconComponent className="app-shell__menu-icon" />,
      label: item.label
    };
  })
);

function Brand() {
  return (
    <div className="app-shell__brand">
      <div className="app-shell__brand-mark">
        <ShieldCheck className="w-6 h-6" />
      </div>
      <div>
        <h1 className="app-shell__brand-title">Alliance System</h1>
        <p className="app-shell__brand-subtitle">Institutional Grade</p>
      </div>
    </div>
  );
}

export default function Sidebar({ portalMode, state }: SidebarProps) {
  const { menuItems, selectedKey, navigateToMenuItem } = useLayoutMenu({ portalMode, state });
  const antdMenuItems = buildMenuItems(menuItems);

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    const item = menuItems.find((menuItem) => menuItem.id === key);
    if (item) navigateToMenuItem(item);
  };

  return (
    <>
      <Sider width={280} className="app-shell__sider">
        <Brand />
        <Menu
          mode="inline"
          items={antdMenuItems}
          selectedKeys={selectedKey ? [selectedKey] : []}
          onClick={handleMenuClick}
          className="app-shell__menu"
        />
      </Sider>

      <Drawer
        className="app-shell__admin-drawer"
        placement="left"
        width={280}
        open={portalMode === 'admin' && state.isMobileMenuOpen}
        closeIcon={null}
        onClose={() => state.setIsMobileMenuOpen(false)}
      >
        <div className="app-shell__drawer-header">
          <Brand />
          <Button
            className="app-shell__drawer-close"
            icon={<X className="w-5 h-5" />}
            onClick={() => state.setIsMobileMenuOpen(false)}
          />
        </div>
        <Menu
          mode="inline"
          items={antdMenuItems}
          selectedKeys={selectedKey ? [selectedKey] : []}
          onClick={handleMenuClick}
          className="app-shell__menu"
        />
      </Drawer>

      {portalMode === 'client' && (
        <nav className="app-shell__mobile-bottom-nav">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = selectedKey === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateToMenuItem(item)}
                className={`app-shell__mobile-bottom-item ${isActive ? 'is-active' : ''}`}
              >
                <IconComponent className="app-shell__mobile-bottom-icon" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      )}
    </>
  );
}
