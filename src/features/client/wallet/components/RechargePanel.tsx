import { Button } from 'antd';
import { AlertTriangle, Copy } from 'lucide-react';
import type { NetworkType, RechargePanelProps } from '../types';

const addresses: Record<NetworkType, string> = {
  TRX: 'TX52b9m8xQ987dY64VbxZ3M98127341',
  ETH: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'
};

const networks: Array<{ label: string; value: NetworkType }> = [
  { label: 'TRC-20 (TRON) 网络', value: 'TRX' },
  { label: 'ERC-20 (Ethereum) 网络', value: 'ETH' }
];

export default function RechargePanel({
  rechargeNetwork,
  onRechargeNetworkChange,
  copiedAddress,
  onCopyRechargeAddress
}: RechargePanelProps) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-2">
        <label className="text-xs sm:text-xs text-[#cbc4d2] font-black uppercase tracking-wider">选择充值网络 / Network</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {networks.map((network) => (
            <Button
              key={network.value}
              className={`alliance-antd-wallet-network-button ${rechargeNetwork === network.value ? 'is-active' : ''}`}
              onClick={() => onRechargeNetworkChange(network.value)}
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-current opacity-80" />
              {network.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="bg-white/3 rounded-2xl p-4 border border-white/5 space-y-3">
        <span className="font-extrabold text-[#cfbcff] block text-xs sm:text-xs uppercase tracking-wide">
          专属 USDT {rechargeNetwork === 'TRX' ? 'TRC-20' : 'ERC-20'} 地址:
        </span>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="font-mono text-white text-xs sm:text-sm select-all break-all block py-1">
            {addresses[rechargeNetwork]}
          </span>
          <Button
            className="alliance-antd-wallet-copy-button"
            icon={<Copy className="w-3 sm:w-3.5 h-3 sm:h-3.5" />}
            onClick={onCopyRechargeAddress}
          >
            {copiedAddress ? '已复制' : '复制充值地址'}
          </Button>
        </div>
      </div>

      <div className="bg-amber-500/5 rounded-2xl p-4 border border-amber-500/10 space-y-2.5 text-[#cbc4d2]/90">
        <div className="flex items-center gap-2 text-[#e7c365]">
          <AlertTriangle className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          <span className="text-xs sm:text-xs font-black uppercase tracking-wider">充值重要提示与规则 (Deposit Precautions)</span>
        </div>
        <ul className="list-disc pl-4 space-y-1.5 text-xs sm:text-xs font-medium leading-relaxed">
          <li>最小起充金额为 <strong className="text-white">10 USDT</strong>，任何低于该额度的订单将无法在两端网络入账核销，且不可返还。</li>
          <li>请切勿向专属充值账户发送非 USDT 的其它数字资产。发送其它通证将可能造成资产永久流失。</li>
          <li>区块链链上网络检测通过（通常 1-3 个确认块，5分钟内）后，系统将实时统计并安全入账您的协议余额中。</li>
          <li>充值务必保证网络协议匹配，当前选定网络协议：<span className="text-[#cfbcff] font-bold">USDT-{rechargeNetwork}</span>。</li>
        </ul>
      </div>
    </div>
  );
}
