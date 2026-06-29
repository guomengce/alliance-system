import { Avatar, Badge, Button, Dropdown, Flex, Layout, Typography, type MenuProps } from 'antd';
import { Bell, Languages, Menu, Settings, ShieldCheck, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getRouteByPath } from '../../../router/routes';
import { getLanguageShortLabel, LANGUAGE_OPTIONS } from '../config/language';
import type { AppStateContext, LangCode, PortalMode } from '../types';

const { Header: AntdHeader } = Layout;
const { Text } = Typography;

interface HeaderProps {
  portalMode: PortalMode;
  state: AppStateContext;
}

export default function Header({ portalMode, state }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentRoute = getRouteByPath(location.pathname);
  const {
    nickname,
    currentUid,
    unreadNotificationsCount,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    currentLang,
    setCurrentLang
  } = state;

  const languageItems: MenuProps['items'] = LANGUAGE_OPTIONS.map((lang) => ({
    key: lang.code,
    label: lang.label
  }));

  const handleLanguageClick: MenuProps['onClick'] = ({ key }) => {
    setCurrentLang(key as LangCode);
  };

  const profilePath = portalMode === 'admin' ? '/admin/profile' : '/client/member';
  const avatarLetter = nickname ? nickname.charAt(0).toUpperCase() : 'A';

  const languageDropdown = (
    <Dropdown
      menu={{ items: languageItems, selectedKeys: [currentLang], onClick: handleLanguageClick }}
      trigger={['click']}
      placement="bottomRight"
    >
      <Button className="app-shell__icon-button app-shell__language-button" icon={<Languages className="w-4 h-4" />}>
        <span className="app-shell__language-label">{getLanguageShortLabel(currentLang as LangCode)}</span>
      </Button>
    </Dropdown>
  );

  const clientActions = portalMode === 'client' && (
    <>
      <Badge count={unreadNotificationsCount} size="small" offset={[-2, 3]}>
        <Button
          className="app-shell__icon-button"
          icon={<Bell className="w-4.5 h-4.5" />}
          onClick={() => navigate('/client/notifications')}
        />
      </Badge>
      <Button
        className="app-shell__icon-button"
        icon={<Settings className="w-4.5 h-4.5" />}
        onClick={() => navigate('/client/settings')}
      />
    </>
  );

  return (
    <>
      <AntdHeader className="app-shell__header app-shell__header--desktop">
        <Flex align="center" justify="space-between" className="app-shell__header-inner">
          <div className="app-shell__route-pill">
            {currentRoute?.portalMode === 'client' && <span>{currentRoute.label}</span>}
            {currentRoute?.portalMode === 'admin' && (
              <span className="app-shell__route-pill-admin">
                <ShieldCheck className="w-4 h-4" />
                管理后台 · {currentRoute.label || '系统管理控制台'}
              </span>
            )}
          </div>

          <Flex align="center" gap={24}>
            {languageDropdown}
            {clientActions}

            <Button className={`app-shell__profile-button is-${portalMode}`} onClick={() => navigate(profilePath)}>
              <span className="app-shell__profile-copy">
                <Text className="app-shell__profile-name">{nickname}</Text>
                <Text className="app-shell__profile-uid">UID: {currentUid}</Text>
              </span>
              <Avatar className="app-shell__avatar">{avatarLetter}</Avatar>
            </Button>
          </Flex>
        </Flex>
      </AntdHeader>

      <AntdHeader className="app-shell__header app-shell__header--mobile">
        <Flex align="center" justify="space-between" className="app-shell__header-inner">
          <Flex align="center" gap={8}>
            {portalMode === 'admin' && (
              <Button
                className="app-shell__mobile-menu-button"
                icon={isMobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            )}
            <ShieldCheck className="app-shell__mobile-brand-icon" />
            <span className="app-shell__mobile-brand-text">ALLIANCE</span>
          </Flex>

          <Flex align="center" gap={10}>
            {languageDropdown}
            {clientActions}
            <Button className="app-shell__mobile-avatar-button" onClick={() => navigate(profilePath)}>
              <Avatar className="app-shell__avatar">{avatarLetter}</Avatar>
            </Button>
          </Flex>
        </Flex>
      </AntdHeader>
    </>
  );
}
