import { Button, Form, Input } from 'antd';
import { Settings2 } from 'lucide-react';
import type { ProfileFormProps } from '../types';

export default function ProfileForm({
  tempNickname,
  tempEmail,
  setTempNickname,
  setTempEmail,
  onUpdateProfile
}: ProfileFormProps) {
  return (
    <div className="glass-card rounded-2xl p-6 md:p-8">
      <h3 className="text-base font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
        <Settings2 className="w-5 h-5 text-[#cfbcff]" /> 基本资料修改
      </h3>

      <Form component="form" layout="vertical" onSubmitCapture={onUpdateProfile} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item className="alliance-antd-settings-form-item" label="用户昵称 (Nickname)">
            <Input
              value={tempNickname}
              onChange={(e) => setTempNickname(e.target.value)}
            />
          </Form.Item>

          <Form.Item className="alliance-antd-settings-form-item" label="安全收据邮箱 (Secured Email)">
            <Input
              type="email"
              value={tempEmail}
              onChange={(e) => setTempEmail(e.target.value)}
            />
          </Form.Item>
        </div>

        <Button type="primary" htmlType="submit" className="alliance-antd-settings-submit-button ml-auto block">
          保存资料修改
        </Button>
      </Form>
    </div>
  );
}
