import { useEffect } from 'react';
import { Button, Card, Form, Input } from 'antd';
import { AlertCircle, Check, Mail, User, UserCheck } from 'lucide-react';
import type { AdminProfileFormValues, ProfileFormProps } from '../types';

export function ProfileForm({
  formNickname,
  formEmail,
  profileSuccess,
  profileError,
  onSaveProfile
}: ProfileFormProps) {
  const [form] = Form.useForm<AdminProfileFormValues>();

  useEffect(() => {
    form.setFieldsValue({
      nickname: formNickname,
      email: formEmail
    });
  }, [form, formEmail, formNickname]);

  return (
    <Card className="glass-card rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-2 pb-3 border-b border-white/5">
        <User className="w-5 h-5 text-[#cfbcff]" />
        <h2 className="text-base font-extrabold text-white tracking-wide">
          基本资料 & 修改安全代号
        </h2>
      </div>

      <Form form={form} layout="vertical" onFinish={onSaveProfile} className="space-y-4">
        <Form.Item name="nickname" label="系统管理员名称 (Nickname)">
          <Input
            prefix={<UserCheck className="w-4 h-4 text-[#cbc4d2]/40" />}
            placeholder="请输入超级管理员代号"
          />
        </Form.Item>

        <Form.Item name="email" label="安全保密邮箱 (Email)">
          <Input
            type="email"
            prefix={<Mail className="w-4 h-4 text-[#cbc4d2]/40" />}
            placeholder="root@alliance.com"
          />
        </Form.Item>

        {profileError && (
          <p className="text-white font-bold text-xs flex items-center gap-1.5 bg-white/5 p-2 rounded-lg border border-white/10">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#cfbcff]" /> {profileError}
          </p>
        )}

        {profileSuccess && (
          <p className="text-white font-bold text-xs flex items-center gap-1.5 bg-[#cfbcff]/10 p-2 rounded-lg border border-[#cfbcff]/20">
            <Check className="w-4 h-4 shrink-0 text-[#cfbcff]" /> 管理员账户信息保存成功！
          </p>
        )}

        <div className="pt-2 flex justify-end">
          <Button type="primary" htmlType="submit" icon={<Check className="w-4 h-4" />}>
            保存当前资料
          </Button>
        </div>
      </Form>
    </Card>
  );
}
