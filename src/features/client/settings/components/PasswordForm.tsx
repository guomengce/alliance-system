import { Button, Form, Input } from 'antd';
import { Eye, EyeOff, Key } from 'lucide-react';
import type { PasswordFormProps } from '../types';

export default function PasswordForm({
  showPassword,
  oldPassword,
  newPassword,
  setShowPassword,
  setOldPassword,
  setNewPassword,
  onUpdatePasswords
}: PasswordFormProps) {
  return (
    <div className="glass-card rounded-2xl p-6 md:p-8">
      <h3 className="text-base font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
        <Key className="w-5 h-5 text-[#cfbcff]" /> 账号登录安全密码
      </h3>

      <Form component="form" onSubmitCapture={onUpdatePasswords} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item className="alliance-antd-settings-form-item" label="原始登录密码">
            <Input.Password
              type={showPassword ? 'text' : 'password'}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="******"
              iconRender={() => (
                <Button
                  type="text"
                  icon={showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  onClick={() => setShowPassword(!showPassword)}
                  className="alliance-antd-settings-eye-button"
                />
              )}
            />
          </Form.Item>

          <Form.Item className="alliance-antd-settings-form-item" label="新设定登录密码">
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="请输入新安全密码..."
            />
          </Form.Item>
        </div>

        <Button type="primary" htmlType="submit" className="alliance-antd-settings-submit-button ml-auto block">
          修改登录密码
        </Button>
      </Form>
    </div>
  );
}
