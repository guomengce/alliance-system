import { Button, Form, Input } from 'antd';
import { ArrowLeft, Mail } from 'lucide-react';
import type { ForgotPasswordFormProps } from '../types';

export default function ForgotPasswordForm({
  forgotEmail,
  onSubmit,
  onBackToLogin,
  onForgotEmailChange
}: ForgotPasswordFormProps) {
  return (
    <>
      <div className="flex items-center gap-2 mb-5">
        <Button
          type="text"
          onClick={onBackToLogin}
          className="alliance-antd-auth-back-button"
          icon={<ArrowLeft className="w-4 h-4" />}
        />
        <h2 className="text-base font-bold text-white tracking-wide">密码重置申请</h2>
      </div>

      <Form
        component="form"
        layout="vertical"
        onSubmitCapture={onSubmit}
        className="alliance-antd-auth-form"
        requiredMark={false}
      >
        <p className="text-xs text-[#cbc4d2]/60 leading-relaxed text-left">
          请输入您注册同盟系统所使用的邮箱地址，我们将通过多重安全节点自动发放密码重置安全验证密钥。
        </p>

        <Form.Item label="注册邮箱" className="alliance-antd-auth-form-item pt-2">
          <Input
            type="email"
            value={forgotEmail}
            onChange={(e) => onForgotEmailChange(e.target.value)}
            placeholder="输入您的注册邮箱"
            required
            prefix={<Mail className="w-3.5 h-3.5" />}
            className="alliance-antd-auth-input"
          />
        </Form.Item>

        <Button
          htmlType="submit"
          className="alliance-antd-auth-primary-button mt-2"
          block
        >
          检测账号并发送验证密钥
        </Button>
      </Form>
    </>
  );
}
