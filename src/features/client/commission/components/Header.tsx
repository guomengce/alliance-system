import { Button, Tag } from 'antd';
import { Download, Zap } from 'lucide-react';
import type { HeaderProps } from '../types';

export default function Header({
  onIncreaseLimit,
  onExport
}: HeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <p className="text-xs text-[#cbc4d2]/80">
          实时追踪您的下线贡献。佣金实行
          <span className="text-[#00e676] font-bold"> D+1 自动划转已开启 </span>
          ，每日凌晨 2:00 自动入账。
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Tag className="alliance-antd-commission-live-tag">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>D+1 自动归集服务中</span>
        </Tag>

        <Button
          icon={<Zap className="w-4 h-4 fill-current" />}
          onClick={onIncreaseLimit}
          type="primary"
        >
          提升额度
        </Button>

        <Button
          className="text-[#cfbcff]"
          icon={<Download className="w-4 h-4" />}
          onClick={onExport}
        >
          导出报表
        </Button>
      </div>
    </div>
  );
}
