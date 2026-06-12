import { Check, Clock } from 'lucide-react';

export default function KycCard() {
  return (
    <div className="lg:col-span-4 glass-card rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">身份认证 (KYC)</h2>
        <span className="text-[10px] text-[#cbc4d2]/60 font-medium">高级交易权限</span>
      </div>

      <div className="space-y-3">
        {/* L1 basic certificate status */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#211f24] border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#e7c365]/10 flex items-center justify-center text-[#e7c365]">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">L1 基础认证</p>
              <p className="text-[10px] text-[#cbc4d2]/60">手机与邮箱信息</p>
            </div>
          </div>
          <span className="text-[10px] font-extrabold text-[#e7c365] bg-[#e7c365]/10 px-2 py-0.5 rounded border border-[#e7c365]/20">
            已认证
          </span>
        </div>

        {/* L2 deep identity scan */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#211f24] border border-[#cfbcff]/25">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#cfbcff]/10 flex items-center justify-center text-[#cfbcff]">
              <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
            </div>
            <div>
              <p className="text-xs font-bold text-white">L2 深度认证</p>
              <p className="text-[10px] text-[#cbc4d2]/60">身份识别 / 面部扫描</p>
            </div>
          </div>
          <span className="text-[10px] font-extrabold text-[#cfbcff] bg-[#cfbcff]/10 px-2 py-0.5 rounded border border-[#cfbcff]/20">
            审核中
          </span>
        </div>
      </div>
    </div>
  );
}
