import { describe, expect, it, vi } from 'vitest';

import {
  loginWithBackend,
  registerWithBackend,
  requestBackendResetCode,
  resetBackendPassword,
} from './actions';

describe('local auth actions', () => {
  it('logs in locally without calling the backend api or storing a token', async () => {
    const api = {
      login: vi.fn(),
    };
    const saveToken = vi.fn();

    const result = await loginWithBackend(
      { email: ' ADMIN_CENTER@ALLIANCE.COM ', password: 'admin1234', remember: true },
      { api, saveToken }
    );

    expect(api.login).not.toHaveBeenCalled();
    expect(saveToken).not.toHaveBeenCalled();
    expect(result).toEqual({
      message: 'local login ok',
      token: '',
      user: {
        email: 'admin_center@alliance.com',
        nickname: 'Admin Center',
        portalMode: 'admin',
        role: 'SUPER_ADMIN',
      },
    });
  });

  it('registers locally as a client without calling the backend api or storing a token', async () => {
    const api = {
      register: vi.fn(),
    };
    const saveToken = vi.fn();

    const result = await registerWithBackend(
      { email: ' CLIENT@EXAMPLE.COM ', nickname: ' Client ', password: 'password123', remember: false },
      { api, saveToken }
    );

    expect(api.register).not.toHaveBeenCalled();
    expect(saveToken).not.toHaveBeenCalled();
    expect(result.user).toEqual({
      email: 'client@example.com',
      nickname: 'Client',
      portalMode: 'client',
      role: null,
    });
  });

  it('returns a local reset code without calling the backend api', async () => {
    const api = {
      requestReset: vi.fn(),
    };

    const result = await requestBackendResetCode({ email: ' USER@EXAMPLE.COM ' }, { api });

    expect(api.requestReset).not.toHaveBeenCalled();
    expect(result).toEqual({ message: 'local reset code ready', resetToken: '000000' });
  });

  it('resets password locally without calling the backend api', async () => {
    const api = {
      resetPassword: vi.fn(),
    };

    const result = await resetBackendPassword(
      { email: ' USER@EXAMPLE.COM ', code: 'reset-token', newPassword: 'new-pass' },
      { api }
    );

    expect(api.resetPassword).not.toHaveBeenCalled();
    expect(result).toEqual({ message: 'local password reset ok' });
  });
});
