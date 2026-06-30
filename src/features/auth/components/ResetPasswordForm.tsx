import { Button, Form, Input } from 'antd';
import { ArrowLeft, Eye, EyeOff, Lock as LockIcon, Smartphone } from 'lucide-react';
import type { ResetPasswordFormProps } from '../types';

export default function ResetPasswordForm({
  resetCode,
  newPassword,
  confirmNewPassword,
  showNewPassword,
  onSubmit,
  onBackToForgot,
  onResetCodeChange,
  onNewPasswordChange,
  onConfirmNewPasswordChange,
  onShowNewPasswordChange
}: ResetPasswordFormProps) {
  return (
    <>
      <div className="alliance-auth-reset-header flex items-center gap-2 mb-5">
        <Button
          type="text"
          onClick={onBackToForgot}
          className="alliance-antd-auth-back-button"
          icon={<ArrowLeft className="w-4 h-4" />}
        />
        <h2 className="alliance-auth-reset-title text-base font-bold text-white tracking-wide">设置新安全密码</h2>
      </div>

      <Form
        component="form"
        layout="vertical"
        onSubmitCapture={onSubmit}
        className="alliance-antd-auth-form alliance-auth-reset-form"
        requiredMark={false}
      >
        <Form.Item
          label="演示安全核验码 (123456)"
          className="alliance-antd-auth-form-item alliance-antd-auth-code-item alliance-auth-reset-code-item"
        >
          <Input
            type="text"
            value={resetCode}
            onChange={(e) => onResetCodeChange(e.target.value)}
            placeholder="核验验证码 (请输入 123456)"
            required
            prefix={<Smartphone className="w-3.5 h-3.5" />}
            className="alliance-antd-auth-input alliance-antd-auth-mono-input"
          />
        </Form.Item>

        <Form.Item label="重设新访问密码" className="alliance-antd-auth-form-item">
          <Input
            type={showNewPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => onNewPasswordChange(e.target.value)}
            placeholder="请输入 6 位以上新密码"
            required
            prefix={<LockIcon className="w-3.5 h-3.5" />}
            suffix={(
              <button
                type="button"
                onClick={() => onShowNewPasswordChange(!showNewPassword)}
                className="text-[#cbc4d2]/40 hover:text-white transition-colors cursor-pointer"
              >
                {showNewPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            )}
            className="alliance-antd-auth-input"
          />
        </Form.Item>

        <Form.Item label="再次确认新密码" className="alliance-antd-auth-form-item">
          <Input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => onConfirmNewPasswordChange(e.target.value)}
            placeholder="再次输入相同密码"
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
          确定完成密码重置
        </Button>
      </Form>
    </>
  );
}
