import {
  backendAuthApi,
  setStoredBackendAuthToken,
  type BackendAuthSessionResponse,
  type BackendLoginRequest,
  type BackendRegisterRequest,
  type BackendRequestResetRequest,
  type BackendRequestResetResponse,
  type BackendResetPasswordRequest,
} from '../../api/backend';
import type { BackendMessageResponse, BackendUserDto } from '../../api/backend/types';
import type { AdminRole, PortalMode, RegisteredUser } from '../../hooks/types';
import { normalizeAuthEmail } from './utils';

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
  api?: Pick<typeof backendAuthApi, 'login'>;
  saveToken?: typeof setStoredBackendAuthToken;
}

interface RegisterDeps {
  api?: Pick<typeof backendAuthApi, 'register'>;
  saveToken?: typeof setStoredBackendAuthToken;
}

interface RequestResetDeps {
  api?: Pick<typeof backendAuthApi, 'requestReset'>;
}

interface ResetPasswordDeps {
  api?: Pick<typeof backendAuthApi, 'resetPassword'>;
}

const toAuthenticatedUser = (user: BackendUserDto): AuthenticatedUser => ({
  email: user.email,
  nickname: user.nickname,
  portalMode: user.portalMode,
  role: user.role,
});

export const toRegisteredUser = (user: AuthenticatedUser, password: string): RegisteredUser => ({
  email: user.email,
  password,
  nickname: user.nickname,
  portalMode: user.portalMode,
  role: user.role,
});

const toAuthSessionResult = (response: BackendAuthSessionResponse): AuthSessionResult => ({
  message: response.message,
  token: response.token,
  user: toAuthenticatedUser(response.user),
});

const normalizeBackendEmail = (email: string): string => normalizeAuthEmail(email).toLowerCase();

export const loginWithBackend = async (
  payload: LoginPayload,
  { api = backendAuthApi, saveToken = setStoredBackendAuthToken }: LoginDeps = {}
): Promise<AuthSessionResult> => {
  const request: BackendLoginRequest = {
    email: normalizeBackendEmail(payload.email),
    password: payload.password,
  };
  const response = await api.login(request);
  saveToken(response.token, payload.remember);
  return toAuthSessionResult(response);
};

export const registerWithBackend = async (
  payload: RegisterPayload,
  { api = backendAuthApi, saveToken = setStoredBackendAuthToken }: RegisterDeps = {}
): Promise<AuthSessionResult> => {
  const request: BackendRegisterRequest = {
    email: normalizeBackendEmail(payload.email),
    nickname: payload.nickname.trim(),
    password: payload.password,
  };
  const response = await api.register(request);
  saveToken(response.token, payload.remember);
  return toAuthSessionResult(response);
};

export const requestBackendResetCode = async (
  payload: RequestResetPayload,
  { api = backendAuthApi }: RequestResetDeps = {}
): Promise<BackendRequestResetResponse> => {
  const request: BackendRequestResetRequest = {
    email: normalizeBackendEmail(payload.email),
  };
  return api.requestReset(request);
};

export const resetBackendPassword = async (
  payload: ResetPasswordPayload,
  { api = backendAuthApi }: ResetPasswordDeps = {}
): Promise<BackendMessageResponse> => {
  const request: BackendResetPasswordRequest = {
    email: normalizeBackendEmail(payload.email),
    code: payload.code.trim(),
    newPassword: payload.newPassword,
  };
  return api.resetPassword(request);
};
