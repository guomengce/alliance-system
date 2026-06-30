import { describe, expect, it, vi } from 'vitest';

import {
  loginWithBackend,
  registerWithBackend,
  requestBackendResetCode,
  resetBackendPassword,
} from './actions';

describe('local auth actions', () => {
  it('logs in locally as an admin with the configured admin account', async () => {
    const api = {
      login: vi.fn(),
    };
    const saveToken = vi.fn();

    const result = await loginWithBackend(
      { email: ' PPYYBB888@GMAIL.COM ', password: 'admin1234', remember: true },
      { api, saveToken }
    );

    expect(api.login).not.toHaveBeenCalled();
    expect(saveToken).not.toHaveBeenCalled();
    expect(result).toEqual({
      message: 'local login ok',
      token: '',
      user: {
        email: 'ppyybb888@gmail.com',
        nickname: 'Alliance Admin',
        portalMode: 'admin',
        role: 'SUPER_ADMIN',
      },
    });
  });

  it('logs in locally as a client with the configured client account', async () => {
    const result = await loginWithBackend(
      { email: ' CLIENT@ALLIANCE.COM ', password: 'password123', remember: true },
    );

    expect(result.user).toEqual({
      email: 'client@alliance.com',
      nickname: 'Alliance Client',
      portalMode: 'client',
      role: null,
    });
  });

  it('rejects unknown credentials', async () => {
    await expect(
      loginWithBackend({ email: 'client@alliance.com', password: 'wrong-pass', remember: false })
    ).rejects.toThrow('账号或密码错误');
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
