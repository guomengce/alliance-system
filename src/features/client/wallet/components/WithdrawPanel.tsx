import { Button, Input } from 'antd';
import { AlertTriangle, ArrowUpRight } from 'lucide-react';
import type { NetworkType, WithdrawPanelProps } from '../types';

const networks: Array<{ label: string; value: NetworkType }> = [
  { label: 'TRC-20 (TRON 网络)', value: 'TRX' },
  { label: 'ERC-20 (Ethereum 网络)', value: 'ETH' }
];

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
        <label className="text-xs sm:text-xs text-[#cbc4d2] font-semibold uppercase tracking-wider">选择提现协议网络 / Network</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {networks.map((network) => (
            <Button
              key={network.value}
              className={`alliance-antd-wallet-network-button ${withdrawNetwork === network.value ? 'is-active' : ''}`}
              onClick={() => onWithdrawNetworkChange(network.value)}
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-current opacity-80" />
              {network.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs sm:text-xs text-[#cbc4d2] font-semibold uppercase">接收方链上钱包地址 (Address)</label>
        <Input
          className="alliance-antd-wallet-form-input"
          onChange={(e) => onAddressInputChange(e.target.value)}
          placeholder={`请输入您的 ${withdrawNetwork} 网络专用收款地址...`}
          required
          value={addressInput}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs sm:text-xs text-[#cbc4d2] font-semibold uppercase">提现数量 / Withdraw Amount (USDT)</label>
        <Input
          className="alliance-antd-wallet-form-input is-amount"
          min="1"
          onChange={(e) => onAmountInputChange(e.target.value)}
          placeholder="0.00"
          required
          suffix={(
            <Button className="alliance-antd-wallet-max-button" onClick={() => onAmountInputChange(usdtBalance.toString())}>
              全部
            </Button>
          )}
          type="number"
          value={amountInput}
        />
        <span className="text-xs sm:text-xs text-[#cbc4d2]/50 block">当前可用协议余额: {usdtBalance.toLocaleString('zh-CN')} USDT</span>
      </div>

      <div className="pt-2">
        <Button
          className="alliance-antd-wallet-submit-button"
          htmlType="submit"
          icon={<ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />}
        >
          发起链上提现申请
        </Button>
      </div>

      <div className="bg-amber-500/5 rounded-2xl p-4 border border-amber-500/10 space-y-2 text-[#cbc4d2]/90">
        <div className="flex items-center gap-2 text-[#e7c365]">
          <AlertTriangle className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          <span className="text-xs sm:text-xs font-black uppercase tracking-wider">提现安全须知与规则 (Withdraw Precautions)</span>
        </div>
        <ul className="list-disc pl-4 space-y-1.5 text-xs sm:text-xs font-medium leading-relaxed">
          <li>提现起提门槛:{withdrawNetwork === 'TRX' ? 'TRC-20' : 'ERC-20'} 单笔最低起算金为 <strong className="text-white">{withdrawNetwork === 'TRX' ? '20' : '40'} USDT</strong>。</li>
          <li>提现手续费：{withdrawNetwork === 'TRX' ? 'TRC-20 每笔固定收取 1.5 USDT的链上打包费,' : 'ERC-20 每笔固定收取 8 USDT 以太网络核心 Gas 费用'}。</li>
          <li>请双重检测您的提现目标地址与收款网络：<span className="text-white font-bold">{withdrawNetwork} 网络</span>。一旦由于选错目标链导致充转错乱，资金将永久性丢失在外部黑洞。</li>
          <li>出账校验将在账单流安全审计确认后，平均 10-30 分钟在公链上广播成交。</li>
        </ul>
      </div>
    </div>
  );
}
