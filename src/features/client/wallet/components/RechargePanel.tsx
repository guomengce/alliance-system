import { AlertTriangle, Copy } from 'lucide-react';
import type { RechargePanelProps } from '../types';

export default function RechargePanel({
  rechargeNetwork,
  onRechargeNetworkChange,
  copiedAddress,
  onCopyRechargeAddress
}: RechargePanelProps) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-2">
        <label className="text-[9px] sm:text-[10px] text-[#cbc4d2] font-black uppercase tracking-wider">选择充值网络 / Network</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onRechargeNetworkChange('TRX')}
            className={`px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all text-[11px] sm:text-xs cursor-pointer ${
              rechargeNetwork === 'TRX'
                ? 'bg-[#6750a4] border-[#cfbcff] text-white shadow-md glow-accent'
                : 'bg-[#141218]/45 border-white/10 text-[#cbc4d2]/70 hover:border-white/20'
            }`}
          >
            <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${rechargeNetwork === 'TRX' ? 'bg-white animate-pulse' : 'bg-[#cbc4d2]/40'}`}></span>
            TRC-20 (TRON) 网络
          </button>
          <button
            type="button"
            onClick={() => onRechargeNetworkChange('ETH')}
            className={`px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all text-[11px] sm:text-xs cursor-pointer ${
              rechargeNetwork === 'ETH'
                ? 'bg-[#6750a4] border-[#cfbcff] text-white shadow-md glow-accent'
                : 'bg-[#141218]/45 border-white/10 text-[#cbc4d2]/70 hover:border-white/20'
            }`}
          >
            <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${rechargeNetwork === 'ETH' ? 'bg-white animate-pulse' : 'bg-[#cbc4d2]/40'}`}></span>
            ERC-20 (Ethereum) 网络
          </button>
        </div>
      </div>

      <div className="bg-white/3 rounded-2xl p-4 border border-white/5 space-y-3">
        <span className="font-extrabold text-[#cfbcff] block text-[10px] sm:text-xs uppercase tracking-wide">
          专属 USDT {rechargeNetwork === 'TRX' ? 'TRC-20' : 'ERC-20'} 地址:
        </span>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="font-mono text-white text-xs sm:text-sm select-all break-all block py-1">
            {rechargeNetwork === 'TRX'
              ? 'TX52b9m8xQ987dY64VbxZ3M98127341'
              : '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'}
          </span>
          <button
            type="button"
            onClick={onCopyRechargeAddress}
            className="flex-shrink-0 flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 text-[10px] sm:text-xs font-bold uppercase rounded-xl bg-[#cfbcff]/15 hover:bg-[#cfbcff]/25 text-[#cfbcff] border border-[#cfbcff]/15 transition-all cursor-pointer"
          >
            <Copy className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            {copiedAddress ? '已复制' : '复制充值地址'}
          </button>
        </div>
      </div>

      <div className="bg-amber-500/5 rounded-2xl p-4 border border-amber-500/10 space-y-2.5 text-[#cbc4d2]/90">
        <div className="flex items-center gap-2 text-[#e7c365]">
          <AlertTriangle className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider">充值重要提示与规则 (Deposit Precautions)</span>
        </div>
        <ul className="list-disc pl-4 space-y-1.5 text-[10px] sm:text-[11px] font-medium leading-relaxed">
          <li>
            最小起充金额为 <strong className="text-white">10 USDT</strong>，任何低于该额度的订单将无法在两端网络入账核销，且不可返还。
          </li>
          <li>
            请切勿向专属充值账户发送非 USDT 的其它数字资产。发送其它通证将可能造成资产永久流失。
          </li>
          <li>
            区块链链上网络检测通过（通常 1-3 个确认块，5分钟内）后，系统将实时统计并安全入账您的协议余额中。
          </li>
          <li>
            充值务必保证网络协议匹配，当前选定网络协议：<span className="text-[#cfbcff] font-bold">USDT-{rechargeNetwork}</span>。
          </li>
        </ul>
      </div>
    </div>
  );
}
