import { apiClient } from './request';
import type { ApiEnvelope } from './types';

export interface LoginRequest {
  email: string;
  password: string;
  portalMode: 'client' | 'admin';
}

export interface AuthSessionDto {
  token: string;
  refreshToken?: string;
  expiresAt?: string;
  user: {
    id: string;
    email: string;
    nickname: string;
    portalMode: 'client' | 'admin';
    role?: string | null;
  };
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirmRequest {
  token: string;
  password: string;
}

export const authApi = {
  login: (payload: LoginRequest) => (
    apiClient.post<ApiEnvelope<AuthSessionDto>, LoginRequest>('/auth/login', payload)
  ),
  logout: () => (
    apiClient.post<ApiEnvelope<null>>('/auth/logout')
  ),
  refreshSession: () => (
    apiClient.post<ApiEnvelope<AuthSessionDto>>('/auth/refresh')
  ),
  requestPasswordReset: (payload: PasswordResetRequest) => (
    apiClient.post<ApiEnvelope<null>, PasswordResetRequest>('/auth/password-reset', payload)
  ),
  confirmPasswordReset: (payload: PasswordResetConfirmRequest) => (
    apiClient.post<ApiEnvelope<null>, PasswordResetConfirmRequest>('/auth/password-reset/confirm', payload)
  )
};
