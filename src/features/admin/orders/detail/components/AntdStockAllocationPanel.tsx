import { Wallet } from 'lucide-react';
import type { DetailViewProps } from '../../types';

interface AntdStockAllocationPanelProps {
  selectedOrder: DetailViewProps['selectedOrder'];
}

export default function AntdStockAllocationPanel({ selectedOrder }: AntdStockAllocationPanelProps) {
  return (
    <div className="bg-[#120f1a] p-5 rounded-2xl border border-white/5 space-y-4 text-left flex flex-col justify-between">
      <div className="space-y-3">
        <h5 className="text-[13px] font-black uppercase tracking-wider text-amber-500 flex items-center gap-1.5 border-b border-white/5 pb-2">
          <Wallet className="w-4 h-4" />
          <span>TROO 股票认购份额转拨明细</span>
        </h5>
        <div className="space-y-2.5 font-mono text-[13px] leading-tight text-[#cbc4d2]/80">
          <p>
            <span className="text-[#cbc4d2]/40 font-sans font-bold block mb-1">股票配售分配比规格</span>
            活期直接配额：{selectedOrder.stockConversion.buyRatio}% / 锁定排队配额：{selectedOrder.stockConversion.queueRatio}%
          </p>

          <div className="divide-y divide-white/5 text-[13px] pt-1">
            <div className="flex justify-between py-2">
              <span className="text-[#cbc4d2]/50 font-sans">TROO 股票买入配售活期</span>
              <span className="text-white font-bold">{selectedOrder.stockConversion.directStocks.toLocaleString()} 股 (即时可用)</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[#cbc4d2]/50 font-sans">TROO 股票排队交割锁定</span>
              <span className="text-amber-400 font-bold">{selectedOrder.stockConversion.queueStocks.toLocaleString()} 股 (排队解锁)</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[#cbc4d2]/50 font-sans">高额额外股票特赠比例</span>
              <span className="text-[#cfbcff] font-extrabold">
                {selectedOrder.stockConversion.giftedStocks > 0
                  ? `+${selectedOrder.stockConversion.giftedStocks.toLocaleString()} 股`
                  : '无额外赠送'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 bg-[#cfbcff]/5 border border-[#cfbcff]/15 rounded-xl text-xs text-[#cbc4d2]/80 leading-normal font-sans mt-4">
        <strong>精算对账关系说明</strong>：认购付款将根据规则自动分割，活期股票在确认到账后派发至会员账户，排队份额进入全局队列逐步解锁。
      </div>
    </div>
  );
}
