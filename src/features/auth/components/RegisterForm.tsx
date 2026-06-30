import { Button, Form, Input } from 'antd';
import { ArrowLeft, Lock as LockIcon, Mail, User as UserIcon } from 'lucide-react';
import type { RegisterFormProps } from '../types';

export default function RegisterForm({
  regEmail,
  regNickname,
  regPassword,
  regConfirmPassword,
  onSubmit,
  onBackToLogin,
  onRegEmailChange,
  onRegNicknameChange,
  onRegPasswordChange,
  onRegConfirmPasswordChange
}: RegisterFormProps) {
  return (
    <>
      <div className="flex items-center gap-2 mb-5">
        <Button
          type="text"
          onClick={onBackToLogin}
          className="alliance-antd-auth-back-button"
          icon={<ArrowLeft className="w-4 h-4" />}
        />
        <h2 className="text-base font-bold text-white tracking-wide">注册新同盟账户</h2>
      </div>

      <Form
        component="form"
        layout="vertical"
        onSubmitCapture={onSubmit}
        className="alliance-antd-auth-form"
        requiredMark={false}
      >
        <Form.Item label="注册邮箱" className="alliance-antd-auth-form-item">
          <Input
            type="email"
            value={regEmail}
            onChange={(e) => onRegEmailChange(e.target.value)}
            placeholder="请填写您的邮箱"
            required
            prefix={<Mail className="w-3.5 h-3.5" />}
            className="alliance-antd-auth-input"
          />
          <p className="text-xs text-[#cbc4d2]/30 leading-snug pl-0.5 mt-1.5">
            * 提示: 邮箱以 <span className="text-[#cfbcff]">@alliance.system</span> 结尾将内置管理员权限
          </p>
        </Form.Item>

        <Form.Item label="会员专属昵称" className="alliance-antd-auth-form-item">
          <Input
            type="text"
            value={regNickname}
            onChange={(e) => onRegNicknameChange(e.target.value)}
            placeholder="您的同盟昵称"
            required
            prefix={<UserIcon className="w-3.5 h-3.5" />}
            className="alliance-antd-auth-input"
          />
        </Form.Item>

        <Form.Item label="设置访问密码" className="alliance-antd-auth-form-item">
          <Input
            type="password"
            value={regPassword}
            onChange={(e) => onRegPasswordChange(e.target.value)}
            placeholder="设置安全密码"
            required
            prefix={<LockIcon className="w-3.5 h-3.5" />}
            className="alliance-antd-auth-input"
          />
        </Form.Item>

        <Form.Item label="确认访问密码" className="alliance-antd-auth-form-item">
          <Input
            type="password"
            value={regConfirmPassword}
            onChange={(e) => onRegConfirmPasswordChange(e.target.value)}
            placeholder="再次确认新密码"
            required
            prefix={<LockIcon className="w-3.5 h-3.5" />}
            className="alliance-antd-auth-input"
          />
        </Form.Item>

        <Button
          htmlType="submit"
          className="alliance-antd-auth-primary-button mt-2"
          block
        >
          创建注册并自动填入
        </Button>
      </Form>

      <div className="text-center text-xs font-bold mt-5">
        <span className="text-[#cbc4d2]/40">已有同盟账户？</span>
        <Button
          type="link"
          onClick={onBackToLogin}
          className="alliance-antd-auth-inline-link-button"
        >
          返回登录
        </Button>
      </div>
    </>
  );
}
