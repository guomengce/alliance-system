import type { AdminRole, PortalMode, RegisteredUser } from '../../hooks/types';
import { findDemoLoginAccount, normalizeAuthEmail, RESET_DEMO_CODE } from './utils';

interface AuthenticatedUser {
  email: string;
  nickname: string;
  portalMode: PortalMode;
  role: AdminRole;
}

interface AuthSessionResult {
  message: string;
  token: string;
  user: AuthenticatedUser;
}

interface LoginPayload {
  email: string;
  password: string;
  remember: boolean;
}

interface RegisterPayload extends LoginPayload {
  nickname: string;
}

interface RequestResetPayload {
  email: string;
}

interface ResetPasswordPayload {
  email: string;
  code: string;
  newPassword: string;
}

interface LoginDeps {
  api?: unknown;
  saveToken?: unknown;
}

interface RegisterDeps {
  api?: unknown;
  saveToken?: unknown;
}

interface RequestResetDeps {
  api?: unknown;
}

interface ResetPasswordDeps {
  api?: unknown;
}

interface LocalResetResponse {
  message: string;
  resetToken: string;
}

export const toRegisteredUser = (user: AuthenticatedUser, password: string): RegisteredUser => ({
  email: user.email,
  password,
  nickname: user.nickname,
  portalMode: user.portalMode,
  role: user.role,
});

const normalizeBackendEmail = (email: string): string => normalizeAuthEmail(email).toLowerCase();

const getNicknameFromEmail = (email: string): string => {
  const name = email.split('@')[0]?.trim();
  if (!name) return 'Local User';
  return name
    .split(/[._-]+/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

const createLocalSession = (
  email: string,
  nickname: string,
  portalMode: PortalMode,
  role: AdminRole
): AuthSessionResult => ({
  message: 'local login ok',
  token: '',
  user: {
    email,
    nickname,
    portalMode,
    role,
  },
});

export const loginWithBackend = async (
  payload: LoginPayload,
  _deps: LoginDeps = {}
): Promise<AuthSessionResult> => {
  const email = normalizeBackendEmail(payload.email);
  const account = findDemoLoginAccount(email, payload.password);

  if (!account) {
    throw new Error('账号或密码错误，请使用指定的客户端或管理端测试账号登录');
  }

  return createLocalSession(email, account.nickname, account.portalMode, account.role);
};

export const registerWithBackend = async (
  payload: RegisterPayload,
  _deps: RegisterDeps = {}
): Promise<AuthSessionResult> => {
  return {
    ...createLocalSession(normalizeBackendEmail(payload.email), payload.nickname.trim(), 'client', null),
    message: 'local register ok',
  };
};

export const requestBackendResetCode = async (
  payload: RequestResetPayload,
  _deps: RequestResetDeps = {}
): Promise<LocalResetResponse> => {
  normalizeBackendEmail(payload.email);
  return { message: '系统重置密码安全验证码已被分发，演示核验码为', resetToken: RESET_DEMO_CODE };
};

export const resetBackendPassword = async (
  payload: ResetPasswordPayload,
  _deps: ResetPasswordDeps = {}
): Promise<{ message: string }> => {
  normalizeBackendEmail(payload.email);
  payload.code.trim();
  payload.newPassword;
  return { message: 'local password reset ok' };
};
