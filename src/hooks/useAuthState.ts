import { useState } from 'react';
import { CLIENT_DEMO_EMAIL, CLIENT_DEMO_PASSWORD } from '../features/auth/utils';
import { getInitialRegisteredUsers } from '../mock/auth';
import type { AdminRole, PortalMode, RegisteredUser } from './types';

export function useAuthState(portalMode: PortalMode) {
  const [adminRole, setAdminRole] = useState<AdminRole>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>(CLIENT_DEMO_EMAIL);
  const [loginPassword, setLoginPassword] = useState<string>(CLIENT_DEMO_PASSWORD);
  const [nickname, setNickname] = useState<string>('Alliance Client');
  const [email, setEmail] = useState<string>(CLIENT_DEMO_EMAIL);
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>(() => getInitialRegisteredUsers());
  const [twoFAEnabled, setTwoFAEnabled] = useState<boolean>(true);

  const currentUid = portalMode === 'client' ? '889425' : '999001';

  const onUpdateNickname = (newName: string) => {
    setNickname(newName);
  };

  const onUpdateEmail = (newEmail: string) => {
    setEmail(newEmail);
  };

  const onToggle2FA = () => {
    setTwoFAEnabled(!twoFAEnabled);
  };

  const onLogout = () => {
    setIsAuthenticated(false);
  };

  return {
    adminRole,
    setAdminRole,
    registeredUsers,
    setRegisteredUsers,
    isAuthenticated,
    setIsAuthenticated,
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    nickname,
    setNickname,
    email,
    setEmail,
    twoFAEnabled,
    setTwoFAEnabled,
    currentUid,
    onUpdateNickname,
    onUpdateEmail,
    onToggle2FA,
    onLogout
  };
}
