import { describe, expect, it } from 'vitest';
import { validatePasswordForm, validateProfileForm } from './utils';

describe('client settings utils', () => {
  it('validates profile form fields', () => {
    expect(validateProfileForm('', 'user@example.com')).toEqual('用户昵称不能为空。');
    expect(validateProfileForm('User', '')).toEqual('安全邮箱不能为空。');
    expect(validateProfileForm('User', 'bad-email')).toEqual('请输入有效的邮箱地址。');
    expect(validateProfileForm('User', 'user@example.com')).toBeNull();
  });

  it('validates password form fields', () => {
    expect(validatePasswordForm('', 'new-pass')).toEqual('请输入完整密码。');
    expect(validatePasswordForm('old-pass', '')).toEqual('请输入完整密码。');
    expect(validatePasswordForm('old-pass', 'new-pass')).toBeNull();
  });
});
