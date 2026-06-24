import { Button, Form, Input, Select } from 'antd';
import { KeyRound, ShieldCheck, User } from 'lucide-react';

import { AntdCard } from '@/src/shared/antd/AntdCard';
import type { KycL1Status, KycL2Status, ProfilePanelProps, UserAccountStatus } from '../../types';

const TEXT = {
  title: '\u7528\u6237\u4fe1\u606f',
  nickname: '\u7528\u6237\u6635\u79f0 (Nickname)',
  email: '\u90ae\u7bb1 (Email)',
  phone: '\u624b\u673a\u53f7\u7801 (Phone Number)',
  sponsor: '\u5bf9\u5e94\u63a8\u8350\u4eba (Sponsor Referrer)',
  passwordTitle: '\u767b\u5f55\u5bc6\u7801\u91cd\u7f6e\u5b89\u5168\u7ba1\u7406 (Set / Reset Password)',
  passwordDesc: '\u7ba1\u7406\u7aef\u4e0d\u76f4\u63a5\u5199\u5165\u660e\u6587\u5bc6\u7801\uff0c\u53ea\u53d1\u9001\u6539\u5bc6\u6307\u4ee4\u548c\u5b89\u5168\u6821\u9a8c\u4ee4\u724c\u5230\u7528\u6237\u90ae\u7bb1\u3002',
  reset: '\u5411\u8be5\u90ae\u7bb1\u53d1\u9001\u5bc6\u7801\u91cd\u7f6e\u6307\u4ee4',
  status: '\u8d26\u6237\u72b6\u6001',
  regDate: '\u6ce8\u518c\u6fc0\u6d3b\u65f6\u95f4',
  kycTitle: '\u5b9e\u540d\u8eab\u4efd\u8ba4\u8bc1\u8d44\u8d28\u6838\u5b9a (KYC) \u4e0e\u7528\u6237\u63d0\u4ea4\u7684\u8ba4\u8bc1\u8d44\u6599\u5c55\u793a',
  kycL1: 'L1 \u57fa\u7840\u5b9e\u540d\u8d44\u8d28',
  kycL2: 'L2 \u6df1\u5ea6\u5b9e\u540d\u8d44\u8d28',
  noDate: '\u6682\u672a\u6fc0\u6d3b',
};

const statusOptions: Array<{ value: UserAccountStatus; label: string }> = [
  { value: 'normal', label: '\u6b63\u5e38\u6d3b\u8dc3 (Active)' },
  { value: 'frozen', label: '\u51bb\u7ed3\u53d7\u9650 (Frozen)' },
  { value: 'disabled', label: '\u6ce8\u9500\u7981\u7528 (Disabled)' },
];

const kycL1Options: Array<{ value: KycL1Status; label: string }> = [
  { value: 'verified', label: '\u5df2\u8ba4\u8bc1 (Verified)' },
  { value: 'unverified', label: '\u672a\u6838\u9a8c (Unverified)' },
];

const kycL2Options: Array<{ value: KycL2Status; label: string }> = [
  { value: 'verified', label: '\u7ec8\u5ba1\u5df2\u901a\u8fc7 (Verified)' },
  { value: 'pending', label: '\u5f85\u540e\u53f0\u5ba1\u6838 (Pending)' },
  { value: 'unverified', label: '\u5c1a\u672a\u6838\u9a8c (Unverified)' },
];

