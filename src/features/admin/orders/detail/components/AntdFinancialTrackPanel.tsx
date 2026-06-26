import { FileText } from 'lucide-react';
import type { DetailViewProps } from '../../types';

interface AntdFinancialTrackPanelProps {
  selectedOrder: DetailViewProps['selectedOrder'];
}

export default function AntdFinancialTrackPanel({ selectedOrder }: AntdFinancialTrackPanelProps) {
  return (
    <div className="bg-[#120f1a] p-5 rounded-2xl border border-white/5 space-y-4 text-left flex flex-col justify-between">
      <div className="space-y-3">
        <h5 className="text-[13px] font-black uppercase tracking-wider text-[#cfbcff] flex items-center gap-1.5 border-b border-white/5 pb-2">
          <FileText className="w-4 h-4" />
          <span>资金流向与交易校对</span>
        </h5>
        <div className="space-y-3 font-mono text-[13px] leading-tight text-[#cbc4d2]/80">
          <p>
            <span className="text-[#cbc4d2]/40 font-sans font-bold block mb-0.5">申购会员 UID</span>
            <span className="text-white font-bold text-sm">{selectedOrder.uid}</span>
          </p>
          <p>
            <span className="text-[#cbc4d2]/40 font-sans font-bold block mb-0.5">认购套餐规格</span>
            <span className="text-[#cfbcff] font-bold text-sm font-sans">{selectedOrder.planName}</span>
          </p>
          <p>
            <span className="text-[#cbc4d2]/40 font-sans font-bold block mb-0.5">交割金额 (USDT)</span>
            <span className="text-emerald-400 font-extrabold text-sm font-sans">{selectedOrder.amount.toLocaleString()} USDT</span>
          </p>
          <p>
            <span className="text-[#cbc4d2]/40 font-sans font-bold block mb-0.5">支付通道/方式</span>
            <span className="text-emerald-300 font-bold font-sans bg-emerald-500/5 px-2 py-0.5 border border-emerald-500/10 rounded text-xs inline-block mt-0.5">
              {selectedOrder.paymentChannel}
            </span>
          </p>
          <p>
            <span className="text-[#cbc4d2]/40 font-sans font-bold block mb-0.5">资金流向存根</span>
            <span className="text-[#cbc4d2]/70 font-sans text-xs">{selectedOrder.cashFlowTrack}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
