import { Avatar, Button, Tag } from 'antd';
import { ArrowLeft } from 'lucide-react';

import { AntdCard } from '@/src/shared/antd/AntdCard';
import type { SummaryHeaderProps } from '../../types';

const TEXT = {
  back: '\u8fd4\u56de\u8054\u76df\u6b63\u5f0f\u6ce8\u518c\u4ee3\u8868\u540d\u518c',
  fallbackName: '\u672a\u8bbe\u7f6e\u6635\u79f0',
  fallbackTier: '\u7279\u7ea6\u5408\u4f19\u4ee3\u8868',
  status: '\u72b6\u6001:',
  normal: '\u6b63\u5e38\u6d3b\u8dc3',
  frozen: '\u51bb\u7ed3\u53d7\u9650',
  disabled: '\u7981\u7528\u5c01\u7981',
};

export default function AntdSummaryHeader({ editingUser, formNickname, formStatus, formTier, onBack }: SummaryHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <Button
          className="alliance-antd-user-detail-back-button"
          icon={<ArrowLeft className="w-4 h-4" />}
          onClick={onBack}
          type="text"
        >
          {TEXT.back}
        </Button>
        <span className="text-[10px] text-[#cbc4d2]/40 font-bold font-mono">
          SECURE CLIENT OVERLAY CONTROL
        </span>
      </div>

      <AntdCard className="alliance-antd-user-detail-header-card">
        <div className="absolute right-0 top-0 w-32 h-32 bg-[#cfbcff]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-center gap-6 w-full relative">
          <Avatar className="alliance-antd-user-detail-avatar" size={64}>
            {formNickname ? formNickname.charAt(0).toUpperCase() : 'U'}
          </Avatar>

          <div className="space-y-2 flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-3 justify-center md:justify-start">
              <h1 className="text-lg md:text-xl font-extrabold text-white leading-tight">{formNickname || TEXT.fallbackName}</h1>
              <Tag className="alliance-antd-user-detail-tier-tag">{formTier || TEXT.fallbackTier}</Tag>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-[#cbc4d2]">
              <div className="flex items-center gap-1 opacity-70">
                <span className="font-semibold text-[#cfbcff] font-mono">UID:</span>
                <span className="font-mono">{editingUser.uid}</span>
              </div>
              <div className="flex items-center gap-1 opacity-70">
                <span className="font-semibold text-[#cfbcff] font-mono">{TEXT.status}</span>
                <span className={formStatus === 'normal' ? 'text-emerald-400' : 'text-amber-500'}>
                  {formStatus === 'normal' ? TEXT.normal : formStatus === 'frozen' ? TEXT.frozen : TEXT.disabled}
                </span>
              </div>
            </div>
          </div>
        </div>
      </AntdCard>
    </>
  );
}
