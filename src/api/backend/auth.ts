import { backendApiClient } from './request';
import type { BackendMessageResponse, BackendUserDto } from './types';

export interface BackendLoginRequest {
  email: string;
  password: string;
}

export interface BackendRegisterRequest {
  email: string;
  nickname: string;
  password: string;
}

export interface BackendAuthSessionResponse extends BackendMessageResponse {
  token: string;
  user: BackendUserDto;
}

export interface BackendCurrentUserResponse {
  user: BackendUserDto;
}

export interface BackendRequestResetRequest {
  email: string;
}

export interface BackendRequestResetResponse extends BackendMessageResponse {
  resetToken?: string;
}

export interface BackendResetPasswordRequest {
  email: string;
  code: string;
  newPassword: string;
}

export interface BackendUpdateProfileRequest {
  nickname?: string;
  twoFAEnabled?: boolean;
  password?: string;
  newPassword?: string;
}

export interface BackendUpdateProfileResponse extends BackendMessageResponse {
  user: BackendUserDto;
}

export const backendAuthApi = {
  login: (payload: BackendLoginRequest) => (
    backendApiClient.post<BackendAuthSessionResponse, BackendLoginRequest>('/auth/login', payload)
  ),
  register: (payload: BackendRegisterRequest) => (
    backendApiClient.post<BackendAuthSessionResponse, BackendRegisterRequest>('/auth/register', payload)
  ),
  me: () => backendApiClient.get<BackendCurrentUserResponse>('/auth/me'),
  requestReset: (payload: BackendRequestResetRequest) => (
    backendApiClient.post<BackendRequestResetResponse, BackendRequestResetRequest>('/auth/request-reset', payload)
  ),
  resetPassword: (payload: BackendResetPasswordRequest) => (
    backendApiClient.post<BackendMessageResponse, BackendResetPasswordRequest>('/auth/reset-password', payload)
  ),
  updateProfile: (payload: BackendUpdateProfileRequest) => (
    backendApiClient.post<BackendUpdateProfileResponse, BackendUpdateProfileRequest>('/auth/update-profile', payload)
  )
};
