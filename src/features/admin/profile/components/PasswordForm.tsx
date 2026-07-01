import { useEffect } from 'react';
import { Button, Card, Form, Input } from 'antd';
import { AlertCircle, Check, KeyRound, Lock } from 'lucide-react';
import type { AdminPasswordFormValues, PasswordFormProps } from '../types';

export function PasswordForm({
  oldPassword,
  newPassword,
  confirmPassword,
  passwordSuccess,
  passwordError,
  onSavePassword
}: PasswordFormProps) {
  const [form] = Form.useForm<AdminPasswordFormValues>();

  useEffect(() => {
    form.setFieldsValue({
      oldPassword,
      newPassword,
      confirmPassword
    });
  }, [confirmPassword, form, newPassword, oldPassword]);

  return (
    <Card className="glass-card rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-2 pb-3 border-b border-white/5">
        <Lock className="w-5 h-5 text-[#cfbcff]" />
        <h2 className="text-base font-extrabold text-white tracking-wide">
          变更安全凭证 / 修改系统密码
        </h2>
      </div>

      <Form form={form} layout="vertical" onFinish={onSavePassword} className="space-y-4">
        <Form.Item name="oldPassword" label="当前超级管理员旧密码">
          <Input.Password
            prefix={<KeyRound className="w-4 h-4 text-[#cbc4d2]/40" />}
            placeholder="请输入当前在使用密码进行授权"
          />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item name="newPassword" label="设置新安全密码">
            <Input.Password
              prefix={<Lock className="w-4 h-4 text-[#cbc4d2]/40" />}
              placeholder="不少于 6 位强口令"
            />
          </Form.Item>

          <Form.Item name="confirmPassword" label="确认新安全密码">
            <Input.Password
              prefix={<Lock className="w-4 h-4 text-[#cbc4d2]/40" />}
              placeholder="再次核对无误密码"
            />
          </Form.Item>
        </div>

        {passwordError && (
          <p className="text-white font-bold text-xs flex items-center gap-1.5 bg-white/5 p-2 rounded-lg border border-white/10">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#cfbcff]" /> {passwordError}
          </p>
        )}

        {passwordSuccess && (
          <p className="text-white font-bold text-xs flex items-center gap-1.5 bg-[#cfbcff]/10 p-2 rounded-lg border border-[#cfbcff]/20">
            <Check className="w-4 h-4 shrink-0 text-[#cfbcff]" /> {passwordSuccess}
          </p>
        )}

        <div className="pt-2 flex justify-end">
          <Button type="primary" htmlType="submit" icon={<Check className="w-4 h-4" />}>
            确认修改
          </Button>
        </div>
      </Form>
    </Card>
  );
}
