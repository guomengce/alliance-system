import { Button, Progress } from 'antd';
import { AlertCircle } from 'lucide-react';
import type { CreditPoolProps } from '../types';
import { CREDIT_POOL_PROGRESS_PERCENT } from '../utils';

export default function CreditPool({
  remainingCredit,
  totalCredit,
  onRaiseCredit
}: CreditPoolProps) {
  return (
    <div className="lg:col-span-4 glass-card rounded-2xl p-6 md:p-8 flex flex-col items-center justify-between">
      <div className="w-full flex justify-between items-center border-b border-white/5 pb-2">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">信用池 (Credit Pool)</h2>
        <AlertCircle className="w-4.5 h-4.5 text-[#cbc4d2] opacity-40" />
      </div>

      <div className="relative w-48 h-48 my-6 flex items-center justify-center">
        <Progress
          type="circle"
          percent={CREDIT_POOL_PROGRESS_PERCENT}
          size={192}
          strokeWidth={6}
          strokeColor="#cfbcff"
          trailColor="#36343a"
          showInfo={false}
          className="alliance-antd-member-credit-progress"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-white leading-none">
            {CREDIT_POOL_PROGRESS_PERCENT}<span className="text-lg">%</span>
          </span>
          <span className="text-xs text-[#cbc4d2] font-bold uppercase tracking-widest mt-1">已占用</span>
        </div>
      </div>

      <div className="w-full space-y-3">
        <div className="flex justify-between items-center p-3.5 rounded-xl bg-[#211f24] border border-white/5">
          <span className="text-xs text-[#cbc4d2] font-medium">可用额度</span>
          <span className="text-sm font-bold text-[#cfbcff] font-mono">
            {remainingCredit.toLocaleString('zh-CN', { minimumFractionDigits: 2 })} USDT
          </span>
        </div>
        <div className="flex justify-between items-center p-3.5 rounded-xl bg-[#211f24] border border-white/5">
          <span className="text-xs text-[#cbc4d2] font-medium">总信用额度</span>
          <span className="text-sm font-bold text-white font-mono">
            {totalCredit.toLocaleString('zh-CN', { minimumFractionDigits: 2 })} USDT
          </span>
        </div>
      </div>

      <Button
        type="primary"
        onClick={onRaiseCredit}
        className="alliance-antd-member-credit-button w-full mt-6"
      >
        提升信用额度
      </Button>
    </div>
  );
}
