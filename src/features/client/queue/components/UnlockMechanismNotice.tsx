import { AlertCircle } from 'lucide-react';

export default function UnlockMechanismNotice() {
  return (
    <div className="p-4 bg-[#1b1724] border border-white/5 rounded-2xl flex items-start gap-3.5 select-none text-xs leading-relaxed">
      <span className="p-1.5 bg-[#cfbcff]/10 text-[#cfbcff] rounded-lg mt-0.5 shrink-0">
        <AlertCircle className="w-4 h-4" />
      </span>
      <div className="space-y-1">
        <p className="text-white font-black">L1 驱动解锁机制</p>
        <p className="text-[#cbc4d2]/70 font-medium">
          当您的 L1 层级下线成功认购，系统将自动从您的排队账户中解锁该订单金额 of 10%。仅限 L1 直推成员。
        </p>
        <p className="text-[#cfbcff]/90 font-mono text-xs font-bold uppercase tracking-wider">
          计算公式：解锁金额 = L1 订单金额 × 10%
        </p>
      </div>
    </div>
  );
}
