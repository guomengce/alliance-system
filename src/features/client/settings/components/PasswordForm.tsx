import { useEffect } from 'react';
import { Button, Card, Form, Input } from 'antd';
import { Eye, EyeOff, Key } from 'lucide-react';
import type { ClientPasswordFormValues, PasswordFormProps } from '../types';

export default function PasswordForm({
  showPassword,
  oldPassword,
  newPassword,
  setShowPassword,
  onUpdatePasswords
}: PasswordFormProps) {
  const [form] = Form.useForm<ClientPasswordFormValues>();

  useEffect(() => {
    form.setFieldsValue({
      oldPassword,
      newPassword
    });
  }, [form, newPassword, oldPassword]);

  return (
    <Card className="glass-card rounded-2xl p-6 md:p-8">
      <h3 className="text-base font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
        <Key className="w-5 h-5 text-[#cfbcff]" /> 账号登录安全密码
      </h3>

      <Form form={form} layout="vertical" onFinish={onUpdatePasswords} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item className="alliance-antd-settings-form-item" name="oldPassword" label="原始登录密码">
            <Input.Password
              type={showPassword ? 'text' : 'password'}
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

          <Form.Item className="alliance-antd-settings-form-item" name="newPassword" label="新设定登录密码">
            <Input.Password placeholder="请输入新安全密码..." />
          </Form.Item>
        </div>

        <Button type="primary" htmlType="submit" className="alliance-antd-settings-submit-button ml-auto block">
          修改登录密码
        </Button>
      </Form>
    </Card>
  );
}
