export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateProfileForm(nickname: string, email: string) {
  if (!nickname.trim()) return '用户昵称不能为空。';
  if (!email.trim()) return '安全邮箱不能为空。';
  if (!isValidEmail(email)) return '请输入有效的邮箱地址。';
  return null;
}

export function validatePasswordForm(oldPassword: string, newPassword: string) {
  if (!oldPassword || !newPassword) return '请输入完整密码。';
  return null;
}
