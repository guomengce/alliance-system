import { describe, expect, it } from 'vitest';
import { validateAdminPasswordForm, validateAdminProfileForm } from './utils';

describe('admin profile helpers', () => {
  it('validates profile identity form', () => {
    expect(validateAdminProfileForm('', 'admin@example.com')).toBe('超级管理员代称不能为空');
    expect(validateAdminProfileForm('Admin', 'bad-email')).toBe('请输入正确的系统电子邮箱地址');
    expect(validateAdminProfileForm('Admin', 'admin@example.com')).toBeNull();
  });

  it('validates password changes', () => {
    expect(validateAdminPasswordForm('', 'old', '123456', '123456')).toBe('请输入当前正在使用的旧安全密码');
    expect(validateAdminPasswordForm('bad', 'old', '123456', '123456')).toBe('当前旧密码验证失败，密码不正确');
    expect(validateAdminPasswordForm('old', 'old', '123', '123')).toBe('新密码长度过短，不得小于 6 位');
    expect(validateAdminPasswordForm('old', 'old', '123456', '654321')).toBe('两次输入的新安全密码不吻合，请重新校配');
    expect(validateAdminPasswordForm('old', 'old', '123456', '123456')).toBeNull();
  });
});
