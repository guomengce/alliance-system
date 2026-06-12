import { AlertTriangle, ArrowUpRight } from 'lucide-react';
import type { WithdrawPanelProps } from '../types';

export default function WithdrawPanel({
  withdrawNetwork,
  onWithdrawNetworkChange,
  addressInput,
  amountInput,
  onAddressInputChange,
  onAmountInputChange,
  usdtBalance
}: WithdrawPanelProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <label className="text-[9px] sm:text-[10px] text-[#cbc4d2] font-semibold uppercase tracking-wider">选择提现协议网络 / Network</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onWithdrawNetworkChange('TRX')}
            className={`px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all text-xs cursor-pointer ${
              withdrawNetwork === 'TRX'
                ? 'bg-[#6750a4] border-[#cfbcff] text-white shadow-md glow-accent'
                : 'bg-[#141218]/45 border-white/10 text-[#cbc4d2]/70 hover:border-white/20'
            }`}
          >
            TRC-20 (TRON 网络)
          </button>
          <button
            type="button"
            onClick={() => onWithdrawNetworkChange('ETH')}
            className={`px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all text-xs cursor-pointer ${
              withdrawNetwork === 'ETH'
                ? 'bg-[#6750a4] border-[#cfbcff] text-white shadow-md glow-accent'
                : 'bg-[#141218]/45 border-white/10 text-[#cbc4d2]/70 hover:border-white/20'
            }`}
          >
            ERC-20 (Ethereum 网络)
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[9px] sm:text-[10px] text-[#cbc4d2] font-semibold uppercase">接收方链上钱包地址 (Address)</label>
        <input
          type="text"
          placeholder={`请输入您的 ${withdrawNetwork} 网络专用收款地址...`}
          value={addressInput}
          onChange={(e) => onAddressInputChange(e.target.value)}
          required
          className="bg-[#141218] border border-white/10 text-white rounded-lg px-4 py-2.5 text-xs sm:text-sm focus:ring-1 focus:ring-[#cfbcff] outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[9px] sm:text-[10px] text-[#cbc4d2] font-semibold uppercase">提现数量 / Withdraw Amount (USDT)</label>
        <div className="relative">
          <input
            type="number"
            placeholder="0.00"
            value={amountInput}
            onChange={(e) => onAmountInputChange(e.target.value)}
            required
            min="1"
            className="w-full bg-[#141218] border border-white/10 text-white rounded-lg px-4 py-2.5 text-xs sm:text-sm font-bold focus:ring-1 focus:ring-[#cfbcff] outline-none pr-16"
          />
          <button
            type="button"
            onClick={() => onAmountInputChange(usdtBalance.toString())}
            className="absolute right-3 top-2.5 sm:top-3 text-[9px] sm:text-[10px] font-black text-[#cfbcff] uppercase hover:underline cursor-pointer"
          >
            全部
          </button>
        </div>
        <span className="text-[9px] sm:text-[10px] text-[#cbc4d2]/50 block">当前可用协议余额: {usdtBalance.toLocaleString('zh-CN')} USDT</span>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full md:w-auto bg-[#cfbcff] text-[#381e72] py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl font-bold hover:brightness-110 active:scale-[0.98] transition-all text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-black/35"
        >
          <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          <span>发起链上提现申请</span>
        </button>
      </div>

      <div className="bg-amber-500/5 rounded-2xl p-4 border border-amber-500/10 space-y-2 text-[#cbc4d2]/90">
        <div className="flex items-center gap-2 text-[#e7c365]">
          <AlertTriangle className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider">提现安全须知与规则 (Withdraw Precautions)</span>
        </div>
        <ul className="list-disc pl-4 space-y-1.5 text-[10px] sm:text-[11px] font-medium leading-relaxed">
          <li>
            提现起提门槛：{withdrawNetwork === 'TRX' ? 'TRC-20 单笔最低起算金为 ' : 'ERC-20 单笔最低起算金为 '}<strong className="text-white">{withdrawNetwork === 'TRX' ? '20' : '40'} USDT</strong>。
          </li>
          <li>
            提现手续包干：{withdrawNetwork === 'TRX' ? 'TRC-20 每笔固定收取 1.5 USDT 的链上打包费' : 'ERC-20 每笔固定收取 8 USDT 以太网络核心 Gas 消耗费'}。
          </li>
          <li>
            请双重检测您的提现目标地址与收款网络：<span className="text-white font-bold">{withdrawNetwork} 网络</span>。一旦由于选错目标链导致充转错乱，资金将永久性丢失在外部黑洞。
          </li>
          <li>
            出账校验将在账单流安全审计确认后，平均 10-30 分钟在公链上广播成交。
          </li>
        </ul>
      </div>
    </div>
  );
}
