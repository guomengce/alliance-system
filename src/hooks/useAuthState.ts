import { useState } from 'react';
import type { AdminRole, PortalMode, RegisteredUser } from './types';

const INITIAL_REGISTERED_USERS: RegisteredUser[] = [
    { email: 'ppyybb888@gmail.com', password: 'admin1234', nickname: 'Alliance Super Agent', portalMode: 'admin', role: 'SUPER_ADMIN' },
    { email: 'admin_center@alliance.com', password: 'admin1234', nickname: 'Alliance Senior Admin', portalMode: 'admin', role: 'SUPER_ADMIN' },
    { email: 'jack@alliance.system', password: 'admin1234', nickname: '联盟架构师 (Jack)', portalMode: 'admin', role: 'SUPER_ADMIN' },
    { email: 'linda@alliance.system', password: 'admin1234', nickname: '首席财务官 (Linda)', portalMode: 'admin', role: 'FINANCE_DIR' },
    { email: 'garry@alliance.system', password: 'admin1234', nickname: '高级风控专员 (Garry)', portalMode: 'admin', role: 'RISK_OFFICER' },
    { email: 'test@alliance.system', password: 'admin1234', nickname: '临时运营试用 (Tester)', portalMode: 'admin', role: 'OPERATOR' },
    { email: 'client@alliance.com', password: 'password123', nickname: 'Alliance Partner Client', portalMode: 'client', role: null },
    { email: 'jack_fly@alliance.com', password: 'password123', nickname: '飞跃极客 (Jack)', portalMode: 'client', role: null },
    { email: 'amanda_star@alliance.com', password: 'password123', nickname: '星空行者 (Amanda)', portalMode: 'client', role: null }
  ];

export function useAuthState(portalMode: PortalMode) {
  const [adminRole, setAdminRole] = useState<AdminRole>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>('ppyybb888@gmail.com');
  const [loginPassword, setLoginPassword] = useState<string>('admin1234');
  const [nickname, setNickname] = useState<string>('Alliance Super Agent');
  const [email, setEmail] = useState<string>('ppyybb888@gmail.com');
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>(INITIAL_REGISTERED_USERS);
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
