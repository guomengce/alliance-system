import { describe, expect, it, vi } from 'vitest';

import type { BackendAuthSessionResponse } from '../../api/backend/auth';
import type { BackendUserDto } from '../../api/backend/types';
import {
  loginWithBackend,
  registerWithBackend,
  requestBackendResetCode,
  resetBackendPassword,
} from './actions';

const backendUser: BackendUserDto = {
  email: 'admin_center@alliance.com',
  nickname: 'Admin Center',
  portalMode: 'admin',
  role: 'SUPER_ADMIN',
  usdtBalance: 100,
  trooBalance: 200,
  lockedQueueAmount: 0,
  originalLockedQueue: 0,
  releasedQueueAmount: 0,
  commissionPoolLimit: 0,
  commissionPoolRemaining: 0,
  pendingBalance: 0,
  cumulativeCommissions: 0,
  arrivedCommissions: 0,
  failedCommissions: 0,
  yesterdayRevenue: 0,
  totalCredit: 0,
  remainingCredit: 0,
  twoFAEnabled: true,
};

const session: BackendAuthSessionResponse = {
  message: 'ok',
  token: 'token-123',
  user: backendUser,
};

describe('auth backend actions', () => {
  it('logs in through backend api and stores the returned token', async () => {
    const api = {
      login: vi.fn().mockResolvedValue(session),
    };
    const saveToken = vi.fn();

    const result = await loginWithBackend(
      { email: ' ADMIN_CENTER@ALLIANCE.COM ', password: 'admin1234', remember: true },
      { api, saveToken }
    );

    expect(api.login).toHaveBeenCalledWith({
      email: 'admin_center@alliance.com',
      password: 'admin1234',
    });
    expect(saveToken).toHaveBeenCalledWith('token-123', true);
    expect(result.user).toEqual({
      email: 'admin_center@alliance.com',
      nickname: 'Admin Center',
      portalMode: 'admin',
      role: 'SUPER_ADMIN',
    });
  });

  it('registers through backend api and stores the returned token', async () => {
    const api = {
      register: vi.fn().mockResolvedValue({
        ...session,
        user: { ...backendUser, email: 'client@example.com', portalMode: 'client', role: null },
      }),
    };
    const saveToken = vi.fn();

    const result = await registerWithBackend(
      { email: ' CLIENT@EXAMPLE.COM ', nickname: 'Client', password: 'password123', remember: false },
      { api, saveToken }
    );

    expect(api.register).toHaveBeenCalledWith({
      email: 'client@example.com',
      nickname: 'Client',
      password: 'password123',
    });
    expect(saveToken).toHaveBeenCalledWith('token-123', false);
    expect(result.user.portalMode).toBe('client');
  });

  it('requests a backend reset code and exposes the development reset token', async () => {
    const api = {
      requestReset: vi.fn().mockResolvedValue({ message: 'sent', resetToken: 'reset-token' }),
    };

    const result = await requestBackendResetCode({ email: ' USER@EXAMPLE.COM ' }, { api });

    expect(api.requestReset).toHaveBeenCalledWith({ email: 'user@example.com' });
    expect(result.resetToken).toBe('reset-token');
  });

  it('resets password using the backend reset token', async () => {
    const api = {
      resetPassword: vi.fn().mockResolvedValue({ message: 'done' }),
    };

    await resetBackendPassword(
      { email: ' USER@EXAMPLE.COM ', code: 'reset-token', newPassword: 'new-pass' },
      { api }
    );

    expect(api.resetPassword).toHaveBeenCalledWith({
      email: 'user@example.com',
      code: 'reset-token',
      newPassword: 'new-pass',
    });
  });
});
