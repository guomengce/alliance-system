export function validateAdminProfileForm(nickname: string, email: string) {
  if (!nickname.trim()) return '超级管理员代称不能为空';
  if (!email.trim() || !email.includes('@')) return '请输入正确的系统电子邮箱地址';
  return null;
}

export function validateAdminPasswordForm(
  oldPassword: string,
  loginPassword: string,
  newPassword: string,
  confirmPassword: string
) {
  if (!oldPassword) return '请输入当前正在使用的旧安全密码';
  if (oldPassword !== loginPassword) return '当前旧密码验证失败，密码不正确';
  if (newPassword.length < 6) return '新密码长度过短，不得小于 6 位';
  if (newPassword !== confirmPassword) return '两次输入的新安全密码不吻合，请重新校配';
  return null;
}
