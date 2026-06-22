export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const normalizeRoleCode = (roleCode: string) => roleCode.toUpperCase().replace(/\s+/g, '_');

export const generatePassword = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%&*';
  let autoPwd = '';
  for (let i = 0; i < 15; i++) {
    autoPwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return autoPwd;
};
