import { Button, Progress, Tag } from 'antd';
import { ChevronRight } from 'lucide-react';
import type { OrderCardProps, QueueOrderItem } from '../types';

const getStatusClassName = (status: QueueOrderItem['status']) => {
  if (status === 'released') return 'is-success';
  if (status === 'partially_released') return 'is-purple';
  return 'is-warning';
};

export default function OrderCard({ item, onSelectDetailOrder }: OrderCardProps) {
  const percentComplete = item.originalLock > 0 ? Math.round((item.released / item.originalLock) * 100) : 0;

  return (
    <div className="relative bg-[#1c1924]/60 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-lg group overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/[0.02] to-transparent pointer-events-none rounded-tr-2xl" />

      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="min-w-0">
          <h5 className="font-extrabold text-sm text-white tracking-wide group-hover:text-[#cfbcff] transition-colors truncate">
            {item.name}
          </h5>
          <p className="text-xs text-[#cbc4d2]/30 font-mono mt-1">
            订单编号 ID: <span className="text-[#cbc4d2]/50">{item.id}</span>
          </p>
        </div>
        <Tag className={`alliance-antd-queue-status-tag ${getStatusClassName(item.status)}`}>
          <span className="alliance-antd-queue-status-dot" />
          {item.statusLabel}
        </Tag>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-2 border-t border-b border-white/5 py-3 relative z-10">
        <div>
          <span className="text-[#cbc4d2]/40 text-xs font-bold uppercase tracking-wider block">认购方案金额</span>
          <span className="text-white font-mono font-black text-sm block mt-0.5">
            $ {item.amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div>
          <span className="text-[#cbc4d2]/40 text-xs font-bold uppercase tracking-wider block">排队锁定金额 (31%)</span>
          <span className="text-[#cbc4d2]/80 font-mono font-semibold text-sm block mt-0.5">
            $ {item.originalLock.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div>
          <span className="text-[#cbc4d2]/40 text-xs font-bold uppercase tracking-wider block">已解锁并买入</span>
          <span className="text-[#cfbcff] font-mono font-black text-sm block mt-0.5">
            $ {item.released.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div>
          <span className="text-amber-400/60 text-xs font-bold uppercase tracking-wider block">剩余锁定中</span>
          <span className="text-amber-400 font-mono font-black text-sm block mt-0.5">
            $ {item.remainingLock.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <div className="space-y-1.5 relative z-10">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-[#cbc4d2]/50">解锁买入进度 (Unlock Ratio)</span>
          <span className="text-white font-mono">{percentComplete}%</span>
        </div>
        <Progress
          className="alliance-antd-queue-progress"
          percent={percentComplete}
          showInfo={false}
          strokeColor="#cfbcff"
        />
      </div>

      <div className="pt-2.5 border-t border-white/5 flex justify-between items-center relative z-10">
        <span className="text-xs text-[#cbc4d2]/30 font-bold uppercase font-mono">
          UNLOCK HISTORY ({item.unlockHistory?.length || 0})
        </span>
        <Button
          type="text"
          onClick={() => onSelectDetailOrder(item)}
          className="alliance-antd-queue-link-button"
        >
          查看明细
          <ChevronRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}
