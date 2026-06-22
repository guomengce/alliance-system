import { describe, expect, it } from 'vitest';
import { getInitialRegisteredUsers, INITIAL_REGISTERED_USER_DTOS } from './auth';

describe('auth mock seeds', () => {
  it('returns registered users as a fresh array', () => {
    const users = getInitialRegisteredUsers();

    expect(users).toHaveLength(INITIAL_REGISTERED_USER_DTOS.length);
    expect(users[0]).toMatchObject({
      email: expect.any(String),
      password: expect.any(String),
      nickname: expect.any(String),
      portalMode: expect.any(String)
    });
    expect(users).not.toBe(getInitialRegisteredUsers());
  });
});
