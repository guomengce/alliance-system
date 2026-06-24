import { Button, Tag } from 'antd';
import { ArrowLeft } from 'lucide-react';

interface AntdDetailHeaderProps {
  onBack: () => void;
}

const TEXT = {
  back: '\u8fd4\u56de\u6392\u961f\u4ee3\u8868\u540d\u518c',
  tag: '\u6392\u961f\u51fa\u6c34\u7a7f\u900f\u8d26\u518c (Trace Sheet)',
};

export function AntdDetailHeader({ onBack }: AntdDetailHeaderProps) {
  return (
    <div className="glass-card p-4 rounded-2xl border border-white/5 bg-[#141119] flex flex-wrap justify-between items-center gap-4">
      <Button
        className="alliance-antd-queue-back-button"
        icon={<ArrowLeft className="w-4 h-4 text-[#cbc4d2]" />}
        onClick={onBack}
      >
        {TEXT.back}
      </Button>

      <div className="text-right">
        <Tag className="alliance-antd-queue-detail-tag">{TEXT.tag}</Tag>
      </div>
    </div>
  );
}
