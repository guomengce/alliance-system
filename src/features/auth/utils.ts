import type { AdminRole, PortalMode, RegisteredUser } from '../../hooks/types';

export const RESET_DEMO_CODE = '123456';

export interface RegistrationIdentity {
  portalMode: PortalMode;
  role: AdminRole;
  isTestSystemMail: boolean;
}

export function normalizeAuthEmail(email: string): string {
  return email.trim();
}

export function isValidAuthEmail(email: string): boolean {
  const trimmedEmail = normalizeAuthEmail(email);

  return Boolean(trimmedEmail) && trimmedEmail.includes('@');
}

export function isValidAuthPassword(password: string): boolean {
  return password.length >= 4;
}

export function findRegisteredUser(
  registeredUsers: RegisteredUser[],
  email: string,
): RegisteredUser | undefined {
  const normalizedEmail = normalizeAuthEmail(email).toLowerCase();

  return registeredUsers.find(
    user => user.email.trim().toLowerCase() === normalizedEmail,
  );
}

export function isRegisteredEmailConflict(
  registeredUsers: RegisteredUser[],
  email: string,
): boolean {
  return Boolean(findRegisteredUser(registeredUsers, email));
}

export function getRegistrationIdentity(email: string): RegistrationIdentity {
  const isTestSystemMail = normalizeAuthEmail(email).toLowerCase().endsWith('@alliance.system');

  return {
    portalMode: isTestSystemMail ? 'admin' : 'client',
    role: isTestSystemMail ? 'OPERATOR' : null,
    isTestSystemMail,
  };
}

export function createRegisteredUser(
  email: string,
  password: string,
  nickname: string,
): RegisteredUser {
  const trimmedEmail = normalizeAuthEmail(email);
  const trimmedNick = nickname.trim();
  const identity = getRegistrationIdentity(trimmedEmail);

  return {
    email: trimmedEmail,
    password,
    nickname: trimmedNick + (identity.isTestSystemMail ? ' (运营专员)' : ''),
    portalMode: identity.portalMode,
    role: identity.role,
  };
}

export function isResetCodeValid(resetCode: string): boolean {
  return resetCode.trim() === RESET_DEMO_CODE;
}

export function updateRegisteredUserPassword(
  registeredUsers: RegisteredUser[],
  email: string,
  password: string,
): RegisteredUser[] {
  const normalizedEmail = normalizeAuthEmail(email).toLowerCase();

  return registeredUsers.map(user => {
    if (user.email.toLowerCase() === normalizedEmail) {
      return { ...user, password };
    }

    return user;
  });
}
