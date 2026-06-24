import { Button } from 'antd';
import { RefreshCw } from 'lucide-react';

import type { WorkspaceProps } from '../types';

type HeaderActionsProps = Pick<
  WorkspaceProps,
  | 'manualSettleLoading'
  | 'triggerManualSettlement'
>;

const TEXT = {
  title: '\u7ed3\u7b97\u5217\u8868',
  desc: '\u6d4f\u89c8\u4e0e\u68c0\u7d22\u6240\u6709\u4f1a\u5458 D+1 \u7ed3\u7b97\u65e5\u5fd7\u3001\u6263\u7a0e\u660e\u7ec6\u3001\u624b\u52a8\u89e6\u53d1\u5168\u76df\u81ea\u52a8\u7ed3\u7b97\u6263\u7f34\u53ca\u8d85\u989d\u56de\u7b3c\u5bf9\u8d26\u3002',
  loading: '\u6b63\u5728\u6838\u7b97\u4e2d...',
  trigger: '\u542f\u52a8\u5168\u76df\u7ed3\u7b97\u5bf9\u8d26',
};

export default function AntdHeaderActions({
  manualSettleLoading,
  triggerManualSettlement
}: HeaderActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
      <div>
        <h3 className="text-sm md:text-base font-black text-white tracking-tight flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-[#cfbcff]" />
          <span>{TEXT.title}</span>
        </h3>
        <p className="text-[11px] text-[#cbc4d2]/50 mt-0.5 leading-tight">
          {TEXT.desc}
        </p>
      </div>
      <Button
        className="alliance-antd-settlement-primary-button"
        disabled={manualSettleLoading}
        icon={<RefreshCw className={`w-3.5 h-3.5 ${manualSettleLoading ? 'animate-spin' : ''}`} />}
        onClick={triggerManualSettlement}
      >
        {manualSettleLoading ? TEXT.loading : TEXT.trigger}
      </Button>
    </div>
  );
}
