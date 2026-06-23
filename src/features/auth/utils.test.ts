import { describe, expect, it } from 'vitest';

import type { RegisteredUser } from '../../hooks/types';
import {
  RESET_DEMO_CODE,
  createRegisteredUser,
  findRegisteredUser,
  getRegistrationIdentity,
  isRegisteredEmailConflict,
  isResetCodeValid,
  isValidAuthEmail,
  isValidAuthPassword,
  updateRegisteredUserPassword,
} from './utils';

const registeredUsers: RegisteredUser[] = [
  {
    email: 'admin@alliance.system',
    password: 'pass1234',
    nickname: '系统管理员',
    portalMode: 'admin',
    role: 'OPERATOR',
  },
  {
    email: 'client@example.com',
    password: 'client-pass',
    nickname: '联盟会员',
    portalMode: 'client',
    role: null,
  },
];

describe('auth utils', () => {
  it('validates email using the existing mock email rule', () => {
    expect(isValidAuthEmail('user@example.com')).toBe(true);
    expect(isValidAuthEmail(' user@example.com ')).toBe(true);
    expect(isValidAuthEmail('user.example.com')).toBe(false);
    expect(isValidAuthEmail('')).toBe(false);
  });

  it('validates password length with the existing minimum length', () => {
    expect(isValidAuthPassword('123')).toBe(false);
    expect(isValidAuthPassword('1234')).toBe(true);
  });

  it('detects admin and client registration identity from email', () => {
    expect(getRegistrationIdentity('operator@alliance.system')).toEqual({
      portalMode: 'admin',
      role: 'OPERATOR',
      isTestSystemMail: true,
    });
    expect(getRegistrationIdentity('member@example.com')).toEqual({
      portalMode: 'client',
      role: null,
      isTestSystemMail: false,
    });
  });

  it('finds registered users with trimmed case-insensitive email matching', () => {
    expect(findRegisteredUser(registeredUsers, ' ADMIN@ALLIANCE.SYSTEM ')).toEqual(registeredUsers[0]);
    expect(findRegisteredUser(registeredUsers, 'missing@example.com')).toBeUndefined();
  });

  it('detects registered email conflicts', () => {
    expect(isRegisteredEmailConflict(registeredUsers, 'CLIENT@example.com')).toBe(true);
    expect(isRegisteredEmailConflict(registeredUsers, 'new@example.com')).toBe(false);
  });

  it('keeps the reset verification code as 123456', () => {
    expect(RESET_DEMO_CODE).toBe('123456');
    expect(isResetCodeValid('123456')).toBe(true);
    expect(isResetCodeValid(' 123456 ')).toBe(true);
    expect(isResetCodeValid('654321')).toBe(false);
  });

  it('creates registered users with the existing mock identity fields', () => {
    expect(createRegisteredUser(' operator@alliance.system ', 'safe-pass', '运营')).toEqual({
      email: 'operator@alliance.system',
      password: 'safe-pass',
      nickname: '运营 (运营专员)',
      portalMode: 'admin',
      role: 'OPERATOR',
    });
    expect(createRegisteredUser(' client@example.com ', 'safe-pass', '会员')).toEqual({
      email: 'client@example.com',
      password: 'safe-pass',
      nickname: '会员',
      portalMode: 'client',
      role: null,
    });
  });

  it('updates only the matched registered user password', () => {
    expect(updateRegisteredUserPassword(registeredUsers, ' ADMIN@ALLIANCE.SYSTEM ', 'new-pass')).toEqual([
      {
        ...registeredUsers[0],
        password: 'new-pass',
      },
      registeredUsers[1],
    ]);
  });
});