export default function AntdProfilePanel({
  editingUser,
  formNickname,
  setFormNickname,
  formEmail,
  setFormEmail,
  formPhone,
  setFormPhone,
  formSponsor,
  setFormSponsor,
  formStatus,
  setFormStatus,
  formRegDate,
  formKycL1,
  setFormKycL1,
  formKycL2,
  setFormKycL2,
  onResetPasswordEmail,
}: ProfilePanelProps) {
  return (
    <AntdCard className="alliance-antd-user-detail-panel-card">
      <div className="flex items-center gap-2 pb-3 border-b border-white/5">
        <User className="w-5 h-5 text-[#cfbcff]" />
        <h2 className="text-sm font-bold text-white tracking-wider">{TEXT.title}</h2>
      </div>

      <Form layout="vertical" className="alliance-antd-user-detail-form">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Form.Item label={TEXT.nickname}>
            <Input value={formNickname} onChange={(event) => setFormNickname(event.target.value)} />
          </Form.Item>
          <Form.Item label={TEXT.email}>
            <Input value={formEmail} onChange={(event) => setFormEmail(event.target.value)} />
          </Form.Item>
          <Form.Item label={TEXT.phone}>
            <Input value={formPhone} onChange={(event) => setFormPhone(event.target.value)} />
          </Form.Item>
          <Form.Item label={TEXT.sponsor}>
            <Input value={formSponsor} onChange={(event) => setFormSponsor(event.target.value)} />
          </Form.Item>
        </div>

        <Form.Item label={TEXT.passwordTitle}>
          <AntdCard className="alliance-antd-user-detail-inline-card">
            <p className="text-[11px] text-[#cbc4d2]/70 flex-1 leading-normal font-sans">{TEXT.passwordDesc}</p>
            <Button className="alliance-antd-user-detail-gradient-button" icon={<KeyRound className="w-3.5 h-3.5" />} onClick={onResetPasswordEmail}>
              {TEXT.reset}
            </Button>
          </AntdCard>
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Form.Item label={TEXT.status}>
            <Select value={formStatus} options={statusOptions} onChange={setFormStatus} />
          </Form.Item>
          <Form.Item label={TEXT.regDate}>
            <Input value={formRegDate || TEXT.noDate} disabled />
          </Form.Item>
        </div>
      </Form>

      <div className="border-t border-white/5 pt-5 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#cfbcff]" />
          <span>{TEXT.kycTitle}</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          <AntdCard className="alliance-antd-user-detail-inline-card is-column">
            <Form layout="vertical" className="alliance-antd-user-detail-form">
              <Form.Item label={TEXT.kycL1}>
                <Select value={formKycL1} options={kycL1Options} onChange={setFormKycL1} />
              </Form.Item>
            </Form>
            <div className="bg-[#110e16]/80 p-3 rounded-lg border border-white/5 text-[11px] text-[#cbc4d2]/80 space-y-1 font-mono">
              <p><span className="text-[#cbc4d2]/40">\u521d\u6838\u59d3\u540d:</span> {formNickname || editingUser.uid}</p>
              <p><span className="text-[#cbc4d2]/40">\u7ed1\u624b\u673a\u53f7:</span> {formPhone || '\u672a\u7ed1\u5b9a'}</p>
              <p><span className="text-[#cbc4d2]/40">\u7ed1\u7535\u5b50\u90ae\u7bb1:</span> {formEmail || '\u672a\u7ed1\u5b9a'}</p>
            </div>
          </AntdCard>
          <AntdCard className="alliance-antd-user-detail-inline-card is-column">
            <Form layout="vertical" className="alliance-antd-user-detail-form">
              <Form.Item label={TEXT.kycL2}>
                <Select value={formKycL2} options={kycL2Options} onChange={setFormKycL2} />
              </Form.Item>
            </Form>
            <div className="bg-[#110e16]/80 p-3 rounded-lg border border-white/5 text-[11px] text-[#cbc4d2]/80 space-y-1 font-sans">
              <p><span className="text-[#cbc4d2]/40 font-mono">\u4e0a\u9001\u5a92\u4f53:</span> \u624b\u673a\u7aef\u81ea\u62cd\u63d0\u62a5</p>
              <p><span className="text-[#cbc4d2]/40 font-mono">\u6838\u9a8c\u901a\u9053:</span> Tencent OCR / FaceId</p>
              <p><span className="text-[#cbc4d2]/40 font-mono">\u6838\u9500\u6bd4\u5bf9:</span> 98.42%</p>
            </div>
          </AntdCard>
        </div>
      </div>
    </AntdCard>
  );
}
