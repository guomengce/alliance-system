import { Button, Checkbox, Form, Input } from 'antd';
import { Eye, EyeOff, Lock as LockIcon, Mail } from 'lucide-react';
import type { LoginFormProps } from '../types';

export default function LoginForm({
  loginEmail,
  loginPassword,
  showPassword,
  rememberMe,
  onSubmit,
  onLoginEmailChange,
  onLoginPasswordChange,
  onShowPasswordChange,
  onRememberMeChange,
  onForgotClick,
  onRegisterClick
}: LoginFormProps) {
  return (
    <>
      <div className="alliance-auth-login-header flex justify-between items-center mb-6">
        <h2 className="alliance-auth-login-title text-base font-bold text-white tracking-wide">账户安全登录</h2>
        <span className="alliance-auth-login-badge text-[10px] text-[#cfbcff]/80 bg-[#6750a4]/20 border border-[#6750a4]/40 px-2 py-0.5 rounded-full font-bold font-sans">
          智能识别模式
        </span>
      </div>

      <Form
        component="form"
        layout="vertical"
        onSubmitCapture={onSubmit}
        className="alliance-antd-auth-form"
        requiredMark={false}
      >
        <Form.Item label="登录邮箱" className="alliance-antd-auth-form-item">
          <Input
            id="email_field"
            type="email"
            value={loginEmail}
            onChange={(e) => onLoginEmailChange(e.target.value)}
            placeholder="请输入您的邮箱"
            required
            prefix={<Mail className="w-3.5 h-3.5" />}
            className="alliance-antd-auth-input"
          />
        </Form.Item>

        <Form.Item label="访问密码" className="alliance-antd-auth-form-item">
          <Input
            id="password_field"
            type={showPassword ? 'text' : 'password'}
            value={loginPassword}
            onChange={(e) => onLoginPasswordChange(e.target.value)}
            placeholder="访问口令"
            required
            prefix={<LockIcon className="w-3.5 h-3.5" />}
            suffix={(
              <button
                type="button"
                onClick={() => onShowPasswordChange(!showPassword)}
                className="text-[#cbc4d2]/40 hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            )}
            className="alliance-antd-auth-input"
          />
        </Form.Item>

        <div className="alliance-auth-login-options flex items-center justify-between text-[11px] font-bold pt-1">
          <Checkbox
            checked={rememberMe}
            onChange={(e) => onRememberMeChange(e.target.checked)}
            className="alliance-antd-auth-checkbox"
          >
            记住密码
          </Checkbox>
          <Button
            type="link"
            onClick={onForgotClick}
            className="alliance-antd-auth-link-button"
          >
            忘记密码?
          </Button>
        </div>

        <Button
          htmlType="submit"
          className="alliance-antd-auth-primary-button mt-2"
          block
        >
          立即登录
        </Button>
      </Form>

      <div className="alliance-auth-login-divider relative flex py-4 items-center justify-center">
        <div className="flex-grow border-t border-white/[0.04]" />
        <span className="flex-shrink mx-3 text-[9px] font-bold text-[#cbc4d2]/15 tracking-widest font-mono">安全加密访问</span>
        <div className="flex-grow border-t border-white/[0.04]" />
      </div>

      <div className="alliance-auth-register-row text-center text-xs font-bold">
        <span className="text-[#cbc4d2]/40">还没有账户？</span>
        <Button
          type="link"
          onClick={onRegisterClick}
          className="alliance-antd-auth-inline-link-button"
        >
          立即注册
        </Button>
      </div>
    </>
  );
}
